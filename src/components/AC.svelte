<script lang="ts">
	let color:HTMLSpanElement
	let roomTemp = 26;
	let acTemp = 25;
    let state = false;
	let popup = false;

	const update = async (topic:string, value:number) => {
		state = !state
		const response = await fetch("/api/posts", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify({
				"topic" : topic.toString(),
				"payload" : value.toString()
			}), // body data type must match "Content-Type" header
		});
		console.log(response.status, state)
		if(response.status == 200){
			state = !state
		}
		else{
			console.log("failed")
		}
	};

	const increaseTemp = () => {
		console.log(state)
		acTemp += 1;
		acTemp = acTemp > 30 ? 30 : acTemp;
		update("ac/tempup",1);
	};

	const decreaseTemp = () => {
		console.log(state)
		acTemp -= 1;
		acTemp = acTemp < 16 ? 16 : acTemp;
		update("ac/tempdown",1);
	};

    const toggle = () => {
		if(state){
			color.classList.remove("active:bg-red-600");
			color.classList.remove("bg-green-400");
			color.classList.add("bg-red-400");
			color.classList.add("active:bg-green-600");
		}
		else{
			color.classList.remove("bg-red-400");
			color.classList.remove("active:bg-green-600");
			color.classList.add("bg-green-400");
			color.classList.add("active:bg-red-600");
		}
		update("ac", state ? 1 : 0);
        state = !state;
    }

</script>

{#if popup}
<div class="flex flex-col bg-zinc-800 rounded-md float fixed z-20 bottom-1 right-1">
	<button class="absolute flex w-fit h-fit bg-zinc-800 rounded-full p-2 hover:bg-zinc-500 top-3 left-3" on:click={() => popup = false}>
		<span class="material-icons md-18 self-center">
			close
		</span>
	</button>
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
    <!-- {#if !state} -->
    <button on:click={toggle}>
        <span class="material-icons md-24 bg-red-400 active:bg-green-600 p-4 m-4 rounded-full transition-all" bind:this={color}>
            power_settings_new
        </span>
    </button>
    <!-- {:else}
    <button on:click={toggle}>
        <span class="material-icons md-24 bg-green-400 p-4 m-4 rounded-full transition-all">
            power_settings_new
        </span>
    </button>
    {/if} -->
</div>
{:else}
	<button on:click={() => popup = true}>
		<span class="material-icons md-24 bg-blue-400 p-4 m-4 rounded-full active:bg-blue-600 
		transition-all float fixed z-20 bottom-1 right-1">
			air
		</span>
	</button>
{/if}
