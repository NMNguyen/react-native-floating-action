import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, StyleSheet, Text, Image, View, Animated } from "react-native";
import { Button} from 'react-native-ui-kitten';
import { getTouchableComponent } from "./utils/touchable";

class FloatingActionItem extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    const { active, animated } = this.props;

    if (nextProps.active !== active && animated) {
      Animated.spring(this.animation, {
        toValue: nextProps.active ? 1 : 0
      }).start();
    }
  }

  handleOnPress = () => {
    const { name, onPress } = this.props;

    onPress(name);
  };

  renderText() {
    const {
      // @deprecated in favor of textElevation
      elevation, // eslint-disable-line
      text,
      position,
      textElevation,
      textBackground,
      textColor,
      textStyle,
      textProps,
      textContainerStyle,
      shadow
    } = this.props;

    if (elevation !== undefined) {
      console.warn(
        'FloatingActionItem: "elevation" property was deprecated. Please use "textElevation"'
      );
    }

    if (text) {
      return (
        <View
          key="text"
          style={[
            styles.textContainer,
            styles[`${position}TextContainer`],
            {
              backgroundColor: textBackground,
              elevation: textElevation || elevation,
              shadowOffset: {
                height: textElevation || elevation
              }
            },
            shadow,
            textContainerStyle
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: textColor
              },
              textStyle
            ]}
            {...textProps}
          >
            {text}
          </Text>
        </View>
      );
    }

    return null;
  }

  renderButton() {
    const { icon, color, shadow } = this.props;
    const {
      position,
      distanceToEdge,
      paddingTopBottom,
      render,
      margin,
      name,
      animated
    } = this.props;
    let iconStyle;

    if (icon && icon.uri) {
      iconStyle = styles.iconLogo;
    } else {
      iconStyle = styles.icon;
    }
    return (
        <View style={{
          width: Dimensions.get('screen').width - ((distanceToEdge + margin) *2),
          height: 140,
          borderRadius: 10,
          padding: 15,
          borderWidth:1,
          borderColor:'white',
          backgroundColor:'#FF4C4F'}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{
              resizeMode:'cover',
              borderColor:'white',
              borderWidth:1,
              width:50,
              height:50,
              borderRadius:25,
            }} source={{uri:'https://firebasestorage.googleapis.com/v0/b/quizapp-7ba4c.appspot.com/o/56344551_659831507790095_5712576227626188800_o.jpg?alt=media&token=99364609-aaf1-478c-97b3-caab0b2ce8cc'}}/>
            <View style={{flex:1,}}>
              <Text style={{
                marginLeft:10,
                fontSize:14,
                color: 'white'
              }}>
                <Text style={{fontWeight:'bold'}}>
                  Mai Nguyệt Minh&nbsp;
                </Text>
                vừa khiêu chiến bạn.
              </Text>
              <Text numberOfLines={2}
                  style={{
                marginLeft:10,
                marginTop:5,
                fontStyle:'italic',
                marginBottom:10,
                fontSize:14,
                color: 'white'
              }}>"Ngon thì nhào vô kiếm sẹo, xem ai hơn ai nào con gà"</Text>
            </View>
            <Image style={{width:30, height: 30}}
                 source={{uri:'https://image.flaticon.com/icons/png/512/1191/1191131.png'}}></Image>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button size={'tiny'}
                    style={{borderWidth:0,color:'#505050', backgroundColor:'#505050'}}>
              Tạm thời lui
            </Button>
            <Button size={'tiny'} style={{borderWidth:1,marginLeft:10, height:30,}} status={'warning'}>Chiến</Button>
          </View>
        </View>
    )
    // return (
    //   <View
    //     key="button"
    //     style={[styles.button, { backgroundColor: color }, shadow]}
    //   >
    //     {React.isValidElement(icon) ? (
    //       icon
    //     ) : (
    //       <Image style={iconStyle} source={icon} />
    //     )}
    //   </View>
    // );
  }

  render() {
    const {
      position,
      distanceToEdge,
      paddingTopBottom,
      render,
      margin,
      name,
      animated
    } = this.props;

    const Touchable = getTouchableComponent(false);

    let animatedActionContainerStyle;

    if (animated) {
      animatedActionContainerStyle = {
        marginBottom: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [5, 10]
        })
      };
    } else {
      animatedActionContainerStyle = { marginBottom: 10 };
    }

    const components = [];
    const distanceToEdgeActionContainer = {};

    if (position === "left") {
      if (render) {
        components.push(render({ key: name }));
      } else {
        components.push(this.renderButton());
        components.push(this.renderText());
      }
      distanceToEdgeActionContainer.paddingLeft = distanceToEdge + margin;
    } else if (position === "right") {
      if (render) {
        components.push(render({ key: name }));
      } else {
        // components.push(this.renderText());
        components.push(this.renderButton());
      }
      distanceToEdgeActionContainer.paddingRight = distanceToEdge + margin;
    } else if (render) {
      components.push(render({ key: name }));
    } else {
      components.push(this.renderButton());
    }

    return (
      <Touchable
        activeOpacity={0.4}
        style={[styles.container]}
        onPress={this.handleOnPress}
      >
        <Animated.View
          style={[
            styles.actionContainer,
            animatedActionContainerStyle,
            styles[`${position}ActionContainer`],
            distanceToEdgeActionContainer,
            {
              paddingTop: paddingTopBottom,
              paddingBottom: paddingTopBottom,
            },
          ]}
        >
          {components}
        </Animated.View>
      </Touchable>
    );
  }
}

FloatingActionItem.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.any,
  name: PropTypes.string.isRequired,
  textContainerStyle: PropTypes.object,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  textProps: PropTypes.object,
  textBackground: PropTypes.string,
  textColor: PropTypes.string,
  shadow: PropTypes.shape({
    shadowOpacity: PropTypes.number,
    shadowOffset: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    shadowColor: PropTypes.string,
    shadowRadius: PropTypes.number
  }),
  // not on doc
  textElevation: PropTypes.number,
  // not modified by user
  position: PropTypes.oneOf(["left", "right", "center"]),
  active: PropTypes.bool,
  distanceToEdge: PropTypes.number,
  paddingTopBottom: PropTypes.number, // modified by parent property "actionsPaddingTopBottom"
  onPress: PropTypes.func,
  render: PropTypes.func,
  margin: PropTypes.number,
  animated: PropTypes.bool
};

FloatingActionItem.defaultProps = {
  color: "#1253bc",
  distanceToEdge: 20,
  textElevation: 5,
  textColor: "#444444",
  textBackground: "#ffffff",
  margin: 8,
  shadow: {
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: "#000000",
    shadowRadius: 3
  }
};

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    flex: 1,
    flexDirection: "column"
  },
  actionContainer: {
    elevation: 0,
    flex: 1,
    flexDirection: "row",
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 8,
    paddingTop: 8
  },
  centerActionContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  textContainer: {
    paddingHorizontal: 8,
    elevation: 5,
    borderRadius: 4,
    height: 22,
    marginTop: 8
  },
  leftTextContainer: {
    marginLeft: 14
  },
  rightTextContainer: {
    marginRight: 14
  },
  text: {
    fontSize: 14,
    lineHeight: 20
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 5,
    width: 40,
    height: 40
  },
  iconLogo: {
    resizeMode: "cover",
    width: 40,
    height: 40,
    borderRadius: 20
  },
  icon: {
    resizeMode: "contain",
    width: 20,
    height: 20
  }
});

export default FloatingActionItem;
