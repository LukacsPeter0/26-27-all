import { Directory, File, Paths } from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

export const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'] as const;
export const seasons = ['Spring', 'Summer', 'Autumn', 'Winter', 'All seasons'] as const;

export type WardrobeCategory = (typeof categories)[number];
export type WardrobeSeason = (typeof seasons)[number];

export type WardrobeItem = {
  id: string;
  name: string;
  category: WardrobeCategory;
  color: string;
  style: string;
  season: WardrobeSeason;
  imageUri: string;
  createdAt: number;
};

export type WardrobeItemInput = Omit<WardrobeItem, 'id' | 'imageUri' | 'createdAt'> & {
  imageUri: string;
};

let databasePromise: Promise<SQLite.SQLiteDatabase> | undefined;
const photoDirectory = new Directory(Paths.document, 'wardrobe-photos');

async function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync('closetai-wardrobe.db')
      .then(async (database) => {
        await database.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS wardrobe_items (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            color TEXT NOT NULL,
            style TEXT NOT NULL,
            season TEXT NOT NULL,
            image_uri TEXT NOT NULL,
            created_at INTEGER NOT NULL
          );
        `);
        return database;
      })
      .catch((error: unknown) => {
        databasePromise = undefined;
        throw error;
      });
  }

  return databasePromise;
}

async function savePhoto(sourceUri: string, itemId: string) {
  photoDirectory.create({ idempotent: true, intermediates: true });

  const extension = sourceUri.match(/\.(jpe?g|png|webp|gif)(?:[?#]|$)/i)?.[1] ?? 'jpg';
  const uniqueName = `${itemId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const destination = new File(photoDirectory, `${uniqueName}.${extension}`);
  await new File(sourceUri).copy(destination);
  return destination.uri;
}

export async function listWardrobeItems() {
  const database = await getDatabase();
  const rows = await database.getAllAsync<{
    id: string;
    name: string;
    category: WardrobeCategory;
    color: string;
    style: string;
    season: WardrobeSeason;
    image_uri: string;
    created_at: number;
  }>('SELECT * FROM wardrobe_items ORDER BY created_at DESC');

  return rows.map((row): WardrobeItem => ({
    id: row.id,
    name: row.name,
    category: row.category,
    color: row.color,
    style: row.style,
    season: row.season,
    imageUri: row.image_uri,
    createdAt: row.created_at,
  }));
}

export async function getWardrobeItem(id: string) {
  const database = await getDatabase();
  const row = await database.getFirstAsync<{
    id: string;
    name: string;
    category: WardrobeCategory;
    color: string;
    style: string;
    season: WardrobeSeason;
    image_uri: string;
    created_at: number;
  }>('SELECT * FROM wardrobe_items WHERE id = ?', id);

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    color: row.color,
    style: row.style,
    season: row.season,
    imageUri: row.image_uri,
    createdAt: row.created_at,
  } satisfies WardrobeItem;
}

export async function createWardrobeItem(input: WardrobeItemInput) {
  const database = await getDatabase();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const imageUri = await savePhoto(input.imageUri, id);
  const createdAt = Date.now();

  try {
    await database.runAsync(
      `INSERT INTO wardrobe_items (id, name, category, color, style, season, image_uri, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      id,
      input.name,
      input.category,
      input.color,
      input.style,
      input.season,
      imageUri,
      createdAt
    );
  } catch (error) {
    new File(imageUri).delete();
    throw error;
  }

  return { ...input, id, imageUri, createdAt };
}

export async function updateWardrobeItem(id: string, input: WardrobeItemInput) {
  const database = await getDatabase();
  const existing = await getWardrobeItem(id);
  if (!existing) {
    throw new Error('This wardrobe item no longer exists.');
  }

  const imageUri =
    input.imageUri === existing.imageUri ? existing.imageUri : await savePhoto(input.imageUri, id);

  try {
    const result = await database.runAsync(
      `UPDATE wardrobe_items
       SET name = ?, category = ?, color = ?, style = ?, season = ?, image_uri = ?
       WHERE id = ?`,
      input.name,
      input.category,
      input.color,
      input.style,
      input.season,
      imageUri,
      id
    );
    if (result.changes === 0) {
      throw new Error('This wardrobe item could not be updated.');
    }
  } catch (error) {
    if (imageUri !== existing.imageUri) {
      new File(imageUri).delete();
    }
    throw error;
  }

  if (imageUri !== existing.imageUri) {
    new File(existing.imageUri).delete();
  }
}

export async function deleteWardrobeItem(id: string) {
  const database = await getDatabase();
  const item = await getWardrobeItem(id);
  if (!item) {
    return;
  }

  await database.runAsync('DELETE FROM wardrobe_items WHERE id = ?', id);
  new File(item.imageUri).delete();
}
