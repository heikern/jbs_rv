
import React from "react"
import { useState } from "react"
import { useRoomContext } from "@/contexts/RoomContext"
import TopBar from "@/components/TopBar"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export const JoinRoomPage: React.FC = () => {
    const [roomId, setRoomId] = useState<string>("")
    const {joinRoomWithId} = useRoomContext()
    const navigate = useNavigate()
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log ("Join Room ID: ", roomId)
        await joinRoomWithId(roomId)

        navigate("/lobby")
    }

    return (
        <div className="min-h-screen w-screen bg-black text-white flex flex-col">
            <TopBar /> 

            <form onSubmit={handleSubmit} className="flex-grow flex flex-col items-center justify-center">
                <input
                    className="text-center"
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    required
                />
                <div className="py-4">
                    <Button variant={"outline"} type="submit">Join Room</Button>
                </div>
                

            </form>
            
        </div>
    )
}

export default JoinRoomPage