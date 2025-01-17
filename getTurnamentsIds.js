const axios = require('axios');
const fs = require('fs');
import { API_KEY } from './config';

const BASE_URL = 'https://api.challonge.com/v1/tournaments.json';

// Función para obtener y filtrar torneos por event_id
async function fetchAndSaveTournaments(eventId) {
  try {
    // Realizar la solicitud a la API
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: API_KEY
      }
    });

    // Obtener los datos de los torneos
    const tournaments = response.data;

    // Filtrar por event_id
    const filteredTournaments = tournaments.filter(
      (tournament) => tournament.tournament.event_id === eventId
    );

    if (filteredTournaments.length === 0) {
      console.log(`No se encontraron torneos con event_id: ${eventId}`);
      return;
    }

    // Crear contenido del archivo
    const content = filteredTournaments
      .map((tournament) => {
        const tournamentData = tournament.tournament;
        return `${tournamentData.name} - ${tournamentData.id}`;
      })
      .join('\n');

    // Guardar en el archivo
    const fileName = 'Ids Torneos.txt';
    fs.writeFileSync(fileName, content, 'utf8');
    console.log(`Archivo guardado: ${fileName}`);
  } catch (error) {
    console.error('Error al obtener o guardar torneos:', error.message);
  }
}

// Llama a la función con un event_id específico
const EVENT_ID = 12345; // Reemplaza con el event_id deseado
fetchAndSaveTournaments(EVENT_ID);
