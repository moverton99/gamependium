
import Papa from 'papaparse';
import { Game, CommentaryAndAlternatives } from '@/types/game';

// These URLs should be replaced with the actual published CSV links provided by the user.
// For now, I'll use placeholders or empty strings, and the app should handle the empty case gracefully or use fallback data.
const GAMES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9hOhKXdB6n_mEWhPC2mvegzy-bopr1vGp-_dyJ39tGEfVwyBPdrLNkx3p41K0NgnkqIviO-6o-N1f/pub?gid=0&single=true&output=csv';
const CATEGORIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9hOhKXdB6n_mEWhPC2mvegzy-bopr1vGp-_dyJ39tGEfVwyBPdrLNkx3p41K0NgnkqIviO-6o-N1f/pub?gid=708448874&single=true&output=csv';

/**
 * Represents a category definition from the Google Sheet.
 */
export interface Category {
  /** The name of the category. */
  name: string;
  /** A description of what this category entails. */
  description: string;
}

/**
 * Represents a raw row of game data from the CSV.
 * All fields are strings as they come directly from the CSV parser.
 */
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
  sold_by_okg: string;
  coop: string;
  commentary_and_alternatives: string;
}

/**
 * Parses a JSON string containing commentary and alternatives.
 * Handles potential double-escaped quotes common in CSV data.
 * 
 * @param jsonString - The JSON string to parse.
 * @returns The parsed CommentaryAndAlternatives object or undefined if parsing fails.
 */
const parseCommentary = (jsonString: string): CommentaryAndAlternatives | undefined => {
  if (!jsonString || jsonString.trim() === '') return undefined;
  try {
    // Handle potential double-escaped quotes if coming from CSV
    const cleanJson = jsonString.replace(/^"|"$/g, '').replace(/""/g, '"');
    return JSON.parse(cleanJson);
  } catch (e) {
    // Try parsing directly in case it wasn't double escaped
    try {
      return JSON.parse(jsonString);
    } catch (e2) {
      console.warn("Failed to parse commentary JSON:", e2);
      return undefined;
    }
  }
};

/**
 * Fetches game and category data from published Google Sheets CSVs.
 * Parses the CSV data and transforms it into the application's internal Game and Category types.
 * 
 * @returns A promise resolving to an object containing arrays of games and categories.
 */
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
      players_desc: row.players_desc,
      sold_by_okg: row.sold_by_okg?.trim().toUpperCase() === "TRUE",
      coop: row.coop?.trim().toUpperCase() === "TRUE",
      commentary_and_alternatives: parseCommentary(row.commentary_and_alternatives)
    }));

    return { games, categories: validCategoriesData };

  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return { games: [], categories: [] };
  }
};
