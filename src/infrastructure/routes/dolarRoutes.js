import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Datos de prueba mientras verificamos la API externa
    const datosPrueba = {
      oficial: {
        precio: 78.36,
        fechaActualizacion: new Date().toISOString(),
      },
      paralelo: {
        precio: 101.09,
        fechaActualizacion: new Date().toISOString(),
      },
    };

    res.json(datosPrueba);

    // Código original comentado para referencia
    /*
    const response = await axios.get("https://ve.dolarapi.com/v1/dolares");
    const dolares = response.data;

    const dolarOficial = dolares.find((d) => d.fuente === "oficial");
    const dolarParalelo = dolares.find((d) => d.fuente === "paralelo");

    res.json({
      oficial: {
        precio: dolarOficial.promedio,
        fechaActualizacion: dolarOficial.fechaActualizacion,
      },
      paralelo: {
        precio: dolarParalelo.promedio,
        fechaActualizacion: dolarParalelo.fechaActualizacion,
      },
    });
    */
  } catch (error) {
    console.error("Error al obtener los precios del dólar:", error);
    res.status(500).json({
      error: "Error al obtener los precios del dólar",
      mensaje: error.message,
    });
  }
});

export { router as dolarRoutes };
