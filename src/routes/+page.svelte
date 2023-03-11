<script lang="ts">
	import { onMount } from 'svelte';
	import Show from '../components/Show.svelte';
	// import Time from '../components/time.svelte';
	import OnOffcontroller from '../components/OnOffcontroller.svelte';
	import WattGraph from '../components/WattGraph.svelte';
	import AC from '../components/AC.svelte';
	import Graph from '../components/graph.svelte';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';

	let tempGraphData: any;
	let humGraphData: any;
	let dustGraphData: any;
	let uvGraphData: any;

	onMount(async () => {
		tempGraphData = (await fetch('/api/data?topic=temp&amount=1000').then((res) => res.json())).map(
			(d: any) => {
				d.group = 'Temperature';
				d.payload = d.payload / 100;
				return d;
			}
		);
		humGraphData = (
			await fetch('/api/data?topic=humidity&amount=20').then((res) => res.json())
		).map((d: any) => {
			d.group = 'Humidity';
			d.payload = d.payload / 100;
			return d;
		});
		dustGraphData = (await fetch('/api/data?topic=dust&amount=1000').then((res) => res.json())).map(
			(d: any) => {
				d.group = 'Dust Density';
				return d;
			}
		);
		uvGraphData = (await fetch('/api/data?topic=uv&amount=100').then((res) => res.json())).map(
			(d: any) => {
				d.group = 'UV';
				return d;
			}
		);
		// console.log(tempGraphData, humGraphData, dustGraphData, uvGraphData);
	});
</script>

<div class="flex flex-col self-center text-white items-center p-8 bg-zinc-900 w-full">
	<AC />
	<div class="autoGrid w-full">
		{#each Array(8) as _, i}
			<OnOffcontroller device={`Relay ${i + 1}`} room={`Living Room`} SwitchName={`light/${i}`} />
		{/each}
	</div>
	<div class="autoGrid w-full">
		<Show room="Living Room" name="Temperature" unit="°C" value="temp" />
		<Show room="Living Room" name="Humidity" unit="%" value="humidity" />
		<Show room="Living Room" name="Dust" unit="µg/m³" value="dust" />
		<Show room="Living Room" name="UV" unit="mW/cm²" value="uv" />
		<Show room="Living Room" name="Smoke" unit="ppm" value="smoke" />
		<!-- <Show room="Living Room" name="Temperature" unit="C"/> -->
	</div>

	<WattGraph topicArray={['watt']} nameArray={['Plug1']} />
	<Graph data={tempGraphData} title="Temperature" name="Temperature" />
	<Graph data={humGraphData} title="Humidity" name="Humidity" />
	<Graph data={dustGraphData} title="Dust Density" name="Dust Density" />
	<Graph data={uvGraphData} title="UV" name="UV" />
</div>
<a class="float bottom-4 left-4 fixed rounded-full w-16 h-16 lineButton" href="https://line.me/R/ti/p/@538dknsg">
	<img src="/LINE.png" alt="Add Friend" />
</a>

<style>
	.autoGrid {
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: repeat(auto-fit, minmax(min(100%/1, max(12rem, 100%/4)), 1fr));
	}
</style>
