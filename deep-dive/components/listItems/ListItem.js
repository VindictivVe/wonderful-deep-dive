import { StyleSheet, View, Text } from "react-native";

export const ListItem = (props) => {
    return(
        <View style={{width: props.width, height: props.height, backgroundColor: props.color, justifyContent: "center", alignItems: "center"}}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.text}>
                {props.text}
            </Text>
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