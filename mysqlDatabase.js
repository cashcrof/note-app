const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
  })
  .promise()

async function getNotes() {
    let query = `
    SELECT * FROM notes;
    `
    const [rows] = await pool.query(query)
    return rows;
}
exports.getNotes = getNotes

async function getNote(id) {
    let query = `
    SELECT * 
    FROM notes
    WHERE id = ?
    `
  
    const [rows] = await pool.query(query, [id])
    return rows[0]
  }
  
exports.getNote = getNote

async function addNote(title, contents) {
    let query = `
    INSERT INTO notes(title, contents)
    VALUES (?, ?);
    `

    const [rows] = await pool.query(query, [title, contents])
    return rows[0]
}
exports.addNote = addNote

async function deleteNote(id) {
    console.log("id:", id)
    const [result] = await pool.query(`
    DELETE FROM notes
    WHERE id = ?
    `, [id])
    return result
}
exports.deleteNote = deleteNote
