<script lang="ts">
	import { OrgForm } from '$lib/components/admin/forms';

	const { data } = $props();
</script>

<svelte:head>
	<title>Edit Organization - {data.currentOrg.name}</title>
</svelte:head>

<h2 class="mb-6 text-xl font-bold">Edit Organization</h2>
<OrgForm mode="update" formData={data.form} />
