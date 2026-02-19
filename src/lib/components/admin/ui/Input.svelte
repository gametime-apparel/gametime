<script lang="ts">
	interface Props {
		type?: 'text' | 'password';
		name: string;
		id?: string;
		placeholder?: string;
		required?: boolean;
		autoFocus?: boolean;
	}

	let { type = 'text', name, id = name, placeholder = name, required = false, autoFocus = false }: Props = $props();
</script>

<input
	{type}
	{name}
	{id}
	{placeholder}
	{required}
	autofocus={autoFocus}
	class="block w-full rounded-xl border border-border bg-background p-4 text-lg text-primary placeholder:text-secondary transition-all outline-none
	focus:border-transparent focus:ring-2 focus:ring-accent focus:outline-none"
/>
