import { Schema } from "@colyseus/schema";

export class Player extends Schema {
  id: string = "";
  playerName: string = "";
  isReady: boolean = false;
}

export class StoryMetadata extends Schema {
  Id: string = "";
  Title: string = "";
  Description: string = "";
  NumberOfPlayers: number = -1;
}

export class ColyseusGameState extends Schema {
  currentHost: string = "";
  players = new Map<string, Player>();
  storyMetadata: StoryMetadata = new StoryMetadata();
  
}