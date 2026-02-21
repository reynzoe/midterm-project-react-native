import React, { ReactNode, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';

interface CardProps {
    children: ReactNode;
    backgroundColor?: string;
}

export default function Card({ children, backgroundColor }: CardProps) {
    const { colors } = useContext(ThemeContext);

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: backgroundColor || colors.card,
                    borderColor: colors.border,
                    shadowColor: colors.shadow,
                },
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 12,
        borderRadius: 12,
        marginVertical: 6,
        borderWidth: 1,
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 16,
        elevation: 2,
    },
});
