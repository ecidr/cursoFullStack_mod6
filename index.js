const express = require("express");
const fs = require("fs");

const app = express();

const port = 3000;
app.use(express.json()); //permite trabajar con json dentro de xpress

app.get("/", (req, res) => {
  fs.readFile("./datos/anime.json", "utf8", (error, data) => {
    if (error) {
      return res.status(404).send("animés no encontrados");
    } else {
      return res.json(JSON.parse(data));
    }
  });
  //res.json("ruta get/")
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./datos/anime.json", "utf8", (error, data) => {
    if (error) {
      return res.status(404).send("animés no encontrados");
    } else {
      const listadoAnimes = JSON.parse(data);
      let anime;
      for (let index = 0; index < listadoAnimes.length; index++) {
        const element = listadoAnimes[index];
        if (element.id == id) {
          anime = element;
          break;
        }
      }
      if (anime == undefined) {
        return res.status(404).send("animé no encontrado");
      }
      return res.json(anime);
    }
  });
});

app.get("/nombre/:name", (req, res) => {
  const nombre = req.params.name;
  fs.readFile("./datos/anime.json", "utf8", (error, data) => {
    if (error) {
      return res.status(404).send("animés no encontrados");
    } else {
      const listadoAnimes = JSON.parse(data);
      const anime = listadoAnimes.find((anime) => {
        return anime.nombre.toLowerCase() === nombre.toLowerCase();
      });

      if (anime) {
        return res.json(anime);
      } else {
        return res.status(404).send("animés no encontrados");
      }
    }
  });
});

app.post("/", (req, res) => {
  const anime = req.body;
  fs.readFile("./datos/anime.json", "utf8", (error, data) => {
    if (error) {
      return res.status(404).send("animés no encontrados");
    } else {
      const listadoAnimes = JSON.parse(data);
      let numeroMax = 0;

      listadoAnimes.forEach((anime) => {
        const idActual = parseInt(anime.id);
        if (idActual > numeroMax) numeroMax = idActual;
      });
      const nuevoId = numeroMax + 1;
      anime.id = nuevoId.toString();
      listadoAnimes.push(anime);
      fs.writeFile(
        "./datos/anime.json",
        JSON.stringify(listadoAnimes),
        "utf8",
        (error) => {
          if (error) {
            console.error(error);
            return res.status(500).send("error en el servidor");
          } else {
            return res.send("guardado con exito");
          }
        }
      );
    }
  });
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./datos/anime.json", "utf8", (error, data) => {
    if (error) {
      return res.status(404).send("animés no encontrados");
    } else {
      const listadoAnimes = JSON.parse(data);
      let animeEditado = false;

      for (let index = 0; index < listadoAnimes.length; index++) {
        const element = listadoAnimes[index];
        if (element.id == id) {
          if (req.body.nombre) {
            element.nombre = req.body.nombre;
            animeEditado = true;
          }
          if (req.body["año"]) {
            element["año"] = req.body["año"];
            animeEditado = true;
          }
          if (req.body.autor) {
            element.autor = req.body.autor;
            animeEditado = true;
          }
          if (req.body.genero) {
            element.genero = req.body.genero;
            animeEditado = true;
          }
        }
      }
      //const eliminacionOk = listadoAnimes.length != listadoNuevo.length (compara que sean distintos)
      const eliminacionOk = !(listadoAnimes.length == listadoNuevo.length); // compara que sean iguales y niega al boolean (invierte la igualdad)
      //const eliminacionFallida = (listadoAnimes.length == listadoNuevo.length)
      if (eliminacionOk) {
        fs.writeFile(
          "./datos/anime.json",
          JSON.stringify(listadoNuevo),
          "utf8",
          (error) => {
            if (error) {
              console.error(error);
              return res.status(500).send("error en el servidor");
            } else {
              return res.send("eliminado con exito");
            }
          }
        );
      } else {
        return res.status(400).send("no se ha eliminado ningún anime");
      }
    }
  });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./datos/anime.json", "utf8", (error, data) => {
    if (error) {
      return res.status(404).send("animés no encontrados");
    } else {
      const listadoAnimes = JSON.parse(data);
      const listadoNuevo = [];
      for (let index = 0; index < listadoAnimes.length; index++) {
        const element = listadoAnimes[index];
        if (element.id != id) {
          listadoNuevo.push(element);
        }
      }
      //const eliminacionOk = listadoAnimes.length != listadoNuevo.length (compara que sean distintos)
      const eliminacionOk = !(listadoAnimes.length == listadoNuevo.length); // compara que sean iguales y niega al boolean (invierte la igualdad)
      //const eliminacionFallida = (listadoAnimes.length == listadoNuevo.length)
      if (eliminacionOk) {
        fs.writeFile(
          "./datos/anime.json",
          JSON.stringify(listadoNuevo),
          "utf8",
          (error) => {
            if (error) {
              console.error(error);
              return res.status(500).send("error en el servidor");
            } else {
              return res.send("eliminado con exito");
            }
          }
        );
      } else {
        return res.status(400).send("no se ha eliminado ningún anime");
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = { app };
