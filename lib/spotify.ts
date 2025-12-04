
import { Buffer } from 'buffer';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
    if (!refresh_token) {
        throw new Error('Missing Spotify refresh token');
    }

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ // Changed to URLSearchParams
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }),
        next: {
            revalidate: 3600 // Revalidate every hour
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
};


export const getNowPlaying = async () => {
    const access_token = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (!response.ok) {
        // Handle non-successful responses gracefully
        console.error(`Failed to get now playing: ${response.statusText}`);
        return {
            status: response.status,
            statusText: response.statusText,
            data: null // Ensure data is null on failure
        };
    }

    // Handle no content response
    if (response.status === 204) {
        return {
            status: 204,
            statusText: 'No Content',
            data: null
        };
    }

    const data = await response.json();

    return {
        status: response.status,
        statusText: response.statusText,
        data
    };
};
