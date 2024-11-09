import {
    Pressable,
    PressableProps,
    Text,
    TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

type Props = PressableProps & {
    data: {
        name: string;
        brand: string;
        quantity: number;
    };
    onDelete: () => void;
    /*  
    onOpen: () => void */
};

export function Product({ data, onDelete, ...rest }: Props) {
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
            <Text
                style={{
                    flex: 1,
                    fontSize: 20,
                    fontWeight: 500,
                }}
            >
                Produto: {data.name}; marca: {data.brand}; estoque:
                {data.quantity}
            </Text>

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={25} color="red" />
            </TouchableOpacity>
        </Pressable>
    );
}
