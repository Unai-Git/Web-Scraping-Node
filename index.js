//*Importaciones de terceros
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");

//*Variables
const PORT = 8080;
const URL = "https://books.toscrape.com/";
const app = express();

//*Cors
app.use(cors());

//*Rutas [app.METHOD(PATH,HANDLER)]
app.get("/", function (req, res) {
  res.json("Web-Scraper");
});

app.get("/books", (req, res) => {
  //*Obtener los datos de la web https://books.toscrape.com/
  axios(URL)
    .then((response) => {
      //*Guardar la data de la web
      const html = response.data;
      //console.log(html);

      //*Acceder a datos concretos de la web
      const $ = cheerio.load(html);
      const books = [];

      $(".product_pod", html).each(function () {
        const title = $(this).find("h3").text();
        const link = $(this).find("a").attr("href");

        //*Insertar en el array
        books.push({
          title,
          link,
        });
      });
      //*Mostrar datos
      res.json(books);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto " + PORT);
});
