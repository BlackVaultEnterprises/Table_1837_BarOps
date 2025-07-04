// Cocktail data
const cocktailData = {
  "cocktails": [
    {
      "name": "The Mill Manhattan",
      "menu_description": "BULLEIT RYE BOURBON, A FEW DASHES OF OUR OWN LAVENDER-ORANGE BITTERS. THROW IN A FEW CANDIED AND BRANDIED SOUR CHERRIES AND FINISH WITH THE ADDITION OF A RESERVA SWEET VERMOUTH FOR A ROUND AND RICH FLAVOR. SERVED \"ON THE ROCKS\"",
      "price": "18",
      "detailed_recipe": {
        "ingredients": [
          "2.25 oz Bulleit Rye Bourbon",
          "2 dash Lavender-Orange Bitters",
          "2 luxardo cherries",
          "Reserva sweet vermouth"
        ],
        "instructions": "Combine ingredients and serve on the rocks"
      }
    },
    {
      "name": "Hibiscus Margarita",
      "menu_description": "BLANCO TEQUILA, TRIPLE SEC, LIME JUICE, HIBISCUS BLOSSOM TEA, SMOKED SALT, HIBISCUS PETALS",
      "price": "16",
      "detailed_recipe": {
        "ingredients": [
          "Blanco Tequila",
          "Triple sec",
          "Lime juice",
          "Hibiscus Blossom tea",
          "Smoked salt"
        ],
        "instructions": "Combine ingredients and garnish with hibiscus petals"
      }
    },
    {
      "name": "Charred Peach Old Fashioned",
      "menu_description": "BOURBON, PEACH-CINNAMON SYRUP, AROMATIC BITTERS, CHAR-GRILLED PEACH",
      "price": "17",
      "detailed_recipe": {
        "ingredients": [
          "2 oz Bulleit Bourbon",
          "1 oz Peach-Cinnamon Syrup",
          "3 dash Angostura Bitters"
        ],
        "garnish": "Char-Grilled Peach",
        "instructions": "Combine ingredients and garnish with char-grilled peach"
      }
    },
    {
      "name": "Blueberry Lemonade",
      "menu_description": "BLUEBERRY VODKA, BLUEBERRY",
      "price": "14",
      "detailed_recipe": {
        "ingredients": [
          "1.5 oz Blueberry Vodka",
          "Splash Blueberry Syrup",
          "Splash lemon juice"
        ],
        "topping": "Top with Lemonade",
        "garnish": "Lemon",
        "instructions": "Combine ingredients, top with lemonade, garnish with lemon"
      }
    },
    {
      "name": "Cherry Point Sour",
      "menu_description": "BLENDED SCOTCH, FRESH LEMON JUICE, SIMPLE SYRUP, BORDEAUX WINE FLOAT, LEMON & BRANDY CHERRY",
      "price": "15",
      "detailed_recipe": {
        "ingredients": [
          "2 oz Dewars white label",
          ".5 oz Lemon Juice",
          ".25 oz Simple Syrup",
          "Ice"
        ],
        "topping": "Top with Bordeaux Wine float",
        "garnish": "Lemon Luxardo cherry flag",
        "instructions": "Combine ingredients with ice, top with Bordeaux wine float, garnish with lemon luxardo cherry flag"
      }
    },
    {
      "name": "Hugo Spritz",
      "menu_description": "SPIRITS OF ELDERFLOWER, FRESH LIME JUICE, MINT, SIMPLE SYRUP, CHAMPAGNE TOPPER",
      "price": "14",
      "detailed_recipe": {
        "ingredients": [
          "1 oz St. Germaine",
          "1 oz Fresh Lime Juice",
          "1 oz Simple Syrup",
          "Ice"
        ],
        "topping": "Top with champagne",
        "instructions": "Combine ingredients with ice and top with champagne"
      }
    },
    {
      "name": "The Edible Martini",
      "menu_description": "GREY GOOSE VODKA, ONE AND A HALF AN OUNCE DASH OF DRY VERMOUTH, SHAKEN HARD AND SERVED UP WITH POINT REYES BLUE CHEESE STUFFED OLIVES",
      "price": "16",
      "detailed_recipe": {
        "ingredients": [
          "2.5 oz Grey Goose Vodka",
          "1x dash of Dry Vermouth"
        ],
        "garnish": "2x Blue Cheese Stuffed Olives",
        "instructions": "Shake hard and serve up with Point Reyes blue cheese stuffed olives"
      }
    }
  ]
};

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const cocktailsGrid = document.getElementById('cocktailsGrid');
const modal = document.getElementById('recipeModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById("modalBody");
const cocktailSearch = document.getElementById("cocktailSearch");

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    generateCocktailCards();
    setupEventListeners();
});

// Generate cocktail cards
function generateCocktailCards() {
    cocktailsGrid.innerHTML = "";
    
    cocktailData.cocktails.forEach((cocktail, index) => {
        const card = document.createElement("div");
        card.className = "cocktail-card";
        card.setAttribute("data-cocktail-index", index);
        
        // Placeholder for cocktail image - actual image will be added later
        card.innerHTML = `
            <img src="https://via.placeholder.com/280x320?text=Cocktail+Image" alt="${cocktail.name}">
            <h3 class="cocktail-name">${cocktail.name}</h3>
        `;
        
        cocktailsGrid.appendChild(card);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close nav menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
    
    // Cocktail card click handlers
    cocktailsGrid.addEventListener('click', function(e) {
        const card = e.target.closest('.cocktail-card');
        if (card) {
            const cocktailIndex = parseInt(card.getAttribute('data-cocktail-index'));
            showRecipeModal(cocktailIndex);
        }
    });
    
    // Modal close handlers
    closeModal.addEventListener('click', hideRecipeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideRecipeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideRecipeModal();
        }
    });
}

// Show recipe modal
function showRecipeModal(cocktailIndex) {
    const cocktail = cocktailData.cocktails[cocktailIndex];
    
    let modalContent = `
        <h2 class="recipe-title">${cocktail.name} - ${cocktail.glassware_type}</h2>
        <p>Garnish: ${cocktail.garnish_details}</p>
        
        <div class="recipe-section">
            <h3>IN ${cocktail.glassware_type.toUpperCase()}:</h3>
            <ul>
    `;
    
    cocktail.detailed_recipe.ingredients.forEach((ingredient, index) => {
        modalContent += `<li>${index + 1}. ${ingredient}</li>`;
    });
    
    modalContent += `</ul></div>`;
    
    // Add instructions
    modalContent += `
        <div class="recipe-section">
            <h3>Instructions</h3>
            <div class="recipe-instructions">${cocktail.detailed_recipe.instructions}</div>
        </div>
    `;
    
    // Add garnish details again as per prompt
    modalContent += `
        <div class="recipe-section">
            <h3>GARNISH:</h3>
            <div class="recipe-instructions">${cocktail.garnish_details}</div>
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Hide recipe modal
function hideRecipeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Smooth scrolling for anchor links
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

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects for cocktail cards
cocktailsGrid.addEventListener('mouseenter', function(e) {
    if (e.target.classList.contains('cocktail-card')) {
        e.target.style.transform = 'translateY(-10px) scale(1.02)';
    }
}, true);

cocktailsGrid.addEventListener('mouseleave', function(e) {
    if (e.target.classList.contains('cocktail-card')) {
        e.target.style.transform = 'translateY(0) scale(1)';
    }
}, true);



// Tabbed Navigation Logic
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const targetTab = button.dataset.tab;

        tabPanes.forEach(pane => {
            if (pane.id === targetTab) {
                pane.classList.add("active");
            } else {
                pane.classList.remove("active");
            }
        });

        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// Initial tab activation (e.g., activate Dashboard by default)
document.addEventListener("DOMContentLoaded", () => {
    const initialTab = document.querySelector(".tab-button.active");
    if (initialTab) {
        const targetPaneId = initialTab.dataset.tab;
        const targetPane = document.getElementById(targetPaneId);
        if (targetPane) {
            targetPane.classList.add("active");
        }
    }
});




// Search functionality
cocktailSearch.addEventListener("keyup", function() {
    const searchTerm = cocktailSearch.value.toLowerCase();
    const cards = cocktailsGrid.querySelectorAll(".cocktail-card");

    cards.forEach(card => {
        const cocktailName = card.querySelector(".cocktail-name").textContent.toLowerCase();
        if (cocktailName.includes(searchTerm)) {
            card.style.display = "flex"; // Show card
            card.style.opacity = "1"; // Fade in
        } else {
            card.style.opacity = "0"; // Fade out
            setTimeout(() => {
                card.style.display = "none";
            }, 300); // Hide after fade out
        }
    });
});


