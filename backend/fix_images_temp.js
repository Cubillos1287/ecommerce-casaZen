import pool from './database/config.js';

const fixImages = async () => {
    try {
        console.log("Iniciando corrección de imágenes...");

        for (let i = 1; i <= 50; i++) {
            const query = "UPDATE products SET img = $1 WHERE id = $2";
            const values = [`${i}.jpg`, i];
            await pool.query(query, values);
            console.log(`Producto ${i} actualizado a imagen ${i}.jpg`);
        }

        console.log("¡Corrección finalizada!");
        process.exit(0);
    } catch (error) {
        console.error("Error corrigiendo imágenes:", error);
        process.exit(1);
    }
};

fixImages();
