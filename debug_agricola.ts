import fs from 'fs';
import Papa from 'papaparse';

const GAMES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9hOhKXdB6n_mEWhPC2mvegzy-bopr1vGp-_dyJ39tGEfVwyBPdrLNkx3p41K0NgnkqIviO-6o-N1f/pub?gid=0&single=true&output=csv';

interface RawGameRow {
    name: string;
    commentary_and_alternatives: string;
}

const parseCommentary = (jsonString: string) => {
    if (!jsonString || jsonString.trim() === '') return undefined;

    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync('debug_output.txt', msg + '\n');
    };

    log(`Raw string length: ${jsonString.length}`);
    log(`Raw string: ${jsonString}`);

    try {
        // Handle potential double-escaped quotes if coming from CSV
        const cleanJson = jsonString.replace(/^"|"$/g, '').replace(/""/g, '"');
        log(`Cleaned string: ${cleanJson}`);
        return JSON.parse(cleanJson);
    } catch (e) {
        log(`First parse attempt failed: ${e}`);
        // Try parsing directly in case it wasn't double escaped
        try {
            return JSON.parse(jsonString);
        } catch (e2) {
            log(`Second parse attempt failed: ${e2}`);
            return undefined;
        }
    }
};

const fetchAndDebug = async () => {
    // Clear previous output
    fs.writeFileSync('debug_output.txt', '');

    try {
        const response = await fetch(GAMES_CSV_URL);
        const csvText = await response.text();

        // Find the raw line for The Crew
        const lines = csvText.split('\n');
        const gameLine = lines.find(line => line.toLowerCase().includes('the crew'));

        if (gameLine) {
            console.log("Raw Game Line:", gameLine);
            fs.appendFileSync('debug_output.txt', "Raw Game Line:\n" + gameLine + "\n");
        }

        const gamesData = Papa.parse<RawGameRow>(csvText, { header: true, skipEmptyLines: true }).data;

        const game = gamesData.find(g => g.name.toLowerCase().includes('the crew'));

        if (game) {
            console.log("Found Game:", game.name);
            console.log("Full Row:", JSON.stringify(game, null, 2));
            fs.appendFileSync('debug_output.txt', "Full Row:\n" + JSON.stringify(game, null, 2) + "\n");

            console.log("Parsing commentary...");
            const result = parseCommentary(game.commentary_and_alternatives);
            console.log("Parse Result:", result);
        } else {
            console.log("Game not found in CSV.");
        }

    } catch (error) {
        console.error("Error:", error);
    }
};

fetchAndDebug();
