<template>
  <div class="w-full h-full flex flex-col justify-center items-center space-y-5">
    <div class="w-full">
      <h1 class="text-center text-3xl">Central Admin LP</h1>
    </div>

    <div class="max-w-[25%] justify-center items-center">
      <form class="flex flex-col space-y-5" @submit.prevent="handleSubmit">
        <input class="p-2 rounded-lg" type="text" placeholder="UF" v-model="uf" />
        <input class="p-2 rounded-lg" type="text" placeholder="Cidade" v-model="cidade" />
        <input class="p-2 rounded-lg" type="text" placeholder="Bairro" v-model="bairro" />
        <input class="p-2 rounded-lg" type="text" placeholder="Endereço" v-model="endereco" />
        <input class="p-2 rounded-lg" type="text" placeholder="URL" v-model="url" />
        <button class="p-2 rounded-lg bg-green-400 font-bold text-white hover:text-black" type="submit">Inserir</button>
      </form>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref } from 'vue';

const uf = ref();
const cidade = ref();
const bairro = ref();
const endereco = ref();
const url = ref();

const handleSubmit = () => {
  const newRow = `"${uf.value};${cidade.value};${bairro.value};${endereco.value};${url.value}"`;
  console.log(newRow);
};
</script>

<style lang="css" scoped></style>
