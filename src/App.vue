<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Importa referências e o método onMounted do Vue

const banner = 'https://www.selfitacademias.com.br/images/banner_verao_desktop.jpg';

// Items do carrosel
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

const currentIndex = ref(0); // Índice atual do carrossel
const carouselItems = ref(data); // Referência para os itens do carrossel

// Função para avançar o carrossel
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length;
};

// Função para retroceder o carrossel
const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + carouselItems.value.length) % carouselItems.value.length;
};

// Inicializa o carrossel quando o componente for montado
onMounted(() => {
  setInterval(nextSlide, 5000); // Alterna os slides a cada 5 segundos
});
</script>

<template>
  <header class="w-full relative">
    <img :src="banner" alt="banner" />

    <button class="btn-zap">
      <img src="./assets/img/whatsapp.png" alt="" />
      <a
        href="https://wa.me//5581981717978?text=Quero+conhecer+mais+sobre+as+academias+da+Selfit..."
        >Fale conosco</a
      >
    </button>
  </header>

  <div class="oferta-wraper">
    <img class="" src="./assets/img/oferta.png" alt="plano plus" />
  </div>

  <div class="container">
    <div id="carousel" class="relative h-80">
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        :class="{ hidden: index !== currentIndex, block: index === currentIndex }"
      >
        <img class="img-carousel" :src="item.imgSrc" :alt="item.imgAlt" />
        <div id="text-carousel" class="absolute w-full bottom-0 p-7 text-white">
          <h2 class="font-bold text-2xl">{{ item.title }}</h2>
          <span>{{ item.description }}</span>
        </div>

        <button class="btn-carousel btn-l absolute" @click="prevSlide">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span class="material-symbols-outlined"> navigate_before </span>
        </button>
        <button class="btn-carousel btn-r absolute" @click="nextSlide">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span class="material-symbols-outlined"> navigate_next </span>
        </button>
      </div>
    </div>

    <div class="divisor"></div>

    <div class="video">
      <iframe
        src="https://www.youtube.com/embed/vh0zLxOPKB4"
        title="Selfit - Academia do seu jeito"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </div>

  <footer>2024 Selfit © Todos os direitos reservados. Desenvolvido por Avantti Consultoria</footer>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  margin: 30px 0;
  padding: 0 2%;
  justify-content: center;
}

#carousel,
.video {
  width: calc(100% / 2);
}

#carousel img {
  border-radius: 15px;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease;
}

#text-carousel {
  width: 100%;
}

.video iframe {
  border-radius: 15px;
  width: 100%;
  height: 100%;
}

.divisor {
  width: 2%;
}

.btn-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.719);
  border-radius: 50%;
}

.btn-carousel:hover {
  background-color: rgb(194, 194, 194);
}

.btn-carousel span {
  font-size: 2.5rem;
  font-weight: bold;
}

.btn-l {
  top: 10px;
  left: 10px;
}

.btn-r {
  top: 10px;
  right: 10px;
}

.btn-zap {
  display: flex;
  position: absolute;
  top: 75%;
  right: 10%;
  padding: 2% 4%;
  background-color: rgb(34, 211, 34);
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  border-radius: 15px;
}

.btn-zap img {
  width: 30px;
  margin-right: 10px;
}

.oferta-wraper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 50px 0;
}

.oferta-wraper img {
  width: 50%;
  display: flex;
}

footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 0;
  background-color: red;
  color: #fff;
}
</style>
