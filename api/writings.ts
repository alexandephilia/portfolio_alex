import { Redis } from '@upstash/redis';

export const config = {
    runtime: 'edge',
};

// Initialize Redis from environment variables
const redis = Redis.fromEnv();

interface Writing {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export default async function handler(request: Request) {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    // GET - Public, anyone can read
    if (request.method === 'GET') {
        try {
            const writings = await redis.get<Writing[]>('writings') || [];
            return new Response(JSON.stringify(writings), { headers });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Failed to fetch writings' }), {
                status: 500,
                headers
            });
        }
    }

    // POST/DELETE - Protected, need secret key
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get('Authorization');
    const providedKey = authHeader?.replace('Bearer ', '');

    if (!adminSecret || providedKey !== adminSecret) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers
        });
    }

    // POST - Add new writing
    if (request.method === 'POST') {
        try {
            const body = await request.json();
            const { title, content } = body;

            if (!title || !content) {
                return new Response(JSON.stringify({ error: 'Title and content required' }), {
                    status: 400,
                    headers
                });
            }

            const writings = await redis.get<Writing[]>('writings') || [];
            const newWriting: Writing = {
                id: crypto.randomUUID(),
                title,
                content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            writings.unshift(newWriting); // Add to beginning
            await redis.set('writings', writings);

            return new Response(JSON.stringify(newWriting), { status: 201, headers });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Failed to create writing' }), {
                status: 500,
                headers
            });
        }
    }

    // DELETE - Remove writing
    if (request.method === 'DELETE') {
        try {
            const { id } = await request.json();

            if (!id) {
                return new Response(JSON.stringify({ error: 'ID required' }), {
                    status: 400,
                    headers
                });
            }

            const writings = await redis.get<Writing[]>('writings') || [];
            const filtered = writings.filter(w => w.id !== id);
            await redis.set('writings', filtered);

            return new Response(JSON.stringify({ success: true }), { headers });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Failed to delete writing' }), {
                status: 500,
                headers
            });
        }
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers
    });
}
