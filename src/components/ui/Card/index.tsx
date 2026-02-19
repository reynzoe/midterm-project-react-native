import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface CardProps {
    children: ReactNode;
    backgroundColor?: string;
}

export default function Card({ children, backgroundColor }: CardProps) {
    return <View style={[styles.card, { backgroundColor: backgroundColor || '#fff' }]}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
});
