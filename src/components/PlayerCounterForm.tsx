"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDispatch } from "react-redux" // added for dispatch
import { setNumPlayers } from "@/store/gameSlice" // added for dispatching num players
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

const PlayerFormSchema = z
	.object({
		players: z
			.enum(["3", "4", "5"], {
				required_error: "Please select a number of players.",
			}),
	})
  
export type PlayerFormValues = z.infer<typeof PlayerFormSchema>

export function PlayerCounterForm() {
	const dispatch = useDispatch() // initialize dispatch
    const navigate = useNavigate()
	const form = useForm<PlayerFormValues>({
		resolver: zodResolver(PlayerFormSchema),
		defaultValues: {
			players: "3",
		},
	})

	function onSubmit(data: PlayerFormValues) {
		dispatch(setNumPlayers(Number(data.players)))
		console.log("Player count submitted:", data)
	}

    function handleCancel() {
        navigate('/')
    }

	return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 mx-auto space-y-6">
                <FormField
                    control={form.control}
                    name="players"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Players Count</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select number of players" />
                                    </SelectTrigger>
                                    <SelectContent
                                        style={{ zIndex: 9999, backgroundColor: "black", color: "white" }} // updated styles for dropdown background and font color
                                        className="data-[state=open]:animate-in data-[state=closed]:animate-out"
                                    >
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                        <SelectItem value="5">5</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex space-x-2">
                    <Button variant={"outline"} type="submit">Submit</Button>
                    <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
                </div>
                
            </form>
        </Form>
	)
}
