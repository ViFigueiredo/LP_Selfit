<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-full pt-5">
      <h1 class="text-center text-3xl">Central Admin LP</h1>
    </div>

    <div class="flex w-full p-10 justify-start items-start space-x-10">
      <div class="w-[20%]">
        <h1>Inserir nova unidade:</h1>
        <form class="flex flex-col space-y-5" @submit.prevent="handleSubmit()">
          <input class="p-2 rounded-lg" type="text" placeholder="UF" v-model="uf" />
          <input class="p-2 rounded-lg" type="text" placeholder="Cidade" v-model="cidade" />
          <input class="p-2 rounded-lg" type="text" placeholder="Bairro" v-model="bairro" />
          <input class="p-2 rounded-lg" type="text" placeholder="Endereço" v-model="endereco" />
          <input class="p-2 rounded-lg" type="text" placeholder="URL" v-model="url" />
          <button class="p-2 rounded-lg bg-green-400 font-bold text-white hover:text-black" type="submit">
            Inserir
          </button>
        </form>
      </div>

      <div class="">
        <h1>Importar base de dados:</h1>
        <form class="flex flex-col space-y-5" @submit.prevent="fileSubmit()">
          <input type="file" name="file" ref="files" @change="handleFileChange" />
          <button class="p-2 rounded-lg bg-blue-400 font-bold text-white hover:text-black" type="submit">Upload</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, doc, setDoc } from 'firebase/firestore';

const uf = ref();
const cidade = ref();
const bairro = ref();
const endereco = ref();
const url = ref();
const selectedFile = ref();

const handleSubmit = async () => {
  const unidadesRef = collection(db, 'unidades');
  await setDoc(doc(unidadesRef, `${uf.value} - ${cidade.value}`), {
    UF: String(uf.value),
    CIDADE: String(cidade.value),
    BAIRRO: String(bairro.value),
    ENDERECO: String(endereco.value),
    URL: String(url.value)
  });
  location.reload();
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const fileSubmit = async () => {
  if (selectedFile.value && selectedFile.value.type === 'application/json') {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);
        const unidadesRef = collection(db, 'unidades');
        let count = 0;

        for (const obj of jsonContent) {
          count++;
          await setDoc(
            doc(unidadesRef, `${count}_${obj.UF}_${obj.CIDADE}`),
            {
              UF: String(obj.UF).toUpperCase(),
              CIDADE: String(obj.CIDADE),
              BAIRRO: String(obj.BAIRRO),
              ENDERECO: String(obj.ENDERECO),
              URL: String(obj.URL).toLowerCase()
            },
            { merge: false }
          );
          console.log('Inserido');
        }
        console.log('Finalizado');
        location.reload();
      } catch (error) {
        console.error('Erro ao parsear o arquivo JSON:', error);
      }
    };

    reader.readAsText(selectedFile.value);
  } else {
    console.error('Por favor, selecione um arquivo JSON válido.');
  }
};
</script>
