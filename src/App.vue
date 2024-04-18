<template>
  <header class="w-full h-full mb-5">
    <img :src="banner" class="w-full h-full" alt="banner" />
  </header>

  <div class="oferta-wraper w-full flex flex-col md:flex-row bg-black">
    <img class="w-full h-60" src="./assets/img/oferta.png" alt="plano plus" />
    <div class="flex w-full h-[100px] md:h-auto justify-center items-center">
      <button
        class="p-3 rounded-xl bg-red-600 hover:bg-gray-400 text-white hover:text-red-600 font-bold"
      >
        <span @click="toggleModal">SELECIONAR UNIDADE</span>
      </button>
    </div>
  </div>

  <div
    id="modal-shadow"
    class="absolute z-10 top-0 w-[100%] h-[100%] bg-black/[0.6] flex items-center justify-center"
    v-if="showModal"
    @click="toggleModal"
  >
    <div
      id="modal"
      class="bg-black overflow-y-auto p-6 w-[90%] h-[95%] rounded-xl flex flex-col space-y-5 z-10"
      @click.stop
    >
      <ul v-for="(cidade, index) in cidadesComUnidades" :key="index">
        <li
          class="cursor-pointer text-white hover:text-red-600 font-bold"
          @click="toggleUnidades(index)"
        >
          {{ cidade.nome }}
        </li>
        <div
          id="unidade"
          class="flex flex-col text-white mt-[30px] p-[5%] border border-2 border-solid border-red-600 space-y-3"
          v-if="cidade.showUnidades"
        >
          <span
            v-for="unidade in unidades(cidade.nome)"
            :key="unidade"
            class="cursor-pointer font-bold hover:text-green-300 hover:underline"
            @click="openUnidadeUrl(unidade)"
            >{{ unidade }}
          </span>
        </div>
      </ul>
    </div>
  </div>

  <div class="w-full flex flex-col justify-center my-5 px-5 space-y-5">
    <div id="carousel" class="relative h-80 w-full">
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        :class="{ hidden: index !== currentIndex, block: index === currentIndex }"
      >
        <img id="img-carousel" :src="item.imgSrc" :alt="item.imgAlt" />
        <div id="text-carousel" class="absolute w-full bottom-0 p-7 text-white">
          <h2 class="font-bold text-2xl">{{ item.title }}</h2>
          <span>{{ item.description }}</span>
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

    <div id="video" class="w-[full] rounded">
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

  <footer class="w-full flex justify-center items-center text-center p-5 bg-red-600 text-white">
    2024 Selfit © Todos os direitos reservados. Desenvolvido por Center Soluções
  </footer>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue';
import Papa from 'papaparse';

const showModal = ref(false);
const selfit = ref([]);
const cidades = ref([]);
const cidadesComUnidades = ref([]);
const banner = 'https://www.selfitacademias.com.br/images/banner_verao_desktop.jpg';
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

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + carouselItems.value.length) % carouselItems.value.length;
};

const unidades = (cidade) => {
  return selfit.value.filter((item) => item.CIDADE === cidade).map((item) => item.UNIDADE);
};

const toggleUnidades = (index) => {
  cidadesComUnidades.value[index].showUnidades = !cidadesComUnidades.value[index].showUnidades;
};

const openUnidadeUrl = (unidade) => {
  const unidadeObj = selfit.value.find((item) => item.UNIDADE === unidade);
  if (unidadeObj && unidadeObj.URL) {
    window.open(unidadeObj.URL, '_blank');
  }
};

const toggleModal = (event) => {
  if (event.target.id === 'modal-shadow' || event.target.innerText === 'SELECIONAR UNIDADE') {
    showModal.value = !showModal.value;
  }
};

const keydownHandler = (event) => {
  if (event.key === 'Escape') {
    showModal.value = false;
  }
};

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
            const [UF, CIDADE, UNIDADE, ENDEREÇO, URL] = values.split(';');
            return { UF, CIDADE, UNIDADE, ENDEREÇO, URL, showUnidades: false };
          }
        })
        .filter(Boolean);
      selfit.value = JSON.parse(JSON.stringify(formattedData));
      const tempCidades = selfit.value.map((obj) => obj.CIDADE);
      const set = new Set(tempCidades);
      const uniqueCidades = Array.from(set);
      cidades.value = uniqueCidades.sort();
      cidadesComUnidades.value = cidades.value.map((cidade) => ({
        nome: cidade,
        showUnidades: false
      }));
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
