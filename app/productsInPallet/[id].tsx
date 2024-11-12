import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
    useProductDatabase,
    ProductDatabase,
} from "@/databases/useProductDatabase"; // ajuste o caminho conforme necessário
import { Product } from "@/components/Product"; // ajuste o caminho conforme necessário

export default function ProductInPallet() {
    const [products, setProducts] = useState<ProductDatabase[]>([]); // estado para armazenar os produtos

    const productDatabase = useProductDatabase();

    async function list() {
        try {
            const response = await productDatabase.searchByName("");
            setProducts(response);
            console.log(response);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        list();
    }, []);

    const handleDelete = (id: number) => {
        // Lógica para excluir o produto
        console.log(`Excluir produto com ID: ${id}`);
        // Aqui você pode chamar o método remove do hook useProductDatabase
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Produtos no Palete</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Product
                        data={item}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.placeholderText}>
                        Nenhum produto adicionado ainda.
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 16,
    },
    placeholderText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
    },
});
