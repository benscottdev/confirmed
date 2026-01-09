import { View, StyleSheet } from "react-native";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "../context/DataContext";

const STORAGE_KEY = "@confirmed-app-async-data-storage";

export default function Settings() {
	const insets = useSafeAreaInsets();

	const { startNewCheck, createNewConfirmation, themeColors, clearStorage, changeTheme, setCompletedById } = useContext(DataContext);

	const logStorage = async () => {
		let data;
		try {
			data = await AsyncStorage.getItem(STORAGE_KEY);
			const appData = JSON.parse(data);
			if (appData == null || appData == undefined) {
				console.log("'" + STORAGE_KEY + "'" + " contains no data");
			}
			console.log(data ? data : "");
		} catch (error) {
			console.error("Issue with logging all data - see Settings.js", error);
			throw error;
		}
	};

	return (
		// DEBUGGING BUTTONS

		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5, paddingBottom: 100, height: "100%", backgroundColor: themeColors.backgroundColor }}>
			<Button title="Create New Confirmation" onPress={() => createNewConfirmation("Front Door")}></Button>
			<Button title="Delete All" onPress={() => clearStorage()}></Button>
			<Button title="Change Theme" onPress={() => changeTheme()}></Button>
			<Button title="Set Confirmed By ID" onPress={() => setCompletedById(1767759489263)}></Button>
			<Button title="Set all to false" onPress={() => startNewCheck()}></Button>
			<Button title="LOG ALL DATA" onPress={() => logStorage()}></Button>
		</View>
	);
}
