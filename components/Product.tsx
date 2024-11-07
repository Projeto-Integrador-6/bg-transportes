import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

type Props = PressableProps & {
    data: {
        name: string,
        brand: string,
        quantity: number,
    }
    onDelete: () => void
/*  
    onOpen: () => void */
}

export function Product({data, onDelete, ...rest}: Props){
    return (
        <Pressable style={{
                backgroundColor: '#CECECE', 
                padding: 24, 
                borderRadius: 5, 
                gap: 12, 
                flexDirection: 'row'
            }} 
            {...rest}
        >
            <Text style={{ flex: 1, fontSize: 15 }}>
                {data.name} - {data.brand} - {data.quantity}
            </Text>

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={25} color="red"/>
            </TouchableOpacity> 
        </Pressable>
    )
}