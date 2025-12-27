<script lang="ts">
	import { page } from '$app/state';

	type Props = {
		links: {
			id: number;
			name: string;
			href: string;
		}[];
	};
	const { links }: Props = $props();
</script>

<div class="my-10 border-b border-gray-200 dark:border-gray-800">
	<nav class="-mb-px space-x-8">
		{#each links as link (link.id)}
			<a
				href={link.href}
				class="inline-block border-b-2 border-b-transparent px-1 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 {page
					.url.pathname === link.href
					? 'border-indigo-500! text-indigo-600 dark:text-indigo-400'
					: 'hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'}"
				>{link.name}
			</a>
		{/each}
	</nav>
</div>
