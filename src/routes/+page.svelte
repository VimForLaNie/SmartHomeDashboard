<script lang="ts">
	// import ACcontroller from '../components/ACcontroller.svelte';
	import { onMount } from 'svelte';

	let data: Object = {};
	onMount(async () => {
		setInterval(async () => {
			const res = await fetch('http://34.124.227.14:3000/');
			data = await res.json();
			console.log(data);
		}, 1000);
	});
</script>




