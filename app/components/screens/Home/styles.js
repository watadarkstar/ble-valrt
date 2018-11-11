import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  listContainer: {
    flex: 1,
    marginTop: 20
  },
  listItem: {
    flex: 1,
    padding: 10,
    height: 60,
    width: 300,
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
  }
});
