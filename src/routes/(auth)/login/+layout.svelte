<script lang="ts">
	let { children } = $props();
</script>

<div
	class="flex min-h-screen w-full items-center justify-center bg-background p-4 text-primary transition-colors duration-300"
>
	{@render children()}
</div>
