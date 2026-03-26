import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    console.log('[DEBUG] optimize-message POST - rawBody:', rawBody);
    console.log('[DEBUG] optimize-message POST - headers:', Object.fromEntries(request.headers));
    
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e: any) {
      return new Response(JSON.stringify({ error: `Corpo da requisição inválido. rawBody="${rawBody}". Detalhes: ${e.message}` }), { status: 400 });
    }
    
    const { estudio_id, mensagem, tipo } = body;

    if (!estudio_id || !mensagem || !tipo) {
      return new Response(JSON.stringify({ error: 'Parâmetros ausentes: estudio_id, mensagem ou tipo' }), { status: 400 });
    }

    const webhookUrl = import.meta.env.WEBHOOK_OPTIMIZE_MSG_URL || 'https://webhooks-mvp.marcosdev.xyz/webhook/otimizar-mensagem-ia';
    const apiKey = import.meta.env.INKBOOK_API_KEY || 'inkbook_secret_2026';

    console.log(`[IA] Enviando para webhook. Estudio: ${estudio_id}, Tipo: ${tipo}`);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify({
        estudio_id,
        mensagem,
        tipo
      })
    });

    const responseText = await response.text();
    let data;
    try {
      if (!responseText.trim()) {
        throw new Error('Resposta vazia');
      }
      data = JSON.parse(responseText);
    } catch (e: any) {
      console.error(`Status: ${response.status}, Resposta não-json:`, responseText);
      return new Response(JSON.stringify({ error: `O webhook (N8N) não retornou JSON válido (Status ${response.status}). Erro: ${e.message}`, detalhes: responseText }), { status: 500 });
    }

    if (!response.ok) {
      console.error(`Erro do Webhook IA: ${response.status}`, data);
      return new Response(JSON.stringify({ error: `Erro do webhook: ${response.status}`, detalhes: data }), { status: response.status });
    }

    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    console.error('Erro na API optimize-message:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
