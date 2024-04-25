import React from 'react';
import styles from './loading.module.css'

const TerminalLoader: React.FC = () => {
    return (
        <div className={`flex h-screen z-10 ${styles.background}`}>
            <div className={`${styles.terminalLoader}`}>
                <div className={`${styles.terminalHeader}`}>
                    <div className={`${styles.terminalTitle}`}>Status</div>
                    <div className={`${styles.terminalControls}`}>
                        <div className={`${styles.control} ${styles.close}`}></div>
                        <div className={`${styles.control} ${styles.minimize}`}></div>
                        <div className={`${styles.control} ${styles.maximize}`}></div>
                    </div>
                </div>
                <div className={`${styles.text}`}>Loading...</div>
            </div>
        </div>
    );
};

export default TerminalLoader;
