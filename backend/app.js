import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()


const port = process.env.NODE_PORT

app.listen(port, () => {
    console.log(`server http://localhost:${port} portunda isleyir`);
})