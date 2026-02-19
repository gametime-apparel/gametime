<div class="absolute top-full z-50 mt-3 w-100 rounded-xl bg-surface p-2 shadow-2xl border border-border">
	<input
		type="search"
		placeholder="Search Organizations and Stores..."
		class="mt-2 w-full rounded-lg bg-background p-2 text-sm text-primary placeholder:text-secondary focus:ring-1 focus:ring-accent"
	/>

	<div class="mt-2 max-h-[250px] space-y-1 overflow-y-auto">
		<h3 class="px-2 pt-2 pb-1 text-xs font-semibold text-secondary">
			ORGANIZATIONS
		</h3>

		<div class="space-y-1">
			<button
				class="flex w-full items-center justify-between rounded-md p-1 hover:cursor-pointer hover:bg-background"
			>
				<span
					class="flex items-center space-x-2 p-1 text-left text-sm font-semibold text-primary"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 rotate-90 text-secondary transition-transform duration-200"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
					<span>Penn State Hockey</span>
				</span>

				<span class="text-xs text-secondary">6 Stores</span>
			</button>

			<div class="space-y-1 pl-8">
				<a
					href="#"
					class="flex w-full items-center rounded-md bg-accent/10 p-2 text-sm font-medium text-accent"
				>
					Fall 2025 Fundraiser (Active)
				</a>
				<a
					href="#"
					class="flex w-full items-center rounded-md p-2 text-sm hover:bg-background"
				>
					Winter 2026 Season
				</a>
			</div>
		</div>
		<div class="my-2 h-px bg-border"></div>

		<button
			class="flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-background"
		>
			<span class="flex items-center space-x-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-secondary"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
				<span>Local Soccer Club</span>
			</span>
			<span class="text-xs text-secondary">1 Store</span>
		</button>
	</div>

	<div class="mt-2 flex justify-between border-t border-border p-2 pt-3">
		<a
			href="#"
			class="group relative flex items-center rounded-lg p-2 text-sm text-primary hover:bg-background"
			aria-label="Manage All Organizations"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.242 2.572-1.065z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>

			<span
				class="absolute left-full ml-3 hidden rounded bg-primary p-1 text-xs whitespace-nowrap text-surface group-hover:block"
			>
				Manage All Organizations
			</span>
		</a>

		<button
			class="group relative flex items-center rounded-lg bg-accent p-2 text-sm text-white transition-colors hover:opacity-90"
			aria-label="Add New Organization"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>

			<span
				class="absolute right-full mr-3 hidden rounded bg-primary p-1 text-xs whitespace-nowrap text-surface group-hover:block"
			>
				Add New Organization
			</span>
		</button>
	</div>
</div>
