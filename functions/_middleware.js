// Cloudflare Pages middleware: one public host only.
// Requests to the bare apex (awakeprod.fr) are redirected permanently to
// https://www.awakeprod.fr, keeping the path and the query string.
// /skyred/* goes to /redsky/* (301), whatever the host.
// Any other host (www, *.pages.dev previews, localhost) is served as is.

const CANONICAL_HOST = 'www.awakeprod.fr';
const APEX_HOST = 'awakeprod.fr';

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === APEX_HOST) {
    url.protocol = 'https:';
    url.hostname = CANONICAL_HOST;
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  // Skyred was renamed Redsky: old links land on the new section.
  if (url.pathname === '/skyred' || url.pathname.startsWith('/skyred/')) {
    url.pathname = '/redsky' + url.pathname.slice(7);
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
