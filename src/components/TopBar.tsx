import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // adjust import if necessary
import { LeaveGameButton } from "./leaveGameButton";

const TopBar: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div className="w-full bg-black text-white flex items-center p-4">
			<Button variant="ghost" className="px-2 py-1" onClick={() => navigate(-1)}>
				Back
			</Button>
			<LeaveGameButton/>
		</div>
	);
};

export default TopBar;
