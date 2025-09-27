// Advanced Travel Website JavaScript with Modern Features
class TravelWebsite {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupLazyLoading();
        this.setupAnimations();
        this.setupSmoothScrolling();
        this.setupInteractiveFeatures();
    }

    init() {
        // Initialize all components
        this.setupMobileMenu();
        this.setupNavbarScroll();
        this.setupFilterTabs();
        this.setupFAQAccordion();
        this.setupNewsletterForm();
        this.setupCounterAnimation();
        this.setupParallaxEffects();
        this.setupSearchFunctionality();
        this.setupLoadMoreButton();
        this.setupPackageBooking();
        this.setupBlogCards();
        this.setupTestimonialSlider();
        this.setupScrollToTop();
        this.setupPreloader();
        this.setupInteractiveMap();
        this.setupAdvancedSearch();
        this.setupWeatherWidget();
        this.setupCurrencyConverter();
        this.setupVirtualTours();
        this.setupLiveChat();
        this.setupSocialFeatures();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Observe all images with loading="lazy"
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });

        // Lazy load sections
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    setupAnimations() {
        // AOS (Animate On Scroll) alternative implementation
        const animateElements = document.querySelectorAll('[data-aos]');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.aos;
                    const delay = element.dataset.aosDelay || 0;
                    
                    setTimeout(() => {
                        element.classList.add('aos-animate');
                        this.triggerAnimation(element, animationType);
                    }, delay);
                    
                    animationObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    triggerAnimation(element, animationType) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        switch(animationType) {
            case 'fade-up':
                element.style.transform = 'translateY(0)';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(0)';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(0)';
                break;
            case 'zoom-in':
                element.style.transform = 'scale(1)';
                break;
        }
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    setupInteractiveFeatures() {
        // Filter functionality for destinations
        this.setupFilterTabs();
        
        // Search functionality
        this.setupSearchFunctionality();
        
        // Load more button
        this.setupLoadMoreButton();
        
        // Package booking
        this.setupPackageBooking();
        
        // Blog card interactions
        this.setupBlogCards();
        
        // Testimonial slider
        this.setupTestimonialSlider();
    }

    setupNavbarScroll() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    setupFilterTabs() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const destinationCards = document.querySelectorAll('.destination-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                
                destinationCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                        otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.style.transform = 'rotate(45deg)';
                }
            });
        });
    }

    setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        const newsletterInput = document.querySelector('.newsletter-input');
        const newsletterBtn = document.querySelector('.newsletter-btn');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterInput.value;
                
                if (this.validateEmail(email)) {
                    this.showNotification('Thank you for subscribing!', 'success');
                    newsletterInput.value = '';
                } else {
                    this.showNotification('Please enter a valid email address.', 'error');
                }
            });
        }
    }

    setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    setupSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query) {
                    this.performSearch(query);
                }
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = searchInput.value.trim();
                    if (query) {
                        this.performSearch(query);
                    }
                }
            });
        }
    }

    performSearch(query) {
        // Simulate search functionality
        this.showNotification(`Searching for "${query}"...`, 'info');
        
        // In a real application, this would make an API call
        setTimeout(() => {
            this.showNotification(`Found 15 results for "${query}"`, 'success');
        }, 1000);
    }

    setupLoadMoreButton() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreDestinations();
            });
        }
    }

    loadMoreDestinations() {
        const destinationsGrid = document.querySelector('.destinations-grid');
        const loadMoreBtn = document.querySelector('.load-more-btn');
        
        // Simulate loading more destinations
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            // Add more destination cards (in a real app, this would come from an API)
            const newDestinations = this.generateNewDestinations();
            newDestinations.forEach(destination => {
                destinationsGrid.appendChild(destination);
            });
            
            loadMoreBtn.textContent = 'Load More Destinations';
            loadMoreBtn.disabled = false;
            
            this.showNotification('More destinations loaded!', 'success');
        }, 1500);
    }

    generateNewDestinations() {
        const destinations = [
            { name: 'Iceland', country: 'Iceland', rating: '4.8', price: '$399', badge: 'Northern Lights' },
            { name: 'Maldives', country: 'Maldives', rating: '4.9', price: '$699', badge: 'Paradise' },
            { name: 'Norway', country: 'Norway', rating: '4.7', price: '$549', badge: 'Fjords' },
            { name: 'Australia', country: 'Australia', rating: '4.6', price: '$449', badge: 'Outback' }
        ];
        
        return destinations.map((dest, index) => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.dataset.category = 'new';
            card.innerHTML = `
                <div class="card-image">
                    <img src="https://images.unsplash.com/photo-${1500000000000 + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="${dest.name}" loading="lazy">
                    <div class="card-overlay">
                        <div class="card-content">
                            <h3>${dest.name}</h3>
                            <p>${dest.country}</p>
                            <div class="card-rating">
                                <i class="fas fa-star"></i>
                                <span>${dest.rating}</span>
                            </div>
                            <div class="card-price">From ${dest.price}/night</div>
                        </div>
                    </div>
                    <div class="card-badge">${dest.badge}</div>
                </div>
            `;
            return card;
        });
    }

    setupPackageBooking() {
        const packageBtns = document.querySelectorAll('.package-btn');
        
        packageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const packageCard = btn.closest('.package-card');
                const packageTitle = packageCard.querySelector('h3').textContent;
                
                this.showBookingModal(packageTitle);
            });
        });
    }

    showBookingModal(packageTitle) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Book ${packageTitle}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="booking-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" required>
                        </div>
                        <div class="form-group">
                            <label>Travel Dates</label>
                            <input type="date" required>
                        </div>
                        <div class="form-group">
                            <label>Number of Travelers</label>
                            <select required>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4+</option>
                            </select>
                        </div>
                        <button type="submit" class="submit-booking">Submit Booking</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const form = modal.querySelector('.booking-form');
        
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.showNotification('Booking submitted successfully!', 'success');
            document.body.removeChild(modal);
        });
    }

    setupBlogCards() {
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    setupTestimonialSlider() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        // Auto-rotate testimonials
        setInterval(() => {
            testimonialCards.forEach((card, index) => {
                card.style.opacity = index === currentIndex ? '1' : '0.7';
                card.style.transform = index === currentIndex ? 'scale(1)' : 'scale(0.95)';
            });
            
            currentIndex = (currentIndex + 1) % testimonialCards.length;
        }, 5000);
    }

    setupScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        // Scroll to top functionality
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupPreloader() {
        // Create preloader
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-logo">Wanderlust</div>
                <div class="preloader-spinner"></div>
            </div>
        `;
        
        document.body.appendChild(preloader);
        
        // Hide preloader when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(preloader);
                }, 500);
            }, 1000);
        });
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Interactive Map Functionality
    setupInteractiveMap() {
        const mapDestinations = document.querySelectorAll('.map-destination');
        
        mapDestinations.forEach(destination => {
            destination.addEventListener('click', () => {
                const region = destination.dataset.destination;
                this.filterDestinationsByRegion(region);
                this.showNotification(`Showing destinations in ${region.charAt(0).toUpperCase() + region.slice(1)}`, 'info');
            });
        });
    }

    filterDestinationsByRegion(region) {
        const destinationCards = document.querySelectorAll('.destination-card');
        
        destinationCards.forEach(card => {
            if (region === 'all' || card.dataset.category === region) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Advanced Search Functionality
    setupAdvancedSearch() {
        const searchBtnPrimary = document.querySelector('.search-btn-primary');
        const searchBtnSecondary = document.querySelector('.search-btn-secondary');
        
        if (searchBtnPrimary) {
            searchBtnPrimary.addEventListener('click', () => {
                this.performAdvancedSearch();
            });
        }
        
        if (searchBtnSecondary) {
            searchBtnSecondary.addEventListener('click', () => {
                this.showAdvancedFilters();
            });
        }
    }

    performAdvancedSearch() {
        const destination = document.querySelector('.search-group:nth-child(1) select').value;
        const dates = document.querySelector('.search-group:nth-child(2) input').value;
        const travelers = document.querySelector('.search-group:nth-child(3) select').value;
        const budget = document.querySelector('.search-group:nth-child(4) select').value;
        const duration = document.querySelector('.search-group:nth-child(5) select').value;
        const style = document.querySelector('.search-group:nth-child(6) select').value;
        
        this.showNotification(`Searching for ${travelers} traveling to ${destination} with ${budget} budget...`, 'info');
        
        // Simulate search results
        setTimeout(() => {
            this.showNotification('Found 12 matching packages!', 'success');
        }, 1500);
    }

    showAdvancedFilters() {
        this.showNotification('Advanced filters panel coming soon!', 'info');
    }

    // Weather Widget Functionality
    setupWeatherWidget() {
        const weatherCards = document.querySelectorAll('.weather-card');
        
        weatherCards.forEach(card => {
            card.addEventListener('click', () => {
                const location = card.querySelector('h3').textContent;
                this.showWeatherDetails(location);
            });
        });
    }

    showWeatherDetails(location) {
        this.showNotification(`Loading detailed weather forecast for ${location}...`, 'info');
        
        setTimeout(() => {
            this.showNotification(`Weather details for ${location} loaded!`, 'success');
        }, 1000);
    }

    // Currency Converter Functionality
    setupCurrencyConverter() {
        const swapBtn = document.querySelector('.swap-btn');
        const fromSelect = document.querySelector('.currency-group:nth-child(1) select');
        const toSelect = document.querySelector('.currency-group:nth-child(3) select');
        const fromInput = document.querySelector('.currency-group:nth-child(1) input');
        const toInput = document.querySelector('.currency-group:nth-child(3) input');
        
        if (swapBtn) {
            swapBtn.addEventListener('click', () => {
                // Swap currencies
                const tempCurrency = fromSelect.value;
                fromSelect.value = toSelect.value;
                toSelect.value = tempCurrency;
                
                // Swap amounts
                const tempAmount = fromInput.value;
                fromInput.value = toInput.value;
                toInput.value = tempAmount;
                
                this.updateExchangeRate();
            });
        }
        
        if (fromInput) {
            fromInput.addEventListener('input', () => {
                this.convertCurrency();
            });
        }
        
        if (fromSelect) {
            fromSelect.addEventListener('change', () => {
                this.updateExchangeRate();
                this.convertCurrency();
            });
        }
        
        if (toSelect) {
            toSelect.addEventListener('change', () => {
                this.updateExchangeRate();
                this.convertCurrency();
            });
        }
    }

    convertCurrency() {
        const fromInput = document.querySelector('.currency-group:nth-child(1) input');
        const toInput = document.querySelector('.currency-group:nth-child(3) input');
        const fromSelect = document.querySelector('.currency-group:nth-child(1) select');
        const toSelect = document.querySelector('.currency-group:nth-child(3) select');
        
        if (fromInput && toInput) {
            const amount = parseFloat(fromInput.value) || 0;
            const rate = this.getExchangeRate(fromSelect.value, toSelect.value);
            const convertedAmount = (amount * rate).toFixed(2);
            toInput.value = convertedAmount;
        }
    }

    updateExchangeRate() {
        const fromSelect = document.querySelector('.currency-group:nth-child(1) select');
        const toSelect = document.querySelector('.currency-group:nth-child(3) select');
        const rateDisplay = document.querySelector('.exchange-rate p');
        
        if (rateDisplay && fromSelect && toSelect) {
            const rate = this.getExchangeRate(fromSelect.value, toSelect.value);
            rateDisplay.textContent = `1 ${fromSelect.value} = ${rate} ${toSelect.value}`;
        }
    }

    getExchangeRate(from, to) {
        // Mock exchange rates
        const rates = {
            'USD': { 'EUR': 0.92, 'GBP': 0.79, 'JPY': 150, 'CAD': 1.35 },
            'EUR': { 'USD': 1.09, 'GBP': 0.86, 'JPY': 163, 'CAD': 1.47 },
            'GBP': { 'USD': 1.27, 'EUR': 1.16, 'JPY': 190, 'CAD': 1.71 },
            'JPY': { 'USD': 0.0067, 'EUR': 0.0061, 'GBP': 0.0053, 'CAD': 0.009 },
            'CAD': { 'USD': 0.74, 'EUR': 0.68, 'GBP': 0.58, 'JPY': 111 }
        };
        
        return rates[from]?.[to] || 1;
    }

    // Virtual Tours Functionality
    setupVirtualTours() {
        const playBtns = document.querySelectorAll('.play-btn');
        
        playBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tourCard = btn.closest('.virtual-tour-card');
                const tourTitle = tourCard.querySelector('h4').textContent;
                this.startVirtualTour(tourTitle);
            });
        });
    }

    startVirtualTour(tourTitle) {
        this.showNotification(`Starting virtual tour: ${tourTitle}`, 'info');
        
        // Simulate tour loading
        setTimeout(() => {
            this.showNotification('Virtual tour loaded! Enjoy your 360° experience.', 'success');
        }, 2000);
    }

    // Live Chat Functionality
    setupLiveChat() {
        const chatToggle = document.querySelector('.chat-toggle');
        const chatWindow = document.querySelector('.chat-window');
        const chatClose = document.querySelector('.chat-close');
        const sendBtn = document.querySelector('.send-btn');
        const chatInput = document.querySelector('.chat-input input');
        
        if (chatToggle && chatWindow) {
            chatToggle.addEventListener('click', () => {
                chatWindow.classList.toggle('active');
            });
        }
        
        if (chatClose && chatWindow) {
            chatClose.addEventListener('click', () => {
                chatWindow.classList.remove('active');
            });
        }
        
        if (sendBtn && chatInput) {
            sendBtn.addEventListener('click', () => {
                this.sendChatMessage(chatInput.value);
                chatInput.value = '';
            });
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage(chatInput.value);
                    chatInput.value = '';
                }
            });
        }
    }

    sendChatMessage(message) {
        if (!message.trim()) return;
        
        const chatMessages = document.querySelector('.chat-messages');
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        chatMessages.appendChild(userMessage);
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = this.getBotResponse(message);
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${botResponse}</p>
                </div>
            `;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    getBotResponse(message) {
        const responses = {
            'hello': 'Hello! I\'m here to help you plan your perfect trip. What destination are you interested in?',
            'price': 'Our packages start from $199 per night. Would you like to see our current deals?',
            'booking': 'I can help you with booking! Which package interests you most?',
            'weather': 'I can provide weather information for any destination. Which location would you like to know about?',
            'default': 'That\'s a great question! I\'d be happy to help you with travel planning. Could you tell me more about your travel preferences?'
        };
        
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }

    // Social Features Functionality
    setupSocialFeatures() {
        const socialPosts = document.querySelectorAll('.social-post');
        const socialBtn = document.querySelector('.social-btn');
        
        socialPosts.forEach(post => {
            post.addEventListener('click', () => {
                const location = post.querySelector('.social-location span').textContent;
                this.showSocialPost(location);
            });
        });
        
        if (socialBtn) {
            socialBtn.addEventListener('click', () => {
                this.showNotification('Redirecting to Instagram...', 'info');
            });
        }
    }

    showSocialPost(location) {
        this.showNotification(`Opening social media post for ${location}`, 'info');
    }

    // Enhanced Utility Functions
    setupEnhancedFeatures() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add loading states to buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function() {
                if (!this.classList.contains('loading')) {
                    this.classList.add('loading');
                    setTimeout(() => {
                        this.classList.remove('loading');
                    }, 2000);
                }
            });
        });
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TravelWebsite();
});

// Additional utility functions
const utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TravelWebsite, utils };
}
