import React from 'react';
import BottomBar  from '../components/bottomBar';
import Backdrop from '../components/Backdrop';
import PersonalStory from '..//components/PersonalStory';

import {
  Tabs,
} from "@/components/ui/tabs"

const GamePage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <Tabs defaultValue="Backdrop">
        <Backdrop />
        <PersonalStory />
        <BottomBar />
      </Tabs>
    </div>
  );
};

export default GamePage;

