// Cocktail Data - Optimized and Clean
const cocktails = [
    {
        name: "The Mill Manhattan",
        description: "BULLEIT RYE BOURBON, A FEW DASHES OF OUR OWN LAVENDER-ORANGE BITTERS. THROW IN A FEW CANDIED AND BRANDIED SOUR CHERRIES AND FINISH WITH THE ADDITION OF A RESERVA SWEET VERMOUTH FOR A ROUND AND RICH FLAVOR. SERVED \"ON THE ROCKS\"",
        price: "18",
        ingredients: ["2.25 oz Bulleit Rye Bourbon", "2 dash Lavender-Orange Bitters", "2 luxardo cherries", "Reserva sweet vermouth"],
        instructions: "Combine ingredients and serve on the rocks"
    },
    {
        name: "Hibiscus Margarita",
        description: "BLANCO TEQUILA, TRIPLE SEC, LIME JUICE, HIBISCUS BLOSSOM TEA, SMOKED SALT, HIBISCUS PETALS",
        price: "16",
        ingredients: ["Blanco Tequila", "Triple sec", "Lime juice", "Hibiscus Blossom tea", "Smoked salt"],
        instructions: "Combine ingredients and garnish with hibiscus petals"
    },
    {
        name: "Charred Peach Old Fashioned",
        description: "BOURBON, PEACH-CINNAMON SYRUP, AROMATIC BITTERS, CHAR-GRILLED PEACH",
        price: "17",
        ingredients: ["2 oz Bulleit Bourbon", "1 oz Peach-Cinnamon Syrup", "3 dash Angostura Bitters"],
        garnish: "Char-Grilled Peach",
        instructions: "Combine ingredients and garnish with char-grilled peach"
    },
    {
        name: "Blueberry Lemonade",
        description: "BLUEBERRY VODKA, BLUEBERRY",
        price: "14",
        ingredients: ["1.5 oz Blueberry Vodka", "Splash Blueberry Syrup", "Splash lemon juice"],
        topping: "Top with Lemonade",
        garnish: "Lemon",
        instructions: "Combine ingredients with ice, top with lemonade, garnish with lemon"
    },
    {
        name: "Cherry Point Sour",
        description: "BLENDED SCOTCH, FRESH LEMON JUICE, SIMPLE SYRUP, BORDEAUX WINE FLOAT, LEMON & BRANDY CHERRY",
        price: "15",
        ingredients: ["2 oz Dewars white label", ".5 oz Lemon Juice", ".25 oz Simple Syrup", "Ice"],
        topping: "Top with Bordeaux Wine float",
        garnish: "Lemon Luxardo cherry flag",
        instructions: "Combine ingredients with ice, top with Bordeaux wine float, garnish with lemon luxardo cherry flag"
    },
    {
        name: "Hugo Spritz",
        description: "SPIRITS OF ELDERFLOWER, FRESH LIME JUICE, MINT, SIMPLE SYRUP, CHAMPAGNE TOPPER",
        price: "14",
        ingredients: ["1 oz St. Germaine", "1 oz Fresh Lime Juice", "1 oz Simple Syrup", "Ice"],
        topping: "Top with champagne",
        instructions: "Combine ingredients with ice and top with champagne"
    },
    {
        name: "The Edible Martini",
        description: "GREY GOOSE VODKA, ONE AND A HALF AN OUNCE DASH OF DRY VERMOUTH, SHAKEN HARD AND SERVED UP WITH POINT REYES BLUE CHEESE STUFFED OLIVES",
        price: "16",
        ingredients: ["2.5 oz Grey Goose Vodka", "1x dash of Dry Vermouth"],
        garnish: "2x Blue Cheese Stuffed Olives",
        instructions: "Shake hard and serve up with Point Reyes blue cheese stuffed olives"
    }
];

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const cocktailsGrid = document.getElementById('cocktailsGrid');
const modal = document.getElementById('cocktailModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    renderCocktails();
    setupEventListeners();
});

// Render Cocktail Cards
function renderCocktails() {
    cocktailsGrid.innerHTML = cocktails.map(cocktail => `
        <div class="cocktail-card" onclick="openModal('${cocktail.name}')">
            <h3 class="cocktail-name">${cocktail.name}</h3>
            <p class="cocktail-description">${cocktail.description}</p>
            <div class="cocktail-price">${cocktail.price}</div>
        </div>
    `).join('');
}

// Open Modal with Recipe Details
function openModal(cocktailName) {
    const cocktail = cocktails.find(c => c.name === cocktailName);
    if (!cocktail) return;

    modalBody.innerHTML = `
        <h2 class="modal-title">${cocktail.name}</h2>
        
        <div class="modal-section">
            <h3>INGREDIENTS</h3>
            <ul>
                ${cocktail.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>

        ${cocktail.topping ? `
        <div class="modal-section">
            <h3>TOPPING</h3>
            <p>${cocktail.topping}</p>
        </div>
        ` : ''}

        ${cocktail.garnish ? `
        <div class="modal-section">
            <h3>GARNISH</h3>
            <p>${cocktail.garnish}</p>
        </div>
        ` : ''}

        <div class="modal-section">
            <h3>INSTRUCTIONS</h3>
            <div class="instructions">
                <p>${cocktail.instructions}</p>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Setup Event Listeners
function setupEventListeners() {
    // Hamburger Menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Modal Close Events
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

