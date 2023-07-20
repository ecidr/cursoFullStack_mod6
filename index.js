const express = require("express")
const fs = require ("fs")

const app = express()

const port = 3000
app.use(express.json())//permite trabajar con json dentro de xpress

app.get("/", (req, res)=>{
    fs.readFile("./datos/anime.json", "utf8", (error, data)=> {
        if(error){
            return res.status(404).send("animés no encontrados")
        }else{
            return res.json(JSON.parse(data))
        }
    })
    //res.json("ruta get/")
})

app.get("/:id", (req, res)=>{
    const id = req.params.id
    fs.readFile("./datos/anime.json", "utf8", (error, data)=> {
        if(error){
            return res.status(404).send("animés no encontrados")
        }else{
            const listadoAnimes = JSON.parse(data)
            let anime;
            for (let index = 0; index < listadoAnimes.length; index++) {
                
                const element = listadoAnimes[index];
                if(element.id == id){
                    anime = element
                    break
                }
            } 
            if(anime == undefined){
                return res.status(404).send("animé no encontrado")
            }
            return res.json(anime)
        }
    })
   
})

app.get("/nombre/:name", (req, res)=>{
    const nombre = req.params.name
    fs.readFile("./datos/anime.json", "utf8", (error, data)=> {
        if(error){
            return res.status(404).send("animés no encontrados")
        }else{
            const listadoAnimes = JSON.parse(data)
            const anime = listadoAnimes.find((anime)=>{
              return anime.nombre.toLowerCase() === nombre.toLowerCase()
            })
            
            if (anime){
                return res.json(anime)
            }else{
                return res.status(404).send("animés no encontrados")
            }

        }      
    })
})

app.post("/", (req, res)=>{
    res.json("ruta post")
})

app.put("/:id", (req, res)=>{
    res.json("ruta put")
})

app.delete("/:id", (req, res)=>{
    res.json("ruta delete")
})

app.listen(port, ()=>{
    console.log(`Servidor escuchando en http://localhost:${port}`);
})