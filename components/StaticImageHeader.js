import React from "react";
import { Animated, StyleSheet, View } from "react-native";

const HEADER_MAX_HEIGHT = 180;
const HEADER_MIN_HEIGHT = 85;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const StaticHeader = ({
  scrollY,
  title,
  subtitle,
  backgroundColor = "#1B2128",
  textColor = "white",
  containerStyle,
  headerStyle,
  titleStyle,
  subtitleStyle,
}) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const headerSubtitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          marginTop: -40,
        },
        containerStyle,
      ]}
    >
      <Animated.View
        style={[
          styles.header,
          { height: headerHeight, backgroundColor },
          headerStyle,
        ]}
      >
        <Animated.Text
          style={[
            styles.titleText,
            {
              opacity: headerTitleOpacity,
              color: textColor,
              marginTop: 80,
            },
            titleStyle,
          ]}
        >
          {title}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.subtitleText,
            { opacity: headerSubtitleOpacity, color: textColor },
            subtitleStyle,
          ]}
        >
          {subtitle}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B2128",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default StaticHeader;
