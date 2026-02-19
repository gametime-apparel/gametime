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
	class="w-full max-w-md space-y-6 rounded-2xl border border-border bg-surface p-8 shadow-2xl backdrop-blur-lg"
>
	<div class="mb-8 text-center">
		<h1 class="text-3xl font-bold tracking-tight text-primary">Game Time</h1>
		<p class="mt-2 text-sm text-secondary">Admin Portal Access</p>
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
			<Input
				type="password"
				name="password"
				placeholder="Enter Access Code"
				required
				autoFocus={true}
			/>

			<div class="cf-turnstile flex justify-center" data-sitekey={PUBLIC_TURNSTILE_SITE_KEY}></div>

			<Submit label="Login" {loading} />
		</div>
	</form>
</div>
