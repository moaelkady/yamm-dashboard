import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ErrorMessageProps } from "../types/error_message";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errMessage }) => {
    const command = "npx json-server --watch db.json --port 5001";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full h-full flex items-center justify-center mt-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative min-w-[70%]" role="alert">
                <strong className="font-bold">{errMessage}</strong>
                <br />
                <p className="text-md">Please make sure to run JSON Server using</p>
                <div className="flex items-center mt-2 bg-gray-100 p-2 rounded-md">
                    <code className="text-sm font-mono text-gray-800">{command}</code>
                    <Tooltip title={copied ? "Copied!" : "Copy"}>
                        <IconButton onClick={handleCopy} size="small" className="ml-2">
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
