import { StyleSheet, Text, ImageBackground, View } from "react-native";

export const ListItem1 = (props) => {  
    return(
            <ImageBackground source={require("deep-dive/assets/layers/DeepSeaEnviromentLvl1.png")} style={{width: props.width, height: props.height, justifyContent: "center", alignItems: "center"}}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </ImageBackground>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        width: "80%",
        fontSize: 17
    },
    title:{
        textAlign:"center",
        width: "90%",
        fontSize: 35,
        fontWeight: "bold"
    }
});