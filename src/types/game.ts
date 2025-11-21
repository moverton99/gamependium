
export interface Alternative {
  name: string;
  tagline: string;
  description: string;
}

export interface CommentaryAndAlternatives {
  body: string;
  alternatives: Alternative[];
  verdict: string;
}

export interface Game {
  name: string;
  description: string;
  learning_curve_rank: number;
  learning_curve_desc: string;
  strategic_depth_rank: number;
  strategic_depth_desc: string;
  replayability_rank: number | string;
  replayability_desc: string;
  category: string[];
  playtime_minutes: number;
  gameplay_style?: string;
  min_players: number;
  max_players: number;
  suggested_min_players: number;
  players_desc: string;
  sold_by_okg: boolean;
  coop: boolean;
  commentary_and_alternatives?: CommentaryAndAlternatives;
}
