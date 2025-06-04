// src/scripts/updatePunkte.ts
import { connectToDatabase } from '../lib/db.js';

// Punkteliste - hier kannst du sie direkt eintragen oder dynamisch aus CSV laden
const fahrerPunkte: Record<string, number> = {
"Oscar Piastri": 186,
"Lando Norris": 176,
"Max Verstappen": 137,
"George Russell": 111,
"Charles Leclerc": 94,
"Lewis Hamilton": 71,
"A.K. Antonelli": 48,
"Alexander Albon": 42,
"Isack Hadjar": 21,
"Esteban Ocon": 20,
"Nico Hülkenberg": 16,
"Lance Stroll": 14,
"Carlos Sainz jr.": 12,
"Pierre Gasly": 11,
"Yuki Tsunoda": 10,
"Oliver Bearman": 6,
"Liam Lawson": 4,
"Fernando Alonso": 2,
"Gabriel Bortoleto": 0,
"Franco Colapinto": 0
};

const teamPunkte: Record<string, number> = {
  "McLaren": 362,
"Ferrari": 165,
"Mercedes": 159,
"Red Bull": 144,
"Williams": 54,
"RB (Racing Bulls)": 28,
"Haas": 26,
"Sauber": 16,
"Aston Martin": 16,
"Alpine": 11
};

async function updatePunkte() {
  const db = await connectToDatabase();

  const fahrerCollection = db.collection('fahrer');
  const teamCollection = db.collection('teams');

  for (const [name, punkte] of Object.entries(fahrerPunkte)) {
    const res = await fahrerCollection.updateOne(
      { name },
      { $set: { punkte } }
    );
    console.log(`Fahrer '${name}' aktualisiert (${res.modifiedCount} geändert)`);
  }

  for (const [name, punkte] of Object.entries(teamPunkte)) {
    const res = await teamCollection.updateOne(
      { name },
      { $set: { punkte } }
    );
    console.log(`Team '${name}' aktualisiert (${res.modifiedCount} geändert)`);
  }

  console.log('✅ Punkteaktualisierung abgeschlossen');
}

updatePunkte().catch((err) => {
  console.error('❌ Fehler beim Aktualisieren:', err);
});