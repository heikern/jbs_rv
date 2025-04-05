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

export type RolePublicData = {
  id:string;
  name:string;
  role:string;
  description:string;
}

export type PublicData = {
  roles: RolePublicData[];
  scene: string;
}
  
export type Data = {
  stories: Story[];
}