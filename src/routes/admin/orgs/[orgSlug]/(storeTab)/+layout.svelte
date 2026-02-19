<script lang="ts">
	import { resolve } from '$app/paths';
	import { Back, TabbedView } from '$lib/components/admin/ui';

	let { data, children } = $props();

	const tabs = [
		{
			id: 1,
			name: 'Items',
			href: `/admin/orgs/${data.currentOrg.slug}/stores/${data.currentStore.slug}`
		},
		{
			id: 2,
			name: 'Categories',
			href: `/admin/orgs/${data.currentOrg.slug}/stores/${data.currentStore.slug}/categories`
		},
		{
			id: 3,
			name: 'Waves',
			href: `/admin/orgs/${data.currentOrg.slug}/stores/${data.currentStore.slug}/waves`
		},
		{
			id: 4,
			name: 'Settings',
			href: `/admin/orgs/${data.currentOrg.slug}/stores/${data.currentStore.slug}/settings`
		}
	];
</script>

<Back title="All Stores" href={resolve(`/admin/orgs/${data.currentOrg.slug}`)} />
<h1 class="truncate text-3xl font-bold tracking-tight text-primary">
	{data.currentOrg.name}
</h1>
<p class="mt-1 text-sm text-secondary">/shop/{data.currentOrg.slug}</p>
<TabbedView links={tabs} />
{@render children()}
