import {
    Pressable,
    PressableProps,
    Text,
    TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

type Props = PressableProps & {
    data: {
        description: string;
    };
    onDelete: () => void;
};

export function Pallet({ data, onDelete, ...rest }: Props) {
    console.log(`descrição ${data.description}`);

    return (
        <Pressable
            style={{
                backgroundColor: "#a1dcff",
                padding: 24,
                borderRadius: 5,
                gap: 12,
                flexDirection: "row",
            }}
            {...rest}
        >
            <Text style={{ flex: 1, fontSize: 25 }}>{data.description}</Text>

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={25} color="red" />
            </TouchableOpacity>
        </Pressable>
    );
}
