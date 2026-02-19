<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { slugify, toSlug } from '$lib/utils';

	interface Props extends HTMLInputAttributes {
		label: string;
		error?: string[] | undefined;
		helperText?: string;
		prefix?: string;
	}

	let {
		label,
		error,
		helperText,
		value = $bindable(),
		prefix = '/shop/',
		...rest
	}: Props = $props();

	const handleSlugInput = () => {
		if (value) value = toSlug(value.toString());
	};

	const handleSlugify = () => {
		if (value) value = slugify(value.toString());
	};

	// Dynamic padding calculation
	let prefixWidth = $state(0);
	let prefixElement: HTMLElement;

	$effect(() => {
		if (prefixElement) {
			prefixWidth = prefixElement.offsetWidth;
		}
	});
</script>

<div class="space-y-2">
	<label
		for={rest.id || rest.name}
		class="block text-sm font-semibold text-primary"
	>
		{label}
	</label>
	<div class="relative rounded-xl shadow-sm">
		<!-- Hidden element to measure width -->
		<span
			bind:this={prefixElement}
			class="pointer-events-none invisible absolute pl-3 text-base whitespace-nowrap sm:text-sm"
			aria-hidden="true"
		>
			{prefix}
		</span>

		<!-- Visible Prefix -->
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<span class="text-secondary sm:text-sm">{prefix}</span>
		</div>

		<input
			bind:value
			oninput={handleSlugInput}
			onfocusout={handleSlugify}
			{...rest}
			style="padding-left: {prefixWidth + 12}px"
			class="input"
			aria-invalid={error ? 'true' : undefined}
		/>
	</div>

	{#if error}
		<p class="text-sm font-medium text-red-500">{error}</p>
	{:else if helperText}
		<p class="text-xs text-secondary">
			{helperText}
		</p>
	{/if}
</div>
