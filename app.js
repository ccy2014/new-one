// JavaScript for carousel, loading screen, and other functionalities

document.addEventListener("DOMContentLoaded", () => {
    // Loading Screen
    const loadingScreen = document.querySelector(".loading-screen");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 1500);
  
    // Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  
    // Language Switch
    const langSwitch = document.querySelector(".lang-switch");
    let currentLang = 'zh'; // 默认语言为中文

    const translations = {
        zh: {
            'home': '首页',
            'products': '产品',
            'about': '关于我们',
            'contact': '联系我们',
            'lang': 'EN',
            'welcome': '金华九通齿轮厂',
            'explore': '探索我们的创新产品和服务',
            'view-products': '查看产品',
            'contact-us': '联系我们',
            'our-products': '我们的产品',
            'about-us': '关于我们',
            'company-intro': '公司简介',
            'company-desc': '我们是一家专注于创新和质量的公司，致力于为客户提供最优质的产品和服务。',
            'our-team': '我们的团队',
            'team-desc': '我们的团队由经验丰富的专业人士组成，每个成员都致力于为公司的成功做出贡献。',
            'development-history': '发展历程',
            'site-showcase': '场地展示'
        },
        en: {
            'home': 'Home',
            'products': 'Products',
            'about': 'About Us',
            'contact': 'Contact',
            'lang': '中文',
            'welcome': 'Jinhua Jiutong Gear Factory',
            'explore': 'Explore our innovative products and services',
            'view-products': 'View Products',
            'contact-us': 'Contact Us',
            'our-products': 'Our Products',
            'about-us': 'About Us',
            'company-intro': 'Company Introduction',
            'company-desc': 'We are a company focused on innovation and quality, dedicated to providing the best products and services to our customers.',
            'our-team': 'Our Team',
            'team-desc': 'Our team consists of experienced professionals, each dedicated to contributing to the company\'s success.',
            'development-history': 'Development History',
            'site-showcase': 'Site Showcase'
        }
    };

    function translatePage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[lang][key] || element.textContent;
        });
    }

    langSwitch.addEventListener("click", () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        translatePage(currentLang);
        langSwitch.textContent = translations[currentLang]['lang'];
    });

    // 初始化页面语言
    translatePage(currentLang);

    // Carousel Functionality
    const carousel = document.querySelector(".product-carousel");
    const carouselInner = document.querySelector(".carousel-inner");
    const prevBtn = document.querySelector(".carousel-control.prev");
    const nextBtn = document.querySelector(".carousel-control.next");
  
    let currentIndex = 0;
    const carouselItems = document.querySelectorAll(".carousel-item");
    const totalItems = carouselItems.length;
  
    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });
  
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });
  
    // Lightbox Functionality
    const lightbox = document.querySelector(".lightbox");
    const lightboxContent = document.querySelector(".lightbox-content");
    const lightboxClose = document.querySelector(".lightbox-close");
    const images = document.querySelectorAll(".factory-item img, .carousel-item img");
  
    images.forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxContent.src = img.src;
      });
    });
  
    lightboxClose.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  
    // 图片库功能
    const galleryImages = document.querySelectorAll('.gallery-image');
  
    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxContent.src = img.src;
      });
    });
  
    // 添加滚动功能
    const scrollContainers = document.querySelectorAll('.scroll-container');
    
    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });

    // 更新 Lightbox 功能
    const lightbox = document.querySelector(".lightbox");
    const lightboxContent = document.querySelector(".lightbox-content");
    const lightboxClose = document.querySelector(".lightbox-close");
    const images = document.querySelectorAll(".product-item img, .site-item img");

    images.forEach((img) => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxContent.src = img.src;
        });
    });

    lightboxClose.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // 场地展示滚动功能
    const siteContainer = document.querySelector('.site-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (siteContainer && prevBtn && nextBtn) {
        const scrollAmount = siteContainer.clientWidth; // 每次滚动一个容器宽度

        prevBtn.addEventListener('click', () => {
            siteContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            siteContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    } else {
        console.error('滚动按钮或容器未找到');
    }
});

// 图片懒加载
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});