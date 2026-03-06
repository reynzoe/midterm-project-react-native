import React, { useState, useContext, useRef } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Animated, Easing } from 'react-native';
import { isEmailValid, isPhoneValid, isNotEmpty } from '../utils/validators';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { JobsContext } from '../context/JobsContext';
import { JobApplication } from '../types/job';

export default function ApplicationFormScreen({ route, navigation }: any) {
    const { job, fromSaved } = route.params || {};
    const { colors } = useContext(ThemeContext);
    const { removeJob, addApplied } = useContext(JobsContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [why, setWhy] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const submit = () => {
        if (!isNotEmpty(name)) return Alert.alert('Validation Error', 'Name is required.');
        if (!isEmailValid(email)) return Alert.alert('Validation Error', 'Please enter a valid email.');
        if (!isPhoneValid(phone)) return Alert.alert('Validation Error', 'Please enter a valid 11-digit phone number (e.g. 09123456789).');
        if (!isNotEmpty(why)) return Alert.alert('Validation Error', 'Please tell us why we should hire you.');

        const application: JobApplication = {
            job,
            name,
            email,
            phone,
            why,
            submittedAt: Date.now(),
        };

        Alert.alert('Application Submitted!', 'We received your application.', [
            {
                text: 'Okay',
                onPress: () => {
                    setName('');
                    setEmail('');
                    setPhone('');
                    setWhy('');

                    addApplied(application);
                    if (fromSaved && job?.id) {
                        removeJob(job.id);
                    }

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main', params: { screen: 'JobFinderTab' } }],
                    });
                },
            },
        ]);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}> 
            <Header
                showBack
                onBackPress={() => navigation.goBack()}
                showHome
                onHomePress={() => navigation.reset({ index: 0, routes: [{ name: 'Main', params: { screen: 'JobFinderTab' } }] })}
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={80}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    automaticallyAdjustKeyboardInsets
                >
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }}>
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
                            onChangeText={(val) => setName(val.replace(/[^A-Za-z' .-]/g, ''))}
                            placeholder="Enter your full name"
                            autoCapitalize="words"
                        />

                        <Text style={[styles.label, { color: colors.subtext }]}>Email Address</Text>
                        <Input
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="emailAddress"
                        />

                        <Text style={[styles.label, { color: colors.subtext }]}>Contact Number</Text>
                        <Input
                            value={phone}
                            onChangeText={(val) => setPhone(val.replace(/[^0-9]/g, ''))}
                            placeholder="Enter your phone number"
                            keyboardType="phone-pad"
                            maxLength={11}
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
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: 12, paddingBottom: 140 },
    applyingFor: { fontSize: 12, marginBottom: 2 },
    jobTitle: { fontSize: 18, fontWeight: '800', marginBottom: 2 },
    company: { fontSize: 14, fontWeight: '700' },
    sectionHeading: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
    label: { fontSize: 13, fontWeight: '600', marginTop: 8, marginBottom: 4 },
});
