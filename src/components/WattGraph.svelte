<script lang="ts">
	import { onMount } from 'svelte';
	import WattMeter from './WattMeter.svelte';
	import Graph from './graph.svelte';

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
            let temp = await getData(`/api/data?topic=${topic}&amount=10`);
            // temp.forEach((element: any, idx:any) => {
			// 	element["group"] = nameArray[i];
            // });
			for(let idx = 0; idx < temp.length; idx++){
				temp[idx]["group"] = nameArray[i];
				if(idx > 0){
					if(temp[idx]["payload"] == ""){ continue;}
					let dT = ((new Date(temp[idx]["time"])).getTime() - (new Date(temp[idx-1]["time"]).getTime())) / 1000;
					let unit = parseInt(temp[idx]["payload"])/1000 * (dT / 3600);
					console.log(`unit: ${unit} dT: ${dT} \n${temp[idx]["payload"]}`);
					// console.log(dT, unit);
					meterValue[i] = (meterValue[i] ?? 0) + (unit ?? 0);
				}
			}
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
		<WattMeter room="Living Room" name={name} value={Math.trunc(meterValue[i]).toString()} />
	{/each}
</div>

<Graph data={data} />

<style>
.autoGrid {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: repeat(auto-fit, minmax(min(100%/1, max(12rem, 100%/4)), 1fr));
}
</style>