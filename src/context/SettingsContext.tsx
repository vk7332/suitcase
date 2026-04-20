import React, { createContext, useContext, useState } from 'react';
import { TaxSettings } from '@/types/client';

const defaultSettings: TaxSettings = {
    assessmentYear: '2026-27',
    standardDeduction: 75000,
    cessRate: 0.04,
    rebateLimitNew: 700000,
    rebateLimitOld: 500000,
    isComparisonMode: false,
    provisionalDeduction: 100000
};

const SettingsContext = createContext<{
    settings: TaxSettings;
    updateSettings: (newSettings: TaxSettings) => void;
    toggleComparison: (enabled: boolean) => void;
}>({ settings: defaultSettings, updateSettings: () => { }, toggleComparison: () => { } });

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<TaxSettings>(() => {
        const saved = localStorage.getItem('vk_tax_settings');
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    const updateSettings = (newSettings: TaxSettings) => {
        setSettings(newSettings);
        localStorage.setItem('vk_tax_settings', JSON.stringify(newSettings));
    };

    const toggleComparison = (enabled: boolean) => {
        updateSettings({ ...settings, isComparisonMode: enabled });
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, toggleComparison }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);


