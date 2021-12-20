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
import * as Progress from "react-native-progress";

import { FlatList, TextInput } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react-native/node_modules/@types/react";
import { Alert } from "react-native";

let DATA = [{}];
/*
AsyncStorage.getItem("hello", (err, result) => {
  console.log("hi2");

  DATA = JSON.parse(result); //string화 된 result를 parsing
  console.log(DATA);
});
*/
class List extends Component {
  state = {
    DATA: DATA,
    text: "",
    count: 0,
    DATA2: [{}],
  };

  countp() {
    var le = this.state.DATA2.length;
    //console.log(le);
    if (this.state.count < le - 1) {
      this.state.count += 1;
      this.setState({ count: this.state.count });
      //console.log(this.state.count);
    } else {
      Alert.alert("", "모든 질문을 완료하였습니다.");
      this.props.navigation.navigate("Main");
    }
  }

  componentDidMount() {
    //console.log("hi111");

    AsyncStorage.getItem("hello", (err, result) => {
      //console.log("hi222");
      DATA = JSON.parse(result); //string화 된 result를 parsing
      var newnum = [];
      //console.log("hi");
      while (DATA.length > 0) {
        var movenum = DATA.splice(
          Math.floor(Math.random() * DATA.length),
          1
        )[0];
        newnum.push(movenum);
      }
      //console.log("hi");
      this.state.DATA2 = newnum;
      this.setState(this.state.DATA2);

      //console.log("mountted");
      //console.log(newnum);
    });
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
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 0.6,
            }}
          >
            <Text style={{ marginBottom: "3%", color: "white" }}>
              {this.state.count}/{this.state.DATA2.length}
            </Text>
            <Progress.Bar
              progress={this.state.count / this.state.DATA2.length}
              height={30}
              width={200}
            />
          </View>
        </View>
        <View style={Styles.bodyup}></View>
        <View style={Styles.body}>
          <Text style={{ color: "white", fontSize: 25 }}>
            {this.state.DATA2[this.state.count].title}
          </Text>
        </View>
        <View
          style={[
            Styles.footup,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <TouchableOpacity
            style={{
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              height: "30%",
              backgroundColor: "purple",
            }}
            onPress={() => this.countp()}
          >
            <Text style={[Styles.text, { marginTop: 0 }]}>next</Text>
          </TouchableOpacity>
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
  bodyup: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    marginHorizontal: "10%",
    borderRadius: 20,
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB6C1",
  },
  footup: {
    flex: 0.2,
  },
  foot: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default List;
