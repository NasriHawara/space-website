/* ======================== Product Modal Functionality ======================== */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalImg = document.getElementById('modal-img');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productCard = e.currentTarget;
            const productName = productCard.dataset.name;
            const productPrice = productCard.dataset.price;
            const productDescription = productCard.dataset.description;
            const productImage = productCard.dataset.image;

            modalTitle.textContent = productName;
            modalPrice.textContent = productPrice;
            modalDescription.textContent = productDescription;
            modalImg.src = productImage;
            modalImg.alt = productName;

            modal.style.display = 'flex';
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});


/* ======================== Star Field Animation ======================== */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
let numStars;
let maxSpeed;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    adjustStars();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function adjustStars() {
    if (window.innerWidth <= 768) {
        numStars = 50; 
        maxSpeed = 0.01;
    } else {
        numStars = 250;
        maxSpeed = 0.1;
    }
    initStars();
}

function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * maxSpeed + 0.1,
        velocity: {
            x: Math.random() * 1.0 - 0.5,
            y: Math.random() * 1.0 - 0.5
        }
    };
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(createStar());
    }
}

function drawAndUpdateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    stars.forEach(star => {
        // Update the star's position
        star.x += star.speed * star.velocity.x;
        star.y += star.speed * star.velocity.y;

        // Reset stars that go off-screen
        if (star.x > canvas.width || star.x < 0 || star.y > canvas.height || star.y < 0) {
            Object.assign(star, createStar());
        }

        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

/* ======================== Back to Top Functionality ======================== */
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ======================== Main Animation Loop ======================== */
function animate() {
    drawAndUpdateStars();
    requestAnimationFrame(animate);
}

animate();

/* ======================== Interactive Cursor Trail ======================== */
document.addEventListener('mousemove', (e) => {
    // Create a new trail element
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);

    // Position the trail element
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;

    // Make the trail fade out and disappear
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0.5)';
        // Remove the element after it has faded out
        setTimeout(() => {
            trail.remove();
        }, 500);
    }, 100);
});





/* ======================== Scroll-Triggered Animations ======================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // We can stop observing once it's visible to save performance
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of the element is visible
});

// Select all elements you want to animate
document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    observer.observe(element);
});



