import { supabase } from './init.js';

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

export { setAcessos };
