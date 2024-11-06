import { useSQLiteContext } from "expo-sqlite"

export type CustomerDatabase ={
    id: number,
    name: string,
    email: string,
    fone: number,
    address: string
}

export function useCustomerDatabase(){
    const database = useSQLiteContext()

    async function create(data: Omit<CustomerDatabase, 'id'>){
        const statement = await database.prepareAsync(
            'INSERT INTO clientes(name, email, fone, address) VALUES ($name, $email, $fone, $address)'
        )
        
        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $email: data.email,
                $fone: data.fone,
                $address: data.address
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
            const query = 'SELECT * FROM clientes WHERE name LIKE ?'

            const response = await database.getAllAsync<CustomerDatabase>(query,`%${name}%`)

            return response
        } catch (error) {
            throw error
        }
    }
    return{ create, searchByName }
}