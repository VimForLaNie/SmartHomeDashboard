<script lang="ts">
    export let room = "Office";
    export let device = "Air Conditioner";
    export let SwitchName = "AC"
    import Switch from "./switch.svelte";
</script>

<div class="flex flex-row h-32 min-w-fit flex-1 items-stretch bg-zinc-800 rounded-md p-2 m-2">
    <div class="flex flex-col items-start justify-center w-3/4 m-2">
        <p class="text-gray-500 text-base text-left">{room}</p>
        <p class="text-white text-lg text-center">{device}</p>
    </div>
    <div class="flex flex-col items-end justify-center w-1/4 m-2">
        <Switch name={SwitchName}/>
    </div>
</div>