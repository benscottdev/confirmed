import { View, Text, StyleSheet, Dimensions, Pressable, Button, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataContext } from "../context/DataContext";
import { useContext, useRef } from "react";
import { FlatGrid } from "react-native-super-grid";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import * as Haptics from "expo-haptics";

export default function Home() {
	const insets = useSafeAreaInsets();
	const width = Dimensions.get("window").width;
	const { themeColors, data, setCompletedById, startNewCheck } = useContext(DataContext);
	const currentConfirmationsData = data?.["current-confirmations"] || [];

	const getItemDimension = () => {
		if (width < 375) return 130;
		if (width < 430) return 150;
		if (width < 600) return 170;
		return 200;
	};

	// Store animations and completion state
	const animations = useRef({});

	const startAnimation = (itemId) => {
		// Create animation if it doesn't exist
		if (!animations.current[itemId]) {
			animations.current[itemId] = new Animated.Value(0);
		}

		const anim = animations.current[itemId];

		// Start animation
		Animated.timing(anim, {
			toValue: 100,
			duration: 2000,
			delay: 150,
			useNativeDriver: false,
		}).start(({ finished }) => {
			if (finished) {
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
				setCompletedById(itemId);
			}
		});
	};

	const stopAnimation = (itemId) => {
		if (animations.current[itemId]) {
			animations.current[itemId].stopAnimation();
			Animated.timing(animations.current[itemId], {
				toValue: 0,
				duration: 100,

				useNativeDriver: false,
			}).start();
		}
	};

	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingLeft: 5,
				paddingRight: 5,
				paddingBottom: insets.bottom + 55,
				flex: 1,
				backgroundColor: themeColors.backgroundColor,
			}}>
			<FlatGrid
				itemDimension={getItemDimension()}
				spacing={10}
				data={currentConfirmationsData}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => {
					// Get or create animation for this item
					if (!animations.current[item.id]) {
						animations.current[item.id] = new Animated.Value(0);
					}
					const anim = animations.current[item.id];

					return (
						<Pressable onPressIn={() => startAnimation(item.id)} onPressOut={() => stopAnimation(item.id)} style={[item.confirmed ? { backgroundColor: themeColors.secondaryColor } : { backgroundColor: themeColors.backgroundColor }, styles.box, item.confirmed ? styles.confirmed : styles.unconfirmed]}>
							{item.confirmed == false && (
								<Animated.View
									style={[
										{ backgroundColor: themeColors.tertiaryColor },
										styles.progressBar,
										{
											width: anim.interpolate({
												inputRange: [0, 100],
												outputRange: ["0%", "100%"],
											}),
										},
									]}
								/>
							)}
							<Ionicons size={30} color="#c3c3c3" name="alert-circle" />
							<Text style={[{ color: themeColors.textColor }, styles.name]}>{item.name}</Text>
							{/* <Text style={{ color: themeColors.textColor }}>{item.confirmed ? "true" : "false"}</Text> */}
							{/* <Text style={{ color: themeColors.textColor }}>{item.id}</Text> */}
							{/* {item.lastConfirmedDate ? <Text style={{ color: themeColors.textColor }}>{item.lastConfirmedDate}</Text> : null} */}
							{item.confirmed && item.lastConfirmedTime ? <Text style={[{ color: themeColors.textColor, backgroundColor: themeColors.secondaryColor, borderColor: themeColors.tertiaryColor }, styles.confirmedAt]}>Confirmed・{item.lastConfirmedTime}</Text> : null}
							{!item.confirmed && item.lastConfirmedTime ? <Text style={[{ color: "grey" }, styles.lastConfirmed]}>Last Confirmed・{item.lastConfirmedTime}</Text> : null}
						</Pressable>
					);
				}}
				keyExtractor={(item) => item.id.toString()}
			/>
			{data?.["current-confirmations"].length > 0 && (
				<Pressable
					onPress={startNewCheck}
					style={({ pressed }) => [
						styles.buttonWrapper,
						{
							backgroundColor: pressed ? themeColors.secondaryColor : themeColors.tertiaryColor,
							borderColor: pressed ? themeColors.tertiaryColor : themeColors.secondaryColor,
							padding: 12,
							borderRadius: 8,
						},
					]}>
					<Text style={[styles.button, { color: themeColors.textColor }]}>Reset Confirmed</Text>
				</Pressable>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	box: {
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		position: "relative",
		overflow: "hidden",
		gap: 5,
	},
	progressBar: {
		position: "absolute",
		left: 0,
		top: 0,
		height: "100%",
		opacity: 0.3,
	},
	name: {
		fontSize: 20,
		textTransform: "capitalize",
		textAlign: "center",
		fontWeight: "100",
		zIndex: 10,
	},
	unconfirmed: {
		boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.3)",
	},
	confirmed: {
		boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.3)",
	},
	lastConfirmed: {
		fontSize: 10,
		fontWeight: 200,
		marginTop: 10,
		padding: 5.5,
	},
	confirmedAt: {
		fontSize: 10,
		borderRadius: 5,
		padding: 5,
		borderWidth: 0.5,
		marginTop: 10,
		fontWeight: 100,
	},
	buttonWrapper: {
		borderWidth: 0.5,
		padding: 10,
		borderRadius: 10,
	},
	button: {
		textAlign: "center",
		fontWeight: 100,
		// font,
	},
});
