import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const apiKey = import.meta.env.INKBOOK_API_KEY;
    const webhookUrl = import.meta.env.WEBHOOK_CANCEL_URL;

    if (!apiKey || !webhookUrl) {
      return new Response(JSON.stringify({ error: 'Configuração do servidor ausente' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro no webhook de cancelamento:', errorData);
      return new Response(JSON.stringify({ error: 'Falha ao processar cancelamento no servidor externo. Tente novamente mais tarde.' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Erro na API de cancelamento:', error);
    return new Response(JSON.stringify({ error: error.message || 'Erro interno no servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
