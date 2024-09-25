import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Color, FontFamily, height, width } from "../GlobalStyles";
import axios from "axios";
const cardItemHeight = 136;
const ArticleCard = ({
  title,
  window_title,
  create_date,
  image_location,
  dc_name,
  articleId,
}) => {
    const image = image_location;
  return (
    // Article Card Component

    <View style={styles.cardContainer}>
      <View
        activeOpacity={0.7}
        style={styles.detailsCardContainer}
        onPressIn={() => setShowOptions(false)}
      >
        <Text style={styles.article_title}>
          {window_title}{" "}
          {dc_name !== undefined && (
            <Text style={{ color: Color.colorDarkgray }}> in </Text>
          )}{" "}
          {dc_name}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.time}>
            {/* 10 min read <Dot height={5} width={5} /> {createdAt} */}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: Color.colorSilver,
          }}
        >
          <ImageBackground
            style={styles.image}
            source={{
              uri: image,
            }}
          ></ImageBackground>
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",

    width: width,
    backgroundColor: "#fff",
    height: cardItemHeight,
    paddingHorizontal: 26,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E3",
  },
  article_title: {
    width: width * 0.5,
    fontSize: 9,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    fontWeight: "400",
  },
  detailsCardContainer: { justifyContent: "space-evenly", marginRight: 11 },
  image: { width: 100, height: 100, borderRadius: 3 },
  title: {
    width: width * 0.55,
    fontSize: 15,
    fontFamily: FontFamily.poppinsBold,
    lineHeight: 22.5,
    color: Color.colorDarkslategray,
    fontWeight: "700",
  },
  time: {
    fontSize: 8,
    fontFamily: FontFamily.poppinsRegular,
    lineHeight: 12,
    color: Color.colorDarkgray,
    fontWeight: "700",
  },
  optionsBtn: {
    widht: 50,
    height: 20,
    position: "absolute",
    right: 8,
    top: 8,
  },
  options: {
    flexDirection: "row",
    width: 65,
    ehight: 27,
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 6,
    position: "absolute",
    right: 8,
    top: 20,
    elevation: 2,
  },
});
