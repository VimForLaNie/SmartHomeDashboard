<script lang="ts">
	// import ACcontroller from '../components/ACcontroller.svelte';
	// import { onMount } from 'svelte';
	import Time from '../components/time.svelte';
	import OnOffcontroller from '../components/OnOffcontroller.svelte';
	import WattMeter from '../components/WattMeter.svelte';
	import Light from '../components/Light.svelte';

	let data: any = {};
	let temp = "-";
	let aq = "-";
	// onMount(async () => {
	// 	setInterval(async () => {
	// 		const res = await fetch('http://34.124.227.14:3000/');
	// 		data = await res.json();
	// 		temp = data.temp || "-";
	// 		aq = data.aq || "-";
	// 		console.log(data);
	// 	}, 1000);
	// });
	
</script>

<div class="flex flex-col self-center text-white items-center p-8 max-w-xl bg-zinc-900 w-80">
	<Time temp={temp} aq={aq}/>
	<OnOffcontroller SwitchName="AC"/>
	<OnOffcontroller room="Office" device="Fan" SwitchName="Fan"/>
	<WattMeter value="12"/>
	<Light name="Hi"/>
</div>




