import { View, Button } from "react-native";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNewConfirmation } from "../localStorage/createNewConfirmation";
import { clearStorage } from "../localStorage/clearStorage";
import { removeConfirmation } from "../localStorage/removeConfirmation";
import { changeTheme } from "../localStorage/changeTheme";
import { MyContext } from "../context/Context";

const STORAGE_KEY = "@confirmed-app-async-data-storage";

export default function Settings() {
	const insets = useSafeAreaInsets();
	const { setDefaultData } = useContext(MyContext);

	const logStorage = async () => {
		let data;
		try {
			data = await AsyncStorage.getItem(STORAGE_KEY);
			const appData = JSON.parse(data);
			if (appData == null || appData == undefined) {
				console.log("'" + STORAGE_KEY + "'" + " contains no data");
			}

			// console.log("TOTAL CONFIRMATIONS = " + appData["total-confirmations"]);
			// console.log("THEME = " + appData["current-theme"]);
			// console.log("ALL CONFIRMATIONS = " + JSON.stringify(appData["current-confirmations"]));
			console.log(data ? data : "");
		} catch (e) {
			console.error("Issue with logging all data - see Settings.js", e);
			throw e;
		}
	};

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5 }}>
			<Button title="Add to storage" onPress={() => createNewConfirmation("test")}></Button>
			<Button title="Clear storage" onPress={() => clearStorage()}></Button>
			<Button title="Remove Confirmation" onPress={() => removeConfirmation(1767681719786)}></Button>
			<Button title="Change Theme" onPress={() => changeTheme("dark")}></Button>
			<Button title="LOG ALL DATA" onPress={() => logStorage()}></Button>
		</View>
	);
}
