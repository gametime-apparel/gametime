<script lang="ts">
	import Form from './Form.svelte';
	import { SlugInput, SubmitButton, TextInput } from '$lib/components/admin/ui';
	import ColorPicker from '$lib/components/admin/forms/ColorPicker.svelte';
	import Shipping from '$lib/components/admin/forms/Shipping.svelte';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { CreateStore, Org } from '$lib/server/contracts';
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

	$form.orgId = currentOrg.id;
</script>

<Form {enhance} message={$message}>
	<input type="hidden" bind:value={$form.orgId} />
	<TextInput
		type="text"
		id="name"
		name="name"
		label="Store Name"
		bind:value={$form.name}
		error={$errors.name}
		{...$constraints.name}
	/>
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
	<ColorPicker bind:value={$form.slug} />
	<Shipping bind:selectedValue={$form.slug} />

	<SubmitButton
		loading={$delayed}
		label={mode === 'create' ? 'Create Store' : 'Update Store'}
		loadingLabel={mode === 'create' ? 'Creating Store...' : 'Updating Store...'}
	/>
</Form>
