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

    export let wave;
    export let wind;
    export let temp;

    let windDate = new Date(wind[0].dateTime);
    let waveDate = new Date(wave[0].dateTime);
    let tempDate = new Date(temp[0].dateTime);

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
                <button on:click={closeModal} class="btn"
                    ><i class="fa fa-angle-right" /></button
                >
            </div>

            {#if $showWind}
                <div class="card">
                    <svg
                        width="150"
                        height="150"
                        viewBox="0 0 303 406"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M111.072 189.745L144 302L177 189.5L111.072 189.745Z"
                            transform="rotate({wind[2].latestValue} 144 189)"
                            fill="#FF0202"
                        />
                        <path
                            d="M144 77L111 189.5L111.072 189.745L177 189.5L144 77Z"
                            transform="rotate({wind[2].latestValue} 144 189)"
                            fill="black"
                        />
                        <text
                            fill="white"
                            xml:="preserve"
                            style="white-: pre"
                            font-family="Inter"
                            font-size="39.6923"
                            letter-spacing="0em"
                            ><tspan x="129" y="70.6643">N</tspan></text
                        >
                        <text
                            fill="white"
                            xml:="preserve"
                            style="white-: pre"
                            font-family="Inter"
                            font-size="39.6923"
                            letter-spacing="0em"
                            ><tspan x="260" y="202.664">E</tspan></text
                        >
                        <text
                            fill="white"
                            xml:="preserve"
                            style="white-: pre"
                            font-family="Inter"
                            font-size="39.6923"
                            letter-spacing="0em"
                            ><tspan x="126" y="341.434">W</tspan></text
                        >
                        <text
                            fill="white"
                            xml:="preserve"
                            style="white-: pre"
                            font-family="Inter"
                            font-size="39.6923"
                            letter-spacing="0em"
                            ><tspan x="36" y="397.434"
                                >{wind[2].latestValue} graden</tspan
                            ></text
                        >
                        <text
                            fill="white"
                            xml:="preserve"
                            style="white-: pre"
                            font-family="Inter"
                            font-size="39.6923"
                            letter-spacing="0em"
                            ><tspan x="0" y="202.434">S</tspan></text
                        >
                        <circle
                            cx="144"
                            cy="189"
                            r="18"
                            transform="rotate(-180 144 189)"
                            fill="white"
                        />
                    </svg>
                    <div>
                        <h3>{wind[0].locationCode}</h3>
                        <h2>{wind[0].latestValue} m/s</h2>
                        <p>{windDate.toISOString().split("T")[0]}</p>
                    </div>
                </div>
            {/if}

            {#if $showWaves}
                <div class="card">
                    <div class="wave">
                        <h3>Boei: {wave[0].locationCode}</h3>
                        <svg
                            width="350"
                            height="130"
                            viewBox="0 0 360 80"
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
                                xml:="preserve"
                                style="white-: pre"
                                font-family="Inter"
                                font-size="12"
                                letter-spacing="0em"
                                ><tspan x="216.656" y="44.3702"
                                    >{wave[0].latestValue} cm</tspan
                                ></text
                            >
                            <text
                                fill="#7517F8"
                                xml:="preserve"
                                style="white-: pre"
                                font-family="Inter"
                                font-size="12"
                                letter-spacing="0em"
                                ><tspan x="126.31" y="98.9987"
                                    >{wave[1].latestValue} s</tspan
                                ></text
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
                                    gradientUnits="userOnUse"
                                >
                                    <stop stop-color="#8AFF6C" />
                                    <stop offset="1" stop-color="#02C751" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <p>{waveDate.toISOString().split("T")[0]}</p>
                    </div>
                </div>
            {/if}

            {#if $showTemp}
                <div class="card">
                    <div style="width: 80%;">
                        <h3>Boei: {temp[0].locationCode}</h3>
                        <h2>Wetsuit advies bij {temp[0].latestValue}°:</h2>
                        <table id="wetsuit">
                            <tr>
                                <th>Wetsuit</th>
                                <th>Gloves </th>
                                <th>Booties</th>
                                <th>Cap    </th>
                            </tr>
                            <tr>
                                <td>5 mm</td>
                                <td><svg fill="none" stroke="currentColor" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></td>
                                <td><svg fill="none" stroke="currentColor" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></td>
                                <td><svg fill="none" stroke="currentColor" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></td>
                            </tr>
                        </table>

                        <div />

                        <p>{tempDate.toISOString().split("T")[0]}</p>
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
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;

        /* allow click-through to backdrop */
        pointer-events: none;
    }

    #wetsuit {
        border-collapse: collapse;
        width: 100%;
    }

    #wetsuit th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04aa6d;
        color: white;
    }

    #wetsuit td,
    #wetsuit th {
        border: 1px solid #ddd;
        padding: 8px;
        width: 25%;
    }

    #wetsuit tr {
        background-color: #ddd;
    }

    .card {
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: #191932;
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
        background: #000000;
        display: flex;
        flex-direction: column;
        pointer-events: auto;
    }

    h2 {
        color: #ffffff;
        text-align: center;
        font-size: 24px;
    }

    h3 {
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }

    p {
        text-align: center;
        color: #ffffff;
        margin-top: 16px;
    }

    .actions {
        margin-top: 32px;
        display: flex;
        justify-content: -between;
        gap: 8px;
    }
</style>
