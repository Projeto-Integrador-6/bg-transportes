import { useSQLiteContext } from "expo-sqlite"

export type ProductDatabase ={
    id: number,
    name: string,
    brand: string,
    quantity: number,
}

export function useProductDatabase(){
    const database = useSQLiteContext()

    async function create(data:Omit<ProductDatabase, 'id'>) {
        const statement = await database.prepareAsync(
            'INSERT INTO produtos(name, brand, quantity) VALUES ($name, $brand, $quantity)'
        )

        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $brand: data.brand,
                $quantity: data.quantity
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        } catch (error) {
            throw error
        } finally{
            await statement.finalizeAsync()
        }
    }

    async function searchByName(name:string) {
        try {
            const query = 'SELECT * FROM produtos WHERE name LIKE ?'

            const response = await database.getAllAsync<ProductDatabase>(query,`%${name}%`)

            return response
        } catch (error) {
            throw error
        }
    }

    async function update(data: ProductDatabase){
        const statement = await database.prepareAsync(
            'UPDATE produtos SET name=$name, brand=$brand, quantity=$quantity WHERE id=$id'
        )
        
        try {
            await statement.executeAsync({
                $id: data.id,
                $name: data.name,
                $brand: data.brand,
                $quantity: data.quantity
            })

        } catch (error) {
            throw error
        } finally{
            await statement.finalizeAsync()
        }
    }

    async function remove(id:number) {
        try {
            await database.execAsync('DELETE FROM produtos WHERE id = ' + id)
        } catch (error) {
            
        }
    }
    
    return { create, searchByName, update, remove }
}