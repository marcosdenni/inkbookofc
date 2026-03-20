import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozclyatgheqjilqcgaug.supabase.co';
const supabaseKey = 'sb_publishable_mp4kO4_DXqtbU2-rLFfRgA_2Fjav6Ew';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from('conexao_whatsapp')
    .select('*')
    .limit(10);
    
  if (error) {
    console.error('Error fetching Supabase:', error);
    return;
  }

  const instance = data.find(d => d.instance_name);
  if (!instance) {
    console.log('No instance found');
    return;
  }

  console.log('Instance found:', instance.instance_name);

  // Hit the n8n webhook
  const N8N_BASE = 'https://webhooks-mvp.marcosdev.xyz/webhook';
  try {
    const res = await fetch(`${N8N_BASE}/get-qr?instance=${instance.instance_name}`);
    const json = await res.json();
    console.log('N8N Payload:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Error hitting N8N:', err);
  }
}

main();
