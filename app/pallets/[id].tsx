import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";

import { usePalletDatabase } from "@/databases/usePalletDatabase";
import { PalletDatabase } from "@/databases/usePalletDatabase";

import { Input } from "@/components/Input";
import { Pallet } from "@/components/Pallet";

export default function Pallets() {
    const [search, setSearch] = useState("");
    const [pallets, setPallets] = useState<PalletDatabase[]>([]);

    const palletDatabase = usePalletDatabase();

    const navigation = useNavigation();
    const paramns = useLocalSearchParams<{ id: string }>();

    async function list() {
        try {
            const clienteId = parseInt(paramns.id, 10);
            console.log("Cliente ID:", clienteId); // Verificar cliente_id
            console.log("Search term:", search); // Verificar search term

            const response = await palletDatabase.searchByName(
                clienteId,
                search
            );
            console.log("Response from searchByName:", response); // Verificar resultado

            if (response) {
                setPallets(response);
            } else {
                setPallets([]); // Garante que o estado será atualizado mesmo se vazio
            }
        } catch (error) {
            console.error("Erro ao listar paletes:", error);
        }
    }

    async function remove(id: number, cliente_id: number) {
        try {
            await palletDatabase.remove(id, cliente_id);
            await list();
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        list();
    }, [search, paramns.id]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerenciamento de Paletes</Text>

            <Button
                title="Adicionar Palete"
                onPress={() => {
                    router.push(`/createPallet?clienteId=${paramns.id}`);
                }}
            />

            <Button title="Voltar" onPress={handleGoBack} />

            <Input
                placeholder="Pesquisar"
                onChangeText={setSearch}
                value={search}
            />

            <FlatList
                data={pallets}
                keyExtractor={(item) => `${item.cliente_id}-${item.id}`}
                renderItem={({ item }) => (
                    <Pallet
                        data={item}
                        onDelete={() => remove(item.id, item.cliente_id)}
                        onOpenProducts={() =>
                            router.navigate(
                                `/productsInPallet/${item.id}-${item.cliente_id}`
                            )
                        }
                    />
                )}
                contentContainerStyle={{ gap: 16 }}
                ListEmptyComponent={<Text>Nenhum palete encontrado</Text>} // Componente vazio para depuração
                style={{ flexGrow: 1, width: "100%" }} // Certifique-se de que o FlatList ocupa o espaço necessário
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 10,
    },
});
