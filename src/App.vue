<template>
  <!-- <header class="relative w-full h-full">
    <img src="./assets/img/banner_maes.png" class="w-full h-full" alt="banner" />
  </header> -->

  <div class="relative h-6 bg-gradient-to-t from-custom-blue to-custom-red"></div>

  <!-- <div
    class="relative oferta-wraper w-full h-auto flex flex-col justify-center items-center md:flex-row bg-black"
  >
    <img class="w-full h-60 lg:h-80" src="./assets/img/oferta.png" alt="plano plus" />
    <div
      class="flex flex-col lg:flex-row w-full m-12 justify-center items-center space-y-5 lg:space-x-6 lg:space-y-0 lg:ml-8"
    >
      <button
        class="p-3 lg:p-5 xl:text-xl rounded-xl bg-red-600 hover:bg-gray-400 text-white hover:text-red-600 font-bold hover:cursor-pointer"
      >
        <!-- <span @click="toggleModal">Selecionar Unidade</span> -->
        <!-- TODO adicionar link whatsapp -->
        <a
          href="https://wa.me/558130481279?text=Olá! Tenho interesse..."
          target="_blank"
          class="flex space-x-2 items-center"
        >
          <span>Quero conhecer mais...</span>
        </a>
      </button>
    </div>
  </div> -->

  <div
    id="modal-shadow"
    class="fixed z-10 top-0 left-0 right-0 bottom-0 w-full h-full bg-black/[0.6]"
    v-if="showModal"
    @click="toggleModal"
  >
    <div
      id="modal"
      class="bg-black overflow-y-auto p-6 w-full h-full rounded-xl flex flex-col space-y-5 z-10"
      @click.stop
    >
      <div class="flex w-full justify-end space-x-5">
        <span
          class="text-white font-bold cursor-pointer hover:bg-white hover:text-black"
          @click="collapseAll"
          >Recolher Todos</span
        >
        <span
          class="text-white font-bold cursor-pointer hover:bg-white hover:text-black"
          @click="toggleModal"
          >Fechar</span
        >
      </div>
      <div v-for="(cidades, uf) in agrupadosPorUF" :key="uf">
        <h2
          class="cursor-pointer text-white hover:text-red-600 font-bold hover:underline active:border uppercase"
          @click="toggleCidades(uf)"
        >
          {{ ufs[uf] }}
        </h2>
        <div v-if="showCidades[uf]" class="border border-2 border-solid border-red-600 p-5">
          <div v-for="(unidades, cidade) in cidades" :key="cidade">
            <h3
              class="cursor-pointer text-white hover:text-red-600 font-bold py-5"
              @click="toggleUnidades(uf, cidade)"
            >
              {{ cidade }}
            </h3>
            <ul v-if="showUnidades[uf] && showUnidades[uf][cidade]">
              <li
                v-for="unidade in unidades"
                :key="unidade.UNIDADE"
                class="w-full flex justify-end text-white hover:bg-red-300 hover:text-black"
              >
                <a :href="unidade.URL" target="_blank" class="cursor-pointer font-bold p-3">
                  {{ unidade.UNIDADE }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="w-full flex flex-col md:flex-row justify-center items-center my-12 px-5 space-y-12 md:space-y-0 md:space-x-12"
  >
    <div id="carousel" class="relative h-80 w-[80%] md:h-50 md:w-[50%]">
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        :class="{ hidden: index !== currentIndex, block: index === currentIndex }"
      >
        <img id="img-carousel" :src="item.imgSrc" :alt="item.imgAlt" />
        <div id="text-carousel" class="absolute w-full bottom-0 p-7 text-white">
          <h2 class="font-bold text-2xl">{{ item.title }}</h2>
          <span class="text-xs md:text-sm">{{ item.description }}</span>
        </div>

        <button
          class="flex justify-center items-center w-7 h-7 bg-white bg-opacity-70 rounded-full hover:bg-gray-300 top-[10px] left-[10px] absolute"
          @click="prevSlide"
        >
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span class="material-symbols-outlined"> navigate_before </span>
        </button>
        <button
          class="flex justify-center items-center w-7 h-7 bg-white bg-opacity-70 rounded-full hover:bg-gray-300 top-[10px] right-[10px] absolute"
          @click="nextSlide"
        >
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span class="material-symbols-outlined"> navigate_next </span>
        </button>
      </div>
    </div>

    <div id="video" class="w-[80%] rounded md:h-50 md:w-[50%]">
      <iframe
        src="https://www.youtube.com/embed/vh0zLxOPKB4?si=1SuMJeELkh3Ye-zi"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="w-full h-80 rounded-xl"
      ></iframe>
    </div>
  </div>

  <!-- TODO adicionar link whatsapp -->
  <button
    class="z-10 p-2 bg-green-400 hover:bg-green-600 rounded-full fixed right-6 bottom-6 hover:shadow-inner shadow-[3px_3px_0px_0px_rgba(131,144,136,0.8)]"
  >
    <a
      href="https://wa.me/558130481279?text=Olá! Tenho interesse..."
      target="_blank"
      class="flex space-x-2 items-center"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width="48"
        height="48"
      />
    </a>
  </button>

  <footer
    class="absolute w-full flex justify-center items-center text-center p-2 bg-red-600 text-white"
  >
    2024 Selfit © Todos os direitos reservados. Desenvolvido por Center Soluções.
  </footer>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Papa from 'papaparse';

const showModal = ref(false);
const selfit = ref([]);
const data = [
  {
    imgSrc: 'https://www.selfitacademias.com.br/images/aselfit-intense.jpg',
    imgAlt: 'selfit-intense',
    title: 'Self Intense',
    description:
      'Se o foco é ganho de força, resistência e agilidade, agende uma aula no Self Intense. Um circuito dinâmico que utiliza cordas navais, medicine balls, kettlebells, sand bags, caixotes e outros equipamentos para dinamizar e potencializar o treino.'
  },
  {
    imgSrc: 'https://www.selfitacademias.com.br/images/aselfit-speed.jpg',
    imgAlt: 'selfit-speed',
    title: 'Self Speed',
    description:
      'No espaço Self Speed, desfrute de um treino aeróbico poderoso. Suba em uma das bikes e pedale com uma galera animada em direção à boa forma, garantindo resultados consistentes sem monotonia. *verifique a disponibilidade na unidade escolhida e agende a sua aula!'
  },
  {
    imgSrc: 'https://www.selfitacademias.com.br/images/aselfit-force.jpg',
    imgAlt: 'selfit-force',
    title: 'Self Force',
    description:
      'Para treino de força, explore o Self Force, uma área com equipamentos modernos que otimizam a musculação e facilitam a execução de cada exercício indicado pelos instrutores. Um ambiente dedicado ao desenvolvimento muscular consistente.'
  },
  {
    imgSrc: 'https://www.selfitacademias.com.br/images/aselfit-move.jpg',
    imgAlt: 'selfit-move',
    title: 'Self Move',
    description:
      'O espaço Self Move é o mais concorrido da Selfit, oferecendo aulas dinâmicas e divertidas como ginástica localizada, treino postural, zumba, muay thai e muito mais! Verifique a disponibilidade na unidade escolhida e agende sua aula!'
  },
  {
    imgSrc: 'https://www.selfitacademias.com.br/images/aselfit-velo.jpg',
    imgAlt: 'selfit-velo',
    title: 'Self Velo',
    description:
      'O Self Velo é um espaço completo para treino aeróbico e fortalecimento do sistema cardiovascular. Equipado com esteiras, bicicletas, remos, simuladores de escadas e elípticos, proporciona uma experiência abrangente para aprimorar sua resistência e saúde cardiovascular.'
  }
];
const currentIndex = ref(0);
const carouselItems = ref(data);
const showCidades = ref({});
const showUnidades = ref({});

const ufs = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins'
};

const agrupadosPorUF = computed(() => {
  let grupos = selfit.value.reduce((grupos, objeto) => {
    const chaveUF = objeto.UF;
    if (!grupos[chaveUF]) {
      grupos[chaveUF] = {};
    }

    const chaveCidade = objeto.CIDADE;
    if (!grupos[chaveUF][chaveCidade]) {
      grupos[chaveUF][chaveCidade] = [];
    }

    grupos[chaveUF][chaveCidade].push(objeto);
    return grupos;
  }, {});

  // Ordena as UFs, cidades e unidades alfabeticamente
  for (let uf in grupos) {
    grupos[uf] = Object.keys(grupos[uf])
      .sort()
      .reduce((obj, key) => {
        obj[key] = grupos[uf][key].sort((a, b) => a.UNIDADE.localeCompare(b.UNIDADE));
        return obj;
      }, {});
  }

  return Object.keys(grupos)
    .sort()
    .reduce((obj, key) => {
      obj[key] = grupos[key];
      return obj;
    }, {});
});

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length;
}

function prevSlide() {
  currentIndex.value =
    (currentIndex.value - 1 + carouselItems.value.length) % carouselItems.value.length;
}

function toggleModal(event) {
  if (
    event.target.id === 'modal-shadow' ||
    event.target.innerText === 'Selecionar Unidade' ||
    event.target.innerText === 'Fechar'
  ) {
    showModal.value = !showModal.value;
    collapseAll();
  }
}

function keydownHandler(event) {
  if (event.key === 'Escape') {
    showModal.value = false;
  }
}

function toggleCidades(uf) {
  showCidades.value[uf] = !showCidades.value[uf];
}

function toggleUnidades(uf, cidade) {
  if (!showUnidades.value[uf]) {
    showUnidades.value[uf] = {};
  }
  showUnidades.value[uf][cidade] = !showUnidades.value[uf][cidade];
}

function collapseAll() {
  showCidades.value = {};
  showUnidades.value = {};
}

onMounted(async () => {
  window.addEventListener('keydown', keydownHandler);
  setInterval(nextSlide, 5000);
  const response = await fetch('/selfit.csv');
  const csvData = await response.text();
  Papa.parse(csvData, {
    delimiter: ';',
    header: true,
    dynamicTyping: true,
    complete: (results) => {
      const formattedData = results.data
        .map((row) => {
          const values = Object.values(row)[0];
          if (values) {
            const [UF, CIDADE, UNIDADE, ENDERECO, URL] = values.split(';');
            return { UF, CIDADE, UNIDADE, ENDERECO, URL, showUnidades: false };
          }
        })
        .filter(Boolean);
      selfit.value = JSON.parse(JSON.stringify(formattedData));
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', keydownHandler);
});
</script>

<style scoped>
#carousel img {
  border-radius: 15px;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease;
}
</style>
