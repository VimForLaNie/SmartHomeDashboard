<script lang="ts">
    export let aq = "109";
	import { time } from '../store';
    const formatter = new Intl.DateTimeFormat('en', {
		hour12: false,
		hour: 'numeric',
		minute: '2-digit',
	});
</script>

<div class="flex flex-col w-full">
    <div class="self-center text-5xl">
        {formatter.format($time)}
    </div>
    <div class="flex flex-row self-center">
        <p class="flex self-center text-base text-gray-400 m-2">{aq} ug/m3</p>
        <p class="flex self-center text-base text-gray-400 m-2">{aq} AQI</p>
        <p class="flex self-center text-base text-gray-400 m-2">{aq} AQI</p>
        <p class="flex self-center text-base text-gray-400 m-2">{aq} AQI</p>

    </div>    
</div>