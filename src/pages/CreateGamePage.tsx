import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setNumPlayers } from "@/store/gameSlice";
import StoryList from "@/components/StoryList";
import BottomToolbar from "@/components/BottomToolbar";

export default function BackButtonPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(true);
  const [playersInput, setPlayersInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(playersInput, 10);
    if (!isNaN(num) && num > 0) {
      dispatch(setNumPlayers(num));
      setModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-black text-white">
      {/* Back button at the top left */}
      <div className="absolute top-0 left-0 m-4 z-10">
        <Button variant="ghost" onClick={() => navigate("/")}>
          Back
        </Button>
      </div>
      {modalOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <Card className="w-[350px]">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="p-2">How many players?</CardTitle>
                {/* <CardDescription>
                  Enter a number greater than 0.
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    {/* <Label htmlFor="players">Players</Label> */}
                    <Input
                      id="players"
                      type="number"
                      value={playersInput}
                      onChange={(e) => setPlayersInput(e.target.value)}
                      min="1"
                      placeholder="Number of players"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit">Confirm</Button>
                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  variant="ghost"
                >
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
      {/* ...existing page content... */}
      <div
        className="flex items-center justify-center h-full px-10"
        style={{ paddingTop: "calc(56px + 1rem)" }} // dynamically set padding based on back button height
      >
        <StoryList />
        <BottomToolbar />
      </div>
    </div>
  );
}
