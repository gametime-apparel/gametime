<script lang="ts">
	let { children } = $props();
</script>

<div
	class="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
>
	{@render children()}
</div>
