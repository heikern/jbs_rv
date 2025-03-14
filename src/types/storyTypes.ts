// Updated PlayerScript type
export type PlayerScript = {
    id: string;
    name: string;
    role: string;
    objective: string[];
    background: string;
  }
  
  export type Story = {
    id: string;
    title: string;
    description: string;
    number_of_players: number;
    difficulty: string;
    rating: number;
    player_scripts: {
      [key: string]: PlayerScript;
    }
  }
  
  export type Data = {
    stories: Story[];
  }