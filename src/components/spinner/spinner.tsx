import React from 'react';
import styles from './spinner.module.css';

const Spinner: React.FC = () => {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}>
                <div className={styles.spinner1}></div>
            </div>
        </div>
    );
};

export default Spinner;
