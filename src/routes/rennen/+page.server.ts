import { connectToDatabase } from '$lib/db';
import { redirect, fail } from '@sveltejs/kit';

export async function load() {
    const db = await connectToDatabase();
    const rennenGrouped = await db.collection('rennen').aggregate([
        {
            $group: {
                _id: {
                    rennen_name: "$rennen_name",
                    datum: "$datum",
                    ort: "$ort"
                },
                resultate: {
                    $push: {
                        platz: "$platz",
                        fahrer: "$fahrer"
                    }
                }
            }
        },
        { $sort: { "_id.datum": 1 } }
    ]).toArray();

    return {
        rennen: JSON.parse(JSON.stringify(rennenGrouped))
    };
}

export const actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const rennen_name = formData.get('rennen_name');

        if (!rennen_name) {
            return fail(400, { error: 'Kein Rennen-Name angegeben!' });
        }

        const db = await connectToDatabase();
        await db.collection('rennen').deleteMany({ rennen_name });

        return { success: `Rennen "${rennen_name}" erfolgreich gelöscht.` };
    }
};
