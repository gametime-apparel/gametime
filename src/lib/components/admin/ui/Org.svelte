<script lang="ts">
	import type { OrgWithStores } from '$lib/server/contracts/orgs.contract';
	import { resolve } from '$app/paths';
	import { slide } from 'svelte/transition';

	type Props = {
		org: OrgWithStores;
	};

	let storesOpen = $state(false);

	const toggleStores = () => {
		storesOpen = !storesOpen;
	};

	let { org }: Props = $props();
</script>

<div
	class="relative overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all select-none hover:shadow-md"
>
	<div
		class="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-background sm:p-6"
		onclick={toggleStores}
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleStores()}
		role="button"
		tabindex="0"
	>
		<div class="flex items-center gap-4 sm:gap-6">
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-lg font-bold text-accent sm:h-14 sm:w-14 sm:text-xl"
			>
				<svg class="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
					/>
				</svg>
			</div>

			<div class="flex flex-col">
				<h3 class="text-base font-bold text-primary sm:text-lg" title={org.name}>
					{org.name}
				</h3>
				<div class="mt-1 flex items-center gap-2 text-sm text-secondary">
					<code
						class="rounded bg-background px-1.5 py-0.5 text-xs font-medium text-secondary"
					>
						/{org.slug}
					</code>
				</div>
			</div>
		</div>

		<div class="flex items-center gap-2 sm:gap-4">
			<div
				class="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors sm:flex"
			>
				<span>{org.stores?.length || 0} Stores</span>
				<svg
					class="h-4 w-4 text-secondary transition-transform duration-200"
					class:rotate-180={storesOpen}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</div>

			<a
				href={resolve(`/admin/orgs/${org.slug}/edit`)}
				onclick={(e) => e.stopPropagation()}
				class="rounded-lg p-2 text-secondary transition-colors hover:bg-background hover:text-accent"
				aria-label="Edit Organization Settings"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
					/>
				</svg>
			</a>

			<div class="rounded-lg p-2 text-secondary transition-colors sm:hidden text-accent">
				<svg
					class="h-5 w-5 transition-transform duration-200"
					class:rotate-180={storesOpen}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</div>
		</div>
	</div>

	<!-- Stores Accordion Section -->
	{#if storesOpen}
		<div
			transition:slide={{ duration: 200 }}
			class="border-t border-border bg-background px-4 py-4 sm:px-6"
		>
			<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
				{#if org.stores && org.stores.length > 0}
					{#each org.stores as store (store.id)}
						<a
							href={resolve(`/admin/orgs/${org.slug}/stores/${store.slug}`)}
							class="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-primary shadow-sm transition-all hover:border-accent hover:shadow-md"
						>
							<span>{store.name}</span>
							<svg
								class="h-4 w-4 text-secondary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</a>
					{/each}
				{:else}
					<div
						class="col-span-full py-4 text-center text-sm text-secondary italic"
					>
						No stores created for this organization yet.
					</div>
				{/if}

				<!-- Quick Add Store Link (Always visible in expanded view) -->
				<a
					href={resolve(`/admin/orgs/${org.slug}/new`)}
					class="flex items-center justify-center gap-2 rounded-lg border border-dashed border-accent/50 bg-accent/10 px-4 py-3 text-sm font-bold text-accent transition-all hover:border-accent hover:bg-accent/20"
				>
					<svg
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
					</svg>
					Create New Store
				</a>
			</div>
		</div>
	{/if}
</div>
