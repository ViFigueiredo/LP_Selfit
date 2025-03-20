<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-full pt-5 px-10 flex justify-between">
      <h1 class="text-center text-3xl">Central Admin LP</h1>
      <h1 class="text-center text-3xl">
        <router-link to="/" class="text-sm"> Voltar </router-link>
      </h1>
    </div>

    <div class="flex flex-col w-full p-10 items-center space-y-10">
      <div class="flex w-full space-x-5 justify-center items-center border-t-2 border-gray-400 pt-10">
        <div class="flex rounded-lg w-[200px] h-16 bg-purple-400 justify-center items-center">
          <div class="flex flex-col w-[70%]">
            <span class="flex w-full items-center justify-center text-center material-symbols-outlined">
              group
            </span>
            <span class="flex w-full items-center justify-center text-center">Total Acessos</span>
          </div>
          <span
            class="flex w-[30%] h-full justify-center items-center text-center text-2xl font-bold border-l-2 border-gray-200">
            {{ totalAcessos }}
          </span>
        </div>

        <div class="flex rounded-lg w-[200px] h-16 bg-green-400 justify-center items-center">
          <div class="flex flex-col w-[70%]">
            <span class="flex w-full items-center justify-center text-center material-symbols-outlined">
              person
            </span>
            <span class="flex w-full items-center justify-center text-center">Acessos únicos</span>
          </div>
          <span
            class="flex w-[30%] h-full justify-center items-center text-center text-2xl font-bold border-l-2 border-gray-200">
            {{ totalAcessosUnicos }}
          </span>
        </div>

        <div class="flex rounded-lg w-[200px] h-16 bg-yellow-400 justify-center items-center">
          <div class="flex flex-col w-[70%]">
            <span class="flex w-full items-center justify-center text-center material-symbols-outlined">
              event
            </span>
            <span class="flex w-full items-center justify-center text-center">No período</span>
          </div>
          <span
            class="flex w-[30%] h-full justify-center items-center text-center text-2xl font-bold border-l-2 border-gray-200">
            {{ totalAcessosPeriodo }}
          </span>
        </div>

        <div class="flex rounded-lg w-[230px] h-16 bg-red-400 justify-center items-center">
          <div class="flex flex-col w-[70%]">
            <span class="flex w-full items-center justify-center text-center material-symbols-outlined">
              event
            </span>
            <span class="flex w-full items-center justify-center text-center">No período / únicos</span>
          </div>
          <span
            class="flex w-[30%] h-full justify-center items-center text-center text-2xl font-bold border-l-2 border-gray-200">
            {{ totalAcessosPeriodoUnicos }}
          </span>
        </div>
      </div>

      <DataTable class="w-full h-[650px] overflow-auto" sortMode="multiple" optionLabel="label" dataKey="label"
        scrollHeight="75%" columnResizeMode="fit" filterDisplay="row" scrollable removableSort resizableColumns
        showGridlines v-model:filters="filters" :globalFilterFields="['uf', 'cidade', 'bairro']" :size="size.value"
        :value="unidades">

        <!-- {{ unidades }} -->

        <template #header class="flex">
          <div class="flex space-x-3 justify-between">
            <div class="mt-5">
              <DatePicker v-model="dates" selectionMode="range" dateFormat="dd/mm/yy" placeholder="Período" showIcon
                fluid showButtonBar :showOnFocus="true" :manualInput="false" />
            </div>
            <div class="mt-5">
              <Button label="Atualizar tabela" @click="atualizarTabela()" />
            </div>
          </div>
        </template>

        <Column field="uf" header="UF" sortable>
          <template #filter="{ filterModel, filterCallback }" class="w-full">
            <InputText class="w-full" v-model="filterModel.value" type="text" @input="filterCallback()"
              placeholder="Pesquisar..." />
          </template>
        </Column>

        <Column field="cidade" header="Cidade" sortable>
          <template #filter="{ filterModel, filterCallback }" class="w-full">
            <InputText class="w-full" v-model="filterModel.value" type="text" @input="filterCallback()"
              placeholder="Pesquisar..." />
          </template>
        </Column>

        <Column field="bairro" header="Unidade" sortable>
          <template #filter="{ filterModel, filterCallback }" class="w-full">
            <InputText class="w-full" v-model="filterModel.value" type="text" @input="filterCallback()"
              placeholder="Pesquisar..." />
          </template>
        </Column>

        <Column field="acessos" header="Acessos" sortable>
          <template #body="slotProps">
            {{ slotProps.data.acessos.length }}
          </template>
        </Column>

        <Column field="acessosUnicos" header="Acessos Únicos" sortable>
          <template #body="slotProps">
            {{ filtrarAcessosUnicosPorUnidade(slotProps.data.acessos).length }}
          </template>
        </Column>

      </DataTable>

      <div class="h-10"></div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref, watch } from "vue";
import { onMounted } from "vue";
import { getAcessosPorUnidade } from "../supabase/acessos.js";
import { FilterMatchMode } from "@primevue/core/api";

const unidades = ref([]);
const unidadesOriginal = ref([]);

const totalAcessos = ref(0);
const totalAcessosUnicos = ref(0);
const totalAcessosPeriodo = ref(0);
const totalAcessosPeriodoUnicos = ref(0);

const dates = ref([]);
const size = ref({ label: "G", value: "large" });
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  uf: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cidade: { value: null, matchMode: FilterMatchMode.CONTAINS },
  bairro: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

onMounted(async () => {
  unidades.value = await getAcessosPorUnidade();
  unidadesOriginal.value = unidades.value;
  totalAcessos.value = contarTotalAcessos(unidades.value);
  totalAcessosUnicos.value = contarTotalAcessosUnicos(unidades.value);

  watch(dates, () => {
    if (dates.value && dates.value.length === 2) {
      const startDate = dates.value[0];
      const endDate = dates.value[1];

      if (startDate && endDate) {
        unidades.value = filterObjectsByDateRange(unidadesOriginal.value, startDate, endDate);
        totalAcessosPeriodo.value = contarTotalAcessos(unidades.value);
        totalAcessosPeriodoUnicos.value = contarTotalAcessosUnicos(unidades.value);
      }
    } else {
      unidades.value = [...unidadesOriginal.value];
      totalAcessosPeriodo.value = totalAcessos.value;
      totalAcessosPeriodoUnicos.value = totalAcessosUnicos.value;
    }
  });
});


async function atualizarTabela() {
  unidades.value = [];
  unidades.value = await getAcessosPorUnidade();
}

function filterObjectsByDateRange(objectsArray, startDateStr, endDateStr) {
  const startDate = converteEmMilissegundos(startDateStr);
  const endDate = converteEmMilissegundos(endDateStr);

  const filteredArray = objectsArray
    .map((unidade) => {
      if (unidade && unidade.acessos) {
        const acessosFiltrados = unidade.acessos.filter((acesso) => {
          const ano = acesso.datetime.slice(6, 10);
          const mes = acesso.datetime.slice(3, 5);
          const dia = acesso.datetime.slice(0, 2);
          const datetime = new Date(`${ano}-${mes}-${dia}T03:00:00.000Z`);
          const datetimeMillis = converteEmMilissegundos(datetime);

          return datetimeMillis >= startDate && datetimeMillis <= endDate;
        });

        if (acessosFiltrados.length > 0) {
          return { ...unidade, acessos: acessosFiltrados };
        }
      }

      return null;
    })
    .filter((unidade) => unidade !== null);

  return filteredArray;
}

function converteEmMilissegundos(datetime) {
  return new Date(datetime).getTime();
}

function contarTotalAcessos(unidades) {
  return unidades.reduce((total, unidade) => {
    return total + (unidade.acessos ? unidade.acessos.length : 0);
  }, 0);
}

function contarTotalAcessosUnicos(unidades) {
  const acessosUnicos = new Set();

  unidades.forEach(unidade => {
    if (unidade.acessos) {
      unidade.acessos.forEach(acesso => {
        const chaveUnica = `${acesso.geo_ip}-${acesso.unidade}`;
        acessosUnicos.add(chaveUnica);
      });
    }
  });

  return acessosUnicos.size; // Retorna a quantidade de acessos únicos
}

function filtrarAcessosUnicosPorUnidade(acessos) {
  const ipSet = new Set();

  return acessos.filter(acesso => {
    if (!ipSet.has(acesso.geo_ip)) {
      ipSet.add(acesso.geo_ip);
      return true;
    }
    return false;
  });
}


</script>
