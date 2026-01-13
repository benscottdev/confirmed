import { View, Text, Pressable, FlatList, StyleSheet, Dimensions } from "react-native";
import { DataContext } from "../context/DataContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

export const EditConfirmations = () => {
	const insets = useSafeAreaInsets();
	const { deleteById, themeColors, data } = useContext(DataContext);
	const navigation = useNavigation();

	const currentConfirmations = data["current-confirmations"];

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 10, paddingRight: 10, paddingBottom: insets.bottom, height: "100%", backgroundColor: themeColors.backgroundColor }}>
			<Text style={[{ color: "#FF3131" }, styles.subText]}>Deleted confirmations are not recoverable.</Text>
			<FlatList
				data={currentConfirmations}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View title={item.title} key={item.id} style={[{ borderColor: themeColors.tertiaryColor }, styles.listItem]}>
						<Text style={[{ color: themeColors.textColor }, styles.listTitle]}>{item.name}</Text>
						<Pressable onPress={() => deleteById(item.id)} style={[styles.deleteButton, { borderColor: themeColors.secondaryColor, backgroundColor: themeColors.tertiaryColor }]}>
							<Text style={{ color: themeColors.textColor }}>Delete</Text>
						</Pressable>
					</View>
				)}
			/>
			<Pressable onPress={() => navigation.goBack()} style={[styles.backButton, { borderColor: themeColors.secondaryColor, backgroundColor: themeColors.tertiaryColor }]}>
				<Text style={[styles.deleteButtonText, { textAlign: "center", color: themeColors.textColor }]}>Back</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	heading: {
		fontFamily: "Helvetica",
		fontSize: 20,
		fontWeight: 100,
		textAlign: "center",
		padding: 10,
		marginBottom: 20,
	},
	deleteButton: {
		borderWidth: 1,
		paddingVertical: 3,
		paddingHorizontal: 20,
		borderRadius: 3,
	},
	deleteButtonText: {
		marginVertical: 5,
		fontFamily: "Helvetica",
		fontSize: 14,
	},
	subText: {
		textAlign: "center",
		paddingVertical: 20,
	},
	listItem: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 0.5,
		paddingVertical: 14,
	},
	listTitle: {
		fontWeight: 100,
		fontFamily: "Helvetica",
		fontSize: 16,
		textTransform: "capitalize",
		zIndex: 99999,
	},
	backButton: {
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 5,
	},
});
