import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  taloyhtiotitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  content: {
    alignItems: "center",
  },
  selectedDateContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reservationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  reservationText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noReservationsText: {
    fontSize: 16,
    marginTop: 10,
  },
  similarDaysText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  similarDayItem: {
    fontSize: 16,
    color: "black",
    marginLeft: 20,
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundcolor: "fff",
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "lightgray",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  messageCreated: {
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 18,
    backgroundColor: "lightgray",
    borderRadius: 5,
    marginBottom: 10,
    padding: 0,
    padding: 10,
    marginVertical: 5,
    color: "black",
  },
  inputContainer: {
    width: "80%",
    alignSelf: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  messageInput: {
    textAlignVertical: "top",
    padding: 10,
    paddingTop: 10,
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
    height: "50%",
    width: "100%",
    margin: 12,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    padding: 10,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
    color: "cornflowerblue",
    marginBottom: 10,
    marginTop: 0,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginBottom: 20,
  },
  customButton: {
    backgroundColor: "cornflowerblue",
    width: 150,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  varausText: {
    fontSize: 24,
    color: "black",
    marginBottom: 20,
    marginTop: 10,
  },
  reservationItem: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    marginBottom: 10,
    padding: 0,
  },
  reservationText: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
    color: "black",
  },
  noReservationsText: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  cameraText: {
    fontSize: 16,
    color: "#000",
  },
});

export default styles;
