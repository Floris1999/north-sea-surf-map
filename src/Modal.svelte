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

    // export let onCloseModel;
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
                <div class="card" style="border-color: #04aa6d">
                    <h2 class="card-title">Wind</h2>
                    <div class="card-body">
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
                                transform="rotate({wind[2]
                                    .latestValue} 144 189)"
                                fill="#FF0202"
                            />
                            <path
                                d="M144 77L111 189.5L111.072 189.745L177 189.5L144 77Z"
                                transform="rotate({wind[2]
                                    .latestValue} 144 189)"
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
                </div>
            {/if}

            {#if $showWaves}
                <div class="card" id="wave" style="border-color: #1d4ed8;">
                    <h2 class="card-title">Golfhoogte</h2>
                    <div class="wave">
                        <h3>{wave[0].locationCode}</h3>

                        <svg
                            width="350"
                            height="130"
                            viewBox="0 0 390 80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M221.359 2.65193C221.167 2.45368 220.85 2.44881 220.652 2.64105L217.421 5.77371C217.223 5.96594 217.218 6.28249 217.41 6.48073C217.603 6.67897 217.919 6.68384 218.118 6.49161L220.989 3.70702L223.774 6.57862C223.966 6.77687 224.282 6.78174 224.481 6.5895C224.679 6.39727 224.684 6.08072 224.492 5.88248L221.359 2.65193ZM219.641 68.3481C219.833 68.5463 220.15 68.5512 220.348 68.3589L223.579 65.2263C223.777 65.0341 223.782 64.7175 223.59 64.5193C223.397 64.321 223.081 64.3162 222.882 64.5084L220.011 67.293L217.226 64.4214C217.034 64.2231 216.718 64.2183 216.519 64.4105C216.321 64.6027 216.316 64.9193 216.508 65.1175L219.641 68.3481ZM220.5 2.99231L219.5 67.9923L220.5 68.0077L221.5 3.00769L220.5 2.99231Z"
                                fill="white"
                            />
                            <path
                                d="M221.354 82.3536C221.549 82.1583 221.549 81.8417 221.354 81.6464L218.172 78.4645C217.976 78.2692 217.66 78.2692 217.464 78.4645C217.269 78.6597 217.269 78.9763 217.464 79.1716L220.293 82L217.464 84.8284C217.269 85.0237 217.269 85.3403 217.464 85.5355C217.66 85.7308 217.976 85.7308 218.172 85.5355L221.354 82.3536ZM62.6464 81.6464C62.4512 81.8417 62.4512 82.1583 62.6464 82.3536L65.8284 85.5355C66.0237 85.7308 66.3402 85.7308 66.5355 85.5355C66.7308 85.3403 66.7308 85.0237 66.5355 84.8284L63.7071 82L66.5355 79.1716C66.7308 78.9763 66.7308 78.6597 66.5355 78.4645C66.3402 78.2692 66.0237 78.2692 65.8284 78.4645L62.6464 81.6464ZM221 81.5L63 81.5L63 82.5L221 82.5L221 81.5Z"
                                fill="white"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 21.4524L7.66667 19.263C15.3333 17.0735 30.6667 12.6945 46 10.505C61.3333 8.31556 76.6667 8.31556 92 17.0735C107.333 25.8314 122.667 43.3473 138 45.5367C153.333 47.7262 168.667 34.5893 184 21.4524C199.333 8.31556 214.667 -4.82133 230 1.74712C245.333 8.31556 260.667 34.5893 276 43.3473C291.333 52.1052 306.667 43.3473 322 41.1578C337.333 38.9683 352.667 43.3473 360.333 45.5367L368 47.7262V74H360.333C352.667 74 337.333 74 322 74C306.667 74 291.333 74 276 74C260.667 74 245.333 74 230 74C214.667 74 199.333 74 184 74C168.667 74 153.333 74 138 74C122.667 74 107.333 74 92 74C76.6667 74 61.3333 74 46 74C30.6667 74 15.3333 74 7.66667 74H0V21.4524Z"
                                stroke="url(#paint0_linear_8_97)"
                                stroke-width="5"
                            />
                            <text
                                fill="white"
                                xml:space="preserve"
                                style="white-space: pre"
                                font-family="Inter"
                                font-size="16"
                                letter-spacing="0em"
                                ><tspan x="225" y="52.3182">40 cm</tspan></text
                            >
                            <text
                                fill="white"
                                xml:space="preserve"
                                style="white-space: pre"
                                font-family="Inter"
                                font-size="20"
                                letter-spacing="0em"
                                ><tspan x="126" y="101.273">7 s</tspan></text
                            >
                            <defs>
                                <linearGradient
                                    id="paint0_linear_8_97"
                                    x1="184"
                                    y1="0"
                                    x2="184"
                                    y2="74"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#8AFF6C" />
                                    <stop offset="1" stop-color="#30F100" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <!-- <svg
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
                    </svg> -->
                        <p>{waveDate.toISOString().split("T")[0]}</p>
                    </div>
                </div>
            {/if}

            {#if $showTemp}
                <div class="card" style="border-color: #b91c1c">
                    <h2 class="card-title">Watertemperatuur</h2>
                    <div style="width: 80%;">
                        <h3>{temp[0].locationCode}</h3>
                        <h3>Wetsuit advies bij {temp[0].latestValue}°:</h3>
                        <table id="wetsuit">
                            <tr>
                                <th>Wetsuit</th>
                                <th>Gloves </th>
                                <th>Booties</th>
                                <th>Cap </th>
                            </tr>
                            <tr>
                                <td><p>5mm</p></td>
                                <td>
                                    {#if temp[0].latestValue < 14}
                                        <svg
                                            fill="none"
                                            stroke="#fff"
                                            viewBox="0 0 32 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 13l4 4L19 7"
                                            /></svg
                                        >
                                    {:else}
                                        <svg
                                            width="40"
                                            height="36"
                                            stroke-width="1.5"
                                            viewBox="0 0 14 22"
                                            fill="none"
                                            stroke="#b91c1c"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    {/if}
                                </td>
                                <td
                                    ><svg
                                        fill="none"
                                        stroke="#fff"
                                        viewBox="0 0 32 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        ><path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 13l4 4L19 7"
                                        /></svg
                                    ></td
                                >
                                <td>
                                    {#if temp[0].latestValue < 14}
                                        <svg
                                            fill="none"
                                            stroke="#fff"
                                            viewBox="0 0 32 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 13l4 4L19 7"
                                            /></svg
                                        >
                                    {:else}
                                        <svg
                                            width="40"
                                            height="36"
                                            stroke-width="1.5"
                                            viewBox="0 0 14 22"
                                            fill="none"
                                            stroke="#b91c1c"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    {/if}
                                </td>
                            </tr>
                        </table>

                        <p>{tempDate.toISOString().split("T")[0]}</p>
                    </div>
                </div>
            {/if}

            {#if !$showTemp && !$showWaves && !$showWind}
                <h2>Alle filters uitgeschakelt</h2>
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
        font-size: 14px;
        width: 25%;
    }

    #wetsuit tr {
        /* background-color: #ddd; */
    }

    .card {
        border: 1px solid;
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: #191932;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        padding: 20px;
    }

    .card-body {
        display: flex;
        flex-flow: row;
    }

    .contents {
        height: 100vh;
        min-width: 42vh;
        border-radius: 6px;
        padding: 16px;
        background: #000000;
        display: flex;
        flex-direction: column;
        pointer-events: auto;
    }

    .btn {
        background-color: #191932;
        color: white;
        font-size: 16px;
    }

    h2 {
        color: #ffffff;
        text-align: center;
        font-size: 24px;
        margin-top: 0;
        margin-bottom: 0;
    }

    h3 {
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }

    p {
        text-align: center;
        color: #ffffff;
        margin-top: 0;
        margin-bottom: 0;
    }

    .actions {
        margin-top: 32px;
        display: flex;
        justify-content: -between;
        gap: 8px;
    }
</style>
