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

<div class="my-10 border-b border-border">
	<nav class="-mb-px space-x-8">
		{#each links as link (link.id)}
			<a
				href={link.href}
				class="inline-block border-b-2 border-b-transparent px-1 py-4 text-sm font-medium text-secondary {page
					.url.pathname === link.href
					? 'border-accent! text-accent'
					: 'hover:border-border hover:text-primary'}"
				>{link.name}
			</a>
		{/each}
	</nav>
</div>
