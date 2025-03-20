import { useToast } from 'vue-toastification';

const toast = useToast();

async function setAcessos(unidade, geo) {
  const { error } = await supabase.from('acessos').insert([
    {
      unidade,
      geo_ip: geo.ip,
      geo_city: geo.city,
      geo_state_prov: geo.state_prov,
      geo_zipcode: geo.zipcode
    }
  ]);

  if (error) {
    console.error('Erro ao inserir dados:', error.message);
  }
}


async function getAcessos(acessos) {
  const querySnapshot = await getDocs(collection(db, 'acessos'));
  const documents = [];

  querySnapshot.forEach((doc) => {
    documents.push(doc.data());
  });

  acessos = documents;
  return acessos;
}

async function getUnidades() {
  const querySnapshot = await getDocs(collection(db, 'selfit'));
  let documents = [];
  let unidades = [];
  let acessos = [];

  querySnapshot.forEach((doc) => {
    documents.push(doc.data());
  });

  let tempUnidades = [documents[0]];

  unidades = Object.values(tempUnidades[0]);

  // Inicialize a propriedade "acessos" como um array vazio para cada unidade
  unidades.forEach((unidade) => {
    unidade.acessos = [];
  });

  // Percorra os acessos e adicione-os às unidades correspondentes
  acessos = await getAcessos();
  acessos.forEach((acesso) => {
    let matchingUnidade = unidades.find((unidade) => unidade.bairro === acesso.unidade);

    if (matchingUnidade) {
      matchingUnidade.acessos.push(acesso);
    }
  });

  return unidades;
}

// exportar função
export { getSelfit, setSelfit, getAcessos, setAcessos, getUnidades };
