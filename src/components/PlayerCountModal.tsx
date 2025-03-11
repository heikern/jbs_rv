import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface PlayerCountModalProps {
	onConfirm: (players: number) => void;
	onCancel: () => void;
}

export default function PlayerCountModal({ onConfirm, onCancel }: PlayerCountModalProps) {
	const [playersInput, setPlayersInput] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const num = parseInt(playersInput, 10);
		if (!isNaN(num) && num > 0) {
			onConfirm(num);
		}
	};

	return (
		<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
			<Card className="w-[350px]">
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<CardTitle className="p-2">How many players?</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Select value={playersInput} onValueChange={setPlayersInput}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Number of players" />
									</SelectTrigger>
									<SelectContent className="data-[state=open]:animate-in data-[state=closed]:animate-out">
										<SelectGroup>
											<SelectLabel>Players</SelectLabel>
											<SelectItem value="3">3</SelectItem>
											<SelectItem value="4">4</SelectItem>
											<SelectItem value="5">5</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button type="submit">Confirm</Button>
						<Button type="button" onClick={onCancel} variant="ghost">
							Cancel
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
