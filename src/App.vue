<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
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

let quoteValues = ref<any>({})


onMounted(() => {
  const url:string = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=20&tsym=EUR'
  fetch(url)
    //using promese
    .then(result => result.json())
    .then(({ Data }) => cryptoCurrencies.value = Data )
});

const getQuote = async() => {
  const { currency, cryptoCurrency } = quote
  const url:string = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`

  //using fetch without promese
  const response = await fetch(url)
  const data = await response.json()
  quoteValues.value = data.DISPLAY[cryptoCurrency][currency]
}

const quoteCrypto = () => {
  //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/values
  if(Object.values(quote).includes('')){
    error.value = 'All fields are required'
    return
  }
  error.value = ''
  getQuote()
}

const displayValues = computed(() => {
  return Object.values(quoteValues.value).length > 0
});


  
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
      <div v-if="displayValues" class="data-container">
        <h2>Quote</h2>
        <div class="result">
          <img :src="`https://cryptocompare.com/` + quoteValues.IMAGEURL" alt="Cryptocurrency" srcset="">
          <div>
            <p>Price: <span>{{ quoteValues.PRICE }}</span></p>
            <p>Journaly maximal price: <span>{{ quoteValues.HIGHDAY }}</span></p>
            <p>Journaly minimal price: <span>{{ quoteValues.LOWDAY }}</span></p>
            <p>Latest 24 hours variation: <span>{{ quoteValues.CHANGEPCT24HOUR }}%</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
