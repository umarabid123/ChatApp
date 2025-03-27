import React from "react";
import { Text } from "react-native";

export default function AppText({
	fontSize,
	fontWeight=400,
	fontFamily,
	lineHeight,
	color ='#000',
	style,
    text,
	onPress
}: {
	fontSize?: number;
	fontWeight?: number;
	lineHeight?: number;
	fontFamily?: string;
	color?: string;
	style?: object;
    text:any;
	onPress?:() => void
}) {
	return (
		<Text
			style={[
				{
					fontSize: fontSize,
					fontWeight: fontWeight,
					color: color,
					lineHeight: lineHeight,
					fontFamily: fontFamily,
				},
				style,
			]}
			onPress={onPress}
		>
            {text}
        </Text>
	);
}
