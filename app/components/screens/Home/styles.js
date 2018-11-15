import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#337AB7",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    marginBottom: 20
  },
  buttonText: {
    color: "white"
  },
  greenText: {
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
  }
});
