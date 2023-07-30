<script setup lang="ts">
import { ref } from 'vue';

interface ICurrency{
  id:number,
  code:string,
  text:string
}

const currencies = ref<ICurrency[]>([
      { id:0, code: 'USD', text: 'U.S. dollar'},
      { id:1, code: 'MXN', text: 'Mexican Peso'},
      { id:2, code: 'EUR', text: 'Euro'},
      { id:3, code: 'GBP', text: 'Sterling'},
  ])
  
</script>

<template>
  <div class="container">
    <h1 class="title"><span>Cryptocurrency</span> quote</h1>
    <div class="content">
      <form>
        <div class="field">
          <label for="currency">Currency:</label>
          <select id="currency">
            <option value="">--Choose a currency--</option>
            <option 
              v-for="currency in currencies" 
              :key="currency.id" 
              :value="currency.code">
                {{ currency.text }}
              </option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>
