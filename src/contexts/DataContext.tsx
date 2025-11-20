
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game } from '@/types/game';
import { fetchGoogleSheetData, Category } from '@/services/googleSheets';


interface DataContextType {
    games: Game[];
    categories: Category[];
    categoryDescriptionMap: Record<string, string>;
    isLoading: boolean;
    error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [games, setGames] = useState<Game[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {


                const { games: fetchedGames, categories: fetchedCategories } = await fetchGoogleSheetData();

                if (fetchedGames.length > 0) {
                    setGames(fetchedGames);
                    setCategories(fetchedCategories);
                } else {
                    // Fallback if fetch returns empty (e.g. parsing error or network error handled in service)
                    console.warn("Fetched data was empty.");
                }

            } catch (err) {
                console.error("Failed to load data:", err);
                setError("Failed to load data.");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const categoryDescriptionMap = React.useMemo(() => {
        const map: Record<string, string> = {};
        for (const cat of categories) {
            map[cat.name] = cat.description;
        }
        return map;
    }, [categories]);

    return (
        <DataContext.Provider value={{ games, categories, categoryDescriptionMap, isLoading, error }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
