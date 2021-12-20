import { StatusBar } from "expo-status-bar";
import React, { Component, useReducer } from "react";
import {
  Button,
  CheckBox,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

import { FlatList, TextInput } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react-native/node_modules/@types/react";
import { call } from "react-native-reanimated";
import { Alert } from "react-native";

const Item = ({ title }) => (
  <View
    style={{
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "5%",
    }}
  >
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          color: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {title}
      </Text>
    </View>
    <View
      style={{
        flex: 0.9,
        alignItems: "flex-end",
        marginLeft: "20%",
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 50,
          height: 20,
          borderRadius: 10,
          backgroundColor: "hotpink",
        }}
        onPress={() => deletebutton(title)}
      >
        <Text style={{ color: "white" }}>삭제</Text>
      </TouchableOpacity>
    </View>
  </View>
);
const renderItem = ({ item }) => {
  return <Item title={item.title} />;
};
let DATA2 = [{}];

class List extends Component {
  state = {
    DATA: DATA2,
    text: "",
  };
  async componentDidMount() {
    await AsyncStorage.getItem("hello", (err, result) => {
      DATA2 = JSON.parse(result); //string화 된 result를 parsing
      console.log(DATA2);
    });
    this.state.DATA = DATA2;
    this.setState(this.state.DATA);
    //console.log("mounted");
    console.log(this.state.DATA);
  }

  deletebutton(title) {
    var le = this.state.DATA.length;
    for (var i = 0; i < le; i++) {
      if (this.state.DATA[i].title === title) {
        this.state.DATA.splice(i, 1);
        this.setState(this.state.DATA);

        //console.log("deleted");

        break;
      }
    }

    AsyncStorage.setItem("hello", JSON.stringify(this.state.DATA), () => {
      //console.log("로컬데이터베이스 저장됨");
      //console.log(this.state.DATA);

      AsyncStorage.getItem("hello", (err, result) => {
        DATA = JSON.parse(result); //string화 된 result를 parsing
      });
      //console.log("in");
      //console.log(DATA);
    });
    //console.log("out");
    //console.log(DATA);
    //console.log("setstated");
  }

  addData(text) {
    this.state.text = text;
    //console.log("data added");
  }

  addDatabutton() {
    var text = this.state.text;
    if (text != "") {
      //console.log("data pushed");

      this.state.DATA.push({ title: text });
      this.setState(this.state.DATA);
      AsyncStorage.setItem("hello", JSON.stringify(this.state.DATA), () => {
        console.log("로컬데이터베이스 저장됨");
        console.log(this.state.DATA);
      });

      AsyncStorage.getItem("hello", (err, result) => {
        DATA = JSON.parse(result); //string화 된 result를 parsing
        console.log("gogo");

        console.log(DATA);
      });

      Alert.alert("", "질문이 등록 되었습니다.");
    } else {
      Alert.alert("", "질문을 입력해 주세요.");
    }
  }

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
        <View
          style={{
            flex: 0.1,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ marginLeft: "5%", flex: 0.6 }}>
            <TextInput
              placeholderTextColor="white"
              placeholder="새로운 질문 등록"
              textAlign="center"
              maxLength={15}
              onChangeText={(text) => this.addData(text)}
              style={{
                color: "white",
                borderRadius: 10,
                flex: 0.8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFB6C1",
              }}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              alignItems: "flex-start",
              backgroundColor: "",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                height: "80%",
                borderRadius: 10,
                backgroundColor: "purple",
              }}
              onPress={() => this.addDatabutton()}
            >
              <Text style={{ color: "white" }}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.body}>
          <FlatList
            data={this.state.DATA}
            renderItem={({ item }) => (
              <View
                style={{
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "5%",
                }}
              >
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.9,
                    alignItems: "flex-end",
                    marginLeft: "20%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 50,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: "hotpink",
                    }}
                    onPress={() => this.deletebutton(item.title)}
                  >
                    <Text style={{ color: "white" }}>삭제</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <View style={Styles.foot}>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              height: "70%",
              backgroundColor: "hotpink",
            }}
            onPress={() => {
              this.props.navigation.navigate("Main");
            }}
          >
            <Text style={[Styles.text, { marginTop: 0 }]}>돌아가기</Text>
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
  headerdown: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    marginHorizontal: "10%",
    borderRadius: 20,
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB6C1",
  },
  foot: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default List;
