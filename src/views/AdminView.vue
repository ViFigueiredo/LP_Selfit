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
            <input type="file" id="file-upload-button" name="file" ref="files" @change="handleFileChange()" />
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
          >
            {{ totalAcessos }}
          </span>
        </div>

        <div class="flex rounded-lg w-[200px] h-16 bg-green-400 justify-center items-center">
          <div class="flex flex-col w-[70%]">
            <span class="flex w-full items-center justify-center text-center material-symbols-outlined"> person </span>
            <span class="flex w-full items-center justify-center text-center">Acessos únicos</span>
          </div>
          <span
            class="flex w-[30%] h-full justify-center items-center text-center text-2xl font-bold border-l-2 border-gray-200"
          >
            {{ totalAcessosUnicos }}
          </span>
        </div>

        <div class="flex rounded-lg w-[200px] h-16 bg-yellow-400 justify-center items-center">
          <div class="flex flex-col w-[70%]">
            <span class="flex w-full items-center justify-center text-center material-symbols-outlined"> event </span>
            <span class="flex w-full items-center justify-center text-center">No período</span>
          </div>
          <span
            class="flex w-[30%] h-full justify-center items-center text-center text-2xl font-bold border-l-2 border-gray-200"
          >
            {{ totalAcessosPeriodo }}
          </span>
        </div>
      </div>

      <DataTable
        class="w-full h-[500px] overflow-auto"
        sortMode="multiple"
        optionLabel="label"
        dataKey="label"
        scrollHeight="75%"
        columnResizeMode="fit"
        filterDisplay="row"
        scrollable
        removableSort
        resizableColumns
        showGridlines
        v-model:filters="filters"
        :globalFilterFields="['uf', 'bairro']"
        :size="size.value"
        :value="unidades"
      >
        <template #header class="flex">
          <div class="flex justify-between">
            <div class="mt-5">
              <DatePicker
                v-model="dates"
                selectionMode="range"
                dateFormat="dd/mm/yy"
                placeholder="Período"
                showIcon
                fluid
                showButtonBar
                :showOnFocus="true"
                :manualInput="false"
              />
            </div>
            <div class="mt-5">
              {{ dates }}
            </div>
          </div>
        </template>
        <Column field="uf" header="Origem" sortable tableStyle="background-color: red">
          <template #filter="{ filterModel, filterCallback }" class="w-full">
            <InputText
              class="w-full"
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Pesquisar..."
            />
          </template>
        </Column>
        <Column field="bairro" header="Unidade" sortable>
          <template #filter="{ filterModel, filterCallback }" class="w-full">
            <InputText
              class="w-full"
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Pesquisar..."
            />
          </template>
        </Column>
        <Column field="acessos" header="Acessos" sortable>
          <template #body="slotProps">
            {{ slotProps.data.acessos.length }}
          </template>
        </Column>
        <Column field="acessosUnicos" header="Acessos Únicos" sortable>
          <template #body="slotProps" id="teste">
            {{ obterObjetosUnicosPorIP(slotProps.data.acessos).length }}
          </template>
        </Column>
      </DataTable>

      <div class="h-10"></div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { FilterMatchMode } from '@primevue/core/api';
import { getUnidades } from '../services/Selfit';

const toast = useToast();
const uf = ref();
const cidade = ref();
const bairro = ref();
const endereco = ref();
const url = ref();
const selectedFile = ref();
const unidades = ref([]);
const unidadesOriginal = ref([]);
const totalAcessos = ref(0);
const totalAcessosUnicos = ref(0);
const totalAcessosPeriodo = ref(0);
const dates = ref([]);
const size = ref({ label: 'G', value: 'large' });
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  uf: { value: null, matchMode: FilterMatchMode.CONTAINS },
  bairro: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  unidades.value = await getUnidades(unidades.value);
  unidadesOriginal.value = unidades.value;
  totalAcessos.value = contarTotalAcessos(unidades.value);
  totalAcessosUnicos.value = obterObjetosUnicosPorIPUnidade(unidades.value);

  watch(dates, () => {
    if (dates.value) {
      const startDate = dates.value[0];
      const endDate = dates.value[1];

      if (startDate && endDate) {
        unidades.value = filterObjectsByDateRange(unidades.value, startDate, endDate);
      }
    } else {
      dates.value = [];
      unidades.value = unidadesOriginal.value;
    }
  });
});

/* TODO: fix acessos dentro de unidades após filtro de datas */
function filterObjectsByDateRange(objectsArray, startDateStr, endDateStr) {
  const startDate = converteEmMilissegundos(startDateStr);
  const endDate = converteEmMilissegundos(endDateStr);

  objectsArray.map((unidade) => {
    if (unidade && unidade.acessos) {
      unidade.acessos = unidade.acessos.filter((acesso) => {
        const ano = acesso.datetime.slice(6, 10);
        const mes = acesso.datetime.slice(3, 5);
        const dia = acesso.datetime.slice(0, 2);
        const datetime = new Date(`${ano}-${mes}-${dia}T${acesso.datetime.slice(11)}`);
        acesso.datetime = converteEmMilissegundos(datetime.toISOString());

        return acesso.datetime >= startDate && acesso.datetime <= endDate;
      });
    }
    return unidade;
  });
  console.log(objectsArray);
  return objectsArray;
}

function converteEmMilissegundos(datetime) {
  return new Date(datetime).getTime();
}

function contarTotalAcessos(unidades) {
  const acessosPorUnidade = unidades.map((unidade) => {
    const acessosValidos = unidade.acessos.filter((acesso) => acesso.geolocation && acesso.geolocation.ip);
    return acessosValidos;
  });

  let total = 0;
  acessosPorUnidade.forEach((acesso) => {
    total += acesso.length;
  });

  return total;
}

function obterObjetosUnicosPorIPUnidade(unidades) {
  const mapa = new Map();
  const newArray = [];

  unidades.forEach((obj) => {
    obj.acessos.forEach((acesso) => {
      const ip = acesso.geolocation.ip;
      if (!mapa.has(ip)) {
        mapa.set(ip, true);
        newArray.push(acesso);
      }
    });
  });

  return newArray.length;
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
</script>
