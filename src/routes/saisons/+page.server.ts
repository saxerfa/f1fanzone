import { connectToDatabase } from '$lib/db';
import type { Saison } from '$lib/types';

export async function load(): Promise<{ saisons: Saison[] }> {
    const db = await connectToDatabase();

    const saisons = await db.collection('saisons')
        .find()
        .sort({ jahr: -1 })
        .toArray();

    // Wandelt MongoDB-Objekte in einfache JSON-Objekte um
    const saisonsCleaned = JSON.parse(JSON.stringify(saisons)) as Saison[];

    return {
        saisons: saisonsCleaned
    };
}
