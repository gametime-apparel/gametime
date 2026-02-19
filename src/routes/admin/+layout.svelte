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
	class="min-h-screen w-full bg-background text-primary transition-colors duration-300"
>
	<Toaster />

	<main class="@container/dash mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>
