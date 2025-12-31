
import webpush from 'web-push';

export async function onRequest(context) {
    try {
        const { request, env } = context;

        // Optional: Add some auth check here so not anyone can trigger it
        // const url = new URL(request.url);
        // if (url.searchParams.get('secret') !== env.TRIGGER_SECRET) { ... }

        const publicVapidKey = env.PUBLIC_VAPID_KEY || 'BIUrM4ZOLaH53-6tyHX3B4JNgprFbuSoGXq50Q1okIj-DgoNro2mBJTwNhd_khGS5oyuvEtHnLh5D1DWLv8XSmM';
        const privateVapidKey = env.PRIVATE_VAPID_KEY || '9f5lxiLWohNeYWX9axRkd-qhZ_vUMDgrdkQxCIvgMZI';
        const mailto = env.MAILTO || 'mailto:test@test.com';

        webpush.setVapidDetails(mailto, publicVapidKey, privateVapidKey);

        // Calculate Nepali Time (UTC + 5:45)
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const nepaliTime = new Date(utc + (5.75 * 3600000));
        const hour = nepaliTime.getHours();

        let title = 'Happy New Year 2026! 🎆';
        let body = 'The celebration continues!';

        if (hour === 5) {
            title = 'Good Morning (5 AM)! 🌅';
            body = 'Rise and shine! The first sunrise of 2026 is here.';
        } else if (hour === 7) {
            title = '7 AM Update ☕';
            body = 'Grab your tea/coffee and enjoy the fresh year air.';
        } else if (hour === 9) {
            title = '9 AM Power Up ⚡';
            body = 'The day has begun. Have a wonderful 2026!';
        } else if (hour === 10) {
            title = '10 AM Celebration 🎉';
            body = 'Sharing joy and happiness with you.';
        } else if (hour === 11) {
            title = '11 AM Vibes 🎵';
            body = 'Keep the spirit high!';
        } else if (hour === 12) {
            title = '12 PM Noon ☀️';
            body = 'Half day of the first day! Enjoy your lunch.';
        }

        const payload = JSON.stringify({
            title,
            body,
            icon: '/ogimage.gif'
        });

        if (!env.SUBSCRIPTIONS) {
            return new Response(JSON.stringify({ error: 'KV not configured' }), { status: 500 });
        }

        // List all keys from KV
        // Note: list() returns a paginated list. If > 1000 keys, loop is needed.
        // For now, implementing simple list.
        const list = await env.SUBSCRIPTIONS.list();
        const keys = list.keys;

        const results = await Promise.all(keys.map(async (key) => {
            try {
                const subData = await env.SUBSCRIPTIONS.get(key.name);
                if (!subData) return { status: 'skipped', endpoint: key.name };

                const subscription = JSON.parse(subData);
                await webpush.sendNotification(subscription, payload);
                return { status: 'sent', endpoint: subscription.endpoint };
            } catch (error) {
                console.error('Error sending to', key.name, error);
                if (error.statusCode === 410 || error.statusCode === 404) {
                    // Subscription expired/gone, remove from KV
                    await env.SUBSCRIPTIONS.delete(key.name);
                    return { status: 'deleted', endpoint: key.name };
                }
                return { status: 'failed', error: error.message };
            }
        }));

        return new Response(JSON.stringify({ message: 'Process completed', results }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
