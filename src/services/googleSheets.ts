
import Papa from 'papaparse';
import { Game } from '@/types/game';

// These URLs should be replaced with the actual published CSV links provided by the user.
// For now, I'll use placeholders or empty strings, and the app should handle the empty case gracefully or use fallback data.
const GAMES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9hOhKXdB6n_mEWhPC2mvegzy-bopr1vGp-_dyJ39tGEfVwyBPdrLNkx3p41K0NgnkqIviO-6o-N1f/pub?gid=0&single=true&output=csv';
const CATEGORIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9hOhKXdB6n_mEWhPC2mvegzy-bopr1vGp-_dyJ39tGEfVwyBPdrLNkx3p41K0NgnkqIviO-6o-N1f/pub?gid=708448874&single=true&output=csv';

export interface Category {
  name: string;
  description: string;
}

interface RawGameRow {
  name: string;
  description: string;
  learning_curve_rank: string;
  learning_curve_desc: string;
  strategic_depth_rank: string;
  strategic_depth_desc: string;
  replayability_rank: string;
  replayability_desc: string;
  category: string;
  playtime_minutes: string;
  min_players: string;
  max_players: string;
  suggested_min_players: string;
  players_desc: string;
}

export const fetchGoogleSheetData = async () => {
  if (!GAMES_CSV_URL || !CATEGORIES_CSV_URL) {
    console.warn("Google Sheets URLs are not configured.");
    return { games: [], categories: [] };
  }

  try {
    const [gamesResponse, categoriesResponse] = await Promise.all([
      fetch(GAMES_CSV_URL),
      fetch(CATEGORIES_CSV_URL)
    ]);

    const gamesCsv = await gamesResponse.text();
    const categoriesCsv = await categoriesResponse.text();

    const gamesData = Papa.parse<RawGameRow>(gamesCsv, { header: true, skipEmptyLines: true }).data;
    const categoriesData = Papa.parse<Category>(categoriesCsv, { header: true, skipEmptyLines: true }).data;

    const validGamesData = gamesData.filter(row => row.name && row.name.trim() !== '');
    const validCategoriesData = categoriesData.filter(row => row.name && row.name.trim() !== '');

    const games: Game[] = validGamesData.map(row => ({
      name: row.name,
      description: row.description,
      learning_curve_rank: parseInt(row.learning_curve_rank) || 0,
      learning_curve_desc: row.learning_curve_desc,
      strategic_depth_rank: parseInt(row.strategic_depth_rank) || 0,
      strategic_depth_desc: row.strategic_depth_desc,
      replayability_rank: parseInt(row.replayability_rank) || row.replayability_rank, // Handle mixed types if needed, though interface says number | string
      replayability_desc: row.replayability_desc,
      category: row.category ? row.category.split(';').map(c => c.trim()) : [],
      playtime_minutes: parseInt(row.playtime_minutes) || 0,
      min_players: parseInt(row.min_players) || 0,
      max_players: parseInt(row.max_players) || 0,
      suggested_min_players: parseInt(row.suggested_min_players) || 0,
      players_desc: row.players_desc
    }));

    return { games, categories: validCategoriesData };

  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return { games: [], categories: [] };
  }
};
