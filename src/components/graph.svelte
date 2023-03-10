<script lang="ts">
	export let data: any;
	export let title: string;
	export let name: string;

	import { LineChart } from '@carbon/charts-svelte';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';
	import { onMount } from 'svelte';

	// onMount(async () => {
	// 	if(data == undefined || name == undefined) return
	// 	console.log(data != undefined ? data : "How?")
	// 	for(const e of data){
	// 		e.group = name;
	// 	}
	// 	console.log(data)
	// 	// data = res
	// 	// console.log(data)
	// });
</script>

{#if data}
	<div class="w-full">
		<LineChart
			{data}
			options={{
				legend: {
					enabled: true
					// position: 'bottom'
				},
				title: title,
				axes: {
					bottom: {
						title: 'Time',
						mapsTo: 'time',
						visible: false,
						scaleType: 'time'
					},
					left: {
						title: name,
						mapsTo: 'payload',
						scaleType: 'linear'
					}
				},
				curve: 'curveMonotoneX',
				resizable: true,
				theme: 'g90',
				points: {
					enabled: false
				}
			}}
		/>
	</div>
{:else}
	<p>Loading...</p>
{/if}
