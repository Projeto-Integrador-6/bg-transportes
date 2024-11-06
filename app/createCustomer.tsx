import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/Input'

import { useCustomerDatabase, CustomerDatabase } from '@/databases/useCustomerDatabse'
import Header from '@/layout/Header'

const CreateCustomer = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  /* const [search, setSearch] = useState('') */
  const [email, setEmail] = useState('')
  const [fone, setFone] = useState('')
  const [address, setAdress] = useState('')
  /* const [customers, setCustomers] = useState<CustomerDatabase[]>([]) */ 


  const customerDatabase = useCustomerDatabase()

  async function create() {
    try {
      if (isNaN(Number(fone))) {
        return Alert.alert('O Telefone precisa ser um número!')
      }

      const response = await customerDatabase.create({
        name,
        email,
        fone: Number(fone),
        address
      })
      
      Alert.alert(`Cliente cadastrado com o ID: ${response.insertedRowId}`)
    } catch (error) {
      throw error
    }
  }  

  return (
    <View style={{flex: 1}}>
      <Header />

      <View style={{justifyContent: 'center', padding: 32, gap: 16}}>
        <Input placeholder='Nome' onChangeText={setName} value={name} />
        <Input placeholder='Email' onChangeText={setEmail} value={email}/>
        <Input placeholder='Telefone' onChangeText={setFone} value={fone}/>
        <Input placeholder='Endereço' onChangeText={setAdress} value={address}/>
        
        <Button title='Salvar' onPress={create}/>
      </View>
    </View>
  )
}

export default CreateCustomer
