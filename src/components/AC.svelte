<script lang="ts">
	import { onMount } from "svelte";

	let color:HTMLSpanElement
	let acTemp = 25;
    let state = false;
	let popup = false;
	let fanMode = 0;

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
	};

	const increaseTemp = () => {
		// console.log(state)
		if(acTemp >= 30) { return; }
		acTemp += 1;
		// acTemp = acTemp > 30 ? 30 : acTemp;
		sync("ac",acTemp);
		update("ac/temp",acTemp);
	};

	const decreaseTemp = () => {
		// console.log(state)
		if(acTemp <= 16) { return; }
		acTemp -= 1;
		// acTemp = acTemp < 16 ? 16 : acTemp;
		sync("ac",acTemp);
		update("ac/temp",acTemp);
	};

	const sync = async (name,value:number) => {
			const response = await fetch("/api/write", {
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
				"id" : name.toString(),
				"value" : value.toString()
			}), // body data type must match "Content-Type" header
		});
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
		console.log(state)
		update("ac/power", state ? 1 : 0);
        // state = !state;
    }

	let roomTemp:any;
	onMount(async () => {
		roomTemp = parseInt((await fetch("/api/data?topic=temp&amount=1").then((res) => res.json()))[0].payload) / 100;
		console.log(roomTemp)
		acTemp = parseInt(await fetch("/api/read?id=ac").then((res) => res.json()).then((res) => res.value));
		fanMode = parseInt(await fetch("/api/read?id=fan").then((res) => res.json()).then((res) => res.value));
		// console.log(acTemp)
		// setInterval(async () => {
		// 	acTemp = await fetch("/api/read?id=ac").then((res) => res.json()).then((res) => res.value);
		// 	roomTemp = await fetch("/api/data?topic=temp&amount=1").then((res) => res.json());
		// 	if(roomTemp.length > 0){
		// 		roomTemp = roomTemp[0].payload;
		// 	}
		// 	else{
		// 		roomTemp = "N/A";
		// 	}
		// }, 1000);
	})

	const changeFanMode = () => {
		fanMode = fanMode == 3 ? 0 : fanMode + 1;
		sync("fan",fanMode);
		update("ac/fan", fanMode);
	}
</script>

{#if popup}
	<div class="flex flex-col bg-zinc-800 rounded-md float fixed z-20 bottom-1 right-1">
		<button
			class="absolute flex w-fit h-fit bg-zinc-800 rounded-full p-2 hover:bg-zinc-500 top-3 left-3"
			on:click={() => (popup = false)}
		>
			<span class="material-icons md-18 self-center"> close </span>
		</button>
		<div class="flex flex-row items-center px-6 py-2">
			<div class="flex flex-col">
				<button on:click={changeFanMode}>
					<span class="material-symbols-outlined p-2 m-2 bg-slate-700 rounded-full">
						mode_fan
					</span>
				</button>
				<p class="text-blue-200 self-center">{fanMode != 0 ? fanMode : "auto"}</p>
			</div>
			<div class="flex flex-col mx-2">
				<button
					class="hover:opacity-90 transition-opacity active:opacity-70"
					on:click={increaseTemp}
				>
					<span class="material-icons md-36 self-center bg-blue-500 rounded-full my-2 "
						>keyboard_arrow_up</span
					>
				</button>
				<p class="text-base text-blue-400">{acTemp}<span>&#176;</span>C</p>
				<button
					class="hover:opacity-90 transition-opacity active:opacity-70"
					on:click={decreaseTemp}
				>
					<span class="material-icons md-36 self-center bg-blue-500 rounded-full my-2"
						>keyboard_arrow_down</span
					>
				</button>
			</div>
		</div>
		<!-- {#if !state} -->
		<button on:click={toggle}>
			<span
				class="material-icons md-24 bg-red-400 active:bg-green-600 p-4 m-4 rounded-full transition-all"
				bind:this={color}
			>
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
	<button on:click={() => (popup = true)}>
		<span
			class="material-icons md-24 bg-blue-400 p-4 m-4 rounded-full active:bg-blue-600 
		transition-all float fixed z-20 bottom-1 right-1"
		>
			ac_unit
		</span>
	</button>
{/if}
