<template>
  <div class="space-y-12">
    <!-- <header class="relative w-full h-full">
          <img src="./assets/img/banner_maes.png" class="w-full h-full" alt="banner" />
        </header> -->

    <div class="flex flex-col">
      <div class="relative h-6 bg-gradient-to-t from-custom-blue to-custom-red"></div>
      <div class="relative oferta-wraper w-full h-auto flex flex-col justify-center items-center md:flex-row bg-black">
        <img class="w-full h-60 lg:h-80" src="@/assets/img/oferta.png" alt="plano plus" />
        <div
          class="flex flex-col lg:flex-row w-full m-12 justify-center items-center space-y-5 lg:space-x-6 lg:space-y-0 lg:ml-8">
          <button
            class="p-3 lg:p-5 xl:text-xl rounded-xl bg-red-600 hover:bg-gray-400 text-white hover:text-red-600 font-bold hover:cursor-pointer">
            <span @click="toggleModal">Selecionar Unidade</span>
          </button>
        </div>
      </div>
    </div>

    <div id="modal-shadow" class="fixed z-10 top-0 left-0 right-0 bottom-0 w-full h-full bg-black/[0.6]"
      v-if="showModal" @click="toggleModal">
      <div id="modal" class="bg-black overflow-y-auto p-6 w-full h-full rounded-xl flex flex-col space-y-5 z-10"
        @click.stop>
        <div class="flex w-full justify-end space-x-5">
          <span class="text-white font-bold cursor-pointer hover:bg-white hover:text-black"
            @click="collapseAll">Recolher Todos</span>
          <span class="text-white font-bold cursor-pointer hover:bg-white hover:text-black"
            @click="toggleModal">Fechar</span>
        </div>
        <div v-for="(cidades, uf) in agrupadosPorUF" :key="uf">
          <h2 class="cursor-pointer text-white hover:text-red-600 font-bold hover:underline active:border uppercase"
            @click="toggleCidades(uf)">
            {{ ufs[uf] }}
          </h2>
          <div v-if="showCidades[uf]" class="border border-2 border-solid border-red-600 p-5">
            <div v-for="(unidades, cidade) in cidades" :key="cidade">
              <h3 class="cursor-pointer text-white hover:text-red-600 font-bold py-5"
                @click="toggleUnidades(uf, cidade)">
                {{ cidade }}
              </h3>
              <ul v-if="showUnidades[uf] && showUnidades[uf][cidade]">
                <li v-for="unidade in unidades" :key="unidade.cidade"
                  class="w-full flex justify-end text-white hover:bg-red-300 hover:text-black">
                  <a :href="unidade.url" target="_blank" class="cursor-pointer font-bold p-3"
                    @click="tracker(unidade.bairro)">
                    {{ unidade.bairro }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col justify-center items-center px-5 space-y-5 md:space-y-0 md:space-x-12 md:flex-row">
      <div id="carousel" class="relative h-80 w-[80%] md:h-50 md:w-[50%]">
        <div v-for="(item, index) in carouselItems" :key="index"
          :class="{ hidden: index !== currentIndex, block: index === currentIndex }">
          <img id="img-carousel" :src="item.imgSrc" :alt="item.imgAlt" />
          <div id="text-carousel" class="absolute w-full bottom-0 p-7 text-white">
            <h2 class="font-bold text-2xl">{{ item.title }}</h2>
            <span class="text-xs md:text-sm">{{ item.description }}</span>
          </div>
          <button
            class="flex justify-center items-center w-7 h-7 bg-white bg-opacity-70 rounded-full hover:bg-gray-300 top-[10px] left-[10px] absolute"
            @click="prevSlide">
            <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <span class="material-symbols-outlined"> navigate_before </span>
          </button>
          <button
            class="flex justify-center items-center w-7 h-7 bg-white bg-opacity-70 rounded-full hover:bg-gray-300 top-[10px] right-[10px] absolute"
            @click="nextSlide">
            <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <span class="material-symbols-outlined"> navigate_next </span>
          </button>
        </div>
      </div>
      <div id="video" class="w-[80%] rounded md:h-50 md:w-[50%]">
        <iframe src="https://www.youtube.com/embed/vh0zLxOPKB4?si=1SuMJeELkh3Ye-zi" title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="w-full h-80 rounded-xl"></iframe>
      </div>
    </div>

    <div class="h-5"></div>

    <div class="floater-whatsapp">
      <a
        href="https://api.whatsapp.com/send/?phone=558130481279&amp;source=google_ads&conversion_id=16598474973&conversion_label=Tn9XCJyErsAZEN3B4uo9&;text=Olá!+Gostaria+de+treinar+na Selfit&amp;type=phone_number&amp;app_absent=0">
        <i>
          <svg class="z-10 w-[60px] h-[60px] bg-[#25D366] rounded-full bg-green fixed bottom-5 right-5" viewBox="0 0 24 24"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z"
              fill="#ffffff" />
          </svg></i>
      </a>
    </div>


    <footer class="relative bottom-0 w-full flex justify-center items-center text-center p-2 bg-red-600 text-white">
      <span class="w-full">
        2024 Selfit © Todos os direitos reservados. Desenvolvido por Center Soluções.
        <router-link to="/admin" class="text-red-600 hover:text-white justify-start"> >Admin< </router-link>
      </span>
    </footer>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { getSelfit, setAcessos } from '../services/Selfit.js';
import getGeolocation from '../services/Geolocation.js';

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
    const chaveUF = objeto.uf;
    if (!grupos[chaveUF]) {
      grupos[chaveUF] = {};
    }

    const chaveCidade = objeto.cidade;
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
        obj[key] = grupos[uf][key].sort((a, b) => a.cidade.localeCompare(b.cidade));
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

onMounted(async () => {
  window.addEventListener('keydown', keydownHandler);
  setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  window.removeEventListener('keydown', keydownHandler);
});

async function tracker(unidade) {
  const geo = await getGeolocation();
  await setAcessos(unidade, geo);
}

function toggleUnidades(uf, cidade) {
  if (!showUnidades.value[uf]) {
    showUnidades.value[uf] = {};
  }
  showUnidades.value[uf][cidade] = !showUnidades.value[uf][cidade];
}

function toggleCidades(uf) {
  showCidades.value[uf] = !showCidades.value[uf];
}

async function toggleModal(event) {
  /* TODO implementar dados de sessão para unidades e acessos */
  selfit.value = await getSelfit();

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

function collapseAll() {
  showCidades.value = {};
  showUnidades.value = {};
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length;
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + carouselItems.value.length) % carouselItems.value.length;
}
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
