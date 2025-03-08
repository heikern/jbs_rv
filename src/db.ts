// src/db.ts
import { Low, Memory } from 'lowdb'

// Define the types for our data
export type PlayerScript = {
  player_id: string
  player_name: string
  player_script: string
}

export type Adventure = {
  id: string
  title: string
  description: string
  number_of_players: number
  difficulty: string
  rating: number
  player_scripts: {
    [key: string]: PlayerScript
  }
}

export type Data = {
  adventures: Adventure[]
}

// Initial data using your JSON array
const initialData: Data = {
  adventures: [
    {
      id: "1",
      title: "Mystery in the Mansion",
      description:
        "Uncover the secrets of a haunted mansion full of hidden rooms and eerie sounds.",
      number_of_players: 4,
      difficulty: "Medium",
      rating: 4.5,
      player_scripts: {
        p1: {
          player_id: "p1",
          player_name: "Alice",
          player_script:
            "You are the fearless detective determined to solve the mansion's mystery."
        },
        p2: {
          player_id: "p2",
          player_name: "Bob",
          player_script:
            "You are the curious journalist, eager to uncover the scandal behind the haunted estate."
        },
        p3: {
          player_id: "p3",
          player_name: "Charlie",
          player_script:
            "You are the skeptical neighbor who doubts the supernatural stories but can't ignore the strange happenings."
        },
        p4: {
          player_id: "p4",
          player_name: "Dana",
          player_script:
            "You are the secret mastermind with a hidden agenda, waiting for the perfect moment to strike."
        }
      }
    },
    {
      id: "2",
      title: "Space Odyssey",
      description:
        "Embark on an interstellar adventure where each decision could mean the difference between life and oblivion.",
      number_of_players: 3,
      difficulty: "Hard",
      rating: 4.8,
      player_scripts: {
        p1: {
          player_id: "p1",
          player_name: "Eve",
          player_script:
            "You are the captain of the starship, responsible for navigating through dangerous cosmic phenomena."
        },
        p2: {
          player_id: "p2",
          player_name: "Frank",
          player_script:
            "You are the science officer, tasked with analyzing mysterious signals from deep space."
        },
        p3: {
          player_id: "p3",
          player_name: "Grace",
          player_script:
            "You are the engineer, whose quick thinking keeps the ship running in the face of cosmic anomalies."
        }
      }
    },
    {
      id: "3",
      title: "The Lost Kingdom",
      description:
        "Journey through an ancient realm where magic and myth intertwine, and every choice alters destiny.",
      number_of_players: 5,
      difficulty: "Easy",
      rating: 4.2,
      player_scripts: {
        p1: {
          player_id: "p1",
          player_name: "Henry",
          player_script:
            "You are the noble knight sworn to protect the kingdom and restore its lost glory."
        },
        p2: {
          player_id: "p2",
          player_name: "Ivy",
          player_script:
            "You are the wise mage with secrets of ancient spells and mystical prophecies."
        },
        p3: {
          player_id: "p3",
          player_name: "Jack",
          player_script:
            "You are the cunning rogue, navigating the kingdom’s underbelly to gather crucial intel."
        },
        p4: {
          player_id: "p4",
          player_name: "Kelly",
          player_script:
            "You are the skilled archer, whose keen eyes never miss a hidden danger."
        },
        p5: {
          player_id: "p5",
          player_name: "Leo",
          player_script:
            "You are the wandering bard, whose songs and stories hold clues to the kingdom's mysteries."
        }
      }
    },
    {
      id: "4",
      title: "Dragon's Lair",
      description: "Enter the perilous lair of the fire-breathing dragon and seek its hidden treasure.",
      number_of_players: 4,
      difficulty: "Hard",
      rating: 4.7,
      player_scripts: {
        p1: { player_id: "p1", player_name: "Marcus", player_script: "A brave warrior with unmatched sword skills." },
        p2: { player_id: "p2", player_name: "Nina", player_script: "A cunning archer, guided by intuition and warning signals." },
        p3: { player_id: "p3", player_name: "Oscar", player_script: "A wise wizard specializing in powerful spells." },
        p4: { player_id: "p4", player_name: "Pam", player_script: "A stealthy rogue who knows the art of evasion." }
      }
    },
    {
      id: "5",
      title: "Underwater Kingdom",
      description: "Explore the mystical underwater kingdom filled with ancient relics and secrets of the deep.",
      number_of_players: 3,
      difficulty: "Medium",
      rating: 4.3,
      player_scripts: {
        p1: { player_id: "p1", player_name: "Quinn", player_script: "A courageous diver with a deep bond to the ocean." },
        p2: { player_id: "p2", player_name: "Riley", player_script: "A marine biologist with an uncanny knowledge of sea creatures." },
        p3: { player_id: "p3", player_name: "Sam", player_script: "An adventurous explorer with a knack for deciphering ancient legends." }
      }
    },
    {
      id: "6",
      title: "Cyber Heist",
      description: "Dive into the futuristic world of cybercrime, where the ultimate heist awaits under the neon lights.",
      number_of_players: 5,
      difficulty: "Expert",
      rating: 4.9,
      player_scripts: {
        p1: { player_id: "p1", player_name: "Tina", player_script: "A skilled hacker with an insatiable appetite for digital exploits." },
        p2: { player_id: "p2", player_name: "Umar", player_script: "A master strategist specializing in breaking through high security." },
        p3: { player_id: "p3", player_name: "Vera", player_script: "A stealth operative adept at in-person infiltrations during heists." },
        p4: { player_id: "p4", player_name: "Walt", player_script: "A veteran con-man with a flair for disguises and deception." },
        p5: { player_id: "p5", player_name: "Xena", player_script: "An ex-military expert proficient in technology and physical combat." }
      }
    }
  ]
}

// Create an in‑memory adapter instance
const adapter = new Memory<Data>()

// Create the lowdb instance using the adapter
const db = new Low<Data>(adapter, initialData)

// Initialize the database with the initial data if it's empty
async function initDB() {
  await db.read()
  if (!db.data) {
    db.data = initialData
    await db.write()
  }
}

// Immediately initialize the database
initDB()

export default db