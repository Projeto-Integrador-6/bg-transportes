import React from "react";
import { View, Image, StyleSheet } from "react-native";
import logo from "@/assets/images/logoPalletFlow.png";

export default function Header() {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#1b1b53",
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
});
