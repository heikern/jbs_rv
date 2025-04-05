import React from "react";
import { Button } from "./ui/button";
import { inGamePages } from "../types/gamePages";

// Define props for BottomBar
interface BottomBarProps {
    pageEnum: typeof inGamePages; // you can also use a more specific type if needed, e.g. typeof InGamePages
    currentPage: inGamePages;
    setCurrentPage: React.Dispatch<React.SetStateAction< inGamePages>>;
  }

const BottomBar: React.FC<BottomBarProps> = ({pageEnum, currentPage, setCurrentPage}) => {
	const pageValue: inGamePages[] = Object.values(pageEnum);

    return (
		<div className="w-full bg-black text-white flex items-center px-4 space-x-2">
            {pageValue.map((page: inGamePages) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "outline" : "default"}
                    className="px-2"
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Button>
            ))}
		</div>
	);
};

export default BottomBar;