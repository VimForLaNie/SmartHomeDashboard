<script lang="ts">
	import { onMount } from 'svelte';
	import { time } from '../store';
	const formatter = new Intl.DateTimeFormat('en', {
		hour12: false,
		hour: 'numeric',
		minute: '2-digit'
	});

	let dust: any;
	let uv: any;
	let Humudity: any;
	let smoke: any;
	let lpg: any;
	onMount(async () => {
		setInterval(async () => {
			dust = await fetch('/api/data?topic=dust&amount=1').then((res) => res.json());
			dust = dust.length ? dust[0].payload : '-';
			uv = await fetch('/api/data?topic=uv&amount=1').then((res) => res.json());
			uv = uv.length ? uv[0].payload : '-';
			Humudity = await fetch('/api/data?topic=humidity&amount=1').then((res) => res.json());
			Humudity = Humudity.length ? Humudity[0].payload : '-';
			smoke = await fetch('/api/data?topic=smoke&amount=1').then((res) => res.json());
			smoke = smoke.length ? smoke[0].payload : '-';
			lpg = await fetch('/api/data?topic=lpg&amount=1').then((res) => res.json());
			lpg = lpg.length ? lpg[0].payload : '-';
		}, 1000);
	});
</script>

<div class="flex flex-col w-full">
	<div class="self-center text-5xl">
		{formatter.format($time)}
	</div>
	<div class="flex flex-row self-center">
		<p class="flex self-center text-base text-gray-400 m-2">Dust:{dust} ug/m3</p>
		<p class="flex self-center text-base text-gray-400 m-2">UV:{uv}</p>
		<p class="flex self-center text-base text-gray-400 m-2">Humidity:{Humudity} %</p>
		<p class="flex self-center text-base text-gray-400 m-2">smoke:{smoke}</p>
	</div>
</div>
