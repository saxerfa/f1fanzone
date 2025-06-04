// src/routes/standings/+server.ts
import { json } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/db';
import { ObjectId } from 'mongodb';

export async function POST({ request }) {
	const { collection, id, punkte } = await request.json();

	if (!['fahrer', 'teams'].includes(collection) || !id || typeof punkte !== 'number') {
		return new Response('Ungültige Daten', { status: 400 });
	}

	const db = await connectToDatabase();

	await db.collection(collection).updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { punkte } }
	);

	return json({ success: true });
}
