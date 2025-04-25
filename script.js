document.addEventListener('DOMContentLoaded', function() {
    initActivitySliders();
    function initActivitySliders() {
        const activitySliders = document.querySelectorAll('.activity-slider');
        
        activitySliders.forEach(slider => {
            const slides = slider.querySelector('.activity-slides');
            const dots = slider.querySelectorAll('.activity-slider-dot');
            let currentSlide = 0;
            let slideInterval;
            
            function showSlide(index) {
                currentSlide = index;
                slides.style.transform = `translateX(-${currentSlide * 50}%)`;
                
                // Update dots
                dots.forEach(dot => dot.classList.remove('active'));
                dots[currentSlide].classList.add('active');
            }
            
            function startAutoSlide() {
                clearInterval(slideInterval);
                slideInterval = setInterval(() => {
                    const nextSlide = (currentSlide + 1) % dots.length;
                    showSlide(nextSlide);
                }, 4000);
            }
            
            // Initialize
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const slideIndex = parseInt(dot.getAttribute('data-index'));
                    showSlide(slideIndex);
                    startAutoSlide();
                });
            });
            
            showSlide(0);
            startAutoSlide();
            
            // Pause on hover
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', startAutoSlide);
        });
    }    

    // Inisialisasi semua slider
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach((slider) => {
        const slidesContainer = slider.querySelector('.slides');
        const slides = slider.querySelectorAll('.slide');
        const dots = slider.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        let slideInterval;
        const slideCount = slides.length;
        
        // Fungsi untuk memuat gambar
        function loadImages() {
            slides.forEach((slide, index) => {
                const img = slide.querySelector('img');
                if (img) {
                    // Jika gambar sudah dimuat
                    if (img.complete) {
                        img.classList.add('loaded');
                    } else {
                        img.addEventListener('load', function() {
                            this.classList.add('loaded');
                        });
                        img.addEventListener('error', function() {
                            console.error `(Gambar tidak bisa dimuat: ${this.src})`;
                            // Fallback image atau background
                            this.style.backgroundColor = '#333';
                        });
                    }
                }
            });
        }
        
        // Fungsi untuk menampilkan slide tertentu
        function showSlide(index) {
            // Pastikan index valid
            currentSlide = (index + slideCount) % slideCount;
            
            // Gerakkan slides container
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dot aktif
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
            
            // Preload next image
            const nextIndex = (currentSlide + 1) % slideCount;
            const nextImg = slides[nextIndex].querySelector('img');
            if (nextImg && !nextImg.classList.contains('loaded')) {
                const tempImg = new Image();
                tempImg.src = nextImg.src;
                tempImg.onload = function() {
                    nextImg.classList.add('loaded');
                };
            }
        }
        
        // Fungsi untuk auto slide
        function startAutoSlide() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }
        
        // Inisialisasi slider
        function initSlider() {
            // Load images pertama kali
            loadImages();
            
            // Set event listener untuk dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    showSlide(index);
                    startAutoSlide();
                });
            });
            
            // Mulai dengan slide pertama
            showSlide(0);
            
            // Mulai auto slide
            startAutoSlide();
            
            // Hentikan auto slide saat hover
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Panggil inisialisasi
        initSlider();
    });
    
    // Smooth scrolling untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});

