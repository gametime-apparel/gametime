<script lang="ts">
	const { children, enhance, message } = $props();
</script>

<div
	class="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
>
	<form use:enhance method="POST" class="flex flex-col gap-6 p-8">
		{#if message}
			<div class="rounded-md bg-red-500 p-4 text-sm text-white">
				{message}
			</div>
		{/if}
		{@render children()}
	</form>
</div>
