<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		children: Snippet;
	};

	const { children, href }: Props = $props();
</script>

<a
	{href}
	class="flex h-18 w-full flex-col items-center justify-center gap-1 rounded-lg border border-border text-secondary transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent @xl/list:w-30"
>
	{@render children()}
</a>
