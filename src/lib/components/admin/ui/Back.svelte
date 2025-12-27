<script lang="ts">
	import { BackArrow } from '$lib/components/icons/index.ts';

	type Props = {
		title: string;
		href: string;
	};

	const { title, href }: Props = $props();
</script>

<a
	{href}
	class="group text-gray-500 transition-colors hover:text-gray-600 hover:dark:text-gray-400"
>
	<div class="inline-block transition-transform duration-200 ease-out group-hover:-translate-x-1">
		<BackArrow />
	</div>
	{title}
</a>
