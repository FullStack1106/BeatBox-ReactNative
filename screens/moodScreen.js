import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";

const MoodScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`moodScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const moodData = [
    {
      key: "1",
      name: "Happy",
      image: require("../assets/image/moodA1.png"),
    },
    {
      key: "2",
      name: "Shock",
      image: require("../assets/image/moodA2.png"),
    },
    {
      key: "3",
      name: "Dance",
      image: require("../assets/image/moodA3.png"),
    },
    {
      key: "4",
      name: "Party",
      image: require("../assets/image/moodA4.png"),
    },
    {
      key: "5",
      name: "Sad",
      image: require("../assets/image/moodA5.png"),
    },
    {
      key: "6",
      name: "Sleep",
      image: require("../assets/image/moodA6.png"),
    },
    {
      key: "7",
      name: "Workout",
      image: require("../assets/image/moodA7.png"),
    },
    {
      key: "8",
      name: "Romance",
      image: require("../assets/image/moodA8.png"),
    },
    {
      key: "9",
      name: "Focus",
      image: require("../assets/image/moodA9.png"),
    },
    {
      key: "10",
      name: "Drive",
      image: require("../assets/image/moodA10.png"),
    },
    {
      key: "11",
      name: "Happy",
      image: require("../assets/image/moodA1.png"),
    },
    {
      key: "12",
      name: "Shock",
      image: require("../assets/image/moodA2.png"),
    },
  ];
  const renderItemMoodData = ({ item, index }) => {
    const isEnd =
      index === moodData.length - 1 || index === moodData.length - 2;

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("partySongScreen")}
        style={{
          marginLeft: Default.fixPadding * 1.5,
          marginRight: index % 2 === 0 ? 0 : Default.fixPadding * 1.5,
          marginTop: Default.fixPadding * 1.5,
          marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Image source={item.image} style={{ alignSelf: "center" }} />

        <Text
          style={{
            ...Fonts.Bold16White,
            marginVertical: Default.fixPadding,
            alignSelf: "center",
            position: "absolute",
            bottom: 0,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.boldBlack }}>
      <StatusBar
        backgroundColor={Colors.boldBlack}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.boldBlack,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text style={Fonts.Bold20White}>{tr("yourMood")}</Text>
      </View>
      <FlatList
        numColumns={2}
        data={moodData}
        renderItem={renderItemMoodData}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MoodScreen;
