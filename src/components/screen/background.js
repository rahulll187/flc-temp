import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width,
    height,
    left: 0,
    top: 0,
  },
});

class Background extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: undefined,
    };
  }

  componentDidMount() {
    const title = this.props.title.replace(/ /g, "").toLowerCase();
    switch (title) {
      case "login":
        // this.setState({
        //   background: require("../../images/main.jpg")
        // });
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <Image
        style={styles.image}
        resizeMethod="resize"
        source={this.state.background}
      />
    );
  }
}

Background.defaultProps = {};

Background.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Background;
