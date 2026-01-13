import { View, StyleSheet, Text, Pressable, Button, Dimensions } from "react-native";
import { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataContext } from "../context/DataContext";
import * as Haptics from "expo-haptics";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
	const insets = useSafeAreaInsets();
	const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
	const width = Dimensions.get("window").width;
	const height = Dimensions.get("window").height;
	const navigation = useNavigation();

	const { themeColors, changeTheme, theme, clearStorage, resetAll, logAll } = useContext(DataContext);

	function RadioButton({ selected }) {
		return <View style={[radioStyles.outer, selected && styles.outerSelected]}>{selected && <View style={radioStyles.inner} />}</View>;
	}

	const toggleConfirmModal = () => {
		setIsConfirmModalVisible(!isConfirmModalVisible);
	};

	const clearStorageWithHaptics = () => {
		clearStorage();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setIsConfirmModalVisible(false);
	};

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5, paddingBottom: 100, height: "100%", backgroundColor: themeColors.backgroundColor }}>
			<Text style={[styles.heading, { color: themeColors.textColor }]}>Settings</Text>
			<Text style={[styles.settingsSectionHeading, { color: themeColors.textColor }]}>Theme</Text>
			<View style={[styles.settingsSection, { borderColor: themeColors.secondaryColor, backgroundColor: themeColors.backgroundColor }]}>
				<View>
					{["light", "dark"].map((option) => (
						<Pressable key={option} onPress={() => changeTheme(option)} style={[styles.settingsSubSection, { borderColor: themeColors.secondaryColor, flexDirection: "row", alignItems: "center", borderBottomWidth: option != "dark" ? 1 : 0 }]}>
							<Text style={[styles.themeText, { color: themeColors.textColor }]}>{option}</Text>
							<RadioButton selected={theme === option} />
						</Pressable>
					))}
				</View>
			</View>
			<Text style={[styles.settingsSectionHeading, { color: themeColors.textColor }]}>Edit Confirmations</Text>
			<View style={[styles.settingsSection, { borderColor: themeColors.secondaryColor }]}>
				<Pressable onPress={() => navigation.navigate("EditConfirmations")} style={({ pressed }) => [styles.settingsSubSection, { borderBottomWidth: 0.5, borderColor: themeColors.secondaryColor, alignItems: "center", backgroundColor: pressed ? themeColors.secondaryColor : themeColors.backgroundColor }]}>
					<Text style={[styles.themeText, { color: themeColors.textColor, width: "100%" }]}>Edit current confirmations</Text>
				</Pressable>
				<Pressable onPress={() => toggleConfirmModal()} style={({ pressed }) => [styles.settingsSubSection, { flexDirection: "row", alignItems: "center", backgroundColor: pressed ? themeColors.secondaryColor : themeColors.backgroundColor }]}>
					<Text style={[styles.themeText, { color: themeColors.textColor }]}>Delete all data</Text>
				</Pressable>
			</View>
			{/* DELETE ALL MODAL */}
			{isConfirmModalVisible && <View style={[styles.modalBg, { width, height }]}></View>}
			<Modal style={[styles.modal, { borderColor: themeColors.secondaryColor, backgroundColor: themeColors.backgroundColor }]} visible={isConfirmModalVisible}>
				<Text style={[styles.modalHeading, { color: themeColors.textColor }]}>Are you sure?</Text>
				<Text style={[styles.modalBody, { color: themeColors.lightTextColor }]}>This will remove all current & past confirmations</Text>
				<View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", marginTop: 15 }}>
					<Pressable onPress={() => clearStorageWithHaptics()} style={[styles.modalButton, { borderColor: themeColors.tertiaryColor }]}>
						<Text style={{ color: themeColors.textColor }}>Confirm</Text>
					</Pressable>
					<Pressable onPress={() => toggleConfirmModal()} style={[styles.modalButton, { borderColor: themeColors.tertiaryColor }]}>
						<Text style={{ color: themeColors.textColor }}>Decline</Text>
					</Pressable>
				</View>
			</Modal>
			{/* <Button title="REMOVE ALL DATA" onPress={() => resetAll()}></Button> */}
			{/* <Button title="Log all Data" onPress={() => logAll()}></Button> */}

			<View style={styles.credits}>
				<Text style={[styles.creditText, { color: themeColors.secondaryColor }]}>Version 1.0</Text>
				<Text style={[styles.creditText, { color: themeColors.secondaryColor }]}>Designed and Developed by Ben</Text>
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
	modalBg: {
		backgroundColor: "rgba(0, 0, 0, 0.75)",
		position: "absolute",
		top: 0,
		left: 0,
	},

	modal: {
		minHeight: 20,
		width: "80%",
		padding: 20,
		borderRadius: 10,
		position: "absolute",
		top: "50%",
		left: "45%",
		transform: 'translate("-50%, -50%")',
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	modalHeading: {
		textAlign: "center",
		fontSize: 20,
	},
	modalBody: {
		textAlign: "center",
		fontSize: 14,
		fontWeight: 100,
		maxWidth: "90%",
	},
	modalButton: {
		borderWidth: 1,
		paddingVertical: 3,
		paddingHorizontal: 20,
		borderRadius: 3,
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
