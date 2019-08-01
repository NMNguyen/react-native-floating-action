import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {View, StyleSheet, Image, TouchableOpacity, Text} from "react-native";

class AddIcon extends PureComponent {
  render() {
    const { width, height } = this.props;

    return (
      <View style={styles.container}>
        {/*<View style={[styles.vertical, { height }]} />*/}
        {/*<View style={[styles.horizontal, { width }]} />*/}
        <Image style={{width:64, height:64}} source={require('../../../src/assets/logo/nuclear.gif')}/>
        <View style={{
          position:'absolute',
          top:0,
          right:5,
          fontSize:14,
          width:24,
          height:24,
          borderRadius:12,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#F46036',}}>
          <Text style={{fontWeight:'bold', fontSize:16, color:'white'}}>1</Text>
        </View>
      </View>
    );
  }
}

AddIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  vertical: {
    width: 2,
    position: "absolute",
    backgroundColor: "#fff"
  },
  horizontal: {
    height: 2,
    position: "absolute",
    backgroundColor: "#fff"
  }
});

export default AddIcon;
