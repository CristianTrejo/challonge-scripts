const axios = require("axios"); // Instala Axios con `npm install axios`
const { API_KEY } = require("./config");

// Array de IDs de torneos
const tournamentIds = [15652553, 15652554]; // Reemplaza con los IDs reales

// Función para limpiar participantes de un torneo
const clearParticipants = async (tournamentId) => {
  const url = `https://api.challonge.com/v1/tournaments/${tournamentId}/participants/clear.json`;

  try {
    const response = await axios.delete(url, {
      params: { api_key: API_KEY }, // API key como parámetro de la URL
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`Participantes del torneo ${tournamentId} limpiados con éxito.`, response.data);
  } catch (error) {
    console.error(`Error al limpiar participantes del torneo ${tournamentId}:`, error.response?.data || error.message);
  }
};

// Función para procesar múltiples torneos
const clearParticipantsForAllTournaments = async () => {
  for (const id of tournamentIds) {
    await clearParticipants(id);
  }
};

// Ejecutar el script
clearParticipantsForAllTournaments();
