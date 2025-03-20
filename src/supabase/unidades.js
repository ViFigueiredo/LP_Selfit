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

export { fetchUnidades }
