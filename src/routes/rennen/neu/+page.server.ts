import { connectToDatabase } from '$lib/db';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const rennen_name = formData.get('rennen_name');
        const datumRaw = formData.get('datum');
        const datum = datumRaw ? new Date(datumRaw.toString()) : null;
        const ort = formData.get('ort');
        const resultate_raw = formData.get('resultate');

        if (!rennen_name || !datum || !ort || !resultate_raw) {
            return fail(400, { error: 'Bitte alle Felder korrekt ausfüllen!' });
        }

        const resultate = [];
        const lines = resultate_raw.toString().split('\n');
        for (const line of lines) {
            const [platzStr, fahrer] = line.split(',').map(s => s.trim());
            const platz = Number(platzStr);
            if (isNaN(platz) || !fahrer) {
                return fail(400, { error: `Ungültige Zeile: "${line}"` });
            }
            resultate.push({
                rennen_name,
                datum,
                ort,
                platz,
                fahrer
            });
        }

        const db = await connectToDatabase();
        await db.collection('rennen').insertMany(resultate);

        throw redirect(303, '/rennen');
    }
};
