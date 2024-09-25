import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState, memo, useRef } from "react";

// import moment from "moment";
// import Dot from "../../assets/images/dot.svg";
import Ionicons from "@expo/vector-icons/Ionicons";

import CenterWell1 from "../../components/feedComponents/CenterWell1";
import { backendHostAllCures, headers } from "../../config";
import { Color, width, FontFamily } from "../../GlobalStyles";
import ContentLoader from "../../components/ContentLoader";

const ratio = width / 378;
const ArticlesRead = ({ route, navigation }) => {
  const [title, setTitle] = useState(route.params?.title);
  const [isVisible, setIsVisible] = useState(false);

  const [isConnected, setIsConnected] = useState(true);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [id, setId] = useState(route.params.articleId);
  const [relatedItem, setRelatedItem] = useState([]);
  console.log(route.params.articleId);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    console.log(items);
  }, [items]);
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    const getArticle = async () => {
      try {
        if (isConnected) {
          const response = await fetch(`${backendHostAllCures}/article/${id}`, {
            headers: headers,
          });
          const json = await response.json();
          console.log(json);

          setData(json);

          try {
            console.log(
              "content",
              JSON.parse(decodeURIComponent(json.content))
            );

            const contentBlocks = await JSON.parse(
              decodeURIComponent(json.content)
            ).blocks;

            setItems(contentBlocks);
            setIsLoaded(true);
          } catch (error) {
            console.log(error);
            Alert.alert("Error Occured", error);
          }
        }
      } catch (err) {
        console.error(err);
        // Handle the error as needed
      } finally {
        setIsLoaded(true);
      }
    };

    // Call the function immediately
    getArticle();

    // Cleanup function (will be called when the component unmounts or when isConnected changes)
    return () => {
      abortController.abort();
    };
  }, []); // Dependencies for the useEffect

  // const onScroll = e => {
  //   let contentoffsetY = e.nativeEvent.contentOffset.y;

  //   let diff = contentoffsetY - scroll;
  //   console.log('diff', diff);

  //   setTimeout(() => {
  //     if (diff <= 0 || scroll <= 0) {
  //       navigation.setOptions({
  //         headerShown: true,
  //         tabBarStyle: {height: 30},
  //       });
  //       dispatch(bottomHeight(60));
  //     } else {
  //       navigation.setOptions({
  //         headerShown: false,
  //         tabBarStyle: {height: 30},
  //       });
  //       dispatch(bottomHeight(0));
  //     }
  //   }, 500); // 500 milliseconds (adjust as needed)

  //   console.log('Y Axis', contentoffsetY);
  //   scroll = contentoffsetY;
  // };
  const headerMarginTop = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [40, 0], // Adjust these values based on your design
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.readContainer}>
      {/* <View style={styles.content}>
        <Animated.View
          style={[styles.animatedHeader, {opacity: headerOpacity}]}>
          <CustomHeader title={title} id={id} />
        </Animated.View>
      </View> */}

      {isLoaded ? (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.scroll]}
          onScroll={handleScroll}
        >
          <View style={{ paddingBottom: 20, paddingHorizontal: 3 }}>
            <Text style={styles.title}>{data.title}</Text>

            {/* <Text style={styles.time}>
              {moment(`${data.create_date}`, 'YYYYMMDD').fromNow()}{' '}
              <Dot height={5} width={5} /> {data.authors_name}
            </Text> */}

            {items.map((i, key) => {
              return (
                <View
                  style={{ marginTop: 11 }}
                  key={Math.random().toString(36)}
                >
                  <CenterWell1
                    key={Math.random().toString(36)}
                    pageTitle={i.title}
                    type={i.type}
                    text={i.data.text}
                    title={i.data.title}
                    message={i.data.message}
                    source={i.data.source}
                    embed={i.data.embed}
                    caption={i.data.caption}
                    alignment={i.data.alignment}
                    imageUrl={i.data.file ? i.data.file.url : null}
                  />
                </View>
              );
            })}
          </View>
       
        </Animated.ScrollView>
      ) : (
        <ContentLoader />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  readContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    paddingHorizontal: 23,
    paddingVertical: 20,
  },
  title: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: "700",
    fontSize: 23,
  },
  coverImage: {
    width: "100%",
    height: 378 * ratio,
    borderRadius: 10,
  },
  time: {
    fontSize: 8,
    fontFamily: FontFamily.poppinsRegular,
    lineHeight: 12,
    color: Color.colorDarkgray,
    fontWeight: "700",
    marginTop: 10,
  },
  h2_text: {
    fontFamily: FontFamily.poppinsBold,
    fontSize: 18,
  },
  approachCard: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
  },
  approachData: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  approachImage: {
    width: 105,
    height: 105,
  },
  animatedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    // Ensure the content stretches to fill the safe area
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  disclaimer: {
    color: Color.appDefaultColor,
    fontFamily: "Raleway-Medium",
    fontSize: 14,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonText: {
    color: Color.appDefaultColor,
    alignSelf: "center",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  text: {
    color: Color.appDefaultColor,
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    marginLeft: 10,
  },
});

export default memo(ArticlesRead);
