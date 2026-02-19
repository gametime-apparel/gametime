<script lang="ts">
	import Form from './Form.svelte';
	import { SlugInput, SubmitButton, TextInput } from '$lib/components/admin/ui';
	import ColorPicker from '$lib/components/admin/forms/ColorPicker.svelte';
	import Shipping from '$lib/components/admin/forms/Shipping.svelte';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { CreateStore } from '$lib/server/contracts/stores.contract';
	import type { Org } from '$lib/server/contracts/orgs.contract';
	import { untrack } from 'svelte';

	interface Props {
		mode?: 'create' | 'update';
		formData: SuperValidated<CreateStore>;
		currentOrg: Org;
	}

	let { mode = 'create', formData, currentOrg }: Props = $props();

	const { form, errors, enhance, constraints, message, delayed } = superForm(
		untrack(() => formData)
	);
</script>

<Form {enhance} message={$message}>
	<TextInput
		type="text"
		id="name"
		name="name"
		label="Store Name"
		bind:value={$form.name}
		error={$errors.name}
		{...$constraints.name}
	/>
	{#if mode === 'update'}
		<SlugInput
			prefix="/shop/{currentOrg.slug}/"
			type="text"
			id="slug"
			name="slug"
			label="Store Slug"
			bind:value={$form.slug}
			error={$errors.slug}
			disabled
			{...$constraints.slug}
		/>
		<input type="hidden" name="slug" value={$form.slug} />
	{:else}
		<SlugInput
			prefix="/shop/{currentOrg.slug}/"
			type="text"
			id="slug"
			name="slug"
			label="Store Slug"
			bind:value={$form.slug}
			error={$errors.slug}
			{...$constraints.slug}
		/>
	{/if}

	<Shipping bind:selectedValue={$form.shipping} />

	<SubmitButton
		loading={$delayed}
		label={mode === 'create' ? 'Create Store' : 'Update Store'}
		loadingLabel={mode === 'create' ? 'Creating Store...' : 'Updating Store...'}
	/>
</Form>
