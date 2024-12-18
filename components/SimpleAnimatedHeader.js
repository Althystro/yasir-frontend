import React from "react";
import { Animated, StyleSheet, View, Image } from "react-native";

const HEADER_MAX_HEIGHT_WITH_IMAGE = 380;
const HEADER_MAX_HEIGHT_WITHOUT_IMAGE = 180;
const HEADER_MIN_HEIGHT = 85;

const SimpleAnimatedHeader = ({
  scrollY,
  children,
  title,
  subtitle,
  backgroundColor = "#1B2128",
  textColor = "white",
  containerStyle,
  headerStyle,
  titleStyle,
  subtitleStyle,
  headerImage,
}) => {
  // Determine header height based on whether there's an image
  const HEADER_MAX_HEIGHT = headerImage
    ? HEADER_MAX_HEIGHT_WITH_IMAGE
    : HEADER_MAX_HEIGHT_WITHOUT_IMAGE;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

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

  const imageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [200, 0],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Adjust title position based on whether there's an image
  const titleMarginTop = headerImage ? 40 : 80;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          marginTop: headerImage ? 0 : -40,
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
              marginTop: titleMarginTop,
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
        {headerImage && (
          <Animated.View
            style={[
              styles.imageContainer,
              {
                height: imageHeight,
                opacity: imageOpacity,
              },
            ]}
          >
            <Image source={{ uri: headerImage }} style={styles.headerImage} />
          </Animated.View>
        )}
      </Animated.View>

      <Animated.ScrollView
        style={[styles.scrollView, { marginTop: headerImage ? -40 : -20 }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imageContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    resizeMode: "contain",
    alignSelf: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 20,
  },
});

export default SimpleAnimatedHeader;
