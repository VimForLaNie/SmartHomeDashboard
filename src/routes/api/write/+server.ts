import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient, ServerApiVersion } from 'mongodb';
import type { MongoClientOptions } from 'mongodb';

const uri = "mongodb+srv://pooh:hnamDbKGYN2lmuqE@pooh.dnhlmdo.mongodb.net/?retryWrites=true&w=majority";

const options: MongoClientOptions = {
    serverApi: ServerApiVersion.v1
}

const client = new MongoClient(uri, options);

client.connect().then(() => console.log("connected to mongodb")).catch(err => console.log(err));

export const POST:RequestHandler = async ({request}) => {
    // console.log("requested")
    let {id, value} = await request.json();
    client.db('MQTT').collection('RelaySync').findOneAndUpdate({id: id}, {$set: {value: value}});
    // console.log(id,value);
    return new Response('Hello world ' + id + ' ' + value);
}