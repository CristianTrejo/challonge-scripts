import { API_KEY } from "./config";
// Configura tu API Key de Challonge
const CHALLONGE_API_KEY = API_KEY;

// Configura la URL base de Challonge
const BASE_URL = "https://api.challonge.com/v1/tournaments.json";

// Función para obtener los torneos
/**
 * The function `obtenerTorneos` makes an asynchronous request to a specified API endpoint using a
 * provided API key, handles the response, and logs the retrieved tournament data to the console.
 * @returns The function `obtenerTorneos` is returning the data obtained from the API request if it is
 * needed for further use.
 */
async function obtenerTorneos() {
  try {
    // Realiza la solicitud a la API
    const response = await fetch(`${BASE_URL}?api_key=${CHALLONGE_API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error al obtener los torneos: ${response.status} ${response.statusText}`);
    }

    // Convierte la respuesta a JSON
    const data = await response.json();

    // Muestra los torneos en la consola
    console.log("Torneos obtenidos:", data);

    return data; // Retorna los datos si se necesita utilizarlos
  } catch (error) {
    console.error("Error al consumir la API de Challonge:", error.message);
  }
}

// Llama a la función
obtenerTorneos();
