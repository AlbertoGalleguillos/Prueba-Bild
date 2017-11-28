import React from 'react';
import { StyleSheet, Text, View, FlatList, ToolbarAndroid, Platform, StatusBar } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import FormScreen from './FormScreen';

const BildApp = StackNavigator({
    Home: { screen: HomeScreen },
    Form: { screen: FormScreen }
});

export default class App extends React.Component {
    render() {
        return  <BildApp />
    }
}

