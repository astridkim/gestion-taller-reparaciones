const conseguirJuego = new Promise((resolve, reject) => {
  let hayStock = false; // Cambia a false para ver el error

  setTimeout(() => {
    if (hayStock) {
      resolve("¡Aquí tienes tu videojuego!");
    } else {
      reject("Lo sentimos, se agotó el stock.");
    }
  }, 1500);
});

// Cómo consumimos la promesa:
conseguirJuego
  .then((mensaje) => console.log(mensaje)) // Si se cumple (resolve)
  .catch((error) => console.error(error));  // Si falla (reject)
