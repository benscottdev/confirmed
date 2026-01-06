import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CreateNew() {
	const insets = useSafeAreaInsets();

	return (
		<View style={{ paddingTop: insets.top, paddingLeft: 5, paddingRight: 5 }}>
			<Text>Create New</Text>
		</View>
	);
}
