import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import createCustomer from './createCustomer'
import { Customer } from '@/components/Customers'
import { useCustomerDatabase, CustomerDatabase } from '@/databases/useCustomerDatabse'

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

  useEffect(()=> {
    list()
  }, [search])

  return (
    <View style={styles.container}>
      <FlatList 
        data={customers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Customer data={item} />}
        contentContainerStyle={{gap: 16}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 25
  }
})

export default Index