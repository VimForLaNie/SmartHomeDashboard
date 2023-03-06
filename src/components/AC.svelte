<script lang="ts">
	let roomTemp = 26;
	let acTemp = 25;
    let state = false;
	const increaseTemp = () => {
		acTemp += 1;
		acTemp = acTemp > 30 ? 30 : acTemp;
	};

	const decreaseTemp = () => {
		acTemp -= 1;
		acTemp = acTemp < 16 ? 16 : acTemp;
	};

    const toggle = () => {
        state = !state;
        // code here
    }

</script>

<div class="flex flex-col bg-zinc-800 rounded-md float fixed z-20 bottom-1 right-1">
	<div class="flex flex-row items-center px-6 py-2">
		<p class="text-3xl mx-2">{roomTemp}<span>&#176;</span>C</p>
		<div class="flex flex-col mx-2">
			<button class="hover:opacity-90 transition-opacity active:opacity-70" on:click={increaseTemp}>
				<span class="material-icons md-36 self-center bg-blue-300 rounded-full my-2 "
					>keyboard_arrow_up</span
				>
			</button>
			<p class="text-base text-blue-400">{acTemp}<span>&#176;</span>C</p>
			<button class="hover:opacity-90 transition-opacity active:opacity-70" on:click={decreaseTemp}>
				<span class="material-icons md-36 self-center bg-blue-300 rounded-full my-2"
					>keyboard_arrow_down</span
				>
			</button>
		</div>
	</div>
    {#if !state}
    <button on:click={toggle}>
        <span class="material-icons md-24 bg-red-400 p-4 m-4 rounded-full active:bg-green-600 transition-all">
            power_settings_new
        </span>
    </button>
    {:else}
    <button on:click={toggle}>
        <span class="material-icons md-24 bg-green-400 p-4 m-4 rounded-full active:bg-red-600 transition-all">
            power_settings_new
        </span>
    </button>
    {/if}
</div>
