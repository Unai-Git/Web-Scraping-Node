//*Variables
const content = document.querySelector(".content");
const url = "http://localhost:8080/books";

//*Obtener data
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((books) => {
      console.log(books.title);
      content.innerHTML += `  <span class="title">${books.title}</span> <br> Enlace(Pag->No disponible): <a href="${books.link}">Ver libro</a> <br> `;
    });
  })
  .catch((err) => console.log(err));
