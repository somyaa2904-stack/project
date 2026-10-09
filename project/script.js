/* =====================================================
   SAVORÉ FOOD WEBSITE
   JAVASCRIPT
===================================================== */


/* ================= ELEMENTS ================= */

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const menuBtn = document.getElementById("menuBtn");
const mobileSidebar = document.getElementById("mobileSidebar");
const closeSidebar = document.getElementById("closeSidebar");

const overlay = document.getElementById("overlay");

const profileBtn = document.getElementById("profileBtn");
const sidebarLogin = document.getElementById("sidebarLogin");

const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");

const searchBtn = document.getElementById("searchBtn");
const searchModal = document.getElementById("searchModal");
const closeSearch = document.getElementById("closeSearch");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let cart = [];

let isSignup = false;


/* ================= CART OPEN/CLOSE ================= */

function openCart() {
    cartSidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
}

function closeCartPanel() {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);


/* ================= MOBILE SIDEBAR ================= */

function openSidebar() {
    mobileSidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
}

function closeMobileSidebar() {
    mobileSidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

menuBtn.addEventListener("click", openSidebar);

closeSidebar.addEventListener("click", closeMobileSidebar);

document.querySelectorAll(".mobile-sidebar a").forEach(link => {

    link.addEventListener("click", closeMobileSidebar);

});


/* ================= OVERLAY ================= */

overlay.addEventListener("click", () => {

    closeCartPanel();
    closeMobileSidebar();

});


/* ================= ADD TO CART ================= */

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            const card = button.closest(".food-card");

            const image = card.querySelector("img").src;

            cart.push({
                name: name,
                price: price,
                quantity: 1,
                image: image
            });

        }

        updateCart();

        showToast(`${name} added to your bag`);

    });

});


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <h3>Your bag is empty</h3>
                <p>Add something delicious!</p>
            </div>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;
    let itemCount = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        itemCount += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <strong>₹${item.price}</strong>

                <div class="quantity">

                    <button class="decrease"
                            data-index="${index}">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button class="increase"
                            data-index="${index}">
                        +
                    </button>

                </div>

            </div>

            <button class="remove-item"
                    data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        cartItemsContainer.appendChild(cartItem);

    });


    cartCount.textContent = itemCount;
    cartTotal.textContent = `₹${total}`;


    addCartControls();

}


/* ================= CART CONTROLS ================= */

function addCartControls() {

    document.querySelectorAll(".increase").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart[index].quantity++;

            updateCart();

        });

    });


    document.querySelectorAll(".decrease").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            if (cart[index].quantity > 1) {

                cart[index].quantity--;

            } else {

                cart.splice(index, 1);

            }

            updateCart();

        });

    });


    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            const removedName = cart[index].name;

            cart.splice(index, 1);

            updateCart();

            showToast(`${removedName} removed`);

        });

    });

}


/* ================= FAVORITES ================= */

document.querySelectorAll(".favorite").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        const icon = button.querySelector("i");

        if (button.classList.contains("liked")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            showToast("Added to favorites ❤️");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});


/* ================= CATEGORY FILTER ================= */

const categoryButtons =
    document.querySelectorAll(".category-card");

const foodCards =
    document.querySelectorAll(".food-card");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        foodCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 20);

            } else {

                card.style.display = "none";

            }

        });

        document
            .getElementById("menu")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* ================= PROFILE / LOGIN ================= */

function openAuth() {

    authModal.classList.add("active");

    document.body.classList.add("no-scroll");

}

function closeAuthModal() {

    authModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}

profileBtn.addEventListener("click", openAuth);

sidebarLogin.addEventListener("click", () => {

    closeMobileSidebar();

    openAuth();

});

closeAuth.addEventListener("click", closeAuthModal);

authModal.addEventListener("click", event => {

    if (event.target === authModal) {
        closeAuthModal();
    }

});


/* ================= LOGIN / SIGNUP SWITCH ================= */

const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const authButtonText = document.getElementById("authButtonText");
const switchText = document.getElementById("switchText");
const switchAuth = document.getElementById("switchAuth");
const nameField = document.getElementById("nameField");

switchAuth.addEventListener("click", () => {

    isSignup = !isSignup;

    if (isSignup) {

        authTitle.textContent = "Create account";

        authSubtitle.textContent =
            "Join SAVORÉ and start your delicious journey.";

        authButtonText.textContent = "Sign Up";

        switchText.textContent =
            "Already have an account?";

        switchAuth.textContent = "Login";

        nameField.style.display = "block";

    } else {

        authTitle.textContent = "Welcome back";

        authSubtitle.textContent =
            "Login to continue your delicious journey.";

        authButtonText.textContent = "Login";

        switchText.textContent =
            "Don't have an account?";

        switchAuth.textContent = "Sign Up";

        nameField.style.display = "none";

    }

});


/* ================= AUTH FORM ================= */

document.getElementById("authForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        if (isSignup) {

            showToast("Account created successfully!");

        } else {

            showToast("Login successful! Welcome back.");

        }

        closeAuthModal();

    });


/* ================= SEARCH ================= */

searchBtn.addEventListener("click", () => {

    searchModal.classList.add("active");

    document.body.classList.add("no-scroll");

    setTimeout(() => {

        document.getElementById("searchInput").focus();

    }, 200);

});


closeSearch.addEventListener("click", () => {

    searchModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

});


searchModal.addEventListener("click", event => {

    if (event.target === searchModal) {

        searchModal.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }

});


/* ================= SEARCH FOOD ================= */

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {

    const query =
        searchInput.value.toLowerCase().trim();

    searchResults.innerHTML = "";

    if (!query) return;


    const matches = Array.from(foodCards).filter(card => {

        const name =
            card.querySelector("h3").textContent.toLowerCase();

        return name.includes(query);

    });


    if (matches.length === 0) {

        searchResults.innerHTML = `
            <div class="search-result">
                No dishes found.
            </div>
        `;

        return;

    }


    matches.forEach(card => {

        const name =
            card.querySelector("h3").textContent;

        const price =
            card.querySelector(".food-title strong").textContent;

        const result = document.createElement("div");

        result.className = "search-result";

        result.innerHTML = `
            <strong>${name}</strong>
            <span>${price}</span>
        `;

        result.addEventListener("click", () => {

            searchModal.classList.remove("active");

            document.body.classList.remove("no-scroll");

            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

        searchResults.appendChild(result);

    });

});


/* ================= CONTACT FORM ================= */

document.getElementById("contactForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        showToast("Message sent successfully!");

        event.target.reset();

    });


/* ================= NEWSLETTER ================= */

document.getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        showToast("You're subscribed to SAVORÉ!");

        event.target.reset();

    });


/* ================= CHECKOUT ================= */

document.getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your bag is empty!");

            return;

        }

        showToast("Checkout feature coming soon!");

    });


/* ================= TOAST ================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= CLOSE WITH ESC ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCartPanel();
        closeMobileSidebar();
        closeAuthModal();

        searchModal.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }

});


/* ================= INITIALIZE ================= */

updateCart();