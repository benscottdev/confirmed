import { View, Text, StyleSheet, TextInput, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import { FlatGrid } from "react-native-super-grid";
import { confirmationIcons } from "../components/Icons";
import * as Haptics from "expo-haptics";

export default function CreateNew() {
	const insets = useSafeAreaInsets();
	const width = Dimensions.get("window").width;
	const { themeColors, createNewConfirmation } = useContext(DataContext);
	const [newItemName, setNewItemName] = useState("");
	const [newItemIcon, setNewItemIcon] = useState(null);

	const getItemDimension = () => {
		if (width < 375) return 75;
		if (width < 430) return 75;
		if (width < 600) return 75;
	};

	const addNewConfirmation = () => {
		createNewConfirmation(newItemName, newItemIcon);
		Haptics.notificationAsync(Haptics.notificationAsync.Warning);
		setNewItemName(null);
		setNewItemIcon(null);
	};

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5, paddingBottom: 100, height: "100%", backgroundColor: themeColors.backgroundColor }}>
			<Text style={[{ color: themeColors.textColor }, styles.heading]}>Create New Confirmation</Text>
			<View>
				<Text style={[styles.secondaryHeading, { color: themeColors.textColor }]}>Confirmation title</Text>
				<TextInput maxLength={16} value={newItemName} onChangeText={(value) => setNewItemName(value)} placeholder="e.g. Front Door, Shower, Switch" placeholderTextColor={themeColors.secondaryColor} style={[styles.textInput, { borderColor: themeColors.secondaryColor, backgroundColor: themeColors.backgroundColor, color: themeColors.textColor }]} />
				<Text style={[styles.secondaryHeading, { color: themeColors.textColor }]}>Which icon matches best?</Text>
				<FlatGrid
					scrollEnabled={false}
					itemDimension={getItemDimension()}
					data={confirmationIcons}
					spacing={5}
					renderItem={({ item }) => (
						<Pressable onPress={() => setNewItemIcon(item.name)} style={[styles.iconsWrapper, { borderColor: newItemIcon == item.name ? themeColors.textColor : themeColors.secondaryColor, backgroundColor: themeColors.backgroundColor }]}>
							<item.completeIcon width={32} height={32} fill={item.name === newItemIcon ? themeColors.textColor : themeColors.secondaryColor} />
						</Pressable>
					)}
				/>
			</View>

			{newItemIcon && newItemName && (
				<Pressable
					onPress={addNewConfirmation}
					style={({ pressed }) => [
						styles.buttonWrapper,
						{
							backgroundColor: themeColors.backgroundColor,
							borderColor: pressed ? themeColors.textColor : themeColors.secondaryColor,
						},
					]}>
					<Text style={[styles.button, { color: themeColors.textColor }]}>Create Confirmaton</Text>
				</Pressable>
			)}
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
	secondaryHeading: {
		fontFamily: "Helvetica",
		fontSize: 16,
		fontWeight: 100,
		textAlign: "left`",
		padding: 10,
		marginTop: 20,
	},

	textInput: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginHorizontal: 5,
		borderWidth: 1,
		fontSize: 16,
		borderRadius: 5,
	},
	iconsWrapper: {
		aspectRatio: 1,
		borderRadius: 5,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		aspectRatio: 1,
		// width: 10,
	},
	buttonWrapper: {
		padding: 12,
		borderRadius: 8,
		marginHorizontal: 5,
		borderWidth: 1,
	},
});
