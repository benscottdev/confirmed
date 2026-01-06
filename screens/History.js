import { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyContext } from "../context/Context";

export default function History() {
	const insets = useSafeAreaInsets();
	// Grab context via created name
	const { defaultData } = useContext(MyContext);

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5 }}>
			<Text style={styles.heading}>Previous Confirmations</Text>
			<FlatList
				data={defaultData}
				renderItem={({ item }) => (
					<View title={item.title} keyExtractor={(item) => item.id} style={styles.listItem}>
						<Text style={styles.listTitle}>{item.title}</Text>
						<View style={styles.timeStamps}>
							<Text style={[styles.info, styles.checked]}>Confirmed</Text>
							<Text style={[styles.info, styles.timeStampText]}>{item.timeConfirmed}</Text>
							<Text style={[styles.info, styles.timeStampText]}>{item.dateConfirmed}</Text>
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
		marginBottom: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: "#DFDFDF",
		padding: 10,
	},
	listTitle: {
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
		borderWidth: 0.2,
	},
	checked: {
		backgroundColor: "#fff",
	},
	timeStampText: {
		backgroundColor: "#E9E9E9",
	},
});
