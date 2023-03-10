<script lang="ts">
    export let data:any;
    export let title:string;

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
		title: title,
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