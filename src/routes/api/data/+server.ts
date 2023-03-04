import { json } from '@sveltejs/kit';
import mqtt from 'mqtt';
import type { RequestHandler } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { mqttData } from '../../../store';

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

client.on('connect', () => {
    client.subscribe('#');
});

client.on('message', (topic, message) => {
    console.log("message incoming");
    mqttData.update((data: any) => {
        data[topic] = message.toString();
        console.log(data)
        return data;
    });
    // console.log(topic, message.toString());
});


export const GET: RequestHandler = async () => {
    return json(get(mqttData));
}