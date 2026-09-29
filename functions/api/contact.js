// Cloudflare Pages Function: POST /api/contact
// Sends the contact form by email through Resend (https://resend.com).
// Required environment variables (Pages project → Settings → Variables and Secrets):
//   RESEND_API_KEY  — your Resend API key (secret)
//   CONTACT_TO      — where messages go, e.g. julien@awakeprod.fr
//   CONTACT_FROM    — a verified sender on your Resend domain, e.g. site@awakeprod.com

export async function onRequestPost({ request, env }) {
  let data;
  try { data = await request.json(); } catch { return json({ error: 'bad json' }, 400); }

  // honeypot: bots fill the hidden "website" field
  if (data.website) return json({ ok: true });

  const name = String(data.name || '').trim().slice(0, 200);
  const email = String(data.email || '').trim().slice(0, 200);
  const topic = String(data.topic || '').trim().slice(0, 100);
  const message = String(data.message || '').trim().slice(0, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) return json({ error: 'invalid' }, 400);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) return json({ error: 'not configured' }, 500);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `AwakeProd site <${env.CONTACT_FROM}>`,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `[awakeprod.com] ${topic || 'Contact'} — ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${topic}\n\n${message}`,
    }),
  });
  if (!res.ok) return json({ error: 'send failed' }, 502);
  return json({ ok: true });
}

export function onRequest({ request }) {
  if (request.method === 'POST') return onRequestPost(arguments[0]);
  return new Response('Method not allowed', { status: 405 });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
