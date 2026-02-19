<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import { clickOutside } from '$lib/utils';
	import { orgState } from '$lib/stores';
	// Assume you have your ThemeToggle, etc., imported here
	// import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	// ... let { children } = $props(); (Svelte 5)
	let open = $state(false);
</script>

<div
	class="min-h-screen bg-background font-sans text-primary"
>
	<aside
		class="fixed top-0 left-0 z-10 h-full w-60 space-y-6 border-r border-border bg-surface p-4 shadow-xl transition-colors"
	>
		<div
			use:clickOutside={() => {
				if (open) open = false;
			}}
			class="relative"
		>
			<button
				onclick={() => (open = !open)}
				class="flex w-full cursor-pointer items-center justify-between rounded-md border border-border bg-background p-2 text-left text-sm text-primary"
			>
				Organization Name
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-secondary"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M8 10l4-4 4 4" />
					<path stroke-linecap="round" stroke-linejoin="round" d="M8 14l4 4 4-4" />
				</svg>
			</button>

			{#if open}
				<Dropdown />
			{/if}
		</div>

		<nav class="space-y-1">
			<a
				href="/admin/dashboard"
				class="flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-accent/10 hover:text-accent"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
				<span>Dashboard</span>
			</a>
		</nav>

		<div class="absolute bottom-4 w-full pr-8"></div>
	</aside>

	<main class="ml-64 p-8">
		{#each orgState.list as org (org.id)}
			{org.name}
		{/each}
	</main>
</div>
