const express = require("express");
const app = express();
const data = require("./Data");
app.use(express.json());



app.get('/api/persons',(req, res)=>{
    res.json(data);
})


app.get('/info',(req, res)=>{
    let info = `Phoneboook has info of ${data.length} People <br/>
    ${Date()} `
    res.send(info);
})

const PORT = 3001;

app.listen(PORT, (req, res)=>{
console.log(`Server running on port ${PORT}`)
})
