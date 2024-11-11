// createPallet.tsx

import { Input } from "@/components/Input";
import { usePalletDatabase } from "@/databases/usePalletDatabase";
import Header from "@/layout/Header";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Button, View, StyleSheet, Text } from "react-native"; // Adicione StyleSheet se necessário

export default function CreatePallet() {
    const [description, setDescription] = useState(""); // para a descrição do palete
    const palletDatabase = usePalletDatabase();

    const { clienteId } = useLocalSearchParams<{ clienteId: string }>();
    const clientId = clienteId ? parseInt(clienteId) : null;

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    async function create() {
        if (!clientId || description.trim() === "") {
            Alert.alert(
                "Erro",
                "Cliente ID e descrição do palete são obrigatórios."
            );
            return;
        }

        try {
            const response = await palletDatabase.create({
                cliente_id: clientId,
                description,
            });

            Alert.alert(
                "Sucesso",
                `Palete cadastrado com sucesso! Palete nº ${response.insertedRowId}`
            );

            setDescription(""); // Limpa o campo de descrição após o cadastro
            navigation.goBack(); // Opcional: Volta para a tela anterior após o sucesso
        } catch (error) {
            Alert.alert("Erro", "Falha ao adicionar o palete.");
            console.error(error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Header />

            <View
                style={{
                    justifyContent: "center",
                    padding: 32,
                    gap: 16,
                }}
            >
                <Text>id: {clientId} </Text>
                <Input
                    placeholder="Descrição"
                    onChangeText={setDescription}
                    value={description}
                />

                <Button title="Salvar" onPress={create} />
                {/* Botão para voltar à tela anterior */}
                <Button title="Voltar" onPress={handleGoBack} />
            </View>
        </View>
    );
}
