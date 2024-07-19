import express from "express"
import ruotes from "./routes/index"
import dotenv from "dotenv"
import cors from "cors"

const PORT = 3000

const app = express()
app.use(cors())
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.send("Hello World")
})


app.use('/api',ruotes)



app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})