
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
}
