import React, { Component } from "react";
import { SafeAreaView, BackHandler, Text, View, Alert } from "react-native";
import { LineChart, Grid } from "react-native-svg-charts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      isConnected: false,
      backHandler: null,
      data: [50, 10, 40, 95, 85, 91, 35, 53, 24, 50, 20, 80],
      data1: [],
      data2: [],
      stroke: ["#00008B", "red"],
    };
  }

  componentDidMount() {
    this.state.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    this.chartColor();
  }

  handleBackPress = () => {
    Alert.alert(
      "",
      "Do you really want to quit the application?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  chartColor = () => {
    this.state.data.map((value, index) => {
      if (value > 0) {
        this.state.data1.push(value);
      } else if (value < 0) {
        this.state.data2.push(value);
      }
    });
  };

  render() {
    return (
      <SafeAreaView>
        <Text
          style={{
            fontSize: 30,
            color: "#1d76a3",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Line Chart
        </Text>
        <LineChart
          style={{ height: 200, width: 350 }}
          data={this.state.data}
          contentInset={{ top: 30 }}
          svg={{ stroke: this.state.stroke[0] }}
        >
          <Grid />
        </LineChart>
        <View
          style={{
            borderStyle: "dotted",
            borderWidth: 1,
            borderRadius: 1,
          }}
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <MaterialCommunityIcons name="rectangle" size={30} color="#00008B" />
          <Text style={{ fontSize: 20 }}>Positive values</Text>
          <Text></Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <MaterialCommunityIcons name="rectangle" size={30} color="red" />
          <Text style={{ fontSize: 20 }}>Negative values</Text>
          <Text></Text>
        </View>
      </SafeAreaView>
    );
  }
}
