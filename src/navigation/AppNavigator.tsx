import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="JobFinder" component={JobFinderScreen} />
            <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
            <Stack.Screen name="Apply" component={ApplicationFormScreen} />
        </Stack.Navigator>
    );
}
