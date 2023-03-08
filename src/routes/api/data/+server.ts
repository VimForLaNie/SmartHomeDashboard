import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient, ServerApiVersion } from 'mongodb';
import type { MongoClientOptions } from 'mongodb';

const uri = "mongodb+srv://pooh:hnamDbKGYN2lmuqE@pooh.dnhlmdo.mongodb.net/?retryWrites=true&w=majority";

const options: MongoClientOptions = {
    serverApi: ServerApiVersion.v1
}

const client = new MongoClient(uri, options);

client.connect().then(() => console.log("connected to mongodb")).catch(err => console.log(err));

export const GET: RequestHandler = async ({ url }) => {
    const amount = parseInt(url.searchParams.get('amount') ?? '0');
    const topic = url.searchParams.get('topic') ?? '';
    const data = await client.db('MQTT').collection(topic).find().sort({_id:1}).limit(amount).toArray();
    // console.log(data);
    return json(data);
}