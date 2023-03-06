<script lang="ts">
	import { onMount } from 'svelte';
	import Time from '../components/time.svelte';
	import OnOffcontroller from '../components/OnOffcontroller.svelte';
	// import WattMeter from '../components/WattMeter.svelte';
	import WattGraph from '../components/WattGraph.svelte';
	// import Light from '../components/Light.svelte';
	import AC from '../components/AC.svelte';

</script>

<div class="flex flex-col self-center text-white items-center p-8 bg-zinc-900 w-full">
	<Time temp="19" aq="109" />
	<AC />	
	<div class="gram w-full">
		{#each Array(8) as _,i}
			<OnOffcontroller device={`Relay ${i + 1}`} room={`Living Room`} SwitchName={`light/${i}`} />
		{/each}
	</div>
	<WattGraph />
	<!-- <div class="flex flex-row flex-wrap w-full">
		{#each Array(8) as _, i}
			<Light name={`Light ${i + 1}`} SwitchName={`light/${i}`} />
		{/each}
	</div> -->
	<div class="max-w-xl min-w-md">
		<!-- <LineChart data={data} options={{
		"legend" : {
			// "enabled": false,
			// "alignment": "center"
		},
		"title" : "Power Consumption",
		"axes" : {
			bottom: {
				title: "Time",
				mapsTo: "time",
				visible: false,
				scaleType: "time"
			},
			left: {
				title: "Power",
				mapsTo: "payload",
				scaleType: "linear"
			}
		},
		"curve": "curveMonotoneX",
		"resizable": true,
		"theme": "g90",
		}}
	/> -->
	</div>
</div>

<style>
	.gram {
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: repeat(auto-fit, minmax(min(100%/1, max(12rem, 100%/4)), 1fr));
	}
</style>