import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { width } from "../../GlobalStyles";

const itemWidth = width / 1.5;

const Packages = () => {
  const scrollY = useSharedValue(0);
  const packages = [
    {
      id: "1",
      title: "Basic",
      description: `✓ Weekly 1-hour call\n✓ One house visit\n✓ Digital media in "My Feed"`,
      price: "$30/m\n(Rs. 2500/m)",
      icon: "star-outline",
      colors: ["#B0BEC5", "#78909C"], // Light gray and cool blue-gray
    },
    {
      id: "2",
      title: "Bronze",
      description: `✓ Weekly 1-hour call\n✓ Two house visits\n✓ 2 hours of errands\n✓ Digital media in "My Feed"`,
      price: "$40/m\n(Rs. 3500/m)",
      icon: "medal-outline",
      colors: ["#A1887F", "#6D4C41"], // Warm taupe and deep brown
    },
    {
      id: "3",
      title: "Silver",
      description: `✓ Weekly 1-hour call\n✓ Weekly house visits\n✓ 4 hours of errands\n✓ 2 driving trips\n✓ Digital media in "My Feed"`,
      price: "$60/m\n(Rs. 5000/m)",
      icon: "trophy-outline",
      colors: ["#CFD8DC", "#B0BEC5"], // Silver-gray tones
    },
    {
      id: "4",
      title: "Gold",
      description: `✓ Weekly 1-hour call\n✓ Weekly house visits\n✓ 8 hours of errands\n✓ 4 driving trips\n✓ Digital media in "My Feed"`,
      price: "$80/m\n(Rs. 6500/m)",
      icon: "ribbon-outline",
      colors: ["#FFD54F", "#FFB300"], // Soft gold and amber
    },
  ];
  const handlePress = () => {
    Alert.alert("Payment Gateway will Open");
  };
  function Item({ index, scrollY, item }) {
    const itemScaleStyle = useAnimatedStyle(() => {
      const input = [
        index * itemWidth - itemWidth,
        index * itemWidth,
        index * itemWidth + itemWidth,
      ];
      const output = [0.8, 1, 0.8];
      const clamp = {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      };
      return {
        transform: [
          { scale: interpolate(scrollY.value, input, output, clamp) },
        ],
      };
    });

    return (
      <Animated.View style={[styles.item, itemScaleStyle]}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.divider} />
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Choose Plan</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  const scrollHandler = useAnimatedScrollHandler(
    (event) => (scrollY.value = event.contentOffset.x)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Check Out Our Packages</Text>
      <Animated.FlatList
        data={packages}
        renderItem={({ item, index }) => (
          <Item index={index} scrollY={scrollY} item={item} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        onScroll={scrollHandler}
        snapToInterval={itemWidth} // Makes the scrolling snap to each item
        decelerationRate="fast"
      />
    </View>
  );
};

export default Packages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#034F75",
  },
  list: {
    paddingHorizontal: (width - itemWidth) / 2,
  },
  item: {
    height: itemWidth * 1.3,
    width: itemWidth,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#034F75",
    marginHorizontal: 10,
    padding: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 25,
    borderRadius: 15,
    paddingVertical: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#034F75",
    fontSize: 16,
    fontWeight: "bold",
  },
});
