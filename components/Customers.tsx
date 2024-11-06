import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

type Props = PressableProps & {
    data: {
        name: string,
        email: string,
        fone: number,
        address: string
    }
    onDelete: () => void
    onOpen: () => void
}

export function Customer({data, onDelete, onOpen, ...rest}: Props){
    return (
        <Pressable style={{backgroundColor: '#CECECE', padding: 24, borderRadius: 5, gap: 12, flexDirection: 'row'}} {...rest}>
            <Text style={{ flex: 1 }}>
                {data.name} - {data.email} -{data.fone} - {data.address}
            </Text>

            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name="visibility" size={24} color="blue"/>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={24} color="red"/>
            </TouchableOpacity>
        </Pressable>
    )
}