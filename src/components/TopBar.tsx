import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // adjust import if necessary

const TopBar: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div className="fixed top-0 left-0 w-full bg-black text-white flex items-center p-4 z-50">
			<Button variant="ghost" className="px-2 py-1" onClick={() => navigate(-1)}>
				Back
			</Button>
		</div>
	);
};

export default TopBar;
