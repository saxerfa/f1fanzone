// src/routes/standings/+page.server.ts
import { connectToDatabase } from '$lib/db';

export async function load() {
	const db = await connectToDatabase();

	const fahrer = await db
		.collection('fahrer')
		.find({}, { projection: { name: 1, team: 1, punkte: 1, bild: 1, _id: 1 } })
		.sort({ punkte: -1 })
		.toArray();

	const teams = await db
		.collection('teams')
		.find({}, { projection: { name: 1, punkte: 1, bild: 1, _id: 1 } })
		.sort({ punkte: -1 })
		.toArray();

	return {
		fahrer: JSON.parse(JSON.stringify(fahrer)),
		teams: JSON.parse(JSON.stringify(teams))
	};
}
