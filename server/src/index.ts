import express from "express"
import ruotes from "./routes/index"
import dotenv from "dotenv"


const PORT = 3000

const app = express()
dotenv.config()
app.use(express.json())


app.use('/api',ruotes)



app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})