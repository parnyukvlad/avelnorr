const DESTINATIONS = {
  'telegram-1to1': 'https://t.me/avelnorr',
  instagram: 'https://www.instagram.com/avelnorr/',
  threads: 'https://www.threads.net/@avelnorr',
  x: 'https://x.com/avelnorr',
  'tg-channel': 'https://t.me/avelnorrchannel',
};

const COUNTER_NAMESPACE = 'avelnorr-link-bio-live';

export function redirectFor(context, link) {
  const target = DESTINATIONS[link];

  if (!target) {
    return new Response('Unknown link', { status: 404 });
  }

  const endpoint = `https://counterapi.com/api/${COUNTER_NAMESPACE}/view/${encodeURIComponent(link)}?trackOnly=true`;
  const request = fetch(endpoint).catch(() => undefined);
  if (typeof context.waitUntil === 'function') {
    context.waitUntil(request);
  }

  const destination = new URL(target);
  destination.searchParams.set('utm_source', 'avelnorr_link_in_bio');
  destination.searchParams.set('utm_medium', 'profile_link');
  destination.searchParams.set('utm_campaign', link);

  return Response.redirect(destination.toString(), 302);
}
