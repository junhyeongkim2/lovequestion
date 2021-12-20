import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

let DATA2 = [
  {
    title: "생일",
  },
  {
    title: "키 몸무게",
  },
  {
    title: "폰배경화면",
  },

  {
    title: "최근의 관심사",
  },
  {
    title: "좋아하는 가수",
  },
  {
    title: "좋아하는 배우",
  },
  {
    title: "인생 노래",
  },
  {
    title: "인생 영화",
  },
  {
    title: "인생 드라마",
  },
  {
    title: "좋아하는 음식",
  },
  {
    title: "싫어하는 음식",
  },
  {
    title: "이상형",
  },
  {
    title: "버킷리스트",
  },
  {
    title: "낮 vs 밤 vs 새벽",
  },
  {
    title: "좋아하는 계절",
  },
  {
    title: "좋아하는 과일",
  },
  {
    title: "좋아하는 라면",
  },
  {
    title: "일어나서 가장 먼저 하는 것",
  },
  {
    title: "mbti 유형",
  },

  {
    title: "버릇",
  },
  {
    title: "취미",
  },
  {
    title: "좋아하는 과목",
  },
  {
    title: "좋아하는 게임",
  },
  {
    title: "죽기전에 꼭 해 보고 싶은 것",
  },
  {
    title: "어릴때 사진 보여주기",
  },
  {
    title: "좋아하는 옷 브랜드",
  },
  {
    title: "추억이 담긴 물건",
  },
  {
    title: "좋아하는 음료수",
  },
  {
    title: "흑역사",
  },
  {
    title: "강아지 vs 고양이",
  },
  {
    title: "좋아하는 색",
  },
  {
    title: "무서워 하는 것",
  },
  {
    title: "혼자놀기 vs 같이놀기",
  },
  {
    title: "단 것 호 vs 불호",
  },
  {
    title: "매운것 호 vs 불호",
  },
  {
    title: "살면서 가장 기뻤던 일",
  },
  {
    title: "살면서 가장 슬펐던 일",
  },

  {
    title: "돈이 생기면 주로 쓰는 곳",
  },

  {
    title: "연하vs동갑vs연상",
  },
  {
    title: "좌우명",
  },
  {
    title: "가지고 싶은 초능력",
  },
];
var checkdata = null;

if (checkdata == null) {
  AsyncStorage.setItem("hello", JSON.stringify(DATA2));
  AsyncStorage.setItem("check", "checked");

  // console.log("first");
}

AsyncStorage.getItem("check", (err, result) => {
  checkdata = result; //string화 된 result를 parsing
  console.log(checkdata);
  //console.log("11" + checkdata);
  //console.log("12" + result);
});

/*console.log(
  AsyncStorage.getItem("check", (err, result) => {
    console.log(result);
  })
);
*/
class Main extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}>
        <View style={Styles.header}>
          <Text style={[Styles.text, { fontSize: 40 }]}>서알시</Text>
          <Image
            style={{ marginTop: "2%", height: "20%", width: "9%" }}
            source={require("./img.jpeg")}
          />

          <Text style={[Styles.text, { fontSize: 15, marginTop: "3%" }]}>
            서로를 알아가는 시간
          </Text>
        </View>
        <View style={Styles.body}>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              width: "70%",
              height: "17%",
              backgroundColor: "hotpink",
            }}
            onPress={() => {
              this.props.navigation.navigate("List");
            }}
          >
            <Text style={[Styles.text, { marginTop: 0 }]}>
              질문 리스트 설정
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: "10%",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              width: "70%",
              height: "17%",
              backgroundColor: "hotpink",
            }}
            onPress={() => {
              this.props.navigation.navigate("question");
            }}
          >
            <Text style={[Styles.text, { marginTop: 0 }]}>랜덤 질문 시작</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  theme: {
    backgroundColor: "#101010",
  },
  header: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: "5%",
    fontSize: 25,
    color: "white",
  },
  body: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Main;
