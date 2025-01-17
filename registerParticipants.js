// Import necessary libraries if using a Node.js environment (e.g., axios for HTTP requests)
const axios = require('axios');
import { API_KEY } from './config';

// Base URLs for the Challonge API
const BASE_URL = 'https://api.challonge.com/v1';
const TOURNAMENTS_ENDPOINT = `${BASE_URL}/tournaments.json`;
const PARTICIPANTS_ENDPOINT = `${BASE_URL}/participants/bulk_add.json`;

// Event ID to filter tournaments
const TARGET_EVENT_ID = 'target_event_id_here'; // Replace with your target event ID

// Function to fetch tournaments and filter by event_id
async function fetchFilteredTournaments() {
    try {
        const response = await axios.get(TOURNAMENTS_ENDPOINT, {
            params: { api_key: API_KEY }
        });

        const tournaments = response.data;
        const filteredTournaments = tournaments.filter(tournament => tournament.event_id === TARGET_EVENT_ID);
        
        return filteredTournaments.map(tournament => tournament.id);
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        return [];
    }
}

// Function to add participants to a specific tournament
async function addParticipants(tournamentId, participants) {
    try {
        const response = await axios.post(`${PARTICIPANTS_ENDPOINT}`, {
            api_key: API_KEY,
            participants: participants
        }, {
            params: {
                tournament_id: tournamentId
            }
        });

        console.log(`Participants added to tournament ${tournamentId}:`, response.data);
    } catch (error) {
        console.error(`Error adding participants to tournament ${tournamentId}:`, error);
    }
}

// Main function to orchestrate the process
async function main() {
    // Fetch tournament IDs filtered by event_id
    const tournamentIds = await fetchFilteredTournaments();

    if (tournamentIds.length === 0) {
        console.log('No tournaments found for the given event_id.');
        return;
    }

    // Define participants for each tournament
    const participantsByTournament = {
        'tournament_id_1': [
            { name: 'Player A1', username: 'playera1', seed: 1 },
            { name: 'Player A2', username: 'playera2', seed: 2 }
        ],
        'tournament_id_2': [
            { name: 'Player B1', username: 'playerb1', seed: 1 },
            { name: 'Player B2', username: 'playerb2', seed: 2 }
        ]
        // Add more tournament-specific participants as needed
    };

    // Add participants to each tournament
    for (const tournamentId of tournamentIds) {
        const participants = participantsByTournament[tournamentId] || [];
        if (participants.length > 0) {
            await addParticipants(tournamentId, participants);
        } else {
            console.log(`No participants defined for tournament ${tournamentId}.`);
        }
    }
}

// Execute the script
main();
