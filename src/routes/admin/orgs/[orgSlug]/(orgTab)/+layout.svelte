<script lang="ts">
	import { Back, TabbedView } from '$lib/components/admin/ui';

	let { data, children } = $props();

	const tabs = [
		{
			id: 1,
			name: 'Stores',
			href: `/admin/orgs/${data.currentOrg.slug}`
		},
		{
			id: 2,
			name: 'Settings',
			href: `/admin/orgs/${data.currentOrg.slug}/edit`
		}
	];
</script>

<Back title="Back To Organizations" href="/admin" />
<h1 class="truncate text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
	{data.currentOrg.name}
</h1>
<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">/shop/{data.currentOrg.slug}</p>
<TabbedView links={tabs} />
{@render children()}
