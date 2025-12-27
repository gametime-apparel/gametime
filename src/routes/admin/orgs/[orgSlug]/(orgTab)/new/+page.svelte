<script lang="ts">
	import { StoreForm } from '$lib/components/admin/forms';

	const { data } = $props();
</script>

<h2 class="mb-6 text-xl font-bold">New Store</h2>

<StoreForm currentOrg={data.currentOrg} formData={data.form} />
