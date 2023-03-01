<script lang="ts">
    import Switch from "./switch.svelte";
</script>

<div class="flex flex-row h-32 w-full bg-zinc-900 rounded-md p-2">
    <div class="flex flex-col items-start justify-center w-3/4 m-2">
        <p class="text-gray-500 text-xl text-left">Office</p>
        <p class="text-white text-2xl text-center">Air Conditoner</p>
    </div>
    <div class="flex flex-col items-end justify-center w-1/4 m-2">
        <Switch />
    </div>
</div>