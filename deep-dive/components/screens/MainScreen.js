import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import HomeScreen from './HomeScreen';
import DepthNavigator from './DepthNavigator';
import HUD from './HUD';

const MainScreen = () => {
    const [bolStart, setBolStart] = useState(false);

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
                            <HUD/>
                            {/* <DepthNavigator /> */}
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