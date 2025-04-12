import React from 'react';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import { useSelector } from 'react-redux';
import { useRoom } from '@/contexts/RoomContext';
import { inGamePages } from '@/types/gamePages';
import Scene from '@/components/Scene';
import { ScrollArea } from "@/components/ui/scroll-area"

const GamePage: React.FC = () => {
  const room = useRoom();
  const playerSessionId = room?.sessionId;
  const playerStateArray = useSelector((state: any) => state.game.playerStateArray);
  const player = playerStateArray.find((player: any) => player.playerSessionId === playerSessionId);
  const playerRoleId = player?.playerRoleId;
  const storyTitle = useSelector((state: any) => state.game.storyMetadata.title);


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

  console.log("playerRoleId: ", playerRoleId)

  // if (!role) {
  //   return (
  //     <div className="min-h-screen w-screen bg-black text-white flex flex-col">
  //       <Skeleton className="h-12 w-12 rounded-full" />
  //       <div className="space-y-2">
  //         <Skeleton className="h-4 w-[250px]" />
  //         <Skeleton className="h-4 w-[200px]" />
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header Section */}
      <TopBar />
      <div className="w-screen flex flex-col items-center justify-center py-1">
        <h1>{storyTitle}</h1>
        {/* <p>{role.name} the {role.role}</p> */}
      </div>
      {/* <div className="flex-grow flex items-center justify-center"> */}
      <div className="flex-1 w-full px-4 py-4 overflow-hidden">
        <ScrollArea className="h-full w-full">
          {renderContent()}
        </ScrollArea>
        {/* <p>temporary</p> */}
      </div>
      
      <BottomBar pageEnum={inGamePages} 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};

export default GamePage;

