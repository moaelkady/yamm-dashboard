import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - {t("notFound.title")}</h1>
            <p>{t("notFound.description")}</p>
            <Link to="/">
                <Button variant="outlined" sx={{ textTransform: "capitalize", mt: 2 }}>
                    {t("notFound.goBack")}
                </Button>
            </Link>
        </div>
    );
};

export default memo(NotFound);