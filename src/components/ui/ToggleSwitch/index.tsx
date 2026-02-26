import React from 'react';
import { Switch } from 'react-native';

interface ToggleSwitchProps {
    value: boolean;
    onValueChange: () => void;
}

export default function ToggleSwitch({ value, onValueChange }: ToggleSwitchProps) {
    return (
        <Switch
            value={value}
            onValueChange={onValueChange}
            style={{ transform: [{ scale: 0.8 }] }}
        />
    );
}
