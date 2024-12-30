import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const FORM_ID = import.meta.env.PUBLIC_CONVERTKIT_SIGNUP_FORM;
  const API_KEY = import.meta.env.PUBLIC_CONVERTKIT_PUBLIC_KEY;

  try {
    const body = await request.json();
    
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body, api_key: API_KEY }),
      }
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Subscription failed' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}; 