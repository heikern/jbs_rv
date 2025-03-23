import React from "react";
import {
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"


const BottomBar: React.FC = () => {
	return (
		<div className="fixed bottom-0 left-0 w-full bg-black text-white flex items-center p-4">
            <TabsList className="flex w-full grid-cols-5">
                <TabsTrigger 
                    value="Backdrop"
                    className="data-[state=active]:outline"
                    >
                    Backdrop
                </TabsTrigger>
                <TabsTrigger 
                    value="Personal"
                    className="data-[state=active]:outline"
                    >
                    Personal
                </TabsTrigger>
                <TabsTrigger 
                    value="Objectives"
                    className="data-[state=active]:outline"
                    >
                    Objectives
                </TabsTrigger>
                <TabsTrigger 
                    value="Clues"
                    className="data-[state=active]:outline"
                    >
                    Clues
                </TabsTrigger>
                <TabsTrigger 
                    value="Notes"
                    className="data-[state=active]:outline"
                    >
                    Notes
                </TabsTrigger>
            </TabsList>
		</div>
	);
};

export default BottomBar;