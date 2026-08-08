const DESTINATIONS = {
  'telegram-1to1': 'https://t.me/avelnorr',
  instagram: 'https://www.instagram.com/avelnorr/',
  threads: 'https://www.threads.net/@avelnorr',
  x: 'https://x.com/avelnorr',
  'telegram-channel': 'https://t.me/avelnorchannel',
};

const COUNTER_NAMESPACE = 'avelnorr-link-in-bio';

function trackClick(context, link) {
  const endpoint = `https://counterapi.com/api/${COUNTER_NAMESPACE}/view/${encodeURIComponent(link)}?trackOnly=true`;
  const request = fetch(endpoint).catch(() => undefined);

  if (typeof context.waitUntil === 'function') {
    context.waitUntil(request);
  }
}

export function onRequest(context) {
  const link = context.params.link;
  const target = DESTINATIONS[link];

  if (!target) {
    return new Response('Unknown link', { status: 404 });
  }

  trackClick(context, link);

  const destination = new URL(target);
  destination.searchParams.set('utm_source', 'avelnorr_link_in_bio');
  destination.searchParams.set('utm_medium', 'profile_link');
  destination.searchParams.set('utm_campaign', link);

  return Response.redirect(destination.toString(), 302);
}
