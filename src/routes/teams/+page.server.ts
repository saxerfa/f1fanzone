import { connectToDatabase } from '$lib/db';

export async function load() {
    const db = await connectToDatabase();
    const teams = await db.collection('teams').find().toArray();

    return {
        teams: JSON.parse(JSON.stringify(teams))
    };
}
