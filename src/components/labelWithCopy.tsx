import React from 'react';
import { Copy } from 'lucide-react';
import { toast } from "sonner";

interface LabelWithCopyProps {
    value: string;
}

const LabelWithCopy: React.FC<LabelWithCopyProps> = ({ value }) => {
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(value);
        toast(`${value} copied to clipboard!`, {
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo copy action'),
            },
        });
    };

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span data-testid="room-code">{value}</span>
            <Copy 
            style={{ marginLeft: '4px', cursor: 'pointer' }} 
            onClick={copyToClipboard} 
            size={15}
            />
        </span>
    );
};

export default LabelWithCopy;