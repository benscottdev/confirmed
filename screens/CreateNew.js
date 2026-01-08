import { View, Text, StyleSheet, TextInput, Pressable, Dimensions, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import { FlatGrid } from "react-native-super-grid";
import { confirmationIcons } from "../components/Icons";

export default function CreateNew() {
	const insets = useSafeAreaInsets();
	const width = Dimensions.get("window").width;
	const { themeColors, createNewConfirmation } = useContext(DataContext);
	const [newItemName, setNewItemName] = useState("");
	const [newItemIcon, setNewItemIcon] = useState(null);

	const getItemDimension = () => {
		if (width < 375) return 130;
		if (width < 430) return 150;
		if (width < 600) return 170;
		return 200;
	};

	const addNewConfirmation = () => {
		createNewConfirmation(newItemName, newItemIcon);
		setNewItemName(null);
		setNewItemIcon(null);
	};

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5, paddingBottom: 100, height: "100%", backgroundColor: themeColors.backgroundColor }}>
			<Text style={[{ color: themeColors.textColor }, styles.heading]}>Create New Confirmation</Text>
			<View>
				<Text style={[styles.secondaryHeading, { color: themeColors.textColor }]}>Choose a name</Text>
				<TextInput value={newItemName} onChangeText={(value) => setNewItemName(value)} placeholder="e.g. Front Door, Shower, Switch" placeholderTextColor={themeColors.tertiaryColor} style={[styles.textInput, { borderColor: themeColors.tertiaryColor, backgroundColor: themeColors.secondaryColor, color: themeColors.textColor }]} />
				<Text style={[styles.secondaryHeading, { color: themeColors.textColor }]}>Which icon matches best?</Text>
				<FlatGrid
					itemDimension={getItemDimension() / 2}
					data={confirmationIcons}
					renderItem={({ item }) => (
						<Pressable onPress={() => setNewItemIcon(item.name)} style={[styles.iconsWrapper, { backgroundColor: themeColors.secondaryColor, borderColor: themeColors.tertiaryColor }]}>
							<item.completeIcon width={32} height={32} fill={themeColors.textColor} />
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
							backgroundColor: pressed ? themeColors.secondaryColor : themeColors.tertiaryColor,
							borderColor: pressed ? themeColors.tertiaryColor : themeColors.secondaryColor,
							padding: 12,
							borderRadius: 8,
						},
					]}>
					<Text style={[styles.button, { color: themeColors.textColor }]}>Create Confirmaton</Text>
				</Pressable>
			)}

			{/* DEBUG */}
			<Text>{newItemName}</Text>
			<Text>{newItemIcon}</Text>
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
		textAlign: "center",
		padding: 10,
		marginTop: 20,
	},

	textInput: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		margin: 5,
		borderWidth: 1,
		fontSize: 16,
		borderRadius: 5,
	},
	iconsWrapper: {
		aspectRatio: 1,
		borderRadius: 5,
		borderWidth: 0.5,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		aspectRatio: 1,
		// width: 10,
	},
});
