<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Alert from './components/Alert.vue';

interface ICurrency{
  id:number,
  code:string,
  text:string
}
interface ICryptoCurrencies{
  CoinInfo:{
    Id:string,
    FullName:string,
    Name:string
  }
}

interface IQuote{
  currency:string,
  cryptoCurrency:string
}

const currencies = ref<ICurrency[]>([
      { id:0, code: 'USD', text: 'U.S. dollar'},
      { id:1, code: 'MXN', text: 'Mexican Peso'},
      { id:2, code: 'EUR', text: 'Euro'},
      { id:3, code: 'GBP', text: 'Sterling'},
])

const cryptoCurrencies = ref<ICryptoCurrencies[]>([])

const error = ref<string>('')

const quote = reactive<IQuote>({
  currency:'',
  cryptoCurrency:''
})

onMounted(() => {
  const url:string = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=20&tsym=EUR'
  fetch(url)
    //using promese
    .then(result => result.json())
    .then(({ Data }) => cryptoCurrencies.value = Data )
});

const quoteCrypto = () => {
  //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/values
  if(Object.values(quote).includes('')){
    error.value = 'All fields are required'
    return
  }
  error.value = ''
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
    </div>
  </div>
</template>
