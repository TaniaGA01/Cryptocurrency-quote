<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IQuote } from './interfaces/crypto.intefaces'
import useCrypto from './composables/useCrypto'
import Alert from './components/Alert.vue';
import Spinner from './components/Spinner.vue';
import ResultValues from './components/ResultValues.vue'

const { currencies, cryptoCurrencies, quoteValues, load, getQuote, displayValues } = useCrypto()

const quote = reactive<IQuote>({
  currency:'',
  cryptoCurrency:''
})

const error = ref<string>('')

const quoteCrypto = () => {
  //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/values
  if(Object.values(quote).includes('')){
    error.value = 'All fields are required'
    return
  }
  error.value = ''
  getQuote(quote)
}

</script>

<template>
  <div class="container">
    <h1 class="title"><span>Cryptocurrency</span> quote</h1>
    <div class="content">
      <Alert v-if="error">{{ error }}</Alert>
      <form @submit.prevent="quoteCrypto"
      >
        <div class="field">
          <label for="currency">Currency:</label>
          <select 
            id="currency"
            v-model="quote.currency"
            >
            <option value="">--Choose a currency--</option>
            <option 
              v-for="currency in currencies" 
              :key="currency.id" 
              :value="currency.code">
                {{ currency.text }}
              </option>
          </select>
        </div>
        <div class="field">
          <label for="crypto">Cryptocurrency:</label>
          <select 
            id="crypto"
            v-model="quote.cryptoCurrency"
          >
            <option value="">--Choose a cryptocurrency--</option>
            <option 
              v-for="crypto in cryptoCurrencies" 
              :key="crypto.CoinInfo.Id" 
              :value="crypto.CoinInfo.Name">
                {{ crypto.CoinInfo.FullName }}
              </option>
          </select>
        </div>
        <input type="submit" value="Quote">
      </form>
      
      <Spinner v-if="load"/>
      <ResultValues 
        v-if="displayValues"
        :quoteValues="quoteValues"
      />
    </div>
  </div>
</template>
