import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { Text } from '@/components/Themed';
import {
  categories,
  deleteWardrobeItem,
  listWardrobeItems,
  seasons,
  type WardrobeCategory,
  type WardrobeItem,
  type WardrobeSeason,
} from '@/lib/wardrobe';

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.filterChip, selected && styles.filterChipSelected]}>
      <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export default function WardrobeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<WardrobeCategory | 'All'>('All');
  const [season, setSeason] = useState<WardrobeSeason | 'All'>('All');
  const columns = width >= 760 ? 3 : 2;
  const categoryFilters: (WardrobeCategory | 'All')[] = ['All', ...categories];
  const seasonFilters: (WardrobeSeason | 'All')[] = ['All', ...seasons];

  const loadItems = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      setItems(await listWardrobeItems());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Your wardrobe could not be loaded.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadItems();
    }, [loadItems])
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return items.filter((item) => {
      const matchesName = !normalizedQuery || item.name.toLocaleLowerCase().includes(normalizedQuery);
      const matchesCategory = category === 'All' || item.category === category;
      const matchesSeason = season === 'All' || item.season === season;
      return matchesName && matchesCategory && matchesSeason;
    });
  }, [category, items, query, season]);

  const confirmDelete = (item: WardrobeItem) => {
    Alert.alert('Delete item?', `“${item.name}” will be removed from your wardrobe.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          void deleteWardrobeItem(item.id)
            .then(() => loadItems(true))
            .catch((deleteError: unknown) => {
              Alert.alert(
                'Could not delete item',
                deleteError instanceof Error
                  ? deleteError.message
                  : 'Please try again.'
              );
              void loadItems(true);
            });
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: WardrobeItem }) => (
    <View style={[styles.card, columns === 3 && styles.cardWide]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Edit ${item.name}`}
        onPress={() => router.push({ pathname: '/item', params: { id: item.id } })}>
        <Image source={{ uri: item.imageUri }} style={styles.itemImage} resizeMode="cover" />
        <View style={styles.itemDetails}>
          <Text numberOfLines={1} style={styles.itemName}>{item.name}</Text>
          <Text numberOfLines={1} style={styles.itemMeta}>{item.color} · {item.category}</Text>
          <Text numberOfLines={1} style={styles.itemSeason}>{item.season}</Text>
        </View>
      </Pressable>
      <View style={styles.cardActions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push({ pathname: '/item', params: { id: item.id } })}
          style={styles.cardAction}>
          <Text style={styles.editAction}>Edit</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.name}`}
          onPress={() => confirmDelete(item)}
          style={styles.cardAction}>
          <Text style={styles.deleteAction}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  const header = (
    <View>
      <View style={styles.headingRow}>
        <View style={styles.headingCopy}>
          <Text style={styles.eyebrow}>YOUR PERSONAL COLLECTION</Text>
          <Text style={styles.title}>My wardrobe</Text>
          <Text style={styles.subtitle}>
            {items.length} {items.length === 1 ? 'piece' : 'pieces'} in your closet
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/item')}
          style={styles.addButton}>
          <Text style={styles.addButtonPlus}>+</Text>
          <Text style={styles.addButtonText}>Add item</Text>
        </Pressable>
      </View>
      {error && items.length > 0 ? (
        <Pressable accessibilityRole="button" onPress={() => void loadItems(true)} style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error} · Tap to retry</Text>
        </Pressable>
      ) : null}

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          accessibilityLabel="Search wardrobe by name"
          placeholder="Search your wardrobe"
          placeholderTextColor="#85827C"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          style={styles.searchInput}
        />
        {query.length > 0 && (
          <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => setQuery('')}>
            <Text style={styles.clearSearch}>×</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.filterHeading}>CATEGORY</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        data={categoryFilters}
        keyExtractor={(value) => value}
        renderItem={({ item: value }) => (
          <FilterChip
            label={value}
            selected={category === value}
            onPress={() => setCategory(value)}
          />
        )}
      />
      <Text style={[styles.filterHeading, styles.seasonHeading]}>SEASON</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        data={seasonFilters}
        keyExtractor={(value) => value}
        renderItem={({ item: value }) => (
          <FilterChip
            label={value}
            selected={season === value}
            onPress={() => setSeason(value)}
          />
        )}
      />
      <View style={styles.resultsHeading}>
        <Text style={styles.resultsTitle}>{query || category !== 'All' || season !== 'All' ? 'Matching pieces' : 'All pieces'}</Text>
        <Text style={styles.resultsCount}>{filteredItems.length}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color="#2f95dc" />
        <Text style={styles.stateText}>Opening your wardrobe…</Text>
      </View>
    );
  }

  return (
    <FlatList
      key={columns}
      data={filteredItems}
      numColumns={columns}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          {error ? (
            <>
              <Text style={styles.emptyTitle}>We couldn’t open your wardrobe</Text>
              <Text style={styles.emptyCopy}>{error}</Text>
              <Pressable onPress={() => void loadItems()} style={styles.retryButton}>
                <Text style={styles.retryText}>Try again</Text>
              </Pressable>
            </>
          ) : items.length === 0 ? (
            <>
              <Text style={styles.emptyGlyph}>✦</Text>
              <Text style={styles.emptyTitle}>A closet of your own</Text>
              <Text style={styles.emptyCopy}>Add your first piece and start building your digital wardrobe.</Text>
              <Pressable onPress={() => router.push('/item')} style={styles.emptyButton}>
                <Text style={styles.emptyButtonText}>Add your first item</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.emptyTitle}>No pieces found</Text>
              <Text style={styles.emptyCopy}>Try another name or clear the filters to see more of your wardrobe.</Text>
              <Pressable
                onPress={() => {
                  setQuery('');
                  setCategory('All');
                  setSeason('All');
                }}
                style={styles.retryButton}>
                <Text style={styles.retryText}>Clear filters</Text>
              </Pressable>
            </>
          )}
        </View>
      }
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.cardRow}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => void loadItems(true)} tintColor="#2f95dc" />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
    backgroundColor: '#FAF9F6',
    flexGrow: 1,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 23,
    gap: 12,
  },
  headingCopy: { flex: 1 },
  eyebrow: { color: '#77766F', fontSize: 10, letterSpacing: 1.8, fontWeight: '700', marginBottom: 7 },
  title: { fontSize: 30, fontWeight: '700', color: '#252621', letterSpacing: -0.7 },
  subtitle: { color: '#77766F', fontSize: 13, marginTop: 5 },
  errorBanner: { padding: 11, borderRadius: 12, backgroundColor: '#F9EAE7', marginBottom: 15 },
  errorBannerText: { color: '#9D4439', fontSize: 12, lineHeight: 17 },
  addButton: {
    minHeight: 46,
    backgroundColor: '#252621',
    borderRadius: 14,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  addButtonPlus: { color: '#fff', fontSize: 21, lineHeight: 23 },
  addButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  searchWrap: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAE8E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginBottom: 22,
  },
  searchIcon: { fontSize: 25, color: '#77766F', marginRight: 8, transform: [{ rotate: '-25deg' }] },
  searchInput: { flex: 1, fontSize: 14, color: '#252621', paddingVertical: 0 },
  clearSearch: { color: '#77766F', fontSize: 24, paddingHorizontal: 3 },
  filterHeading: { color: '#77766F', fontSize: 10, letterSpacing: 1.5, fontWeight: '700', marginBottom: 10 },
  seasonHeading: { marginTop: 17 },
  chipRow: { gap: 8, paddingRight: 20 },
  filterChip: {
    borderColor: '#E4E1DA',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  filterChipSelected: { backgroundColor: '#252621', borderColor: '#252621' },
  filterChipText: { fontSize: 12, color: '#585850' },
  filterChipTextSelected: { color: '#fff', fontWeight: '600' },
  resultsHeading: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 25, marginBottom: 13 },
  resultsTitle: { fontSize: 17, color: '#252621', fontWeight: '700' },
  resultsCount: { color: '#77766F', fontSize: 12 },
  cardRow: { gap: 12, marginBottom: 12 },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#EEECE7',
    overflow: 'hidden',
  },
  cardWide: { maxWidth: '33.333%' },
  itemImage: { width: '100%', aspectRatio: 0.84, backgroundColor: '#F0EEE9' },
  itemDetails: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 8 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#252621' },
  itemMeta: { fontSize: 11, color: '#77766F', marginTop: 4 },
  itemSeason: { fontSize: 10, color: '#8D7258', marginTop: 4, fontWeight: '600' },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0EEE9',
    paddingHorizontal: 9,
    paddingVertical: 9,
    justifyContent: 'space-between',
  },
  cardAction: { paddingHorizontal: 5, paddingVertical: 2 },
  editAction: { color: '#54564D', fontSize: 12, fontWeight: '600' },
  deleteAction: { color: '#A65348', fontSize: 12, fontWeight: '600' },
  centerState: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF9F6' },
  stateText: { color: '#77766F', marginTop: 12, fontSize: 14 },
  emptyState: { alignItems: 'center', paddingHorizontal: 26, paddingTop: 50, paddingBottom: 55 },
  emptyGlyph: { fontSize: 35, color: '#A98B6B', marginBottom: 10 },
  emptyTitle: { color: '#252621', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  emptyCopy: { color: '#77766F', fontSize: 13, textAlign: 'center', lineHeight: 20, marginTop: 8, maxWidth: 300 },
  emptyButton: { backgroundColor: '#252621', borderRadius: 13, paddingHorizontal: 18, paddingVertical: 12, marginTop: 18 },
  emptyButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  retryButton: { borderWidth: 1, borderColor: '#D8D4CC', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, marginTop: 16 },
  retryText: { color: '#252621', fontSize: 13, fontWeight: '600' },
});
