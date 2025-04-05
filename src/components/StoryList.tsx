import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button"; // added import for Button
import { searchStories } from "../store/firebaseSlice";
import type { Story } from "../types/storyTypes";
import type { AppDispatch, RootState } from "@/store";

type StoryListProps = {
  onCreateGame: (storyId: string) => void;
  numPlayers: number | null;
};

const StoryList: React.FC<StoryListProps> = ({onCreateGame, numPlayers}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { stories, loading, error } = useSelector((state: RootState) => state.firebase);
  
  useEffect(() => {
    if (numPlayers !== null) {
      dispatch(searchStories({ numberOfPlayers: numPlayers }));
    } else {
      dispatch(searchStories({}));
    }
  }, [dispatch, numPlayers]);

  async function createGame(storyId: string) {
    onCreateGame(storyId);
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
