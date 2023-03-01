<script lang="ts">
	import '../app.css';
	import ACcontroller from '../components/ACcontroller.svelte';
	import Time from '../components/time.svelte';
</script>

<div class="layoutGrid">
	<aside class="flex flex-col text-white items-center p-8 bg">
		<Time />
		<ACcontroller />
	</aside>
	<div class="containerLayout">
		<nav class="navbar flex flex-row h-16 items-center p-4">
			<p>Navbar</p>
		</nav>
		<div class="flex flex-col items-center p-4">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.bg {
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
		background-color: #006494;
	}
	.layoutGrid {
		width: 100%;
		min-height: 0;
		min-width: 0;
		display: grid;
		grid-template-columns: minmax(0, 1fr) 3fr;
		/* grid-gap: 1rem; */
	}
</style>
