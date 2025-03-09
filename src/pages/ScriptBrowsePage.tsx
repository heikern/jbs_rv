import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import GameList from '../components/GameList'; // new import
import BottomToolbar from '../components/BottomToolbar';

const ScriptBrowsePage: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.firebase);

  return (
    <div className="min-h-screen flex flex-col w-screen bg-black text-white">
      <div className="p-4">
        <button onClick={() => navigate('/')} className="mb-4 px-2 py-1 bg-gray-700 rounded">
          Back
        </button>
        <h1 className="text-2xl font-bold mb-4">JBS Script Catalogue</h1>
        {loading && <p>Loading adventures...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <GameList filterPlayerNum={null} />
      </div>
      <BottomToolbar />
    </div>
  );
};

export default ScriptBrowsePage;