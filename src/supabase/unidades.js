import { supabase } from './init'

async function fetchUnidades() {
  const { data, error } = await supabase.from('unidades').select('*')

  if (error) {
    console.error('Erro ao buscar unidades:', error.message)
  } else {
    console.log('Unidades:', data)
  }

  return data
}

async function getUnidades() {
  const { data, error } = await supabase.from('unidades').select('*');

  if (error) {
    console.error('Erro ao buscar unidades:', error.message);
    return [];
  }

  let documents = data || [];
  let unidades = [];
  let acessos = [];

  if (documents.length > 0) {
    let tempUnidades = [documents[0]];
    unidades = Object.values(tempUnidades[0]);
  }

  // Inicializa a propriedade "acessos" como um array vazio para cada unidade
  unidades.forEach((unidade) => {
    unidade.acessos = [];
  });

  return unidades;
}

export { fetchUnidades, getUnidades }
