import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataContext } from "../context/DataContext";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const { themeColors, changeTheme, theme, clearStorage } = useContext(DataContext);

	function RadioButton({ selected }) {
		return <View style={[radioStyles.outer, selected && styles.outerSelected]}>{selected && <View style={radioStyles.inner} />}</View>;
	}

	const confirmDeleteAllData = () => {
		Alert.alert(
			"Delete all data?",
			"This will remove all current and past confirmations. This cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete All",
					style: "destructive",
					onPress: () => {
						clearStorage();
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
					},
				},
			],
			{ cancelable: true },
		);
	};

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5, paddingBottom: 100, height: "100%", backgroundColor: themeColors.backgroundColor }}>
			<Text style={[styles.heading, { color: themeColors.textColor }]}>Settings</Text>
			<Text style={[styles.settingsSectionHeading, { color: themeColors.textColor }]}>Theme</Text>
			<View style={[styles.settingsSection, { borderColor: themeColors.secondaryColor, backgroundColor: themeColors.backgroundColor }]}>
				<View>
					{["dark", "light"].map((option) => (
						<Pressable key={option} onPress={() => changeTheme(option)} style={[styles.settingsSubSection, { borderColor: themeColors.secondaryColor, flexDirection: "row", alignItems: "center", borderBottomWidth: option != "light" ? 1 : 0 }]}>
							<Text style={[styles.themeText, { color: themeColors.textColor }]}>{option}</Text>
							<RadioButton selected={theme === option} />
						</Pressable>
					))}
				</View>
			</View>

			<Text style={[styles.settingsSectionHeading, { color: themeColors.textColor }]}>Guide</Text>
			<View style={[styles.settingsSection, { borderColor: themeColors.secondaryColor }]}>
				<Pressable onPress={() => navigation.navigate("Tutorial", { fromSettings: true })} style={({ pressed }) => [styles.settingsSubSection, { borderBottomWidth: 0, borderColor: themeColors.secondaryColor, backgroundColor: pressed ? themeColors.secondaryColor : themeColors.backgroundColor }]}>
					<Text style={[styles.themeText, { color: themeColors.textColor, width: "100%" }]}>How to use</Text>
				</Pressable>
			</View>

			<Text style={[styles.settingsSectionHeading, { color: themeColors.textColor }]}>Edit Confirmations</Text>
			<View style={[styles.settingsSection, { borderColor: themeColors.secondaryColor }]}>
				<Pressable onPress={() => navigation.navigate("EditConfirmations")} style={({ pressed }) => [styles.settingsSubSection, { borderBottomWidth: 0.5, borderColor: themeColors.secondaryColor, alignItems: "center", backgroundColor: pressed ? themeColors.secondaryColor : themeColors.backgroundColor }]}>
					<Text style={[styles.themeText, { color: themeColors.textColor, width: "100%" }]}>Edit current confirmations</Text>
				</Pressable>
				<Pressable onPress={confirmDeleteAllData} style={({ pressed }) => [styles.settingsSubSection, { flexDirection: "row", alignItems: "center", backgroundColor: pressed ? themeColors.secondaryColor : themeColors.backgroundColor }]}>
					<Text style={[styles.themeText, { color: themeColors.textColor }]}>Delete all data</Text>
				</Pressable>
			</View>

			<View style={styles.credits}>
				<Text style={[styles.creditText, { color: themeColors.secondaryColor }]}>Version 1.0</Text>
				<Text style={[styles.creditText, { color: themeColors.secondaryColor }]}>Designed and Developed by Ben Scott</Text>
				<Text style={[styles.creditText, { color: themeColors.secondaryColor }]}>© 2026</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	heading: {
		fontFamily: "Helvetica",
		fontSize: 20,
		fontWeight: 100,
		textAlign: "center",
		padding: 10,
		marginBottom: 20,
	},
	settingsSectionHeading: {
		marginHorizontal: 10,
		marginBottom: 5,
	},
	settingsSection: {
		borderRadius: 10,
		borderWidth: 1,
		marginBottom: 20,
		marginHorizontal: 5,
	},
	settingsSubSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	themeText: {
		textTransform: "capitalize",
		fontFamily: "Helvetica",
		fontWeight: 100,
		width: "30%",
	},
	credits: {
		flexDirection: "column",
	},
	creditText: {
		fontSize: 14,
		textAlign: "center",
		fontFamily: "Helvetica",
		fontWeight: 400,
	},
});

const radioStyles = StyleSheet.create({
	container: {
		padding: 8,
	},
	outer: {
		width: 16,
		height: 16,
		borderRadius: 11,
		borderWidth: 1,
		borderColor: "#999",
		alignItems: "center",
		justifyContent: "center",
	},
	outerSelected: {
		borderColor: "#999",
	},
	inner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#999",
	},
});
