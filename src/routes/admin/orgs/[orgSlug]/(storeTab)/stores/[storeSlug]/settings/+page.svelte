<script lang="ts">
	import { StoreForm } from '$lib/components/admin/forms';

	const { data } = $props();
</script>

<svelte:head>
	<title>Edit Store - {data.store.name}</title>
</svelte:head>

<h2 class="mb-6 text-xl font-bold">Edit Store</h2>
<StoreForm mode="update" currentOrg={data.currentOrg} formData={data.form} />
