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
          <form class="flex flex-col space-y-3" @submit.prevent="setSelfit(uf, cidade, bairro, endereco, url)">
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
              <button class="w-full p-2 rounded-lg bg-blue-400 font-bold text-white hover:text-black" type="submit">
                Inserir
              </button>
            </div>
          </form>
        </div>

        <div class="">
          <h1>Importar base de dados:</h1>
          <form class="flex flex-col space-y-5" @submit.prevent="fileSubmit()">
            <input type="file" name="file" ref="files" @change="handleFileChange()" />
            <button class="p-2 rounded-lg bg-blue-400 font-bold text-white hover:text-black" type="submit">
              Upload
            </button>
          </form>
        </div>
      </div>

      <div class="flex w-full space-x-5 justify-center items-center border-t-2 border-gray-400 pt-10">
        <div class="flex rounded-lg w-[200px] h-16 bg-purple-400 justify-center items-center">
          <div class="flex flex-col w-[70%]">
            <span class="flex w-full items-center justify-center text-center material-symbols-outlined"> group </span>
            <span class="flex w-full items-center justify-center text-center">Total Acessos</span>
          </div>
          <span
            class="flex w-[30%] h-full justify-center items-center text-center text-2xl font-bold border-l-2 border-gray-200"
            >{{ acessos.length }}</span
          >
        </div>

        <div class="flex rounded-lg w-[200px] h-16 bg-green-400 justify-center items-center">
          <div class="flex flex-col w-[70%]">
            <span class="flex w-full items-center justify-center text-center material-symbols-outlined"> person </span>
            <span class="flex w-full items-center justify-center text-center">Acessos únicos</span>
          </div>
          <span
            class="flex w-[30%] h-full justify-center items-center text-center text-2xl font-bold border-l-2 border-gray-200"
            >{{ obterObjetosUnicosPorIPUnidade().length }}</span
          >
        </div>
      </div>

      <DataTable
        class="h-[400px] overflow-auto"
        tableStyle="min-width: 50rem"
        sortMode="multiple"
        removableSort
        :value="unidades"
      >
        <Column field="uf" header="Origem" sortable> </Column>
        <Column class="" field="bairro" header="Unidade" sortable> </Column>
        <Column class="ml-5" field="acessos" header="Acessos" sortable>
          <template #body="slotProps">
            {{ slotProps.data.acessos.length }}
          </template>
        </Column>
        <Column field="acessosUnicos" header="Acessos Únicos" sortable>
          <template #body="slotProps">
            {{ obterObjetosUnicosPorIP(slotProps.data.acessos).length }}
          </template>
        </Column>
      </DataTable>

      <div class="h-10"></div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const toast = useToast();
const uf = ref();
const cidade = ref();
const bairro = ref();
const endereco = ref();
const url = ref();
const selectedFile = ref();
const acessos = ref([]);
const unidades = ref([]);

function obterObjetosUnicosPorIPUnidade() {
    const mapa = new Map();
    const newArray = [];

    unidades.value.forEach((obj) => {
        obj.acessos.forEach((acesso) => {
            const ip = acesso.geolocation.ip;
            if (!mapa.has(ip)) {
                mapa.set(ip, true);
                newArray.push(acesso);
            }
        });
    });

    return newArray;
}

function obterObjetosUnicosPorIP(arr) {
  const mapa = new Map();
  const newArray = [];

  arr.forEach((obj) => {
    const ip = obj.geolocation.ip;
    if (!mapa.has(ip)) {
      mapa.set(ip, true);
      newArray.push(obj);
    }
  });

  return newArray;
}

async function getUnidades() {
  const querySnapshot = await getDocs(collection(db, 'selfit'));
  const documents = [];

  querySnapshot.forEach((doc) => {
    documents.push(doc.data());
  });

  let tempUnidades = [documents[0]];

  unidades.value = Object.values(tempUnidades[0]);

  // Inicialize a propriedade "acessos" como um array vazio para cada unidade
  unidades.value.forEach((unidade) => {
    unidade.acessos = [];
  });

  // Percorra os acessos e adicione-os às unidades correspondentes
  acessos.value.forEach((acesso) => {
    const matchingUnidade = unidades.value.find((unidade) => unidade.bairro === acesso.unidade);

    if (matchingUnidade) {
      matchingUnidade.acessos.push(acesso);
    }
  });
}

async function getAcessos() {
  const querySnapshot = await getDocs(collection(db, 'acessos'));
  const documents = [];

  querySnapshot.forEach((doc) => {
    documents.push(doc.data());
  });

  acessos.value = documents;
}

async function setSelfit(uf = null, cidade = null, bairro = null, endereco = null, url = null) {
  const ufValue = uf?.value || uf;
  const cidadeValue = cidade?.value || cidade;
  const bairroValue = bairro?.value || bairro;
  const enderecoValue = endereco?.value || endereco;
  const urlValue = url?.value || url;

  const docRef = doc(db, 'selfit', 'unidades');

  const dadosUnidade = {
    [`${ufValue.toUpperCase()}-${bairroValue.toUpperCase().replace(/\s/g, '_')}`]: {
      uf: ufValue.toUpperCase(),
      cidade: cidadeValue.toUpperCase(),
      bairro: bairroValue.toUpperCase(),
      endereco: enderecoValue.toUpperCase(),
      url: urlValue
    }
  };

  await setDoc(docRef, dadosUnidade, { merge: true });
  toast.success('Inserido com sucesso.');
}

function handleFileChange(event) {
  selectedFile.value = event.target.files[0];
}

async function fileSubmit() {
  if (selectedFile.value && selectedFile.value.type === 'application/json') {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);

        for (const obj of jsonContent) {
          console.log('Inserindo unidades...');
          await setSelfit(obj.UF, obj.CIDADE, obj.BAIRRO, obj.ENDERECO, obj.URL);
        }

        toast.success('Unidades inseridas com sucesso!');
      } catch (error) {
        console.error('Erro ao parsear o arquivo JSON:', error);
      }
    };
    reader.readAsText(selectedFile.value);
  } else {
    console.error('Por favor, selecione um arquivo JSON válido.');
  }
}

onMounted(async () => {
  await getAcessos();
  await getUnidades();
});
</script>

<style scoped>
#file-upload-button {
  display: none;
}

table,
th,
td {
  border: 1px solid black;
}

.floater-whatsapp {
  display: hidden !important;
}
</style>
