import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import React from "react"
import { useState } from "react"

interface CounterFormProps {
  selectItems: number[]
  onSubmit: (numPlayers: number) => void
  onCancel: () => void
}

export function CounterForm({ selectItems, onSubmit, onCancel }: CounterFormProps) {
    const [numPlayers, setNumPlayers] = useState<number | null>(null);

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (typeof(numPlayers) === "number") {
            onSubmit(numPlayers);
        };
    };
  
    return (
    <Card className="w-[350px]">
        <form onSubmit={handleOnSubmit}>
      <CardHeader className="py-4">
        <CardTitle>How many players?</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <Select onValueChange={(value)=> setNumPlayers(Number(value))} defaultValue={numPlayers?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select a number" />
              </SelectTrigger>
              <SelectContent position="popper" style={{ zIndex: 9999, backgroundColor: "black", color: "white" }} className="data-[state=open]:animate-in data-[state=closed]:animate-out">
                {selectItems.map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
      </CardContent>
      <CardFooter className="flex px-4 py-4 space-x-4">
        <Button variant="outline">Submit</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        
      </CardFooter>
      </form>
    </Card>
  )
}

export default CounterForm
