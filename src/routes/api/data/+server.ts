import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient, ServerApiVersion } from 'mongodb';
import type { MongoClientOptions } from 'mongodb';

const uri = "mongodb+srv://pooh:hnamDbKGYN2lmuqE@pooh.dnhlmdo.mongodb.net/?retryWrites=true&w=majority";

const options: MongoClientOptions = {
    serverApi: ServerApiVersion.v1
}

const client = new MongoClient(uri, options);

client.connect().then(() => console.log("connected to mongodb"));

export const GET: RequestHandler = async ({ url }) => {
    const data = await client.db('MQTT').collection(url.searchParams.get('topic') ?? '').find().sort({_id:1}).limit(50).toArray();
    console.log(data);
    return json(data);
}