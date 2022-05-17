import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Button } from 'react-native-elements';
import { Accelerometer } from 'expo-sensors';

const HomeScreen = (props) => {

    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const startHandler = () => {
        props.setBol();
    }

    const quitHandler = () => {
        BackHandler.exitApp();
    }

    useEffect(() => {
        Accelerometer.addListener(accData => {
            setData(accData);
        });
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data])

    return(
        <View style={styles.container}>
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