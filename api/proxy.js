export default async function handler(req, res) {
    // Estas variáveis virão do painel da Vercel (Passo 4)
    const token = process.env.GITHUB_TOKEN;
    const gistId = process.env.GIST_ID;

    const url = `https://api.github.com/gists/${gistId}`;

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
