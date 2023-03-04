<script lang="ts">
    export let name = "Light";
    let state = false;
    let light: HTMLDivElement;
    let text: HTMLParagraphElement;

    const onClick = () => {
        state = !state;
        light.style.height = state ? "100%" : "10%";
        light.style.width = state ? "100%" : "10%";
        // text.classList.add("text-black");
    }
</script>

<button class="bg-zinc-800 w-1/3 self-center h-24 flex overflow-hidden" on:click={onClick}>
    <p class="flex p-8 text-lg absolute" bind:this={text}>{name}</p>
    <div class="bg-yellow-100 opacity-30 rounded-full blur-lg self-center m-auto animate" bind:this={light}>
    </div>
</button>

<style lang="postcss">
    .animate{
        transition: width 0.5s ease-in-out;
        transition: height 0.5s ease-in-out;
    }
</style>