import { useSQLiteContext } from "expo-sqlite";

export type PalletDatabase = {
    id: number;
    cliente_id: number;
    description: string;
};

export function usePalletDatabase() {
    const database = useSQLiteContext();

    async function create(data: Omit<PalletDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO paletes(cliente_id, description) VALUES($cliente_id, $description)"
        );

        try {
            const result = await statement.executeAsync({
                $cliente_id: data.cliente_id,
                $description: data.description,
            });

            const insertedRowId = result.lastInsertRowId.toLocaleString();

            return { insertedRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function searchByName(cliente_id: number, description: string) {
        try {
            console.log(
                "Executando consulta SQL para cliente_id:",
                cliente_id,
                "com descrição:",
                description
            );
            const query =
                "SELECT * FROM paletes WHERE cliente_id = ? AND description LIKE ?";
            const response = await database.getAllAsync<PalletDatabase>(
                query,
                cliente_id,
                `%${description}%`
            );
            console.log("Resultado da consulta:", response); // Verificar resultado

            return response;
        } catch (error) {
            console.error("Erro na consulta SQL:", error);
            throw error;
        }
    }

    async function remove(id: number, cliente_id: number) {
        try {
            const statement = await database.prepareAsync(
                "DELETE FROM paletes WHERE id = ? AND cliente_id = ?"
            );
            await statement.executeAsync([id, cliente_id]);
        } catch (error) {
            throw error;
        }
    }

    return { create, searchByName, remove };
}
