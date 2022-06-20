import React, { PureComponent } from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";

class ListItem1 extends PureComponent {
  /* shouldComponentUpdate() {
    return false;
  } */

  render() {
    return (
      <ImageBackground
        source={require("deep-dive/assets/layers/DeepSeaEnviromentLvl1.png")}
        style={{
          width: this.props.width,
          height: this.props.height,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={[styles.text, { paddingBottom: 60 }]}>
          {this.props.text}
        </Text>
      </ImageBackground>
    );
  }
}

export default ListItem1;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    width: "80%",
    fontSize: 17,
  },
  title: {
    textAlign: "center",
    width: "90%",
    fontSize: 30,
    fontWeight: "bold",
  },
});
