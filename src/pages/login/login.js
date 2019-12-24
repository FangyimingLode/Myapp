import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import LoginScreen2 from './screen2';
export default class Login extends Component {
    render () {
        return (
            <View style={ styles.container }>
                <ScrollView horizontal pagingEnabled decelerationRate={ 0.993 }>
                    <LoginScreen2 { ...this.props } />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});
