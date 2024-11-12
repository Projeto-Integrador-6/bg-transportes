import { Text, View, StyleSheet } from "react-native";

export default function AddProductInPallet() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todos os Produtos</Text>
            {/* Aqui você pode adicionar uma lista dos produtos ou outros elementos */}
            <Text style={styles.placeholderText}>Nenhum produto .</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
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
