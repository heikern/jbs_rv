// Updated PlayerScript type
export type PlayerScript = {
    id: string;
    name: string;
    role: string;
    objective: string[];
    background: string;
  }

  export type roleMetaData = {
    id:string;
    name:string;
    role:string;
    description:string;
  }
  
  export type RoleMap = {
    [key: string]: roleMetaData
  }
  
export type Story = {
  id: string;
  title: string;
  description: string;
  number_of_players: number;
  difficulty: string;
  rating: number;
  roles: RoleMap;
}
  
export type Data = {
  stories: Story[];
}