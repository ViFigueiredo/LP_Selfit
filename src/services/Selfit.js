import db from '../firebase/init.js';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { useToast } from 'vue-toastification';

const toast = useToast();

async function setAcessos(unidade, geo) {
  const unidadesRef = collection(db, 'acessos');

  await setDoc(doc(unidadesRef, `${geo.ip}_${unidade}_${Date.now()}`), {
    unidade,
    geolocation: {
      ip: geo.ip,
      city: geo.city,
      state_prov: geo.state_prov,
      zipcode: geo.zipcode
    },
    datetime: format(new Date(), "dd-MM-yyyy'T'HH:mm:ss.SSS")
  });
}

async function getSelfit() {
  const querySnapshot = await getDocs(collection(db, 'selfit'));
  const documents = [];
  let tempUnidades = [];
  let selfit = [];

  querySnapshot.forEach((doc) => {
    documents.push(doc.data());
  });

  tempUnidades = [documents[0]];
  selfit = Object.values(tempUnidades[0]);
  return selfit;
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
