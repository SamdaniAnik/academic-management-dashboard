import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule: mysql2,
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'academic_management_dashboard',
    logging: process.env.NODE_ENV === 'production' ? false : true,
});


export default sequelize;
