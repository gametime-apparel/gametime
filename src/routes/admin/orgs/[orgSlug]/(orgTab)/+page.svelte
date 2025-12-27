<script lang="ts">
	import { Add } from '$lib/components/icons';
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Stores - {data.currentOrg.name}</title>
</svelte:head>

<div class="flex items-center justify-between">
	<h2 class="mb-6 text-xl font-bold">Stores</h2>
	<a class="btn" href={resolve(`/admin/orgs/${data.currentOrg.slug}/new`)}>
		<Add class="mr-2" />
		Create Store
	</a>
</div>

{#each data.stores as store (store.id)}
	<a href={resolve(`/admin/orgs/${data.currentOrg.slug}/stores/${store.slug}`)}>{store.name}</a>
	<br />
{/each}
