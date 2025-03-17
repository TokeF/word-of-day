import { StyleSheet } from "react-native";

export const defaultColor = "#7ACDA8";
export const defaultColorSecondary = "#C2EFF5";
export const pastelRed = "#FF6961";
export const pastelYellow = "#FDFD96";

const globalStyles = StyleSheet.create({
  some: {},
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: defaultColor,
    paddingTop: 80,
  },
  frame: {
    backgroundColor: defaultColorSecondary,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginBottom: 40,
    marginTop: 20,
  },
});

export default globalStyles;
