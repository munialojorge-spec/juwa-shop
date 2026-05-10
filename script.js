// ======================================================
// JUWA WORLD - FULL WEBSITE FUNCTIONALITY
// ======================================================

// ======================================================
// MOBILE MENU
// ======================================================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if(hamburger){

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("show-menu");

        hamburger.classList.toggle("active");

    });

}

// ======================================================
// SMOOTH SCROLL
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// ======================================================
// ACTIVE NAVBAR ON SCROLL
// ======================================================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){

        navbar.style.background =
        "rgba(0,0,0,0.98)";

        navbar.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.2)";

    }else{

        navbar.style.background =
        "rgba(0,0,0,0.95)";

        navbar.style.boxShadow = "none";

    }

});

// ======================================================
// REVEAL ANIMATION
// ======================================================

const revealElements = document.querySelectorAll(
    ".feature-card, .service-box, .product-card, .gallery-grid img"
);

const revealOnScroll = () => {

    const triggerBottom =
    window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const elementTop =
        el.getBoundingClientRect().top;

        if(elementTop < triggerBottom){

            el.style.opacity = "1";
            el.style.transform =
            "translateY(0px)";

        }

    });

};

revealElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform =
    "translateY(40px)";

    el.style.transition =
    "all 0.8s ease";

});

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

// ======================================================
// SHOPPING CART
// ======================================================

let cart = JSON.parse(
    localStorage.getItem("juwaCart")
) || [];

const addToCartButtons =
document.querySelectorAll(".product-card button");

addToCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productCard =
        button.parentElement;

        const productName =
        productCard.querySelector("h3").innerText;

        const productPrice =
        productCard.querySelector(".price")
        .innerText;

        const productImage =
        productCard.querySelector("img").src;

        const product = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        cart.push(product);

        localStorage.setItem(
            "juwaCart",
            JSON.stringify(cart)
        );

        button.innerHTML =
        '<i class="fas fa-check"></i> Added';

        setTimeout(() => {

            button.innerHTML =
            'Add To Cart';

        }, 2000);

        updateCartCount();

    });

});

// ======================================================
// UPDATE CART COUNT
// ======================================================

function updateCartCount(){

    const cartIcon =
    document.querySelector(".fa-shopping-bag");

    if(cartIcon){

        let count =
        document.querySelector(".cart-count");

        if(!count){

            count = document.createElement("span");

            count.classList.add("cart-count");

            cartIcon.parentElement.appendChild(count);

        }

        count.innerText = cart.length;

    }

}

updateCartCount();

// ======================================================
// LOAD CHECKOUT ITEMS
// ======================================================

const orderSummary =
document.querySelector(".order-summary");

if(orderSummary){

    const storedCart =
    JSON.parse(
        localStorage.getItem("juwaCart")
    ) || [];

    let total = 0;

    orderSummary.innerHTML =
    `<h2>Order Summary</h2>`;

    storedCart.forEach(item => {

        const price =
        parseInt(
            item.price.replace(/[^\d]/g, "")
        );

        total += price;

        orderSummary.innerHTML += `

        <div class="summary-item">

            <span>${item.name}</span>

            <span>${item.price}</span>

        </div>

        `;

    });

    orderSummary.innerHTML += `

    <div class="summary-total">

        <span>Total</span>

        <span>Ksh ${total}</span>

    </div>

    `;

}

// ======================================================
// PLACE ORDER
// ======================================================

const checkoutButton =
document.querySelector(".checkout-form button");

if(checkoutButton){

    checkoutButton.addEventListener("click", (e) => {

        e.preventDefault();

        const inputs =
        document.querySelectorAll(
            ".checkout-form input"
        );

        let valid = true;

        inputs.forEach(input => {

            if(input.value.trim() === ""){

                valid = false;

                input.style.border =
                "1px solid red";

            }else{

                input.style.border =
                "1px solid #ddd";

            }

        });

        if(valid){

            const orderNumber =
            Math.floor(
                100000 + Math.random() * 900000
            );

            alert(

                "Order placed successfully!\n\n" +

                "Order Number: JW-" +

                orderNumber +

                "\n\nThank you for shopping with Juwa World."

            );

            localStorage.removeItem(
                "juwaCart"
            );

            window.location.href =
            "index.html";

        }else{

            alert(
                "Please fill all required fields."
            );

        }

    });

}

// ======================================================
// CONTACT FORM
// ======================================================

const contactForm =
document.querySelector(".contact-form");

if(contactForm){

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        alert(

            "Thank you for contacting Juwa World.\n\n" +

            "We will get back to you shortly."

        );

        contactForm.reset();

    });

}

// ======================================================
// GALLERY IMAGE PREVIEW
// ======================================================

const galleryImages =
document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        const popup =
        document.createElement("div");

        popup.classList.add("image-popup");

        popup.innerHTML = `

        <span class="close-popup">&times;</span>

        <img src="${image.src}">

        `;

        document.body.appendChild(popup);

        popup.addEventListener("click", () => {

            popup.remove();

        });

    });

});

// ======================================================
// PRODUCT SEARCH
// ======================================================

const searchInput =
document.querySelector(".search-input");

if(searchInput){

    searchInput.addEventListener("keyup", () => {

        const value =
        searchInput.value.toLowerCase();

        const products =
        document.querySelectorAll(".product-card");

        products.forEach(product => {

            const text =
            product.innerText.toLowerCase();

            if(text.includes(value)){

                product.style.display =
                "block";

            }else{

                product.style.display =
                "none";

            }

        });

    });

}

// ======================================================
// LOADER
// ======================================================

window.addEventListener("load", () => {

    const loader =
    document.querySelector(".loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});

// ======================================================
// DARK/LIGHT MODE
// ======================================================

const themeToggle =
document.querySelector(".theme-toggle");

if(themeToggle){

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

    });

}

// ======================================================
// FLOATING BUTTON
// ======================================================

const scrollBtn =
document.createElement("button");

scrollBtn.innerHTML =
'<i class="fas fa-arrow-up"></i>';

scrollBtn.classList.add("scroll-top-btn");

document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        scrollBtn.style.display =
        "flex";

    }else{

        scrollBtn.style.display =
        "none";

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

// ======================================================
// SUCCESS CONSOLE MESSAGE
// ======================================================

console.log(
    "JUWA WORLD WEBSITE LOADED SUCCESSFULLY"
);