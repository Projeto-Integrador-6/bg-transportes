import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useCustomerDatabase } from "@/databases/useCustomerDatabse";
import { StyleSheet } from "react-native";

export default function Details() {
    const [data, setData] = useState({
        name: "",
        email: "",
        fone: 0,
        address: "",
    });

    const customerDatabase = useCustomerDatabase();
    const paramns = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        if (paramns.id) {
            customerDatabase.show(Number(paramns.id)).then((response) => {
                if (response) {
                    setData({
                        name: response.name,
                        email: response.email,
                        fone: response.fone,
                        address: response.address,
                    });
                }
            });
        }
    }, [paramns.id]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do cliente</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>
                    Identificador: {paramns.id}
                </Text>
                <Text style={styles.detailText}>Nome: {data.name}</Text>
                <Text style={styles.detailText}>Email: {data.email}</Text>
                <Text style={styles.detailText}>Telefone: {data.fone}</Text>
                <Text style={styles.detailText}>Endereço: {data.address}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Cor de fundo suave
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333", // Cor do título
    },
    detailsContainer: {
        width: "100%", // Garantir que a caixa de detalhes ocupe todo o espaço possível
        maxWidth: 400, // Limitar largura máxima
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ddd", // Cor da borda mais suave
        shadowColor: "#000", // Sombras para um efeito de profundidade
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6, // Para iOS e Android
        gap: 12,
    },
    detailText: {
        fontSize: 18,
        color: "#555", // Cor de texto mais suave
        lineHeight: 26, // Maior altura de linha para melhor legibilidade
    },
});
