document.addEventListener('DOMContentLoaded', function () {
    // 初始化轮播图
    var swiper = new Swiper('.carousel', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // 添加响应式断点
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });
    
    // 添加轮播图触摸支持
    swiper.on('touchStart', function() {
        if (window.innerWidth < 768) {
            swiper.autoplay.stop();
        }
    });
    
    swiper.on('touchEnd', function() {
        if (window.innerWidth < 768) {
            swiper.autoplay.start();
        }
    });

    // 初始化AOS动画
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: function() {
            return window.innerWidth < 768; // 在移动设备上禁用以提高性能
        }
    });
    
    // 重新初始化AOS在窗口调整大小时
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
    
    // 作品集筛选功能
    const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter .filter-btn');
    const portfolioItems = document.querySelectorAll('.gallery .item');
    
    if (portfolioFilterBtns.length > 0 && portfolioItems.length > 0) {
        portfolioFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 移除所有按钮的active类
                portfolioFilterBtns.forEach(b => b.classList.remove('active'));
                // 给当前点击的按钮添加active类
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // 博客筛选功能
    const blogFilterBtns = document.querySelectorAll('.blog-filter .filter-btn');
    const blogPosts = document.querySelectorAll('.blog-container .blog-post');
    
    if (blogFilterBtns.length > 0 && blogPosts.length > 0) {
        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 移除所有按钮的active类
                blogFilterBtns.forEach(b => b.classList.remove('active'));
                // 给当前点击的按钮添加active类
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                blogPosts.forEach(post => {
                    if (filterValue === 'all' || post.classList.contains(filterValue)) {
                        post.style.display = 'block';
                        setTimeout(() => {
                            post.style.opacity = '1';
                            post.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        post.style.opacity = '0';
                        post.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            post.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航链接后关闭菜单
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 滚动时导航栏效果
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(31, 31, 31, 1)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(31, 31, 31, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    });
    
    // 主题切换功能
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // 检查本地存储中的主题偏好
    const getCurrentTheme = () => {
        return localStorage.getItem('theme') || 'dark';
    };
    
    // 应用主题
    const applyTheme = (theme) => {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(`${theme}-theme`);
        localStorage.setItem('theme', theme);
        
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    };
    
    // 初始化主题
    if (themeToggle) {
        const currentTheme = getCurrentTheme();
        applyTheme(currentTheme);
        
        // 切换主题
        themeToggle.addEventListener('click', () => {
            const currentTheme = getCurrentTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
    
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 创建返回顶部按钮
    const createBackToTopButton = () => {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.style.display = 'none';
        document.body.appendChild(backToTopBtn);
        
        // 显示/隐藏返回顶部按钮
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        backToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // 点击返回顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createBackToTopButton();
    
    // 图片懒加载
    const lazyLoadImages = () => {
        if ('IntersectionObserver' in window) {
            const imgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imgObserver.observe(img);
            });
        } else {
            // 回退方案，为不支持IntersectionObserver的浏览器
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            });
        }
    };
    
    lazyLoadImages();
    
    // 优化移动端触摸体验
    if ('ontouchstart' in window) {
        document.querySelectorAll('.btn, .feature, .gallery .item, .blog-post').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, {passive: true});
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, {passive: true});
        });
    }
});