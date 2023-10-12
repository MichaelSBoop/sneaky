<script lang="ts">
  import { key } from "./lib/key.js";

  const APIKey = key.API;
  const getData = async (
    curr1: HTMLOptionElement,
    curr2: HTMLOptionElement
  ): Promise<any> => {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${APIKey}/pair/${curr1}/${curr2}`
    )
      .then((data) => data.json())
      .catch((err) => "Error: " + err);
    return res;
  };
  let topVal: number;
  let botVal: number;
  let selected1: HTMLOptionElement;
  let selected2: HTMLOptionElement;

  const handleLeft = async () => {
    const rate = await getData(selected1, selected2);
    botVal = topVal * rate.conversion_rate;
  };

  const handleRight = async () => {
    const rate = await getData(selected2, selected1);
    topVal = botVal * rate.conversion_rate;
  };

  $: handleLeft;
  $: handleRight;
  $: selected1;
  $: selected2;
  $: topVal;
  $: botVal;
</script>

<main class="wrapper">
  <header>Convert currency</header>
  <div class="currency left">
    <select class="size" bind:value={selected1}>
      <!-- Change event can be added upon selecting currency, but leads to unintuitive and unpredictable user expirience -->
      <!-- on:change={handleLeft} -->
      <option value="USD">USD</option>
      <option value="RUB">RUB</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="JPY">JPY</option>
    </select>
  </div>
  <input
    class="size"
    type="number"
    bind:value={topVal}
    on:change={handleLeft}
  />
  <div />
  <input
    class="size"
    type="number"
    bind:value={botVal}
    on:change={handleRight}
  />
  <div class="currency right">
    <select class="size" bind:value={selected2}>
      <!-- Change event can be added upon selecting currency, but leads to unintuitive and unpredictable user expirience -->
      <!-- on:change={handleRight} -->
      <option value="USD">USD</option>
      <option value="RUB">RUB</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="JPY">JPY</option>
    </select>
  </div>
</main>

<style>
  .wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    height: 400px;
    font-size: x-large;
  }
  .currency {
    width: 3em;
    height: 1em;
  }
  .size {
    font-size: x-large;
  }
</style>
