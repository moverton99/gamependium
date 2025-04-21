
import categories from '../../../data/game_categories.json';

export const categoryDescriptionMap: Record<string, string> = {};
for (const cat of categories) {
  categoryDescriptionMap[cat.name] = cat.description;
}
