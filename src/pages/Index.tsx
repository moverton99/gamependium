
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import games from "../../data/games.json";

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Board Game Library</h1>
        <ScrollArea className="h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.name} className="p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                <div className="flex flex-wrap gap-2">
                  {game.category.map((cat) => (
                    <span 
                      key={cat} 
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;

