import express from "express"
import ruotes from "./routes/index"



const app = express()

const PORT = 3000

app.use(express.json())
app.use('/',ruotes)


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})