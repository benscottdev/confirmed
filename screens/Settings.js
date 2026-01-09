import { View, StyleSheet, Text, Pressable } from "react-native";
import { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataContext } from "../context/DataContext";
import * as Haptics from "expo-haptics";

export default function Settings() {
	const insets = useSafeAreaInsets();

	const { themeColors, changeTheme, theme, clearStorage } = useContext(DataContext);

	function RadioButton({ selected }) {
		return <View style={[radioStyles.outer, selected && styles.outerSelected]}>{selected && <View style={radioStyles.inner} />}</View>;
	}

	const clearStorageWithHaptics = () => {
		clearStorage();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5, paddingBottom: 100, height: "100%", backgroundColor: themeColors.backgroundColor }}>
			<Text style={[styles.heading, { color: themeColors.textColor }]}>Settings</Text>
			<Text style={[styles.settingsSectionHeading, { color: themeColors.textColor }]}>Theme</Text>
			<View style={[styles.settingsSection, { borderColor: themeColors.tertiaryColor, backgroundColor: themeColors.backgroundColor }]}>
				<View>
					{["light", "dark"].map((option) => (
						<Pressable key={option} onPress={() => changeTheme(option)} style={[styles.settingsSubSection, { borderColor: themeColors.tertiaryColor, flexDirection: "row", alignItems: "center", borderBottomWidth: option != "dark" ? 1 : 0 }]}>
							<Text style={[styles.themeText, { color: themeColors.textColor }]}>{option}</Text>
							<RadioButton selected={theme === option} />
						</Pressable>
					))}
				</View>
			</View>
			<Text style={[styles.settingsSectionHeading, { color: themeColors.textColor }]}>Reset</Text>
			<View style={[styles.settingsSection, { borderColor: themeColors.tertiaryColor }]}>
				<Pressable onPress={() => clearStorageWithHaptics()} style={({ pressed }) => [styles.settingsSubSection, { flexDirection: "row", alignItems: "center", backgroundColor: pressed ? themeColors.secondaryColor : themeColors.backgroundColor }]}>
					<Text style={[styles.themeText, { color: themeColors.textColor }]}>Delete all data</Text>
				</Pressable>
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
		// color:
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
