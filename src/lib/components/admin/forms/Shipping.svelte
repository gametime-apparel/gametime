<script lang="ts">
	let { selectedValue = $bindable('none') } = $props();

	selectedValue = 'none';

	const options = [
		{
			id: 1,
			value: 'none',
			label: 'None',
			description: 'No address needed',
			icon: 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0 M4.93 4.93l14.14 14.14'
		},
		{
			id: 2,
			value: 'optional',
			label: 'Optional',
			description: 'Customer choice',
			icon: 'M9 11l3 3L22 4m-2 6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h11'
		},
		{
			id: 3,
			value: 'required',
			label: 'Required',
			description: 'Always collected',
			icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
		}
	] as const;
</script>

<div class="space-y-3">
	<label for="shipping" class="block text-sm font-semibold text-primary">
		Shipping Requirements
	</label>

	<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
		{#each options as { id, value, label, description, icon } (id)}
			<button
				type="button"
				onclick={() => (selectedValue = value)}
				class={[
					'group flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all hover:scale-105 active:scale-95',
					selectedValue === value
						? 'border-accent bg-accent/10 ring-2 ring-accent ring-offset-2 ring-offset-surface'
						: 'border-border bg-surface text-secondary'
				]}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-6 w-6 transition-colors {selectedValue === value
						? 'text-accent'
						: 'text-secondary'}"
				>
					<path d={icon} />
				</svg>

				<span class="flex flex-col">
					<span
						class="text-xs font-bold tracking-wider uppercase {selectedValue === value
							? 'text-primary'
							: ''}"
					>
						{label}
					</span>
					<span
						class="text-[10px] leading-tight opacity-70 {selectedValue === value
							? 'text-accent'
							: ''}"
					>
						{description}
					</span>
				</span>
			</button>
		{/each}
	</div>

	<input type="hidden" name="shipping" value={selectedValue} />
</div>
