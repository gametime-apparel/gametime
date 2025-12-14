<script lang="ts">
	import { orgState } from '$lib/stores';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/state';
	import toast, { Toaster } from 'svelte-french-toast';
	
	const flash = getFlash(page);
	
	$effect(() => {
		if ($flash) {
			switch ($flash.type) {
				case 'success':
					toast.success($flash.message, {
						style: 'background: #059669; color: #FFF;'
					});
					break;
				case 'error':
					toast.error($flash.message);
					break;
			}
		}
	})
	

	let { children, data } = $props();
	
	$effect.pre(() => {
		if (data.orgs) {
			orgState.set(data.orgs);
		}
	})
</script>
<div class="min-h-screen w-full transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
<Toaster  />

<main>
	{@render children()}
</main>

</div>
