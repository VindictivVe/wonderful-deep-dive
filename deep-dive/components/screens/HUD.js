import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

const HUD = (props) => {

    const quitHandler = () => {
        props.setBol();
    }

    return(
        <View style={[styles.container, {width: props.hudWidth, height: props.hudHeight - props.topPadding, marginTop: props.topPadding}]}>
            <View style={[styles.absolute, styles.leftArrow]}>
                <Entypo name="arrow-bold-left" size={50} color="white" />
            </View>

            <View style={[styles.absolute, styles.rightArrow]}>
                <Entypo name="arrow-bold-right" size={50} color="white" />
            </View>

            {!props.disableTop && <View style={[styles.absolute, styles.topArrow]}>
                <Entypo name="arrow-bold-up" size={50} color="white" />
            </View>}

            {!props.disableBottom && <View style={[styles.absolute, styles.bottomArrow]}>
                <Entypo name="arrow-bold-down" size={50} color="white" />
            </View>}

            <TouchableOpacity style={[styles.absolute, styles.quitButton]} onPress={quitHandler}>
                <Entypo name="circle-with-cross" size={50} color="white" />
            </TouchableOpacity>

            <Text style={[styles.absolute, styles.depthText]}>{props.index === 0 ? "Ebene 1: bis 200m" : props.index === 1 ? "Ebene 2: bis 1000m" : props.index === 2 ? "Ebene 3: bis 4000m" : props.index === 3 ? "Ebene 4: bis 6000m" : props.index === 4 ? "Ebene 5: bis 11000m" : ""}</Text>
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
        position: 'absolute',
    },
    leftArrow: {
        top: "40%",
        left: "3%",
        opacity: 0.66,
    },
    rightArrow: {
        top: "40%",
        right: "3%",
        opacity: 0.66,
    },
    topArrow: {
        top: "3%",
        left:"45%",
        opacity: 0.66,
    },
    bottomArrow: {
        bottom: "3%",
        left:"45%",
        opacity: 0.66,
    },
    quitButton: {
        right: "2%",
        top: "3%",
        opacity: 0.66,
    },
    depthText: {
        left: "3%",
        top: "7%",
        color: "white",
        fontSize: 24,
    }
}) 

export default HUD;