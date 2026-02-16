export default async function handler(req, res) {
    const token = process.env.GITHUB_TOKEN;
    const gistId = process.env.GIST_ID;
    const url = `https://api.github.com/gists/${gistId}`;

    // Permite que o seu index.html acesse a API
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const options = {
        method: req.method,
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Vercel-Proxy'
        }
    };

    if (req.method === 'PATCH') {
        options.body = JSON.stringify(req.body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro na comunicação com o GitHub" });
    }
}
