import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://saxerfab:1fBANZeX2DBspExb@cluster0.lkgx4.mongodb.net/';
const client = new MongoClient(uri);
const dbName = 'f1fanzone';

/** @type {import('mongodb').Db | null} */
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        await client.connect();
        cachedDb = client.db(dbName);
        return cachedDb;
    } catch (error) {
        console.error('❌ Fehler beim Verbinden mit MongoDB:', error);
        throw error;
    }
}
