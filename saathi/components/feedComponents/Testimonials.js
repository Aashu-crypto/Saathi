import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import { Color, FontFamily, width } from "../../GlobalStyles";
import Icon from "@expo/vector-icons/Ionicons"; // Imported to handle icons

const Testimonials = () => {
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  const testimonials = [
    {
      id: "4",
      name: "Rahul Mehra",
      feedback:
        "Saathi has made it so much easier to stay connected with my parents back home. The service is seamless and truly valuable.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5,
    },
    {
      id: "5",
      name: "Priya Reddy",
      feedback:
        "I love how Saathi ensures my grandparents are well taken care of. The weekly updates give me peace of mind.",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 4,
    },
    {
      id: "6",
      name: "Suresh Nair",
      feedback:
        "The personalized care and attention Saathi provides to my parents is unparalleled. Highly recommended!",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 5,
    },
    {
      id: "7",
      name: "Meenal Sharma",
      feedback:
        "It’s a blessing to have a service like Saathi for my elderly parents. The app is user-friendly and efficient.",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      rating: 4,
    },
    {
      id: "8",
      name: "Amit Roy",
      feedback:
        "Thanks to Saathi, I no longer worry about my parents' well-being. They get the support they need, and I stay informed!",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % testimonials.length;

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 2500); // Auto-slide interval in milliseconds

    return () => clearInterval(interval); // Clear the interval on unmount
  }, [testimonials.length]);

  const TestimonialItem = ({ item }) => (
    <View style={styles.testimonialItem}>
      <View style={styles.testimonialContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.feedback}>"{item.feedback}"</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: item.rating }).map((_, index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Testimonials</Text>
      <FlatList
        data={testimonials}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TestimonialItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Testimonials;

const styles = StyleSheet.create({
  container: {
marginTop:20
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  testimonialItem: {
    width: width ,
  },
  testimonialContainer: {
    flexDirection: "row",
    backgroundColor: Color.lightOrange,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    // width: "95%",
    marginHorizontal: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.appDefaultColor,
  },
  feedback: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: Color.appDefaultColor,
    fontFamily: FontFamily.poppinsRegular,
    backgroundColor: Color.lightOrange,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginHorizontal:10
  },
});
