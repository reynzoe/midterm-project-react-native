import React, { useState, useContext } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { isEmailValid, isPhoneValid, isNotEmpty } from '../utils/validators';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function ApplicationFormScreen({ route, navigation }: any) {
    const { job, fromSaved } = route.params || {};
    const { colors } = useContext(ThemeContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [why, setWhy] = useState('');

    const submit = () => {
        if (!isNotEmpty(name)) return Alert.alert('Validation Error', 'Name is required.');
        if (!isEmailValid(email)) return Alert.alert('Validation Error', 'Please enter a valid email.');
        if (!isPhoneValid(phone)) return Alert.alert('Validation Error', 'Please enter a valid phone number.');
        if (!isNotEmpty(why)) return Alert.alert('Validation Error', 'Please tell us why we should hire you.');

        Alert.alert('Application Submitted!', 'We received your application.', [
            {
                text: 'Okay',
                onPress: () => {
                    setName('');
                    setEmail('');
                    setPhone('');
                    setWhy('');

                    if (fromSaved) {
                        navigation.navigate('JobFinder');
                    } else {
                        navigation.goBack();
                    }
                },
            },
        ]);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}> 
            <Header />
            <ScrollView contentContainerStyle={styles.scroll}>
                {job && (
                    <Card backgroundColor={colors.card}>
                        <Text style={[styles.applyingFor, { color: colors.subtext }]}>Applying for</Text>
                        <Text style={[styles.jobTitle, { color: colors.text }]}>{job.title}</Text>
                        <Text style={[styles.company, { color: colors.primary }]}>{job.company}</Text>
                    </Card>
                )}

                <Card backgroundColor={colors.card}>
                    <Text style={[styles.sectionHeading, { color: colors.text }]}>Your details</Text>
                    <Text style={[styles.label, { color: colors.subtext }]}>Full Name</Text>
                    <Input
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your full name"
                    />

                    <Text style={[styles.label, { color: colors.subtext }]}>Email Address</Text>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                    />

                    <Text style={[styles.label, { color: colors.subtext }]}>Contact Number</Text>
                    <Input
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Enter your phone number"
                    />

                    <Text style={[styles.sectionHeading, { color: colors.text, marginTop: 12 }]}>Pitch</Text>
                    <Text style={[styles.label, { color: colors.subtext }]}>Why should we hire you?</Text>
                    <Input
                        value={why}
                        onChangeText={setWhy}
                        placeholder="Tell us why you're a great fit..."
                        multiline
                    />

                    <Button
                        title="Submit application"
                        onPress={submit}
                        color={colors.primary}
                    />
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: 12, paddingBottom: 40 },
    applyingFor: { fontSize: 12, marginBottom: 2 },
    jobTitle: { fontSize: 18, fontWeight: '800', marginBottom: 2 },
    company: { fontSize: 14, fontWeight: '700' },
    sectionHeading: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
    label: { fontSize: 13, fontWeight: '600', marginTop: 8, marginBottom: 4 },
});
