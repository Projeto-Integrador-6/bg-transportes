// _layout.tsx
import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/TabBar'
import { SQLiteProvider } from 'expo-sqlite'
import { initializeDatabase } from '@/databases/initializeDatabase'

const _layout = () => {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <Tabs tabBar={props => <TabBar {...props} />}>
        <Tabs.Screen
          name="createProduct"
          options={{
            title: 'Produtos',
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tela Inicial',
          }}
        />
        <Tabs.Screen
          name="createCustomer"
          options={{
            title: 'Clientes',
          }}
        />
      </Tabs>
    </SQLiteProvider>
  )
}

export default _layout
