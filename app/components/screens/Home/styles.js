import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    alignSelf: "stretch",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#337AB7",
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  greenButton: {
    backgroundColor: "green"
  },
  buttonText: {
    color: "white"
  },
  greenText: {
    fontSize: 12,
    color: "green"
  },
  listContainer: {
    flex: 1,
    alignSelf: "stretch"
  },
  listItem: {
    flex: 1,
    padding: 20,
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
    backgroundColor: "white"
  },
  deviceName: {
    fontSize: 18,
    color: "#4A90E2"
  },
  text: {
    fontSize: 12,
    color: "#BBBBBB"
  }
});
