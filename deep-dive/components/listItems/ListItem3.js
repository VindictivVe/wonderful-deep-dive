import React, { PureComponent } from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";

class ListItem3 extends PureComponent {
  render() {
    return (
      <ImageBackground
        source={this.props.image}
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
  
export default ListItem3;

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        width: "75%",
        fontSize: 17,
        color: "lightgray"

    },
    title:{
        textAlign:"center",
        width: "90%",
        fontSize: 30,
        fontWeight: "bold",
        color: "lightgray"
    }
});