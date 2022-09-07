import React, { PureComponent } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { Shape, Group, Surface } from "@react-native-community/art";
import { Colors } from "../../constants";
import { COLOR, SVG } from "../../constants";

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.white,
    marginBottom: 1,
    height: 90,
  },
  ratingHeaderContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 30,
    marginBottom: 5,
  },
  ratingHeaderContent: {
    fontSize: 16,
  },
  ratingCantainer: {
    borderWidth: 0.5,
    borderColor: "red",
    backgroundColor: "transparent",
    borderRadius: 35,
    marginHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

class RatingCell extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      startScore: 0,
    };
  }

  renderStars() {
    let scoreBase = 5;
    let score = this.state.startScore;
    let scale = 2.4;
    let activeColor = Colors.appThemeColor;
    let defaultColor = "gray";
    let enable = true;

    let arr = [];
    while (scoreBase--) {
      arr.push(1);
    }

    return (
      <View style={styles.stars}>
        {arr.map((item, index) =>
          score >= index + 1
            ? this.drawStar({
                scale: 0.3 * scale,
                color: activeColor,
                key: index + 1,
              })
            : this.drawStar({
                scale: 0.3 * scale,
                color: defaultColor,
                key: index + 1,
              })
        )}
      </View>
    );
  }
  drawStar(options) {
    const { color = COLOR.ACTIVE_COLOR, scale = 1, key } = options || {};

    return (
      <TouchableHighlight
        key={key}
        underlayColor="transparent"
        onPress={() => this.onGrading(key)}
      >
        <View style={{ padding: 10 }}>
          <Surface width={40 * scale} height={40 * scale}>
            <Group x={20 * scale} y={20 * scale}>
              <Shape fill={color} scale={scale} d={SVG.STAR} />
            </Group>
          </Surface>
        </View>
      </TouchableHighlight>
    );
  }

  changeStarScore = (key) => {};
  onGrading = (key) => {
    this.setState({
      startScore: key,
    });

    const ratingDetail = {
      code: this.props.evaulationData.TypeName.toLowerCase().replace(/\s/g, ""),
      ratingValue: key,
      TypeId: this.props.evaulationData.TypeId,
    };
    this.props.ratingHandler(ratingDetail);
  };

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.ratingHeaderContainer}>
          <Text style={styles.ratingHeaderContent}>
            {this.props.evaulationData.TypeName}
          </Text>
        </View>

        <View style={styles.ratingCantainer}>{this.renderStars()}</View>
      </View>
    );
  }
}

export default RatingCell;
