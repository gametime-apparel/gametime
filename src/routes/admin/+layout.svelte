<script lang="ts">
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
	});

	const { children } = $props();
</script>

<div
	class="min-h-screen w-full bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
>
	<Toaster />

	<main>
		{@render children()}
	</main>
</div>
