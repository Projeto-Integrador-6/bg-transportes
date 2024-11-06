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
    
    return { create }
}