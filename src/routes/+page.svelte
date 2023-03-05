<script lang="ts">
	import { onMount } from 'svelte';
	import Time from '../components/time.svelte';
	import OnOffcontroller from '../components/OnOffcontroller.svelte';
	import WattMeter from '../components/WattMeter.svelte';
	import Light from '../components/Light.svelte';

	const getData = async (url:string) => {
		const res = await fetch(url);
		return res.json();
	}

	let data;
	let temp:any;

	onMount(async () => {
		setInterval(async () => {
			data = await getData('/api/data?topic=temp');
			// temp = data.temp || '-';
			console.log(data);
		}, 1000);
	});
</script>

<div class="flex flex-col self-center text-white items-center p-8 bg-zinc-900 w-full">
	<Time temp={temp} aq="109" />
	<div class="flex flex-row flex-wrap w-full">
		<OnOffcontroller SwitchName="AC" />
		<OnOffcontroller SwitchName="AC" />
		<OnOffcontroller SwitchName="AC" />
		<OnOffcontroller SwitchName="AC" />
		<OnOffcontroller SwitchName="AC" />
		<OnOffcontroller room="Office" device="fan" SwitchName="Fan" />
	</div>
	<div class="flex flex-row flex-wrap w-full">
		<WattMeter value="12" />
		<WattMeter value="" room='' name='' />
	</div>
	<div class="flex flex-row flex-wrap w-full">
		{#each Array(8) as _, i}
			<Light name={`Light ${i + 1}`} SwitchName={`light/${i}`}/>
		{/each}
	</div>
</div>
