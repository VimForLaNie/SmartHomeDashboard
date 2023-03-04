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
			data = await getData('/api/data');
			temp = data.temp || '-';
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
	<WattMeter value="12" />
	<Light name="Hi" />
</div>
