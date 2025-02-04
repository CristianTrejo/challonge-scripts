const axios = require('axios');
import { API_KEY } from './config';

/** The code snippet you provided is setting up the configuration and data for creating multiple
tournaments using the Challonge API. Here's a breakdown of what each variable is doing: */
const tournamentName = 'Singles Enero 2025';
const categories = [
	'Varonil A',
	'Varonil B',
	'Varonil C1',
	'Varonil C2',
	'Varonil D1',
	'Varonil D2',
	'Femenil A',
	'Femenil B',
	'Femenil C',
	'Femenil D1',
	'Femenil D2',
	'Consolacion Varonil A',
	'Consolacion Varonil B',
	'Consolacion Varonil C1',
	'Consolacion Varonil C2',
	'Consolacion Varonil D1',
	'Consolacion Varonil D2',
	'Consolacion Femenil A',
	'Consolacion Femenil B',
	'Consolacion Femenil C',
	'Consolacion Femenil D1',
	'Consolacion Femenil D2',
];
const tournamentType = 'single elimination'; // Tipo de torneo
const tentativeStartDate = null; // Fecha de inicio tentativa en formato YYYY-MM-DD
const eventId = 116820; // find by edit_event_id on admin page
const eventUrl = 'https://challonge.com/es/events/san_miguel_signles_enero_2025';
const subdomain = 'sanmiguel'

// Función para convertir texto a minúsculas y reemplazar espacios por guiones bajos
const formatUrl = (text) => text.toLowerCase().replace(/\s+/g, '_');

// Arreglo para almacenar las URLs generadas
const tournamentUrls = [];

/**
 * The function `createTournaments` asynchronously creates tournaments for each category using the
 * Challonge API and generates a message once all tournaments are created.
 */
async function createTournaments() {
  for (const category of categories) {
    const name = `${category}`;
    const url = `${formatUrl(tournamentName)}_${formatUrl(category)}`;

    try {
      /* The `axios.post` method is making a POST request to the Challonge API endpoint to create a new
      tournament. The object passed as the second argument contains the necessary data for creating
      the tournament, such as the tournament name, type, URL, description, game name, start date,
      whether to hide seeds, whether to allow open signups, and the event ID. */
      const response = await axios.post('https://api.challonge.com/v1/tournaments.json', {
        api_key: API_KEY,
        tournament: {
          name: name,
          tournament_type: tournamentType,
					subdomain: subdomain,
          url: url,
          description: 'Torneo de tenis en formato eliminación simple.', // Descripción opcional
          game_name: 'Tennis', // Juego a participar
          start_at: tentativeStartDate, // Fecha de inicio tentativa
          hide_seeds: true, // Esconde el número de siembra
          open_signup: false, // Deshabilitar inscripciones abiertas
					event_id: eventId,
        },
      });

      /* The code snippet `const fullUrl = response.data.tournament.full_challonge_url;
      tournamentUrls.push({ category, url: fullUrl });` is performing the following actions: */
      const fullUrl = response.data.tournament.full_challonge_url;
      tournamentUrls.push({ category, url: fullUrl });

      console.log(`Torneo creado exitosamente: ${name}`);
      console.log(`URL del torneo: ${fullUrl}`);
    } catch (error) {
      console.error(`Error al crear el torneo para la categoría ${category}:`, error.response ? error.response.data : error.message);
    }
  }

  // Generar el mensaje
  generateMessage();
}

/**
 * The function generates a message for tournament participants with information about the tournament,
 * event URL, category URLs, and a closing message.
 */
function generateMessage() {
  let message = `Estimados participantes de ${tournamentName},\n\n`;
	message += `Para consultar informacion general del torneo pueden acceder al siguiente enlace: ${eventUrl}\n\n`
  message += 'A continuación, dejo los links para acceder a los cuadros:\n\n';

  tournamentUrls.forEach(({ category, url }) => {
    message += `${category}: ${url}\n`;
  });

  message += `\nPor favor, consulten regularmente los cuadros para mantenerse al tanto de los partidos y cualquier actualización importante.\n\n`;
  message += `¡Les deseamos mucho éxito en sus encuentros!\n\nPaco Paredes\n${tournamentName}\n`;

  console.log('\nMensaje para los participantes:\n');
  console.log(message);
}

createTournaments();
