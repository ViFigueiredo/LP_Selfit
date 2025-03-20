import { supabase } from './init.js'
import { fetchUnidades } from './unidades.js'

async function setAcessos(unidade, geo) {
  const { error } = await supabase.from('acessos').insert([
    {
      unidade,
      geo_ip: geo.ip,
      geo_city: geo.city,
      geo_state_prov: geo.state_prov,
      geo_zipcode: geo.zipcode,
    },
  ])

  if (error) {
    console.error('Erro ao inserir dados:', error.message)
  }
}

async function getAcessos() {
  const { data, error } = await supabase.from('acessos').select('*')

  if (error) {
    console.error('Erro ao buscar unidades:', error.message)
  } else {
    return data
  }
}

async function getAcessosPorUnidade() {
  let unidades = await fetchUnidades()
  let acessos = await getAcessos()

  if (!unidades || !acessos) return []

  return unidades
    .map((unidade) => {
      const acessosFiltrados = acessos
        .filter((acesso) => acesso.unidade === unidade.bairro) // Filtra acessos por bairro
        .map((acesso) => ({
          ...acesso,
          unidade: unidade.bairro,
          cidade: unidade.cidade,
          uf: unidade.uf,
        }))

      // Retorna apenas unidades que têm acessos
      return acessosFiltrados.length > 0 ? { ...unidade, acessos: acessosFiltrados } : null
    })
    .filter((unidade) => unidade !== null) // Remove unidades sem acessos
}

export { setAcessos, getAcessos, getAcessosPorUnidade }
