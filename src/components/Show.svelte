<script lang="ts">
	import { onMount } from "svelte";

    export let room = "Living Room";
    export let name = "Plug1";
    export let value:any;
    export let unit = "-";

	let data:any;
	onMount(async () => {
		// console.log(value);
		setInterval(async () => {
			let temp = await fetch(`/api/data?topic=${value}&amount=1`).then(res => res.json());
			// console.log(temp)
			data = parseInt(temp[0]["payload"]) / ((value != 'uv' || value != 'vis') ? 100 : 1);
		}, 5000);
	})
</script>

<div class="flex flex-row h-24 bg-zinc-800 rounded-md p-2 m-2">
	<div class="flex flex-col items-start justify-center w-1/2 m-2">
		<p class="text-gray-500 text-base text-left">{room}</p>
		<p class="text-white text-lg text-center">{name}</p>
	</div>
	<div class="flex items-center justify-end w-1/2">
		<!-- <p class="text-lg m-2">{value}</p> -->
		<!-- <span class="material-icons md-36 yellow self-center">offline_bolt</span> -->
		<p class="text-lg m-2">{data} {unit}</p>
	</div>
</div>
