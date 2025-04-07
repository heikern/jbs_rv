import { Client } from "colyseus.js";
import { COLYSEUS_API_URL } from "@/config";

// Replace the URL with your game server endpoint.
export const client = new Client(COLYSEUS_API_URL);

// Optionally: export helper functions or hooks if needed.
