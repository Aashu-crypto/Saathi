import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const PackageCard = ({ item, index, handleSubscribe }) => {
  const translateY = useSharedValue(50);  // Shared value for vertical animation

  useEffect(() => {
    // Trigger the animation when the component mounts
    translateY.value = withTiming(0, { duration: 500 + index * 100 }); // Slide in based on the index
  }, []);

  // Animated styles for the card
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: withTiming(1, { duration: 600 }), // Fade in
    };
  });

  return (
    <Animated.View style={[styles.packageCard, animatedStyle]}>
      <View style={styles.cardBackground}>
        <View style={styles.packageHeader}>
          <Text style={styles.packageName}>{item.packageName}</Text>
          {item.isPopular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>Most Popular</Text>
            </View>
          )}
        </View>

        <View style={styles.packagePriceContainer}>
          <View style={styles.priceWrapper}>
            <Text style={styles.packagePrice}>₹{item.priceINR || "N/A"}</Text>
            <Text style={styles.packageSubtitle}>Per User/Month</Text>
          </View>
          <Text style={styles.packagePrice}>${item.priceUSD || "N/A"}</Text>
        </View>

        <View style={styles.servicesList}>
          {item.packageServices.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Ionicons
                name={"checkmark-circle"}
                size={20}
                color={"green"}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceText}>
                {service.serviceName} ({service.frequency} {service.frequencyUnit})
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => handleSubscribe(item)}
        >
          <Text style={styles.subscribeButtonText}>Choose Plan</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default PackageCard;
