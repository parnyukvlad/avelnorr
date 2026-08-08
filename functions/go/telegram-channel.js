import { redirectFor } from '../_lib/redirect.js';

export const onRequest = (context) => redirectFor(context, 'telegram-channel');
