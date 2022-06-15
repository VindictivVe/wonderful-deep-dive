import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

const HUD = (props) => {

    const quitHandler = () => {
        props.setBol();
    }

    return(
        <View style={[styles.container, {width: props.hudWidth, height: props.hudHeight - props.topPadding, marginTop: props.topPadding}]}>
            <View style= {[styles.absolute, styles.leftArrow]}>
                <Entypo name="arrow-bold-left" size={50} color="white" />
            </View>

            <View style= {[styles.absolute, styles.rightArrow]}>
                <Entypo name="arrow-bold-right" size={50} color="white" />
            </View>

            <View style= {[styles.absolute, styles.topArrow]}>
                <Entypo name="arrow-bold-up" size={50} color="white" />
            </View>

            <View style= {[styles.absolute, styles.bottomArrow]}>
                <Entypo name="arrow-bold-down" size={50} color="white" />
            </View>

            <TouchableOpacity style= {[styles.absolute, styles.quitButton]} onPress={quitHandler}>
            <Entypo name="circle-with-cross" size={50} color="white" />
            </TouchableOpacity>

            <Text style={[styles.absolute, styles.depthText]}>Ebene 1: 187m</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 99,
        alignItems: 'center',
        backgroundColor: "#13678A",
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    absolute: {
        position: 'absolute'
    },
    leftArrow: {
        top: "40%",
        left: "3%",
    },
    rightArrow: {
        top: "40%",
        right: "3%",
    },
    topArrow: {
        top: "3%",
        left:"45%",
    },
    bottomArrow: {
        bottom: "3%",
        left:"45%",
    },
    quitButton: {
        right: "2%",
        top: "3%",
    },
    depthText: {
        left: "3%",
        top: "7%",
        color: "white",
        fontSize: 24,
    }
}) 

export default HUD;