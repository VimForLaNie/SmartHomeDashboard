<script lang="ts">
	import { LineChart } from '@carbon/charts-svelte';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';
	import { onMount } from 'svelte';
	import WattMeter from './WattMeter.svelte';

	export let topicArray = ['test'];
	export let nameArray = ['Plug1'];
    export let data:any;
	let meterValue:any = []

	const getData = async (url: string) => {
		const res = await fetch(url);
		return res.json();
	};

    const parse = async () => {
        let res:any = [];
        for(const [i, topic] of topicArray.entries()){
            let temp = await getData(`/api/data?topic=${topic}&amount=10`);
            // temp.forEach((element: any, idx:any) => {
			// 	element["group"] = nameArray[i];
            // });
			for(let idx = 0; idx < temp.length; idx++){
				temp[idx]["group"] = nameArray[i];
				if(idx > 0){
					let dT = ((new Date(temp[idx]["time"])).getTime() - (new Date(temp[idx-1]["time"]).getTime())) / 1000;
					let unit = parseInt(temp[idx]["payload"])/1000 * (dT / 3600);
					// console.log(dT, unit);
					meterValue[i] = (meterValue[i] ?? 0) + unit;
				}
			}
            res = [...res,...temp];
        }
        return res;
    }

	onMount(async () => {
        data = await parse();
		console.log(data);
		// console.log(meterValue)
	});
</script>

<div class="autoGrid w-full">
	{#each nameArray as name,i}
		<WattMeter room="Living Room" name={name} value={Math.trunc(meterValue[i])} />
	{/each}
</div>


<!-- {#if data} -->
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
<!-- {:else}
    <p>Loading...</p>
{/if} -->
<style>
.autoGrid {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: repeat(auto-fit, minmax(min(100%/1, max(12rem, 100%/4)), 1fr));
}
</style>