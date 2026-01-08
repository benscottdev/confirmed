import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataContext } from "../context/DataContext";

export default function History() {
	const insets = useSafeAreaInsets();
	// Grab context via created name
	const { data, themeColors } = useContext(DataContext);

	const historyData = data?.["previous-confirmations"];

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5, paddingBottom: 100, height: "100%", backgroundColor: themeColors.backgroundColor }}>
			<Text style={[{ color: themeColors.textColor }, styles.heading]}>Previous Confirmations</Text>
			<FlatList
				data={historyData}
				renderItem={({ item }) => (
					<View title={item.title} keyExtractor={(item) => item.id} style={[{ borderColor: themeColors.tertiaryColor }, styles.listItem]}>
						<Text style={[{ color: themeColors.textColor }, styles.listTitle]}>{item.title}</Text>
						<View style={styles.timeStamps}>
							<Text
								style={[
									{
										color: themeColors.textColor,
										backgroundColor: themeColors.backgroundColor,
										borderColor: themeColors.tertiaryColor,
										borderWidth: 0.5,
									},
									styles.info,
									styles.checked,
								]}>
								Confirmed
							</Text>
							<Text
								style={[
									{
										color: themeColors.textColor,
										backgroundColor: themeColors.secondaryColor,
										borderColor: themeColors.tertiaryColor,
										borderWidth: 0.5,
									},
									styles.info,
									styles.timeStampText,
								]}>
								{item.timeConfirmed}
							</Text>
							<Text
								style={[
									{
										color: themeColors.textColor,
										backgroundColor: themeColors.secondaryColor,
										borderColor: themeColors.tertiaryColor,
										borderWidth: 0.5,
									},
									styles.info,
									styles.timeStampText,
								]}>
								{item.dateConfirmed}
							</Text>
						</View>
					</View>
				)}
			/>
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
	listItem: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// marginBottom: 10,
		borderBottomWidth: 0.5,
		// borderBottomColor: "#DFDFDF",
		paddingVertical: 14,
		paddingHorizontal: 10,
	},
	listTitle: {
		fontWeight: 100,
		fontFamily: "Helvetica",
		fontSize: 16,
		textTransform: "capitalize",
	},
	timeStamps: {
		flexDirection: "row",
		gap: 5,
	},
	info: {
		borderRadius: 5,
		paddingVertical: 3,
		paddingHorizontal: 6,
		fontSize: 12,
	},
	checked: {
		// backgroundColor: "#fff",
	},
	timeStampText: {},
});
