import mysql from 'mysql';


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root123',
  database : 'ranking'

});//

export default connection;