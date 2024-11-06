import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
    data: {
        name: string,
        email: string,
        fone: number,
        address: string
    }
}

export function Customer({data, ...rest}: Props){
    return (
        <Pressable style={{backgroundColor: '#CECECE', padding: 24, borderRadius: 5, gap: 12, flexDirection: 'row'}} {...rest}>
            <Text>
                {data.name} - {data.email} -{data.fone} - {data.address}
            </Text>
        </Pressable>
    )
}