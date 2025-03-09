import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdventures } from '../store/firebaseSlice';
import { setSelectedGameId } from '../store/gameSlice';
import type { Adventure } from '../types/storyTypes';
import type { RootState, AppDispatch } from '../store';

interface GameListProps {
  filterPlayerNum: number | null;
}

const GameList: React.FC<GameListProps> = ({ filterPlayerNum }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { adventures, loading, error } = useSelector((state: RootState) => state.firebase);
  const selectedGameId = useSelector((state: RootState) => state.game.selectedGameId);

  useEffect(() => {
    dispatch(fetchAdventures());
  }, [dispatch]);

  const toggleExpand = (id: number) => {
    dispatch(setSelectedGameId(selectedGameId === id ? null : id));
  };

  return (
    <div>
      <p>Filtering games for {filterPlayerNum ?? 'all'} players</p>
      {loading && <p>Loading adventures...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-0 gap-x-4">
        {adventures
          .filter((adventure: Adventure) => filterPlayerNum === null || adventure.number_of_players === filterPlayerNum)
          .map((adventure: Adventure) => {
            const isExpanded = selectedGameId === Number(adventure.id);
            return (
              <div
                key={adventure.id}
                className="relative rounded overflow-hidden shadow-lg"
              >
                <div className="relative p-2">
                  <button onClick={() => toggleExpand(Number(adventure.id))} className="w-full text-left focus:outline-none">
                    <h2 className="text-lg font-semibold">{adventure.title}</h2>
                  </button>
                  {isExpanded && (
                    <div className="mt-2 bg-black bg-opacity-70 p-2 rounded">
                      <p className="text-sm mb-1">{adventure.description}</p>
                      <p className="text-xs">
                        <strong>Players:</strong> {adventure.number_of_players} |{' '}
                        <strong>Difficulty:</strong> {adventure.difficulty} |{' '}
                        <strong>Rating:</strong> {adventure.rating}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GameList;
