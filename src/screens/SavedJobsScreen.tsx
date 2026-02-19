import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { JobsContext } from '../context/JobsContext';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function SavedJobsScreen({ navigation }: any) {
    const { savedJobs, removeJob } = useContext(JobsContext);
    const { colors } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header />
            <View style={styles.content}>
                {savedJobs.length === 0 ? (
                    <Text style={[styles.empty, { color: colors.text }]}>No saved jobs yet.</Text>
                ) : (
                    <FlatList
                        data={savedJobs}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item }) => (
                            <Card backgroundColor={colors.card}>
                                <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                                <Text style={[styles.company, { color: colors.primary }]}>{item.company}</Text>
                                {item.location && (
                                    <Text style={[styles.meta, { color: colors.text }]}>📍 {item.location}</Text>
                                )}
                                {item.salary && (
                                    <Text style={[styles.meta, { color: colors.text }]}>💰 {item.salary}</Text>
                                )}
                                <View style={styles.buttons}>
                                    <View style={styles.btnWrap}>
                                        <Button
                                            title="Apply"
                                            onPress={() => navigation.navigate('Apply', { job: item, fromSaved: true })}
                                            color={colors.primary}
                                        />
                                    </View>
                                    <View style={styles.btnWrap}>
                                        <Button
                                            title="Remove"
                                            onPress={() => removeJob(item.id)}
                                            color="#e53935"
                                        />
                                    </View>
                                </View>
                            </Card>
                        )}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, paddingHorizontal: 12 },
    empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    company: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
    meta: { fontSize: 13, marginBottom: 2 },
    buttons: { flexDirection: 'row', gap: 8, marginTop: 8 },
    btnWrap: { flex: 1 },
});
