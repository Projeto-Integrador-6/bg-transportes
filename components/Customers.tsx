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
        name: string;
        email: string;
        fone: number;
        address: string;
    };
    onDelete: () => void;
    onOpen: () => void;
    onOpenPallet: () => void;
};

export function Customer({
    data,
    onDelete,
    onOpen,
    onOpenPallet,
    ...rest
}: Props) {
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
            <Text style={{ flex: 1, fontSize: 25 }}>{data.name}</Text>

            <TouchableOpacity onPress={onOpenPallet}>
                <MaterialIcons name="inbox" size={25} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name="visibility" size={25} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={25} color="red" />
            </TouchableOpacity>
        </Pressable>
    );
}
