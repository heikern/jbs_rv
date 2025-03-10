import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button"; // added import for Button
import { fetchAdventures } from "../store/firebaseSlice";
import type { Adventure } from "../types/storyTypes";
import type { AppDispatch, RootState } from "@/store";
import { setSelectedGameId } from "@/store/gameSlice";

const StoryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { adventures, loading, error } = useSelector((state: RootState) => state.firebase);
  const { numPlayers } = useSelector((state: RootState) => state.game);
  
  useEffect(() => {
    dispatch(fetchAdventures());
  }, [dispatch]);

  return (
    <ScrollArea className="h-[400px] w-full">
      {loading && <p>Loading adventures...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <Accordion type="multiple">
        {adventures
          ?.filter((adventure: Adventure) => numPlayers === null || adventure.number_of_players === numPlayers)
          .map((adventure) => (
            <AccordionItem key={adventure.id} value={adventure.id.toString()}>
              <AccordionTrigger>
                {adventure.title} | {adventure.number_of_players} players
              </AccordionTrigger>
              <AccordionContent>
                <div>{adventure.description}</div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <div>Difficulty: {adventure.difficulty}</div>
                    <div>Rating: {adventure.rating}</div>
                  </div>
                  <div>
                    <Button variant={"outline"} onClick={()=>{dispatch(setSelectedGameId(Number(adventure.id)));}}>
                      Create Game</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </ScrollArea>
  );
};

export default StoryList;
