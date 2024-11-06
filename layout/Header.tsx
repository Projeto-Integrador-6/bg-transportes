// components/Header.js
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import logo from "@/assets/images/logo.png";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={logo} // Substitua pela URL da sua imagem
        style={styles.logo} // Adiciona estilos à imagem
      />
    </View>
  );
}

// Define os estilos
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: "center", // Centraliza a logo horizontalmente
    backgroundColor: "#1b1b53", // Define a cor de fundo (ajuste conforme necessário)
  },
  logo: {
    width: 80, // Largura da logo (ajuste conforme necessário)
    height: 80, // Altura da logo (ajuste conforme necessário)
    resizeMode: "contain", // Mantém a proporção da imagem
  },
});
