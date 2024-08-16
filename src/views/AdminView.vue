<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-full pt-5 px-10 flex justify-between">
      <h1 class="text-center text-3xl">Central Admin LP</h1>
      <h1 class="text-center text-3xl">
        <router-link to="/" class="text-sm"> <-- Voltar </router-link>
      </h1>
    </div>

    <div class="flex flex-col w-full p-10 items-center space-y-10">
      <div class="flex space-x-40">
        <div class="">
          <h1>Inserir nova unidade:</h1>
          <form class="flex flex-col space-y-3" @submit.prevent="handleSubmit()">
            <div class="space-x-3 space-y-3">
              <input class="p-2 rounded-lg" type="text" placeholder="UF" v-model="uf" />
              <input class="p-2 rounded-lg" type="text" placeholder="Cidade" v-model="cidade" />
            </div>
            <div class="space-x-3">
              <input class="p-2 rounded-lg" type="text" placeholder="Bairro" v-model="bairro" />
              <input class="p-2 rounded-lg" type="text" placeholder="Endereço" v-model="endereco" />
            </div>
            <div class="space-y-3">
              <input class="w-full p-2 rounded-lg" type="text" placeholder="URL" v-model="url" />
              <button class="w-full p-2 rounded-lg bg-green-400 font-bold text-white hover:text-black" type="submit">
                Inserir
              </button>
            </div>
          </form>
        </div>

        <div class="">
          <h1>Importar base de dados:</h1>
          <form class="flex flex-col space-y-5" @submit.prevent="fileSubmit()">
            <input type="file" name="file" ref="files" @change="handleFileChange" />
            <button class="p-2 rounded-lg bg-blue-400 font-bold text-white hover:text-black" type="submit">
              Upload
            </button>
          </form>
        </div>
      </div>

      <div class="h-[500px] overflow-x-auto overflow-y-auto">
        <table class="w-full text-start">
          <tr>
            <th class="px-5">Origem</th>
            <th class="px-5">Unidade</th>
            <th class="px-5">Acessos Únicos</th>
            <th class="px-5">Acessos Simultâneos</th>
          </tr>
          <tr v-for="unidade in selfit">
            <td class="px-5">{{ unidade.estado }}</td>
            <td class="px-5">{{ unidade.unidade }}</td>
            <td class="px-5">{{}}</td>
            <td class="px-5">{{}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
table,
th,
td {
  border: 1px solid black;
}
</style>

<script lang="js" setup>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { onMounted } from 'vue';

const uf = ref();
const cidade = ref();
const bairro = ref();
const endereco = ref();
const url = ref();
const selectedFile = ref();
const selfit = ref([]);

async function getSelfit() {
  const unidadesRef = collection(db, 'unidades');
  const result = await getDocs(unidadesRef);
  result.forEach((doc) => {
    selfit.value.push({
      estado: doc.id,
      unidade: doc.data().BAIRRO
    });
  });

  selfit.value.sort();
}

const handleSubmit = async () => {
  const unidadesRef = collection(db, 'unidades');
  await setDoc(
    doc(unidadesRef, `${uf.value.toUpperCase()}_${cidade.value.toUpperCase()}_${bairro.value.toUpperCase()}`),
    {
      UF: uf.value.toUpperCase(),
      CIDADE: cidade.value.toUpperCase(),
      BAIRRO: bairro.value.toUpperCase(),
      ENDERECO: endereco.value.toUpperCase(),
      URL: url.value.toLowerCase()
    }
  );
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
        const unidadesRef = collection(db, 'selfit',);

        for (const obj of jsonContent) {
          await setDoc(
            doc(unidadesRef, `${obj.UF.toUpperCase()}_${obj.CIDADE.toUpperCase()}_${obj.BAIRRO.toUpperCase()}`),
            {
              UF: obj.UF.toUpperCase(),
              CIDADE: obj.CIDADE.toUpperCase(),
              BAIRRO: obj.BAIRRO.toUpperCase(),
              ENDERECO: obj.ENDERECO.toUpperCase(),
              URL: obj.URL.toLowerCase()
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

onMounted(async () => {
  getSelfit();
});
</script>

<style scoped>
#file-upload-button {
  display: none;
}
</style>
