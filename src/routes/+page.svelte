<script lang="ts">
	import { onMount } from 'svelte';
	import Time from '../components/time.svelte';
	import OnOffcontroller from '../components/OnOffcontroller.svelte';
	import WattGraph from '../components/WattGraph.svelte';
	import AC from '../components/AC.svelte';
	import Graph from '../components/graph.svelte';

	let tempGraphData:any;
	let humGraphData:any;
	let dustGraphData:any;
	let uvGraphData:any;

	onMount(async () => {
		tempGraphData = await fetch('/api/data?topic=app/temp&amount=1000').then(res => res.json());
		humGraphData = await fetch('/api/data?topic=app/humidity&amount=1000').then(res => res.json());
		dustGraphData = await fetch('/api/data?topic=app/dust&amount=1000').then(res => res.json());
		uvGraphData = await fetch('/api/data?topic=app/uv&amount=1000').then(res => res.json());
	});
</script>

<div class="flex flex-col self-center text-white items-center p-8 bg-zinc-900 w-full">
	<Time />
	<AC />	
	<div class="autoGrid w-full">
		{#each Array(8) as _,i}
			<OnOffcontroller device={`Relay ${i + 1}`} room={`Living Room`} SwitchName={`light/${i}`} />
		{/each}
	</div>
	<WattGraph topicArray={['watt']} nameArray={['Plug1']}/>
	<Graph data={tempGraphData} title="Temperature"/>
	<Graph data={humGraphData} title="Humidity"/>
	<Graph data={dustGraphData} title="Dust Density"/>
	<Graph data={uvGraphData} title="UV"/>
</div>

<style>
.autoGrid {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: repeat(auto-fit, minmax(min(100%/1, max(12rem, 100%/4)), 1fr));
}
</style>