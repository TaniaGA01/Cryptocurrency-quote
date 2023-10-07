import { ref, onMounted, computed } from 'vue';
import { ICurrency, ICryptoCurrencies, IQuote } from '../interfaces/crypto.intefaces'

export default function useCripto(){

    const currencies = ref<ICurrency[]>([
        { id:0, code: 'USD', text: 'U.S. dollar'},
        { id:1, code: 'MXN', text: 'Mexican Peso'},
        { id:2, code: 'EUR', text: 'Euro'},
        { id:3, code: 'GBP', text: 'Sterling'},
    ])

    const cryptoCurrencies = ref<ICryptoCurrencies[]>([])

    let quoteValues = ref<any>({})

    const load = ref<any>(false)

    onMounted(() => {
        const url:string = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=20&tsym=EUR'
        fetch(url)
        //using promese
        .then(result => result.json())
        .then(({ Data }) => cryptoCurrencies.value = Data )
    });

    const getQuote = async(quote:IQuote) => {
        load.value = true
        quoteValues.value = {}
      
        try {
          const { currency, cryptoCurrency } = quote
          const url:string = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`
      
          //using fetch without promese
          const response = await fetch(url)
          const data = await response.json()
          quoteValues.value = data.DISPLAY[cryptoCurrency][currency]

        } catch (error) {
          console.log(error)
        } finally{
          load.value = false
        }
        
    }
    const displayValues = computed(() => {
        return Object.values(quoteValues.value).length > 0
    });
    
    return{
        currencies,
        cryptoCurrencies,
        quoteValues,
        load,
        getQuote,
        displayValues
    }
}