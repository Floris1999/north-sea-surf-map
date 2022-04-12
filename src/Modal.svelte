<script>
    import {
        closeModal,
        closeAllModals,
        openModal,
        modals,
    } from "svelte-modals";
    import { fly } from "svelte/transition";

    import { showWaves, showWind, showTemp } from "./stores.js";

    export let isOpen;
    export let title;
    export let message;

    export let wave;

    export let onCloseModel;
</script>

{#if isOpen}
    <!-- on:introstart and on:outroend are required to transition 1 at a time between modals -->
    <div
        role="dialog"
        class="modal"
        transition:fly={{ x: 50 }}
        on:introstart
        on:outroend
    >
        <div class="contents">
            <div class="actions">
                <button on:click={closeModal}>Close</button>
                <button on:click={onCloseModel}>Open Another</button>
            </div>

            <div class="card">
                <div>
                    <h1>{title}</h1>
                    <p>something</p>
                </div>

            </div>

            <h2>{title}</h2>
            <p>{message}</p>

            {#if $showWind}
                <div class="wave">
                    <h2>dit is allemaal maar een test</h2>
                </div>
            {/if}

            {#if $showWaves}
                <div class="wave">
                    <h2>
                        De gemeten hoogte golf hoogte is: {wave[0].latestValue} cm
                    </h2>
                    <h3>Bij boei {wave[0].locationCode}</h3>
                    <h3>om {wave[0].dateTime}</h3>

                    <svg
                        width="100%"
                        height="auto"
                        viewBox="0 0 357 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M215.255 1.98553C215.06 1.79027 214.743 1.79027 214.548 1.98553L211.366 5.16751C211.171 5.36277 211.171 5.67935 211.366 5.87461C211.561 6.06988 211.878 6.06988 212.073 5.87461L214.902 3.04619L217.73 5.87461C217.925 6.06988 218.242 6.06988 218.437 5.87461C218.633 5.67935 218.633 5.36277 218.437 5.16751L215.255 1.98553ZM214.548 71.4463C214.743 71.6416 215.06 71.6416 215.255 71.4463L218.437 68.2643C218.633 68.0691 218.633 67.7525 218.437 67.5572C218.242 67.362 217.925 67.362 217.73 67.5572L214.902 70.3857L212.073 67.5572C211.878 67.362 211.561 67.362 211.366 67.5572C211.171 67.7525 211.171 68.0691 211.366 68.2643L214.548 71.4463ZM214.402 2.33908V71.0928H215.402V2.33908H214.402Z"
                            fill="#7517F8"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 21.3819L7.4375 19.1996C14.875 17.0174 29.75 12.6528 44.625 10.4705C59.5 8.28822 74.375 8.28822 89.25 17.0174C104.125 25.7465 119 43.2048 133.875 45.387C148.75 47.5693 163.625 34.4756 178.5 21.3819C193.375 8.28822 208.25 -4.80548 223.125 1.74137C238 8.28822 252.875 34.4756 267.75 43.2048C282.625 51.9339 297.5 43.2048 312.375 41.0225C327.25 38.8402 342.125 43.2048 349.563 45.387L357 47.5693V73.7567H349.563C342.125 73.7567 327.25 73.7567 312.375 73.7567C297.5 73.7567 282.625 73.7567 267.75 73.7567C252.875 73.7567 238 73.7567 223.125 73.7567C208.25 73.7567 193.375 73.7567 178.5 73.7567C163.625 73.7567 148.75 73.7567 133.875 73.7567C119 73.7567 104.125 73.7567 89.25 73.7567C74.375 73.7567 59.5 73.7567 44.625 73.7567C29.75 73.7567 14.875 73.7567 7.4375 73.7567H0V21.3819Z"
                            stroke="url(#paint0_linear_8_97)"
                            stroke-width="5"
                        />
                        <text
                            fill="#7517F8"
                            xml:space="preserve"
                            style="white-space: pre"
                            font-family="Inter"
                            font-size="12"
                            letter-spacing="0em"
                            ><tspan x="216.656" y="44.3702">{wave[0].latestValue} cm</tspan></text
                        >
                        <text
                            fill="#7517F8"
                            xml:space="preserve"
                            style="white-space: pre"
                            font-family="Inter"
                            font-size="12"
                            letter-spacing="0em"
                            ><tspan x="126.31" y="98.9987">{wave[1].latestValue} s</tspan></text
                        >
                        <line
                            y1="-0.5"
                            x2="154.986"
                            y2="-0.5"
                            transform="matrix(0.999997 0.00231073 -0.00239492 0.999997 59.183 82.3766)"
                            stroke="#7517F8"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_8_97"
                                x1="178.5"
                                y1="0"
                                x2="178.5"
                                y2="73.7567"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#8AFF6C" />
                                <stop offset="1" stop-color="#02C751" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            {/if}

            {#if $showTemp}
                <div style="height: 20%">
                    <h3>Wetsuit advies voor de Huidige temperatuur (4):</h3>
                    <div
                        id="right"
                        style="flex:8; display:flex; flex-flow:row;"
                    >
                        <div
                            id="red"
                            class="center"
                            style="background-color:#ffaaaa; flex:1;"
                        >
                            <h2>Wetsuit</h2>
                            4mm
                        </div>
                        <div
                            id="red"
                            class="center"
                            style="background-color:yellow; flex:1;"
                        >
                            <h2>Gloves</h2>
                            Bottom
                        </div>
                        <div
                            id="red"
                            class="center"
                            style="background-color:yellow; flex:1;"
                        >
                            <h2>Booties</h2>
                            Bottom
                        </div>
                        <div
                            id="red"
                            class="center"
                            style="background-color:yellow; flex:1;"
                        >
                            <h2>Cap</h2>
                            Bottom
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .modal {
        z-index: 999;
        position: fixed;
        height: 100%;
        width: 40%;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .card {
        background-color: #191932;
        height: 100%;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        padding: 20px;
    }

    .contents {
        height: 100vh;
        min-width: 240px;
        border-radius: 6px;
        padding: 16px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
    }

    h2 {
        text-align: center;
        font-size: 24px;
    }

    p {
        text-align: center;
        margin-top: 16px;
    }

    .actions {
        margin-top: 32px;
        display: flex;
        justify-content: space-between;
        gap: 8px;
    }
</style>
