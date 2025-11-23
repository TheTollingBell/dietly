<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/logo.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div
	class="dark:bg-purple-500 bg-purple-300 bg-linear-to-br from-purple-300 to-pink-300 dark:from-purple-700 dark:to-pink-700 min-h-screen"
>
	{@render children()}
</div>
