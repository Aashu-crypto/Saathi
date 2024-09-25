import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { backendHostAllCures, headers } from "../../config";
import ContentLoader from "../ContentLoader";
import ArticleCard from "../ArticleCard";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../routes";
const AllCuresBlog = () => {
  const [item, setItem] = useState();
  const [Loaded, setLoaded] = useState(false);
  const [articleId, setArticleId] = useState();
  const navigation = useNavigation()
  useEffect(() => {
    getFeaturedArticle();
  }, []);
  async function getFeaturedArticle() {
    console.log("function statred");

    try {
      const response = await fetch(
        `${backendHostAllCures}/article/allkvranked`,
        {
          method: "GET",
          headers: headers,
        }
      );
      console.log("resp", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log("article data", json);

      // Using map directly to create the array
      setArticleId(json[0].article_id);
      setItem(json);
      setLoaded(true);
    } catch (err) {
      console.error(err);
      // Handle errors, e.g., show an error message to the user
    }
  }
  const renderItem = ({ item }) => {
    let imageLoc = "";
    const imgLocation = item.content_location;
    if (imgLocation && imgLocation.includes("cures_articleimages")) {
      imageLoc =
        `https://all-cures.com:444/` +
        imgLocation.replace("json", "png").split("/webapps/")[1];
    } else {
      imageLoc =
        "https://all-cures.com:444/cures_articleimages//299/default.png";
    }

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate(Route.ARTICLES_READ, {
            articleId: item.article_id,
            title: item.title,
          })
        }
      >
        <ArticleCard
          title={item.title}
          window_title={item.authors_name}
          create_date={item.published_date}
          image_location={imageLoc}
          dc_name={item.med_type_name}
          articleId={item.article_id}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ height: 300 }}>
      {Loaded ? (
        <FlatList
          estimatedItemSize={100}
          keyExtractor={(item) => item.article_id.toString()}
          data={item}
          renderItem={renderItem}
        />
      ) : (
        <ContentLoader />
      )}
    </View>
  );
};

export default AllCuresBlog;

const styles = StyleSheet.create({});
