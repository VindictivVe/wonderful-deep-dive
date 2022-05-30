import { StyleSheet, Text, ImageBackground, View } from "react-native";

export const ListItem1 = (props) => {  
    return(
        <View style={{width: props.width, height: props.height, justifyContent: "center", alignItems: "center"}}>
            <ImageBackground source={require("deep-dive/assets/layers/DeepSeaEnviromentLvl1.png")} style={{width: props.width, height: props.height, justifyContent: "center", alignItems: "center"}}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        width: "80%",
        fontSize: 25
    },
    title:{
        textAlign:"center",
        width: "90%",
        fontSize: 35,
        fontWeight: "bold"
    }
});