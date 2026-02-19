<script lang="ts">
	import { Add, Calendar, Gear, Shirt, Tag } from '$lib/components/icons';
	import { resolve } from '$app/paths';
	import { IconLink } from '$lib/components/admin/ui';

	let { data } = $props();
</script>

<svelte:head>
	<title>Stores - {data.currentOrg.name}</title>
</svelte:head>

<div class="mb-6 flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between @sm:gap-0">
	<h2 class="text-xl font-bold">Stores</h2>
	<a class="btn" href={resolve(`/admin/orgs/${data.currentOrg.slug}/new`)}>
		<Add class="mr-2" />
		Create Store
	</a>
</div>

<div
	class="@container/list overflow-hidden rounded-xl border border-border bg-surface"
>
	{#if data.stores.length > 0}
		{#each data.stores as store (store.id)}
			<div class="border-b border-border last-of-type:border-none">
				<div
					class="flex flex-col px-4 py-5 @xl/list:flex-row @xl/list:items-center @xl/list:justify-between @xl/list:gap-2"
				>
					<div class="truncate">
						<h3 class="mb-1 text-lg font-semibold text-accent">
							{store.name}
						</h3>
						<p class="truncate text-sm text-ellipsis text-secondary">
							/shop/{data.currentOrg.slug}/{store.slug}
						</p>
					</div>
					<div class="mt-4 flex flex-col gap-2 @xs/list:flex-row @xl/list:mt-0">
						<IconLink href="">
							<Shirt class="text-2xl" />
							<p>Items</p>
						</IconLink>

						<IconLink href="">
							<Tag class="text-2xl" />
							<p>Categories</p>
						</IconLink>

						<IconLink href="">
							<Calendar class="text-2xl" />
							<p>Waves</p>
						</IconLink>

						<a
							href=""
							class="ml-4 hidden items-center rounded-xl p-4 transition-colors hover:bg-background hover:text-primary @2xl/list:flex"
						>
							<Gear class="text-3xl text-secondary" />
						</a>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<div class="flex flex-col items-center justify-center gap-4 px-4 py-12 text-center">
			<p class="text-sm text-secondary">
				No stores created for this organization yet.
			</p>
			<a class="btn" href={resolve(`/admin/orgs/${data.currentOrg.slug}/new`)}>
				<Add class="mr-2" />
				Create Store
			</a>
		</div>
	{/if}
</div>
