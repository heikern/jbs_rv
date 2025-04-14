import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { RootState } from '../store';
import StoryList from '@/components/StoryList';
import TopBar from '@/components/TopBar';

const ScriptBrowsePage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.firebase);

  useEffect(() => {
      // On loading the page, set numPlayers to null
    }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col w-screen bg-black text-white">
      <TopBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">JBS Script Catalogue</h1>
        {loading && <p>Loading adventures...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
      <div className="flex-1 overflow-y-auto px-8">
        <StoryList onCreateGame={()=>{}} numPlayers={null}/>
      </div>
    </div>
  );
};

export default ScriptBrowsePage;