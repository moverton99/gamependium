
/**
 * Represents an alternative game recommendation.
 */
export interface Alternative {
  /** The name of the alternative game. */
  name: string;
  /** A short tagline or catchphrase for the game. */
  tagline: string;
  /** A brief description of why this game is a good alternative. */
  description: string;
}

/**
 * detailed commentary and alternative recommendations for a game.
 */
export interface CommentaryAndAlternatives {
  /** The main commentary text about the game. */
  body: string;
  /** A list of alternative game recommendations. */
  alternatives: Alternative[];
  /** A final verdict or summary of the game. */
  verdict: string;
}

/**
 * Represents a board game with its various attributes and rankings.
 */
export interface Game {
  /** The name of the game. */
  name: string;
  /** A brief description of the game. */
  description: string;
  /** Numerical rank for the learning curve (0-100). */
  learning_curve_rank: number;
  /** Textual description of the learning curve. */
  learning_curve_desc: string;
  /** Numerical rank for strategic depth (0-100). */
  strategic_depth_rank: number;
  /** Textual description of strategic depth. */
  strategic_depth_desc: string;
  /** Numerical rank for replayability (0-100). Can be a string in some raw data cases. */
  replayability_rank: number | string;
  /** Textual description of replayability. */
  replayability_desc: string;
  /** List of categories the game belongs to. */
  category: string[];
  /** Average playtime in minutes. */
  playtime_minutes: number;
  /** Optional gameplay style description. */
  gameplay_style?: string;
  /** Minimum number of players required. */
  min_players: number;
  /** Maximum number of players supported. */
  max_players: number;
  /** Suggested minimum number of players for best experience. */
  suggested_min_players: number;
  /** Description of the player count experience. */
  players_desc: string;
  /** Whether the game is sold by OverKnight Games. */
  sold_by_okg: boolean;
  /** Whether the game is cooperative. */
  coop: boolean;
  /** Optional commentary and alternative recommendations. */
  commentary_and_alternatives?: CommentaryAndAlternatives;
}
