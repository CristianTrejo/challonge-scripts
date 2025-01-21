// Import necessary libraries if using a Node.js environment (e.g., axios for HTTP requests)
const axios = require('axios');
const { API_KEY, EVENT_ID } = require('./config');

// Base URLs for the Challonge API
const BASE_URL = 'https://api.challonge.com/v1/tournaments/{tournament}/participants/bulk_add.json';

// Function to add participants to a specific tournament
async function addParticipants(tournamentId, participants) {
    try {
        const response = await axios.post(BASE_URL.replace('{tournament}',tournamentId), {
            api_key: API_KEY,
            participants: participants
        }, {
        });

        for (participant of response.data) {
            const {
                name,
                seed,
                username
            } = participant.participant;
            
            console.log(`Participants added to tournament ${tournamentId}:`, {
                name,
                seed,
                username,
            });
        }
    } catch (error) {
        console.error(`Error adding participants to tournament ${tournamentId}:`, error);
    }
}

// Main function to orchestrate the process
async function main() {
    // Define participants for each tournament
    const participantsByTournament = {
        15652553: [
            { name: 'Player A5', invite_name_or_email: 'CristianTrejo', seed: 2 },
        ],
        // Add more tournament-specific participants as needed
    };

    // Add participants to each tournament
    for (const tournamentId in participantsByTournament) {
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
