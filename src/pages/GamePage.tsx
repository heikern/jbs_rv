import React, { useEffect } from 'react';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicDataByStoryId } from '@/store/firebaseSlice';
import { useRoom } from '@/contexts/RoomContext';
import { Skeleton } from "@/components/ui/skeleton"
import { inGamePages } from '@/types/gamePages';
import Scene from '@/components/Scene';

import { AppDispatch } from '@/store';

const GamePage: React.FC = () => {
  const room = useRoom();
  const playerSessionId = room?.sessionId;
  const dispatch = useDispatch<AppDispatch>();
  const playerStateArray = useSelector((state: any) => state.game.playerStateArray);
  const player = playerStateArray.find((player: any) => player.playerSessionId === playerSessionId);
  const playerRoleId = player?.playerRoleId;
  const storyTitle = useSelector((state: any) => state.game.storyMetadata.title);
  const storyId = useSelector((state: any) => state.game.storyMetadata.id);
  const rolesPublicData = useSelector((state: any) => state.firebase.publicData.roles);
  const role = rolesPublicData?.find((role: any) => role.id === playerRoleId);

  const [currentPage, setCurrentPage] = React.useState<inGamePages>(inGamePages.scene);
  
  const renderContent = () => {
    switch (currentPage) {
      case inGamePages.scene:
        return <Scene/>;
      case inGamePages.roleScript:
        return <h1>Role Script</h1>;
      default:
        return <h1>Scene</h1>;
    }
  }

  useEffect(() => {
    if (!storyId) {
      
    }
    dispatch(fetchPublicDataByStoryId(storyId));
  }, []);

  if (!role) {
    return (
      <div className="min-h-screen w-screen bg-black text-white flex flex-col">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col">
      {/* Header Section */}
      <TopBar />
      <div className="w-screen flex flex-col items-center justify-center">
        <h1>{storyTitle}</h1>
        <p>{role.name} the {role.role}</p>
      </div>
      <div className="flex-grow flex items-center justify-center">
        {renderContent()}
      </div>
      
      <BottomBar pageEnum={inGamePages} 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};

export default GamePage;

