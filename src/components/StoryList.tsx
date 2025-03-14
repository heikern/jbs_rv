import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button"; // added import for Button
import { fetchStories } from "../store/firebaseSlice";
import type { Story } from "../types/storyTypes";
import type { AppDispatch, RootState } from "@/store";
import { setSelectedGameId,  } from "@/store/appSlice";
import { setSelectedStory } from "../store/firebaseSlice";
import { useColyseus } from "../contexts/ColyseusContext";
import { useNavigate } from "react-router-dom";

const StoryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { stories, loading, error } = useSelector((state: RootState) => state.firebase);
  const { numPlayers } = useSelector((state: RootState) => state.game);
  const {createRoom} = useColyseus();
  
  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  function createGame(storyId: string) {
    dispatch(setSelectedGameId(storyId));
    createRoom("my_room", { "storyId": storyId });
    dispatch(setSelectedStory(storyId))
    navigate("/lobby");
  }

  return (
    <ScrollArea className="h-auto w-full rounded-lg">
      {loading && <p>Loading Storys...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <Accordion type="multiple">
        {stories
          ?.filter((Story: Story) => numPlayers === null || Story.number_of_players === numPlayers)
          .map((Story) => (
            <AccordionItem key={Story.id} value={Story.id.toString()}>
              <AccordionTrigger>
                {Story.title} | {Story.number_of_players} players
              </AccordionTrigger>
              <AccordionContent>
                <div>{Story.description}</div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <div>Difficulty: {Story.difficulty}</div>
                    <div>Rating: {Story.rating}</div>
                  </div>
                  <div>
                    <Button variant={"outline"} onClick={()=>{createGame(Story.id)}}>
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
