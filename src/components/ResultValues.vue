<script setup lang="ts">
import { ICryptoValues } from '../interfaces/crypto.intefaces'

defineProps<{
    quoteValues:ICryptoValues
}>()
</script>
<template>
    <div class="data-container">
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
</template>