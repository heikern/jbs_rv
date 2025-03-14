"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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

const playerOptions = Array.from({ length: 9 }, (_, i) => i + 1)

export type PlayerFormValues = z.infer<typeof PlayerFormSchema>

const PlayerFormSchema = z.object({
    players: z.number().min(1).max(9),
  })
  

type PlayerCounterFormProps = {
	onSubmit: (data: PlayerFormValues) => void;
};

const PlayerCounterForm: React.FC<PlayerCounterFormProps> = ({ onSubmit }) => {
	const form = useForm<PlayerFormValues>({
		resolver: zodResolver(PlayerFormSchema),
		defaultValues: {
			players: 3,
		},
	})

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
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    defaultValue={field.value.toString()}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select number of players" />
                                    </SelectTrigger>
                                    <SelectContent style={{ zIndex: 9999, backgroundColor: "black", color: "white" }} className="data-[state=open]:animate-in data-[state=closed]:animate-out">
                                        {playerOptions.map((player) => (
                                            <SelectItem key={player} value={String(player)}>
                                                {player}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex space-x-2">
                    <Button variant={"outline"} type="submit">Submit</Button>
                </div>
            </form>
        </Form>
	)
}

export default PlayerCounterForm
