import { View, ScrollView, Text, Pressable, Button, StyleSheet } from "react-native";
import { DataContext } from "../context/DataContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";

export const Tutorial = () => {
	const insets = useSafeAreaInsets();
	const { data, confirmTutorialSeen, themeColors, logAll } = useContext(DataContext);
	const navigation = useNavigation();

	const redirectAndConfirm = async () => {
		await confirmTutorialSeen();
		navigation.navigate("MainTabs");
	};

	return (
		<ScrollView
			style={{
				paddingTop: insets.top,
				paddingLeft: 5,
				paddingRight: 5,
				flex: 1,
				backgroundColor: themeColors.backgroundColor,
			}}>
			{/* <View style={[styles.aboutSection, { backgroundColor: themeColors.secondaryColor, borderColor: themeColors.tertiaryColor }]}>
				<Text style={[styles.heading, { color: themeColors.textColor }]}>About Confirmed.</Text>
				<Text style={styles.text}>Sometimes the hardest part isn’t doing the thing — it’s remembering that you did it.</Text>
				<Text style={styles.text}>This app lets you create small confirmations for everyday actions and mark them once they’re done. Each confirmation is logged, so you can check back later instead of relying on memory alone.</Text>
				<Text style={styles.text}>Simple, quiet, and intentionally minimal.</Text>
			</View> */}

			<View style={styles.howToUseContainer}>
				<Text style={[styles.heading, { color: themeColors.textColor, marginBottom: 20 }]}>How to Use Confirmed</Text>
				<View style={styles.howToUseSectionsWrapper}>
					<Text style={styles.text}>
						Create new daily confirmations in the <Ionicons name="add" size={16} color={themeColors.textColor} /> tab <Text style={{ fontStyle: "italic" }}>(e.g Front Door, Oven, Bathroom Light)</Text>
					</Text>
					<View style={[styles.keyline, { borderColor: themeColors.tertiaryColor }]}></View>
					<Text style={styles.text}>
						To confirm, navigate to the hold down on the individual confirmation on the <Ionicons name="grid" size={12} color={themeColors.textColor} /> page
					</Text>
					<View style={[styles.keyline, { borderColor: themeColors.tertiaryColor }]}></View>
					<Text style={styles.text}>
						View your confirmation history in the <Ionicons name="list" size={14} color={themeColors.textColor} /> tab. This is a list of all past confirmations including their date and time, to make sure you never lose track.
					</Text>
					<View style={[styles.keyline, { borderColor: themeColors.tertiaryColor }]}></View>
					<Text style={styles.text}>
						To remove individual confirmations from the <Ionicons name="grid" size={12} color={themeColors.textColor} /> page, navigate to the <Ionicons name="settings" size={14} color={themeColors.textColor} style={{ padding: 5 }} /> page, select “Edit Selected Confirmations”, from here, you can delete your no-longer-required confirmations.
					</Text>
					<View style={[styles.keyline, { borderColor: themeColors.tertiaryColor }]}></View>
					<Text style={styles.text}>
						On the <Ionicons name="settings" size={14} color={themeColors.textColor} /> page, the “Delete all data” button will remove all current and past confirmations.
					</Text>
				</View>
			</View>
			<Pressable onPress={() => redirectAndConfirm()} style={[styles.backButton, { borderColor: themeColors.tertiaryColor }]}>
				<Text style={[styles.buttonText, { color: themeColors.textColor }]}>Continue</Text>
			</Pressable>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	heading: {
		fontFamily: "Helvetica",
		fontSize: 20,
		fontWeight: 100,
		textAlign: "center",
		padding: 10,
		// marginBottom: 20,
	},
	aboutSection: {
		flexDirection: "column",
		gap: 20,
		paddingHorizontal: 10,
	},
	text: {
		textAlign: "center",
		fontFamily: "Helvetica",
		fontWeight: 100,
		fontSize: 14,
		marginHorizontal: 5,
		color: "grey",
		alignItems: "center",
		justifyContent: "center",
	},
	howToUseContainer: {
		marginTop: 20,
		borderRadius: 15,
		paddingBottom: 30,
		paddingTop: 20,
		paddingHorizontal: 10,
	},
	howToUseSectionsWrapper: {
		gap: 20,
	},
	keyline: {
		width: "100%",
		borderBottomWidth: 1,
	},
	backButton: {
		borderRadius: 10,
		paddingVertical: 10,
		fontFamily: "Helvetica",
		marginTop: 20,
		borderWidth: 0.5,
		marginBottom: 30,
		marginHorizontal: 100,
	},
	buttonText: {
		textAlign: "center",
		fontFamily: "Helvetica",
		fontSize: 14,
		paddingVertical: 5,
	},
});
