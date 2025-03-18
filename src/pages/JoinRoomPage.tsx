
import React from "react"
import { useState } from "react"
import { setupGameBindings } from "@/bindings/playerBindings"
import { useRoomContext } from "@/contexts/RoomContext"
import { useDispatch } from "react-redux"
import TopBar from "@/components/TopBar"
import { useNavigate } from "react-router-dom"

export const JoinRoomPage: React.FC = () => {
    const [roomId, setRoomId] = useState<string>("")
    const dispatch = useDispatch()
    const {joinRoomWithId} = useRoomContext()
    const navigate = useNavigate()
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log ("Join Room ID: ", roomId)
        const room = await joinRoomWithId(roomId)
        console.log ("room: ", room)
        if (room){
            setupGameBindings(room, dispatch)
            console.log("Join Room")
        }
        navigate("/lobby")

    }

    return (
        <div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
            <TopBar /> 
            <h1>Join Room Page</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    required
                />
                <button type="submit">Join Room</button>

            </form>
            
        </div>
    )
}

export default JoinRoomPage