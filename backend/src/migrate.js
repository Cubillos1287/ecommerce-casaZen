import pool from './config/db.js';

const actualizarEsquema = async () => {
    try {
        const client = await pool.connect();

        // Verificar si la columna existe
        const res = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name='rol';
    `);

        if (res.rows.length === 0) {
            console.log('Agregando columna "rol" a la tabla "users"...');
            await client.query(`ALTER TABLE users ADD COLUMN rol VARCHAR(20) DEFAULT 'user';`);
            console.log('Columna "rol" agregada correctamente.');
        } else {
            console.log('La columna "rol" ya existe. No es necesario realizar cambios.');
        }

        // Verificar si existe el usuario admin
        const adminEmail = 'admin@casazen.com';
        const resAdmin = await client.query(`SELECT * FROM users WHERE email = $1`, [adminEmail]);

        if (resAdmin.rows.length > 0) {
            console.log(`Usuario con email ${adminEmail} encontrado. Actualizando rol a "admin"...`);
            await client.query(`UPDATE users SET rol = 'admin' WHERE email = $1`, [adminEmail]);
            console.log('Rol de administrador asignado correctamente.');
        } else {
            console.log(`Usuario con email ${adminEmail} no encontrado. Por favor regístrate con ese email para ser admin.`);
        }

        client.release();
        process.exit(0);

    } catch (err) {
        console.error('Error al actualizar la base de datos:', err);
        process.exit(1);
    }
};

actualizarEsquema();
