<script>
	import { enhance } from '$app/forms';
	import { Input, Submit } from '$lib/components/admin/ui';
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Login | Game Time</title>
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<div
	class="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl backdrop-blur-lg dark:border-white/10 dark:bg-white/5"
>
	<div class="mb-8 text-center">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Game Time</h1>
		<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Admin Portal Access</p>
	</div>

	<form
		method="POST"
		use:enhance={() => {
			loading = true;
			return async ({ update, result }) => {
				loading = false;

				console.log('Server sent back:', result);

				if (result.type === 'failure') {
					if (window.turnstile) window.turnstile.reset();
				}

				await update();
			};
		}}
	>
		{#if form?.error}
			<div
				class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-200"
			>
				{form.error}
			</div>
		{/if}

		<div class="space-y-6">
			<Input type="password" name="password" placeholder="Enter Access Code" required />

			<div class="cf-turnstile flex justify-center" data-sitekey={PUBLIC_TURNSTILE_SITE_KEY}></div>

			<Submit label="Login" {loading} />
		</div>
	</form>
</div>
