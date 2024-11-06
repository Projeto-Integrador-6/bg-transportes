import React, { useEffect, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import { router } from 'expo-router'

import { Customer } from '@/components/Customers'
import { useCustomerDatabase, CustomerDatabase } from '@/databases/useCustomerDatabse'
import { Input } from '@/components/Input'
import Header from '@/layout/Header'

const Index = () => {
  const [search, setSearch] = useState('')
  const [customers, setCustomers] = useState<CustomerDatabase[]>([])
  const customerDatabase = useCustomerDatabase()

  async function list() {
    try {
      const response = await customerDatabase.searchByName(search)
      setCustomers(response)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: number) {
    try {
      await customerDatabase.remove(id)
      await list()
    } catch (error) {
      throw error
    }
  }

  useEffect(()=> {
    list()
  }, [search])

  return (

    

    <View> 
      <Header />

      <View style={{justifyContent: 'center', padding: 32, gap: 16}}>
      <Input placeholder='Pesquisar' onChangeText={setSearch} value={search} />
      
      <FlatList 
        data={customers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Customer 
            data={item} 
            onDelete={() => 
            remove(item.id)} 
            onOpen={() => router.navigate(`/details/${item.id}`)}
          />
        )}
        contentContainerStyle={{gap: 16}}
      />
      </View>
    </View>
  )
}

export default Index