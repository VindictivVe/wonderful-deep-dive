import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import * as ScreenOrientation from 'expo-screen-orientation';

const HomeScreen = (props) => {
    const startHandler = () => {
        props.setBol();
    }

    const quitHandler = () => {
        BackHandler.exitApp();
    }

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }, []);

    return(
        <View style={styles.container}>
            <Text style={{color: 'white', fontSize: 30}}>Deep Sea Simulator</Text>
            <Button titleStyle={{color: "#13678A"}} containerStyle={styles.buttonContainer} buttonStyle={styles.buttonStyle} name="start" onPress={startHandler} title="Start"/>
            <Button titleStyle={{color: "#13678A"}} containerStyle={styles.buttonContainer} buttonStyle={styles.buttonStyle} name="quit" onPress={quitHandler} title="Quit" /> 
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#13678A"
    },
    buttonContainer: {
        marginVertical: 10,
        width: "33%",
    },
    buttonStyle: {
        backgroundColor: "#00E3CC",
    }
});

export default HomeScreen;