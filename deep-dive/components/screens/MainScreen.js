import React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import HomeScreen from './HomeScreen';
import DepthNavigator from './DepthNavigator';

const MainScreen = () => {
    const [bolStart, setBolStart] = useState(false);
    const [slides, setSlides] = useState([]);

    useEffect((props) => {
      setSlides([require("../../assets/layers/DeepSeaEnviromentLvl1.png"),
      require("../../assets/layers/DeepSeaEnviromentLvl2.png"),
      require("../../assets/layers/DeepSeaEnviromentLvl3.png"),
      require("../../assets/layers/DeepSeaEnviromentLvl4.png"),
      require("../../assets/layers/DeepSeaEnviromentLvl5.png")])
    }, [])

    return(
        <View style={styles.container}>
            {
                !bolStart ?
                    (
                        <HomeScreen setBol={() => setBolStart(true)} />
                    )
                :
                    (
                        <>
                        <DepthNavigator setBol={() => setBolStart(false)} slides = {slides}/>
                        </>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default MainScreen;