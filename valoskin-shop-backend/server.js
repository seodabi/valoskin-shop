const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine and configure public static folder
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Asynchronous function to fetch all skins directly from the official Valorant API
async function getValorantSkins() {
    try {
        const response = await fetch('https://valorant-api.com/v1/weapons/skins');
        const json = await response.json();
        
        if (json.status === 200 && json.data) {
            // Map the API data into a clean structure expected by your views
            return json.data.map((skin, index) => ({
                id: skin.uuid || `skin-${index}`,
                name: skin.displayName || 'Unknown Skin',
                weapon: skin.weapon?.displayName || 'Weapon',
                category: skin.contentTierUuid ? 'Exclusive' : 'Standard',
                tier: skin.contentTierUuid ? 'Premium' : 'Standard',
                collection: skin.themeUuid ? 'Custom Collection' : 'Base',
                image: skin.displayIcon || skin.wallpaper || 'https://media.valorant-api.com/weapons/vandal/displayicon.png',
                details: {
                    chromasCount: skin.chromas ? skin.chromas.length : 1,
                    levelsCount: skin.levels ? skin.levels.length : 1
                },
                tags: [skin.displayName.toLowerCase().split(' ')[0]]
            }));
        }
        return [];
    } catch (error) {
        console.error("Error fetching skins from the API:", error);
        return [];
    }
}

// Home Route (/)
app.get('/', (req, res) => {
    res.render('index', { title: 'ValoSkin Shop - Home' });
});

// Skins Catalog Route (/skins)
app.get('/skins', async (req, res) => {
    const skins = await getValorantSkins();
    res.render('skins', { title: 'Skins Catalog', skins });
});

// Search Route (/search)
app.get('/search', async (req, res) => {
    const searchTerm = req.query.q ? req.query.q.trim() : '';
    const skins = await getValorantSkins();
    
    let filteredSkins = skins;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredSkins = skins.filter(skin => 
            skin.name.toLowerCase().includes(term) || 
            skin.weapon.toLowerCase().includes(term) ||
            skin.collection.toLowerCase().includes(term)
        );
    } else {
        filteredSkins = [];
    }

    res.render('search', { 
        title: 'Search Skins', 
        skins: filteredSkins, 
        searchTerm 
    });
});

// Internal API Route (/api/skins)
app.get('/api/skins', async (req, res) => {
    const skins = await getValorantSkins();
    res.json({
        success: true,
        count: skins.length,
        data: skins
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running smoothly at http://localhost:${PORT}`);
});