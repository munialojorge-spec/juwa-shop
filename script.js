// ======================================================
// JUWA WORLD - FULL WEBSITE FUNCTIONALITY
// ======================================================

// ======================================================
// ENCRYPTION & SECURITY MODULE
// ======================================================

const SecurityModule = {
    // Simple XOR encryption (client-side only)
    encryptData: function(data, key = 'juwa_world_secure') {
        let encrypted = '';
        for (let i = 0; i < data.length; i++) {
            encrypted += String.fromCharCode(
                data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        return btoa(encrypted); // Base64 encode
    },

    decryptData: function(encoded, key = 'juwa_world_secure') {
        try {
            const encrypted = atob(encoded); // Base64 decode
            let decrypted = '';
            for (let i = 0; i < encrypted.length; i++) {
                decrypted += String.fromCharCode(
                    encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            return decrypted;
        } catch (e) {
            console.error('Decryption failed:', e);
            return null;
        }
    },

    // Mask sensitive data for display
    maskEmail: function(email) {
        const [local, domain] = email.split('@');
        const maskedLocal = local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);
        return maskedLocal + '@' + domain;
    },

    maskPhone: function(phone) {
        const digits = phone.replace(/\D/g, '');
        const last4 = digits.slice(-4);
        return digits.slice(0, -4).replace(/\d/g, '*') + last4;
    },

    // Store encrypted data in sessionStorage
    storeSecure: function(key, value) {
        const encrypted = this.encryptData(JSON.stringify(value));
        sessionStorage.setItem('sec_' + key, encrypted);
    },

    // Retrieve encrypted data from sessionStorage
    retrieveSecure: function(key) {
        const encrypted = sessionStorage.getItem('sec_' + key);
        if (!encrypted) return null;
        const decrypted = this.decryptData(encrypted);
        try {
            return JSON.parse(decrypted);
        } catch (e) {
            return decrypted;
        }
    },

    // Clear all secure data
    clearSecure: function() {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith('sec_')) {
                sessionStorage.removeItem(key);
            }
        });
    }
};

// Store sensitive contact information encrypted
const ContactData = {
    email: SecurityModule.encryptData('josephwanyama093@gmail.com'),
    phone: SecurityModule.encryptData('+254792542973'),
    
    getEmail: function() {
        return SecurityModule.decryptData(this.email);
    },
    
    getPhone: function() {
        return SecurityModule.decryptData(this.phone);
    },
    
    getMaskedEmail: function() {
        return SecurityModule.maskEmail(this.getEmail());
    },
    
    getMaskedPhone: function() {
        return SecurityModule.maskPhone(this.getPhone());
    }
};

// ======================================================
// MOBILE MENU TOGGLE
// ======================================================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show-menu");
        hamburger.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show-menu");
            hamburger.classList.remove("active");
        });
    });
}

// ======================================================
// SMOOTH SCROLL & ACTIVE LINK HIGHLIGHTING
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            
            // Update active link
            document.querySelectorAll(".nav-link").forEach(link => {
                link.classList.remove("active");
            });
            this.classList.add("active");
        }
    });
});

// Update active link on scroll
window.addEventListener("scroll", () => {
    let current = "";
    
    const sections = document.querySelectorAll("section[id]");
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ======================================================
// CONTACT FORM HANDLING
// ======================================================

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;

        // Validation
        if (!name || !email || !message) {
            alert("Please fill in all required fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Show success message
        const successMsg = document.createElement("div");
        successMsg.style.cssText = `
            background: #d4af37;
            color: #000;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 600;
            text-align: center;
        `;
        successMsg.textContent = "✓ Message sent successfully! We'll get back to you soon.";
        
        contactForm.insertBefore(successMsg, contactForm.firstChild);

        // Reset form
        this.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 5000);
    });
}

// ======================================================
// CART & CHECKOUT FUNCTIONALITY
// ======================================================

let cart = [];

// Load cart from localStorage on page load
if (localStorage.getItem("juwaCart")) {
    cart = JSON.parse(localStorage.getItem("juwaCart"));
}

function addToCart(productName, productPrice) {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem("juwaCart", JSON.stringify(cart));

    // Show notification
    showNotification(`${productName} added to cart!`);
    
    // Update cart display
    updateCartDisplay();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("juwaCart", JSON.stringify(cart));
    updateCartDisplay();
}

function updateQuantity(productName, newQuantity) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        localStorage.setItem("juwaCart", JSON.stringify(cart));
        updateCartDisplay();
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartDisplay() {
    const cartContainer = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total-amount");

    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #666;">Your cart is empty</p>';
            if (cartTotal) cartTotal.textContent = "$0.00";
        } else {
            cartContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-qty">
                            Quantity: 
                            <input type="number" value="${item.quantity}" min="1" 
                                   onchange="updateQuantity('${item.name}', this.value)" 
                                   style="width: 50px; padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button onclick="removeFromCart('${item.name}')" 
                            style="background: #d9534f; color: white; padding: 5px 10px; border-radius: 4px; margin-left: 10px;">
                        ✕
                    </button>
                </div>
            `).join('');

            if (cartTotal) cartTotal.textContent = `$${calculateTotal().toFixed(2)}`;
        }
    }
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #d4af37;
        color: #000;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ======================================================
// CTA BUTTON - GET STARTED
// ======================================================

document.querySelectorAll(".cta-button").forEach(button => {
    button.addEventListener("click", function () {
        const servicesSection = document.querySelector("#services");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ======================================================
// ENCRYPTED CONTACT INFORMATION REVEAL
// ======================================================

function initializeContactReveal() {
    // Handle email reveal
    const emailElements = document.querySelectorAll('[id*="Email"], [id*="email"]');
    emailElements.forEach(el => {
        if (el.textContent === 'Click to reveal') {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                const email = ContactData.getEmail();
                
                if (this.textContent === 'Click to reveal') {
                    this.textContent = email;
                    this.style.textDecoration = 'none';
                    this.style.pointerEvents = 'auto';
                    
                    // Add copy-to-clipboard functionality
                    this.style.cursor = 'pointer';
                    this.title = 'Click to copy email';
                    
                    this.addEventListener('click', function(e) {
                        e.stopPropagation();
                        navigator.clipboard.writeText(email).then(() => {
                            const originalText = this.textContent;
                            this.textContent = '✓ Copied!';
                            setTimeout(() => {
                                this.textContent = originalText;
                            }, 2000);
                        });
                    });
                }
            });
        }
    });

    // Handle phone reveal
    const phoneElements = document.querySelectorAll('[id*="Phone"], [id*="phone"]');
    phoneElements.forEach(el => {
        if (el.textContent === 'Click to reveal') {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                const phone = ContactData.getPhone();
                
                if (this.textContent === 'Click to reveal') {
                    this.textContent = phone;
                    this.style.textDecoration = 'none';
                    this.style.pointerEvents = 'auto';
                    
                    // Add copy-to-clipboard functionality
                    this.style.cursor = 'pointer';
                    this.title = 'Click to copy phone';
                    
                    this.addEventListener('click', function(e) {
                        e.stopPropagation();
                        navigator.clipboard.writeText(phone).then(() => {
                            const originalText = this.textContent;
                            this.textContent = '✓ Copied!';
                            setTimeout(() => {
                                this.textContent = originalText;
                            }, 2000);
                        });
                    });
                }
            });
        }
    });
}

// ======================================================
// INITIALIZE ON PAGE LOAD
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    updateCartDisplay();
    initializeContactReveal();
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards and other elements
    document.querySelectorAll(".service-card").forEach(el => {
        el.style.opacity = "0";
        observer.observe(el);
    });
});

// ======================================================
// EVENT DELEGATION FOR DYNAMIC ELEMENTS
// ======================================================

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        const productCard = e.target.closest(".product-card");
        if (productCard) {
            const productName = productCard.querySelector(".product-name").textContent;
            const priceText = productCard.querySelector(".product-price").textContent;
            const price = parseFloat(priceText.replace("$", ""));
            addToCart(productName, price);
        }
    }
});

console.log("✓ Juwa World - Website loaded successfully!");

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