import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import StartScreen from '../screens/StartScreen';
import BottomTabBar from '../components/BottomTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            initialRouteName="JobFinderTab"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: [
                    { height: 82 },
                    route.params?.showTabBar === false ? { display: 'none' } : null,
                ],
            })}
            initialParams={{ showTabBar: false }}
            tabBar={(props) => <BottomTabBar {...props} />}
        >
            <Tab.Screen
                name="SavedTab"
                component={SavedJobsScreen}
                initialParams={{ showTabBar: false }}
            />
            <Tab.Screen
                name="JobFinderTab"
                component={JobFinderScreen}
                initialParams={{ showTabBar: false }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
            initialRouteName="Start"
        >
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="JobFinder" component={JobFinderScreen} />
            <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
            <Stack.Screen name="JobDetail" component={JobDetailScreen} />
            <Stack.Screen name="Apply" component={ApplicationFormScreen} />
        </Stack.Navigator>
    );
}
