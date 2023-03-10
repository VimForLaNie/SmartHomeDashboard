<script lang="ts">
	import { onMount } from 'svelte';
	import WattMeter from './WattMeter.svelte';
	import { LineChart } from '@carbon/charts-svelte';

	export let topicArray = ['test'];
	export let nameArray = ['Plug1'];
    let data:any;
	let meterValue:any = []

	const getData = async (url: string) => {
		const res = await fetch(url);
		return res.json();
	};

    const parse = async () => {
        let res:any = [];
        for(const [i, topic] of topicArray.entries()){
            let temp = await getData(`/api/data?topic=${topic}&amount=1000&sort=-1`);
			// console.log(temp)
			// old -> new
			for(let idx = temp.length - 1; idx >= 0; idx--){
				temp[idx]["group"] = nameArray[i];
				let currWatt = parseInt(temp[idx]["payload"]) / 100;
				// console.log(currWatt);
				let currTime = (new Date(temp[idx]["time"])).getTime();
				if(idx == 0) {
					temp[idx]["payload"] = ((currWatt / 1000) * ((Date.now() - currTime) / 36000000) * 4);
					meterValue[i] = currWatt / 1000 * 60;
					break;
				}
				let nextTime = (new Date(temp[idx-1]["time"])).getTime();
				let dT = nextTime - currTime;
				temp[idx].payload = ((currWatt / 1000) * (dT / 3600000) * 4);
			}
			// console.log(temp[temp.length-1]["payload"])
            res = [...res,...temp];
        }
        return res;
    }

	onMount(async () => {
        data = await parse();
		// console.log(data);
		// console.log(meterValue)
	});
</script>

<div class="autoGrid w-full">
	{#each nameArray as name,i}
		<WattMeter room="Living Room" name={name} value={meterValue[i]?.toFixed(2)} />
	{/each}
</div>

<div class="w-full">
{#if data}
	<LineChart
		data={data ?? []}
		options={{
			legend: {
				enabled: true,
				// position: 'bottom'
			},
			title: "Electricity Consumption",
			axes: {
				bottom: {
					title: 'Time',
					mapsTo: 'time',
					visible: false,
					scaleType: 'time'
				},
				left: {
					title: 'Bath',
					mapsTo: 'payload',
					scaleType: 'linear'
				}
			},
			curve: 'curveMonotoneX',
			resizable: true,
			theme: 'g90',
			points : {
				enabled : false
			}
		}}
	/>
{:else}
	<p>Loading...</p>
{/if}
</div>

<style>
.autoGrid {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: repeat(auto-fit, minmax(min(100%/1, max(12rem, 100%/4)), 1fr));
}
</style>