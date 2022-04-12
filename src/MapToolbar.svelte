<script>
	import { createEventDispatcher } from "svelte";
	import { showWaves, showWind, showTemp } from "./stores.js";

	const dispatch = createEventDispatcher();
	let eye = true;
	function clickEye() {
		eye = !eye;
		dispatch("click-eye", eye);
	}

	let lines = true;
	function clickLines() {
		lines = !lines;
		dispatch("click-lines", lines);
	}

	let _showTemp;

	// $: _showTemp = $showTemp;

	// function setShowTemp() {
	// 	console.log(!_showTemp)
	// 	showTemp.set(!_showTemp)
	// }
</script>

<!-- Icons from heroicons.dev -->

<button
	type="button"
	class="single-click"
	on:click={() => dispatch("click-reset")}
	title="Reset View"
>
	<svg
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		viewBox="0 0 24 24"
		stroke="currentColor"
		><path
			d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
		/></svg
	>
</button>

<button
	type="button"
	on:click={clickEye}
	class:selected={eye}
	title="Show Markers"
>
	<svg
		width="24"
		height="24"
		stroke-width="1.5"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M18.2785 7C19.7816 7 21 8.11929 21 9.5C21 10.8807 19.7816 12 18.2785 12H3"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showWind ? 2 : 1}"

		/>
		<path
			d="M17.9375 20C19.0766 20 20.5 19.5 20.5 17.5C20.5 15.5 19.0766 15 17.9375 15H3"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showWind ? 2 : 1}"

		/>
		<path
			d="M10.4118 4C11.8412 4 13 5.11929 13 6.5C13 7.88071 11.8412 9 10.4118 9H3"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showWind ? 2 : 1}"

		/>
	</svg>
</button>

<button
	type="button"
	on:click={clickLines}
	class:selected={lines}
	title="Show Lines"
>
	<!-- <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="{lines ? 2 : 1}" viewBox="0 0 24 24" stroke="currentColor"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg> -->

	<svg
		width="24"
		height="24"
		stroke-width="1.5"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M3 10C5.48276 10 7.34483 7 7.34483 7C7.34483 7 9.2069 10 11.6897 10C14.1724 10 16.6552 7 16.6552 7C16.6552 7 19.1379 10 21 10"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showWaves ? 2 : 1}"
		/>
		<path
			d="M3 17C5.48276 17 7.34483 14 7.34483 14C7.34483 14 9.2069 17 11.6897 17C14.1724 17 16.6552 14 16.6552 14C16.6552 14 19.1379 17 21 17"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showWaves ? 2 : 1}"
		/>
	</svg>
</button>

<button
	type="button"
	on:click={() => showTemp.set(!$showTemp)}
	class:selected={$showTemp}
	title="Show Temp"
>
	<svg
		width="24"
		height="24"
		stroke-width="1.5"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showTemp ? 2 : 1}"
		/>
		<path
			d="M22 12L23 12"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showTemp ? 2 : 1}"
		/>
		<path
			d="M12 2V1"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showTemp ? 2 : 1}"
		/>
		<path
			d="M12 23V22"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showTemp ? 2 : 1}"
		/>
		<path
			d="M20 20L19 19"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showTemp ? 2 : 1}"
		/>
		<path
			d="M20 4L19 5"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showTemp ? 2 : 1}"
		/>
		<path
			d="M4 20L5 19"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showTemp ? 2 : 1}"
		/>
		<path
			d="M4 4L5 5"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showTemp ? 2 : 1}"
		/>
		<path
			d="M1 12L2 12"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="{$showTemp ? 2 : 1}"
		/>
	</svg>

	<!-- <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="{$showTemp ? 2 : 1}" viewBox="0 0 24 24" stroke="currentColor"><path d="M176 322.9V112c0-8.75-7.25-16-16-16s-16 7.25-16 16v210.9c-18.62 6.625-32 24.25-32 45.13c0 26.5 21.5 48 48 48s48-21.5 48-48C208 347.1 194.6 329.5 176 322.9zM272 278.5V112c0-61.87-50.12-112-111.1-112S48 50.13 48 112v166.5c-19.75 24.75-32 55.5-32 89.5c0 79.5 64.5 143.1 144 143.1S304 447.5 304 368C304 334 291.8 303.1 272 278.5zM160 448c-44.13 0-80-35.87-80-79.1c0-25.5 12.25-48.88 32-63.75v-192.3c0-26.5 21.5-48 48-48s48 21.5 48 48v192.3c19.75 14.75 32 38.25 32 63.75C240 412.1 204.1 448 160 448z"></path></svg> -->
</button>

<style>
	.selected {
		background-opacity: 25%;
		background-color: #dcc;
	}

	button {
		width: 2rem;
		height: 2rem;
		border: 0;
		background-color: transparent;
		transition-property: background-color, background-opacity;
		transition-duration: 250ms;
		border-radius: 0.375rem;
	}

	.single-click:hover {
		background-opacity: 50%;
		background-color: lightgray;
	}
</style>
