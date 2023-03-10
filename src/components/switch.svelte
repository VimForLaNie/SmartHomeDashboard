<script lang="ts">
	import { onMount } from "svelte";


	export let name: string = 'default';
	let state: boolean;
	const update = async () => {
		state = !state;
		const response = await fetch('/api/posts', {
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
				topic: name,
				payload: state ? '0' : '1'
			}) // body data type must match "Content-Type" header
		});
		const sync = await fetch('/api/write', {
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
				id: name,
				value: state ? '0' : '1'
			}) // body data type must match "Content-Type" header
		});
		// console.log(response.status, state);
		// console.log(sync.status, state);
		if (response.status == 200 && sync.status == 200) {
			state = !state;
		} else {
			console.log('failed');
		}
	};
	
	const getData = async () => {
		const res = await fetch(`/api/read?id=${name}`)
			.then((res) => res.json())
			.then((data) => data.value == '1' ? true : false)
			.catch((err) => console.log(err)) ?? false;
		return res
	}

	onMount(async () => {
		state = await getData();
		setInterval(async () => {
			state = await getData();
		}, 1000);
	});
</script>

<label class="switch">
	<input type="checkbox" bind:checked={state} on:change={update} />
	<span class="slider round" />
</label>

<style lang="postcss">
	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #e8f1f2;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: black;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #1b98e0;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #1b98e0;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
