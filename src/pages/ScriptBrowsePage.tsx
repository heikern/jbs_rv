import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db, { Adventure } from '../db';
import BottomToolbar from '../components/BottomToolbar';

const ScriptBrowsePage: React.FC = () => {
  const navigate = useNavigate();
  const [adventures, setAdventures] = useState<Adventure[] | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAdventures() {
      await db.read();
      setAdventures(db.data?.adventures || []);
    }
    fetchAdventures();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="min-h-screen w-screen bg-black p-4 text-white">
      <button 
        onClick={() => navigate('/')} 
        className="mb-4 px-2 py-1 bg-gray-700 rounded"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-4">JBS Script Catalogue</h1>
      <p className="mb-6">Select a script to play</p>

      {/* Grid container for Pinterest-style cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {adventures?.map((adventure) => {
          const isExpanded = expandedId === Number(adventure.id);
          return (
            <div
              key={adventure.id}
              className="relative rounded overflow-hidden shadow-lg"
              style={{
                backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative p-4">
                <button
                  onClick={() => toggleExpand(Number(adventure.id))}
                  className="w-full text-left focus:outline-none"
                >
                  <h2 className="text-xl font-semibold">
                    {adventure.title}
                  </h2>
                </button>
                {isExpanded && (
                  <div className="mt-2 bg-black bg-opacity-70 p-2 rounded">
                    <p className="text-sm mb-1">
                      {adventure.description}
                    </p>
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
      <BottomToolbar />
    </div>
  );
};

export default ScriptBrowsePage;