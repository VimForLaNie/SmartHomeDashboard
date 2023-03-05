<script lang="ts">
	export let name = 'Light';
    export let SwitchName = 'light/0'
	let state = false;
	let light: HTMLDivElement;
	let text: HTMLParagraphElement;

	const update = async () => {
		state = !state;
		const response = await fetch('/api/post', {
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
				topic: SwitchName,
				payload: state ? '0' : '1'
			}) // body data type must match "Content-Type" header
		});
		console.log(response.status, state);
		if (response.status == 200) {
			state = !state;
		} else {
			console.log('failed');
		}
	};

	const onClick = () => {
		state = !state;
		light.style.height = state ? '100%' : '10%';
		light.style.width = state ? '100%' : '10%';
        update();
		// text.classList.add("text-black");
	};
</script>

<button class="bg-zinc-800 w-24 p-6 h-24 self-center items-center justify-center flex overflow-hidden rounded-md relative m-2 flex-grow" on:click={onClick}>
	<p class="flex text-lg z-10 absolute" bind:this={text}>{name}</p>
	<div
		class="bg-gray-100 opacity-30 rounded-full blur-lg self-center absolute animate "
		bind:this={light}
	/>
</button>

<style lang="postcss">
	.animate {
		transition: width 0.5s ease-in-out;
		transition: height 0.5s ease-in-out;
	}
</style>
