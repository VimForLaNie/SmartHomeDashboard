<script lang="ts">
	export let value = '0';
	export let room = 'Office';
	export let name = 'Plug1';
	// export let topic = 'test';
	// import { LineChart } from '@carbon/charts-svelte';
	// import { onMount } from 'svelte';
	// import Switch from "./switch.svelte";
</script>

<div class="flex flex-row h-24 bg-zinc-800 rounded-md p-2 m-2">
	<div class="flex flex-col items-start justify-center w-3/4 m-2">
		<p class="text-gray-500 text-base text-left">{room}</p>
		<p class="text-white text-lg text-center">{name}</p>
	</div>
	<div class="flex items-center justify-end w-1/4">
		<!-- <p class="text-lg m-2">{value}</p>
		<span class="material-icons md-36 yellow self-center">offline_bolt</span> -->
		<p class="text-lg m-2">{(parseFloat(value) * 4).toFixed(2)} Baht/Hour</p>
	</div>
</div>

