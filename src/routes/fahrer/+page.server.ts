import { connectToDatabase } from '$lib/db';
import type { Fahrer } from '$lib/types';

export async function load(): Promise<{ fahrer: Fahrer[] }> {
    const db = await connectToDatabase();
    const fahrer = await db.collection('fahrer').find().toArray();

    return {
        fahrer: JSON.parse(JSON.stringify(fahrer)) as Fahrer[]
    };
}
