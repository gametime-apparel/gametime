<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label: string;
		error?: string[] | undefined;
	}

	let { label, error, value = $bindable(), ...rest }: Props = $props();
</script>

<div class="space-y-2">
	<label
		for={rest.id || rest.name}
		class="block text-sm font-semibold text-gray-900 dark:text-gray-200"
	>
		{label}
	</label>
	<input bind:value {...rest} class="input" aria-invalid={error ? 'true' : undefined} />
	{#if error}
		<p class="text-sm font-medium text-red-500">{error}</p>
	{/if}
</div>
