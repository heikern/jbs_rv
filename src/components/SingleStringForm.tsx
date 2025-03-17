import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SingleStringFormProps = {
    onSubmit: (name: string) => void;
    placeholder?: string;
};

const SingleStringForm: React.FC<SingleStringFormProps> = ({ onSubmit, placeholder = "" }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(name);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                type="text"
                placeholder = {placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default SingleStringForm;