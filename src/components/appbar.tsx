import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useTranslation } from "react-i18next";


const AppBar: React.FC = () => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const { t } = useTranslation();

    const toggleProfileBox = () => {
        setProfileOpen(!isProfileOpen);
    };

    return (
        <div className="flex items-center justify-between w-auto space-x-4">
            <div className="flex items-center space-x-4 relative">
                <div className="relative">
                    <IconButton onClick={toggleProfileBox}>
                        <AccountCircle sx={{ color: "#ffffff", fontSize: "36px" }} />
                    </IconButton>
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4">
                            <button
                                className="w-full text-red-500 text-sm font-medium py-2 rounded hover:bg-gray-100"
                            >
                                {t('appBar.logout')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppBar;