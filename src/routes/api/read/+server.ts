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
    const topic = url.searchParams.get('id') ?? '';
    const data = (await client.db('MQTT').collection("RelaySync").findOne({id: topic}));
    // console.log(data);
    return json(data);
}