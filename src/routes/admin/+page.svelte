<script lang="ts">
	import { resolve } from '$app/paths';
	import { Org } from '$lib/components/admin/ui';

	let { data } = $props();
</script>

<div class="mx-auto max-w-7xl space-y-8 p-6">
	<!-- Header Area -->
	<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
		<div class="space-y-1">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
			<p class="text-gray-500 dark:text-gray-400">
				Welcome back. Select an organization to manage.
			</p>
		</div>

		<!-- Primary Action -->
		<a
			href={resolve('/admin/new')}
			class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all select-none hover:scale-105 hover:bg-indigo-500 hover:shadow-indigo-500/25 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
		>
			<svg
				class="mr-2 h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>
			Create Organization
		</a>
	</div>

	<!-- Organization List (Stacked Layout) -->
	<div class="space-y-4">
		{#each data.orgs as org (org.id)}
			<Org {org} />
		{:else}
			<!-- Empty State (No Orgs) -->
			<div
				class="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white/50 py-24 text-center dark:border-gray-800 dark:bg-white/5"
			>
				<div class="mb-4 rounded-full bg-white p-4 shadow-sm dark:bg-gray-800">
					<svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-900 dark:text-white">No organizations yet</h3>
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
					Get started by creating your first organization.
				</p>
				<a
					href={resolve('/admin/new')}
					class="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
				>
					Create Organization &rarr;
				</a>
			</div>
		{/each}
	</div>
</div>
