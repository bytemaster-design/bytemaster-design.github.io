// ========== ОСНОВА РАБОТЫ СКРПТОВ НЕ МЕНЯТЬ ==========
(function(){
    var b = decodeURIComponent(_domainHex.replace(/../g,'%$&'));
    if(window.location.hostname !== b) {
        document.body.innerHTML = '';
        document.documentElement.innerHTML = '';
        return;
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    const categoryContainer = document.getElementById('categoryButtons');
    const worksSection = document.getElementById('worksSection');
    const worksGrid = document.getElementById('worksGrid');
    const currentTitle = document.getElementById('currentCategoryTitle');
    const worksCountSpan = document.getElementById('worksCount');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const categoryFanpayButton = document.getElementById('categoryFanpayButton');
    const modalOrderBtn = document.getElementById('modalOrderBtn');
    const modalWrapper = document.querySelector('.modal-image-wrapper');

    const FANPAY_URL = 'https://funpay.com/users/9956864/';

    function protectImages() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('contextmenu', (e) => e.preventDefault());
            img.draggable = false;
        });
    }

    let html = '';
    categories.forEach(cat => {
        html += `<button class="category-btn" data-category="${cat.id}">${cat.name}</button>`;
    });
    categoryContainer.innerHTML = html;

    function loadWorks(categoryId) {
        const category = categories.find(c => c.id === categoryId);
        if (!category) return;
        currentTitle.textContent = category.name;
        const works = worksData[categoryId] || [];
        worksCountSpan.textContent = `${works.length} работ`;

        if (category.ratio === 'video') {
            worksGrid.classList.add('grid-video');
            worksGrid.classList.remove('grid-square', 'grid-banner');
        } else if (category.ratio === 'banner') {
            worksGrid.classList.add('grid-banner');
            worksGrid.classList.remove('grid-square', 'grid-video');
        } else {
            worksGrid.classList.add('grid-square');
            worksGrid.classList.remove('grid-video', 'grid-banner');
        }

        if (works.length === 0) {
            worksGrid.innerHTML = `<div style="color:#666;">Пока не добавил</div>`;
        } else {
            let gridHtml = '';
            works.forEach(work => {
                gridHtml += `
                    <div class="work-item" data-src="${work.src}" data-ratio="${category.ratio}">
                        <img src="${work.src}" alt="${work.alt}" loading="lazy">
                    </div>
                `;
            });
            worksGrid.innerHTML = gridHtml;
        }
        worksSection.style.display = 'block';
        categoryFanpayButton.style.display = 'flex';

        protectImages();

        document.querySelectorAll('.work-item').forEach(item => {
            item.addEventListener('click', function() {
                modalImg.src = this.dataset.src;
                modal.style.display = 'block';
                modalImg.addEventListener('contextmenu', (e) => e.preventDefault());
                if (modalWrapper) {
                    modalWrapper.addEventListener('contextmenu', (e) => e.preventDefault());
                }
            });
        });
    }

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadWorks(this.dataset.category);
        });
    });

    closeModal.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    if (modalWrapper) {
        modalWrapper.addEventListener('click', (e) => {
            if (e.target === modalWrapper) modal.style.display = 'none';
        });
    }

    setTimeout(() => {
        const first = document.querySelector('.category-btn');
        if (first) first.click();
    }, 100);

    document.querySelectorAll('.fanpay-badge, .bio-button, .category-fanpay-link, .modal-order-btn').forEach(link => {
        link.href = FANPAY_URL;
    });

    protectImages();
    if (modalWrapper) {
        modalWrapper.addEventListener('contextmenu', (e) => e.preventDefault());
    }
});

// ========== АНИМАЦИЯ ЧАСТИЦ ==========
function createParticles() {
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    const layer3 = document.getElementById('layer3');
    
    if (!layer1 || !layer2 || !layer3) return;
    
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', 'circle', 'glow');
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.backgroundColor = `rgba(127, 207, 193, ${Math.random() * 0.5 + 0.3})`;
        
        const duration = Math.random() * 8 + 5;
        particle.style.animation = `floatUp ${duration}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        const dx = (Math.random() - 0.5) * 150;
        const rot = Math.random() * 360;
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--rot', `${rot}deg`);
        
        layer1.appendChild(particle);
    }
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', 'circle');
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particle.style.background = `radial-gradient(circle, rgba(127, 207, 193, ${Math.random() * 0.6 + 0.2}) 0%, rgba(127, 207, 193, 0.1) 70%)`;
        particle.style.filter = 'blur(1px)';
        
        const direction = Math.random() > 0.5 ? 'floatUp' : 'floatDown';
        const duration = Math.random() * 12 + 10;
        particle.style.animation = `${direction} ${duration}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        const dx = (Math.random() - 0.5) * 200;
        const rot = Math.random() * 360;
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--rot', `${rot}deg`);
        
        layer2.appendChild(particle);
    }
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', 'circle', 'glow');
        const size = Math.random() * 12 + 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.backgroundColor = `rgba(127, 207, 193, ${Math.random() * 0.4 + 0.2})`;
        particle.style.boxShadow = `0 0 ${size / 2}px rgba(127, 207, 193, 0.4)`;
        particle.style.filter = 'blur(2px)';
        
        const direction = Math.random() > 0.5 ? 'floatUp' : 'floatDown';
        const duration = Math.random() * 20 + 18;
        particle.style.animation = `${direction} ${duration}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        const dx = (Math.random() - 0.5) * 250;
        const rot = Math.random() * 360;
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--rot', `${rot}deg`);
        
        layer3.appendChild(particle);
    }
    
    const glowSpots = [
        { left: '10%', top: '20%', size: '300px', delay: '0s' },
        { left: '80%', top: '60%', size: '400px', delay: '-4s' },
        { left: '30%', top: '70%', size: '250px', delay: '-2s' },
        { left: '60%', top: '10%', size: '350px', delay: '-6s' },
        { left: '90%', top: '80%', size: '280px', delay: '-3s' }
    ];
    
    glowSpots.forEach(spot => {
        const glow = document.createElement('div');
        glow.classList.add('glow-spot');
        glow.style.left = spot.left;
        glow.style.top = spot.top;
        glow.style.width = spot.size;
        glow.style.height = spot.size;
        glow.style.animationDelay = spot.delay;
        document.querySelector('.particles-bg').appendChild(glow);
    });
}

createParticles();

// ========== ТАЙМЕР АКЦИИ ==========
function updateTimer() {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const diff = endOfMonth - now;
    
    const timerEl = document.getElementById('timer');
    if (!timerEl) return;
    
    if (diff <= 0) {
        timerEl.innerText = 'акция завершена';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    timerEl.innerText = `${days} дн ${hours} ч`;
}

setInterval(updateTimer, 60000);
updateTimer();
