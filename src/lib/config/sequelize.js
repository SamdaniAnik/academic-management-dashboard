import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule: mysql2,
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '', // Add password if you have one
    database: 'academic_management_dashboard',
    logging: true,
});


export default sequelize;
