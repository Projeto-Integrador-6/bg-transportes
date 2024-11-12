// _layout.tsx
import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "@/databases/initializeDatabase";

const _layout = () => {
    return (
        <SQLiteProvider
            databaseName="myDatabase.db"
            onInit={initializeDatabase}
        >
            <Tabs tabBar={(props) => <TabBar {...props} />}>
                <Tabs.Screen
                    name="createProduct"
                    options={{
                        title: "Produtos",
                    }}
                />
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Tela inicial",
                    }}
                />
                <Tabs.Screen
                    name="createCustomer"
                    options={{
                        title: "Cadastrar Clientes",
                    }}
                />
                <Tabs.Screen
                    name="details/[id]"
                    options={{
                        title: "Detalhes do cliente",
                    }}
                />

                <Tabs.Screen
                    name="createPallet"
                    options={{
                        title: "Adicionar palete",
                    }}
                />

                <Tabs.Screen
                    name="pallets/[id]"
                    options={{
                        title: "paletes",
                    }}
                />

                <Tabs.Screen
                    name="productsInPallet/[id]"
                    options={{
                        title: "Lista ",
                    }}
                />
            </Tabs>
        </SQLiteProvider>
    );
};

export default _layout;
