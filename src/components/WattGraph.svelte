<script lang="ts">
	import { LineChart } from '@carbon/charts-svelte';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';
	import { onMount } from 'svelte';
	import WattMeter from './WattMeter.svelte';

	export let topicArray = ['test'];
	export let nameArray = ['Plug1'];
    export let data;

	const getData = async (url: string) => {
		const res = await fetch(url);
		return res.json();
	};
	// $: parse();
	// $:data=[];

    const parse = async () => {
        let res = [];
        for(const [i, topic] of topicArray.entries()){
            let temp = await getData(`/api/data?topic=${topic}&amount=10`);
            temp.forEach((element: any) => {
                element["group"] = nameArray[i];
            });
            res = [...res,...temp];
        }
        return res;
    }

	onMount(async () => {
        data = await parse();
		// data = topicArray.map(async (topic, i) => {
		// 	let temp = await getData(`/api/data?topic=${topic}&amount=10`);
		// 	temp.forEach((element: any) => {
		// 		element["group"] = nameArray[i];
		// 		data.push(element);
		// 	});
		//     return temp;
		// });
        // console.log(data)
		// data = await getData(`/api/data?topic=test&amount=10`);
		console.log(data)
        // setInterval(() => console.log(data),1000);
	});
    let gram = [
		{
			group: 'Dataset 1',
			time: 12,
			payload: 34200
		},
		{
			group: 'Dataset 1',
			time: 124,
			payload: 23500
		}
	]
</script>

{#each nameArray as name}
	<WattMeter room="LivingRoom" {name} value=""/>
{/each}

<!-- {#if data} -->
<LineChart
	data={data ?? []}
	options={{
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
