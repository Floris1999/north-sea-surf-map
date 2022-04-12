import { writable } from 'svelte/store';

export const showWaves = writable(true);
export const showWind = writable(true);
export const showTemp = writable(true);