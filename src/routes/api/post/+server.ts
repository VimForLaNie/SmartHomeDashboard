import type { RequestHandler } from '@sveltejs/kit';
// import {get} from 'svelte/store';
import mqtt from 'mqtt';
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: 'svelte-mqtt',
    username: 'pooh',
    password: '4r*D.~*?wB*>3jBm'
};

const client = mqtt.connect('ws://34.143.162.7:9001/mqtt', options);

export const POST:RequestHandler = async ({request}) => {
    let body = await request.json();
    client.publish(body.topic, body.payload);
    return new Response('Hello world' + ' ' + body.topic + ' ' + body.payload);
}