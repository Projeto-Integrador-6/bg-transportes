import { View, Text, Button, Alert, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/layout/Header'
import { Input } from '@/components/Input'


import { useProductDatabase, ProductDatabase } from '@/databases/useProductDatabase'
import { Product } from '@/components/Product'

const CreateProduct = () => {
  const [id, setId] = useState('')
  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [quantity, setQuantity] = useState('')
  const [products, setProducts] = useState<ProductDatabase[]>([])

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

  async function update(){
    try {
        if(isNaN(Number(quantity))){
            return Alert.alert('A quantidade deve ser um valor valido')
        }
    } catch (error) {
        console.log(error)
    }

    await productDatabase.update({ 
        id: Number(id) , 
        name, 
        brand, 
        quantity: Number(quantity) 
    })

    Alert.alert(`Produto atualizado`)
}

  async function list(){
    try {
      const response = await productDatabase.searchByName(search)
      setProducts(response)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: number){
    try {
        await productDatabase.remove(id)
        await list()
    } catch (error) {
        console.log(error)
    }
}

  function details(item: ProductDatabase){
    setId(String(item.id))
    setName(item.name)
    setBrand(item.brand)
    setQuantity(String(item.quantity))
    
}

  async function handleSave(){
    if (id) {
        update()
    } else{
        create()
    }

    setId('')
    setName('')
    setBrand('')
    setQuantity('')

    await list()
}

  useEffect(()=> {
    list()
  }, [search])

  return (
    <View style={{flex: 1}}>
    <Header />

    <View style={{justifyContent: 'center', padding: 32, gap: 16}}>
      <Input placeholder='Nome do Produto' onChangeText={setName} value={name} />
      <Input placeholder='Marca' onChangeText={setBrand} value={brand}/>
      <Input placeholder='Quantidade' onChangeText={setQuantity} value={quantity}/>
      
      <Button title='Salvar' onPress={handleSave}/>

      <Input placeholder='Pesquisar' onChangeText={setSearch}/>

      <ScrollView style={{ height: 160 }}>
      <FlatList 
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product 
            data={item} 
            onPress={()=> details(item)}
           onDelete={() => 
            remove(item.id)} 
          />
        )}
        contentContainerStyle={{gap: 16}}
      />
      </ScrollView>

    </View>

  </View>
  )
}

export default CreateProduct