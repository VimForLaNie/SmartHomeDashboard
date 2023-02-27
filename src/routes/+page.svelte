<script lang="ts">
	import MQTT, { MqttClient } from 'mqtt/dist/mqtt.js';
	import { onMount } from 'svelte';

	let messages:string[] = [];
	let client:MqttClient;
	let isConnected = false;

	const options = {
		// Clean session
		clean: true,
		connectTimeout: 4000,
		// Authentication
		clientId: 'svelte_app',
		username: 'pooh',
		password: '4r*D.~*?wB*>3jBm'
	};
  
	onMount(async () => {
		client = MQTT.connect('ws://34.143.162.7:9001/mqtt',options);
		// console.log('mounting. . .');
		client.on('connect', () => {
			isConnected = true
			// console.log('connected');
			client.subscribe('#');
		});
		client.on('message', (topic, message) => {
			console.log('message', topic, message.toString());
			messages = [...messages,topic + ' ' + message.toString()];
		});
	});
</script>

<h1>MQTT Messages</h1>
<p>Status : {isConnected ? "Connected" : "No Connection"}</p>
<ul>
	{#each messages as message}
		<li>{message}</li>
	{/each}
</ul>
