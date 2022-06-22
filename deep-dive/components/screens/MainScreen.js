import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import DepthNavigator from './DepthNavigator';

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
                        <DepthNavigator setBol={() => setBolStart(false)}/>
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