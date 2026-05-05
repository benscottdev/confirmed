import { View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { DataContext } from "../context/DataContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext } from "react";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";

export const Tutorial = () => {
	const insets = useSafeAreaInsets();
	const { confirmTutorialSeen, themeColors } = useContext(DataContext);
	const navigation = useNavigation();
	const route = useRoute();
	const fromSettings = route.params?.fromSettings === true;

	const onContinue = async () => {
		if (!fromSettings) {
			await confirmTutorialSeen();
		}
		if (fromSettings) {
			navigation.goBack();
		} else {
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "MainTabs" }],
				})
			);
		}
	};

	const bodyMuted = { color: themeColors.lightTextColor };
	const bodyPrimary = { color: themeColors.textColor };

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: themeColors.backgroundColor, paddingTop: insets.top }}
			contentContainerStyle={styles.scrollContent}
			showsVerticalScrollIndicator={false}>
			<Text style={[styles.screenTitle, { color: themeColors.textColor }]}>Guide</Text>

			<View style={[styles.section, { borderColor: themeColors.secondaryColor, backgroundColor: themeColors.backgroundColor }]}>
				<Text style={[styles.sectionHeading, { color: themeColors.textColor }]}>About</Text>
				<Text style={[styles.paragraph, bodyMuted]}>
					Sometimes the hardest part is not doing the thing — it is remembering that you did it.
				</Text>
				<Text style={[styles.paragraph, bodyMuted]}>
					Create small confirmations for everyday actions and mark them when they are done. Each one is logged so you can look back instead of relying on memory alone.
				</Text>
				<Text style={[styles.paragraph, bodyMuted, styles.paragraphLast]}>Simple, quiet, and intentionally minimal.</Text>
			</View>

			<View style={[styles.section, { borderColor: themeColors.secondaryColor, backgroundColor: themeColors.backgroundColor }]}>
				<Text style={[styles.sectionHeading, { color: themeColors.textColor }]}>How to use</Text>

				<View style={[styles.stepBlock, { borderColor: themeColors.secondaryColor }]}>
					<Text style={[styles.paragraph, bodyMuted]}>
						Create confirmations in the <Ionicons name="add" size={15} color={themeColors.textColor} /> tab{" "}
						<Text style={[bodyPrimary, { fontStyle: "italic" }]}>(for example: Front door, Oven, Bathroom light)</Text>
					</Text>
				</View>
				<View style={[styles.stepBlock, { borderColor: themeColors.secondaryColor }]}>
					<Text style={[styles.paragraph, bodyMuted]}>
						On the <Ionicons name="grid" size={14} color={themeColors.textColor} /> home screen,{" "}
						<Text style={[bodyPrimary, { fontWeight: "500" }]}>press and hold</Text> a card until the progress bar finishes to confirm it.
					</Text>
				</View>
				<View style={[styles.stepBlock, { borderColor: themeColors.secondaryColor }]}>
					<Text style={[styles.paragraph, bodyMuted]}>
						After a card is confirmed, <Text style={[bodyPrimary, { fontWeight: "500" }]}>triple-tap the card</Text>, then confirm in the alert to reset only that item (and remove its latest log entry).{" "}
						<Text style={[bodyPrimary, { fontWeight: "500" }]}>Start new session</Text> still clears every card at once.
					</Text>
				</View>
				<View style={[styles.stepBlock, { borderColor: themeColors.secondaryColor }]}>
					<Text style={[styles.paragraph, bodyMuted]}>
						View past confirmations in the <Ionicons name="list" size={14} color={themeColors.textColor} /> tab, with date and time for each entry.
					</Text>
				</View>
				<View style={[styles.stepBlock, { borderColor: themeColors.secondaryColor }]}>
					<Text style={[styles.paragraph, bodyMuted]}>
						To remove individual items, open <Ionicons name="settings" size={14} color={themeColors.textColor} /> and choose &quot;Edit current confirmations&quot;.
					</Text>
				</View>
				<View style={[styles.stepBlock, styles.stepBlockLast, { borderColor: themeColors.secondaryColor }]}>
					<Text style={[styles.paragraph, bodyMuted, styles.paragraphLast]}>
						&quot;Delete all data&quot; on the <Ionicons name="settings" size={14} color={themeColors.textColor} /> screen removes all current and past confirmations.
					</Text>
				</View>
			</View>

			<Pressable
				onPress={onContinue}
				style={({ pressed }) => [
					styles.continueButton,
					{
						borderColor: themeColors.secondaryColor,
						backgroundColor: pressed ? themeColors.secondaryColor : themeColors.backgroundColor,
					},
				]}>
				<Text style={[styles.continueLabel, { color: themeColors.textColor }]}>{fromSettings ? "Done" : "Continue"}</Text>
			</Pressable>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollContent: {
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 40,
	},
	screenTitle: {
		fontFamily: "Helvetica",
		fontSize: 20,
		fontWeight: "100",
		textAlign: "left",
		marginBottom: 20,
		marginTop: 4,
	},
	section: {
		borderWidth: 1,
		borderRadius: 10,
		marginBottom: 20,
		paddingHorizontal: 14,
		paddingVertical: 16,
	},
	sectionHeading: {
		fontFamily: "Helvetica",
		fontSize: 16,
		fontWeight: "200",
		textAlign: "left",
		marginBottom: 12,
	},
	paragraph: {
		fontFamily: "Helvetica",
		fontSize: 15,
		fontWeight: "300",
		lineHeight: 22,
		textAlign: "left",
		marginBottom: 12,
	},
	paragraphLast: {
		marginBottom: 0,
	},
	stepBlock: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		paddingVertical: 12,
	},
	stepBlockLast: {
		borderBottomWidth: 0,
		paddingBottom: 0,
	},
	continueButton: {
		borderWidth: 1,
		borderRadius: 10,
		paddingVertical: 14,
		paddingHorizontal: 16,
		marginTop: 4,
	},
	continueLabel: {
		fontFamily: "Helvetica",
		fontSize: 15,
		fontWeight: "300",
		textAlign: "left",
	},
});
