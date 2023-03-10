<script lang="ts">
    export let data:any;

    import { LineChart } from '@carbon/charts-svelte';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';

</script>

{#if data}
<div class="w-full" style="max-height: 52rem;">
<LineChart
	data={data ?? []}
	options={{
		// legend: {
		// 	enabled: false,
		// 	// position: 'bottom'
		// },
		title: 'Power Consumption',
		axes: {
			bottom: {
				title: 'Time',
				mapsTo: 'time',
				visible: false,
				scaleType: 'time'
			},
			left: {
				title: 'Power',
				mapsTo: 'payload',
				scaleType: 'linear'
			}
		},
		curve: 'curveMonotoneX',
		resizable: true,
		theme: 'g90'
	}}
/>
</div>
{:else}
    <p>Loading...</p>
{/if}