import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useCustomerDatabase } from "@/databases/useCustomerDatabse";

export default function Details(){
    const [data, setData] = useState({
        name: '',
        email: '',
        fone: 0,
        address: ''
    })

    const customerDatabase = useCustomerDatabase()
    const paramns = useLocalSearchParams<{id: string}>()

    useEffect(()=> {
        if (paramns.id) {
            customerDatabase.show(Number(paramns.id)).then(response => {
                if (response) {
                    setData({
                        name: response.name,
                        email: response.email,
                        fone: response.fone,
                        address: response.address
                    })
                }
            })
        }
    },[paramns.id])

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>ID: {paramns.id}</Text>
            <Text>Nome: {data.name}</Text>
            <Text>Email: {data.email}</Text>
            <Text>Telefone: {data.fone}</Text>
            <Text>Endereço: {data.address}</Text>
        </View>
    )
}