import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PlayerNameFormProps = {
    onSubmit: (name: string) => void;
};

const PlayerNameForm: React.FC<PlayerNameFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(name);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                type="text"
                placeholder="Enter your preferred name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default PlayerNameForm;