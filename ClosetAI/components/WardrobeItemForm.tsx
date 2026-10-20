import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/Themed';
import {
  categories,
  createWardrobeItem,
  getWardrobeItem,
  seasons,
  updateWardrobeItem,
  type WardrobeCategory,
  type WardrobeSeason,
} from '@/lib/wardrobe';

type FormValues = {
  name: string;
  category: WardrobeCategory;
  color: string;
  style: string;
  season: WardrobeSeason;
  imageUri: string;
};

const initialValues: FormValues = {
  name: '',
  category: 'Tops',
  color: '',
  style: '',
  season: 'All seasons',
  imageUri: '',
};

type ChoiceRowProps<T extends string> = {
  label: string;
  values: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
};

function ChoiceRow<T extends string>({ label, values, selected, onSelect }: ChoiceRowProps<T>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.choiceRow}>
        {values.map((value) => (
          <Pressable
            key={value}
            accessibilityRole="button"
            accessibilityState={{ selected: selected === value }}
            onPress={() => onSelect(value)}
            style={[styles.choice, selected === value && styles.choiceSelected]}>
            <Text style={[styles.choiceText, selected === value && styles.choiceTextSelected]}>{value}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function WardrobeItemForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (!id) return;

    let active = true;
    getWardrobeItem(id)
      .then((item) => {
        if (!active) return;
        if (!item) {
          setError('This item could not be found. It may have already been deleted.');
          return;
        }
        setValues({
          name: item.name,
          category: item.category,
          color: item.color,
          style: item.style,
          season: item.season,
          imageUri: item.imageUri,
        });
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'This item could not be loaded.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const updateField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setError(null);
  };

  const choosePhoto = async () => {
    setError(null);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.85,
      });
      if (!result.canceled && result.assets[0]) {
        updateField('imageUri', result.assets[0].uri);
      }
    } catch (pickerError) {
      setError(pickerError instanceof Error ? pickerError.message : 'The photo library could not be opened.');
    }
  };

  const save = async () => {
    const itemName = values.name.trim();
    if (!itemName || !values.color.trim() || !values.style.trim() || !values.imageUri) {
      setError('Add a photo, name, color, and style before saving.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const input = { ...values, name: itemName, color: values.color.trim(), style: values.style.trim() };
      if (id) {
        await updateWardrobeItem(id, input);
      } else {
        await createWardrobeItem(input);
      }
      router.back();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Your item could not be saved. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingState}>
        <ActivityIndicator size="large" color="#2f95dc" />
        <Text style={styles.loadingText}>Loading item…</Text>
      </SafeAreaView>
    );
  }

  if (isEditing && !values.imageUri && error) {
    return (
      <SafeAreaView style={styles.loadingState}>
        <Text style={styles.errorTitle}>Couldn’t open this item</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to wardrobe</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>
          <Text style={styles.topBarTitle}>{isEditing ? 'Edit piece' : 'New piece'}</Text>
          <View style={styles.topBarSpacer} />
        </View>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.eyebrow}>{isEditing ? 'UPDATE YOUR COLLECTION' : 'GROW YOUR COLLECTION'}</Text>
          <Text style={styles.title}>{isEditing ? 'Edit your piece' : 'Add to your wardrobe'}</Text>
          <Text style={styles.subtitle}>A little detail helps you find the right look later.</Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={values.imageUri ? 'Change clothing photo' : 'Choose clothing photo'}
            onPress={() => void choosePhoto()}
            style={[styles.photoPicker, values.imageUri && styles.photoPickerFilled]}>
            {values.imageUri ? (
              <Image source={{ uri: values.imageUri }} style={styles.photoPreview} resizeMode="cover" />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlus}>+</Text>
                <Text style={styles.photoTitle}>Add a photo</Text>
                <Text style={styles.photoHint}>Choose an image from your gallery</Text>
              </View>
            )}
            {values.imageUri ? (
              <View style={styles.changePhotoBadge}>
                <Text style={styles.changePhotoText}>Change photo</Text>
              </View>
            ) : null}
          </Pressable>

          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              accessibilityLabel="Clothing item name"
              value={values.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="e.g. Everyday denim jacket"
              placeholderTextColor="#929087"
              maxLength={60}
              style={styles.input}
              returnKeyType="next"
            />
          </View>

          <ChoiceRow
            label="Category"
            values={categories}
            selected={values.category}
            onSelect={(value) => updateField('category', value)}
          />

          <View style={styles.fieldRow}>
            <View style={[styles.field, styles.halfField]}>
              <Text style={styles.label}>Color</Text>
              <TextInput
                accessibilityLabel="Clothing item color"
                value={values.color}
                onChangeText={(value) => updateField('color', value)}
                placeholder="e.g. Navy"
                placeholderTextColor="#929087"
                maxLength={35}
                style={styles.input}
                returnKeyType="next"
              />
            </View>
            <View style={[styles.field, styles.halfField]}>
              <Text style={styles.label}>Style</Text>
              <TextInput
                accessibilityLabel="Clothing item style"
                value={values.style}
                onChangeText={(value) => updateField('style', value)}
                placeholder="e.g. Casual"
                placeholderTextColor="#929087"
                maxLength={35}
                style={styles.input}
                returnKeyType="done"
              />
            </View>
          </View>

          <ChoiceRow
            label="Season"
            values={seasons}
            selected={values.season}
            onSelect={(value) => updateField('season', value)}
          />

          {error ? (
            <View accessibilityRole="alert" style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Pressable
            accessibilityRole="button"
            disabled={saving}
            onPress={() => void save()}
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}>
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>{isEditing ? 'Save changes' : 'Add to wardrobe'}</Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#FAF9F6' },
  loadingState: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF9F6', padding: 28 },
  loadingText: { color: '#77766F', marginTop: 12 },
  topBar: {
    height: 54,
    paddingHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEECE7',
  },
  closeButton: { width: 38, height: 38, justifyContent: 'center' },
  closeText: { fontSize: 30, color: '#4F504A', lineHeight: 34 },
  topBarTitle: { fontSize: 15, fontWeight: '700', color: '#252621' },
  topBarSpacer: { width: 38 },
  content: { paddingHorizontal: 21, paddingTop: 24, paddingBottom: 38 },
  eyebrow: { color: '#77766F', fontSize: 10, letterSpacing: 1.7, fontWeight: '700' },
  title: { fontSize: 27, lineHeight: 34, color: '#252621', fontWeight: '700', marginTop: 7 },
  subtitle: { color: '#77766F', fontSize: 13, lineHeight: 19, marginTop: 5, marginBottom: 20 },
  photoPicker: {
    width: '100%',
    aspectRatio: 1.36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D9D5CC',
    borderStyle: 'dashed',
    backgroundColor: '#F2F0EA',
    overflow: 'hidden',
    marginBottom: 20,
  },
  photoPickerFilled: { borderStyle: 'solid', borderColor: '#EEECE7' },
  photoPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  photoPlus: { fontSize: 30, color: '#747167', marginBottom: 1 },
  photoTitle: { color: '#373831', fontSize: 14, fontWeight: '700' },
  photoHint: { color: '#77766F', fontSize: 12, marginTop: 4 },
  photoPreview: { width: '100%', height: '100%' },
  changePhotoBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(37,38,33,0.82)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  changePhotoText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  field: { marginBottom: 19 },
  fieldRow: { flexDirection: 'row', gap: 12 },
  halfField: { flex: 1 },
  label: { color: '#44453F', fontSize: 12, fontWeight: '700', marginBottom: 8 },
  input: {
    height: 47,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E1DA',
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    color: '#252621',
    fontSize: 14,
  },
  choiceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choice: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E4E1DA',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  choiceSelected: { backgroundColor: '#252621', borderColor: '#252621' },
  choiceText: { fontSize: 12, color: '#585850' },
  choiceTextSelected: { color: '#fff', fontWeight: '600' },
  errorBox: { padding: 12, borderRadius: 12, backgroundColor: '#F9EAE7', marginBottom: 14 },
  errorTitle: { fontSize: 18, fontWeight: '700', color: '#252621', textAlign: 'center' },
  errorText: { color: '#9D4439', fontSize: 13, lineHeight: 19 },
  backButton: { marginTop: 16, backgroundColor: '#252621', padding: 12, borderRadius: 12 },
  backButtonText: { color: '#fff', fontWeight: '600' },
  saveButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#252621',
    marginTop: 2,
  },
  saveButtonDisabled: { opacity: 0.65 },
  saveButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
