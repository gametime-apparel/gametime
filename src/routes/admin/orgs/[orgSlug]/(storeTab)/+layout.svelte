<script lang="ts">
	import { Back, TabbedView } from '$lib/components/admin/ui';

	let { data, children } = $props();

	const tabs = [
		{
			id: 1,
			name: 'Items',
			href: `/admin/orgs/${data.currentOrg.slug}/stores/test`
		},
		{
			id: 2,
			name: 'Categories',
			href: `/admin/orgs/${data.currentOrg.slug}/edit`
		},
		{
			id: 3,
			name: 'Waves',
			href: `/admin/orgs/${data.currentOrg.slug}/edit`
		},
		{
			id: 4,
			name: 'Settings',
			href: `/admin/orgs/${data.currentOrg.slug}/edit`
		}
	];
</script>

<Back title="Back To Organizations" href="/admin" />
<h1 class="truncate text-3xl font-bold tracking-tight text-primary">
	{data.currentOrg.name}
</h1>
<p class="mt-1 text-sm text-secondary">/shop/{data.currentOrg.slug}</p>
<TabbedView links={tabs} />
{@render children()}
