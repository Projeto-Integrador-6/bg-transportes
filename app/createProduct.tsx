import { View, Text, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '@/layout/Header'
import { Input } from '@/components/Input'

import { useProductDatabase, ProductDatabase } from '@/databases/useProductDatabase'

const CreateProduct = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [quantity, setQuantity] = useState('')

  const productDatabase = useProductDatabase()

  async function create(){
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert('Insira um valor válido')
      }

      const response = await productDatabase.create({
        name,
        brand,
        quantity: Number(quantity)
      })

      Alert.alert(`Produto cadastrado com o ID: ${response.insertedRowId}`)

    } catch (error) {
      throw error
    }
  }

  return (
    <View style={{flex: 1}}>
    <Header />

    <View style={{justifyContent: 'center', padding: 32, gap: 16}}>
      <Input placeholder='Nome do Produto' onChangeText={setName} value={name} />
      <Input placeholder='Marca' onChangeText={setBrand} value={brand}/>
      <Input placeholder='Quantidade' onChangeText={setQuantity} value={quantity}/>
      
      <Button title='Salvar' onPress={create}/>
    </View>

  </View>
  )
}

export default CreateProduct