import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const HomeScreen = (props) => {

    const startHandler = () => {
        props.setBol();
    }

    const quitHandler = () => {

    }

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