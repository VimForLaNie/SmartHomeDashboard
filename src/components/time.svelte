<script lang="ts">
	import { time } from '../store';
    const formatter = new Intl.DateTimeFormat('en', {
		hour12: false,
		hour: 'numeric',
		minute: '2-digit',
	});
</script>

<div class="time">
    {formatter.format($time)}
</div>

<style lang="postcss">
    .time {
        font-size: 4rem;
    }
</style>