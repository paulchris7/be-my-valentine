// ============================================
// 💝 VALENTINE'S WEBSITE LOGIC 💝
// ============================================

// Global State
let currentSlideIndex = 0;
let currentCourseIndex = 0;
const courses = ['entree', 'main', 'dessert'];

// DOM Elements
const elements = {
    // Sections
    monologueSection: document.getElementById('monologueSection'),
    itinerarySection: document.getElementById('itinerarySection'),
    dinnerMenuSection: document.getElementById('dinnerMenuSection'),
    question1: document.getElementById('question1'),
    question2: document.getElementById('question2'),
    question3: document.getElementById('question3'),
    celebration: document.getElementById('celebration'),

    // Monologue Elements
    monologueText: document.getElementById('monologueText'),
    monologueYes: document.getElementById('monologueYes'),
    monologueNo: document.getElementById('monologueNo'),

    // Itinerary Elements
    itineraryTitle: document.getElementById('itineraryTitle'),
    itinerarySubtitle: document.getElementById('itinerarySubtitle'),
    itineraryImage: document.getElementById('itineraryImage'),
    itineraryCaption: document.getElementById('itineraryCaption'),
    prevSlideBtn: document.getElementById('prevSlideBtn'),
    nextSlideBtn: document.getElementById('nextSlideBtn'),
    itineraryNextBtn: document.getElementById('itineraryNextBtn'),

    // Menu Elements
    menuTitle: document.getElementById('menuTitle'),
    menuSubtitle: document.getElementById('menuSubtitle'),
    courseDisplay: document.getElementById('courseDisplay'),
    menuNextBtn: document.getElementById('menuNextBtn'),
    menuSelectionImage: document.getElementById('menuSelectionImage'),
    resultText: document.getElementById('resultText'),

    // Music Elements
    bgMusic: document.getElementById('bgMusic'),
    musicSource: document.getElementById('musicSource')
};

// Configuration Shortcut
const config = window.VALENTINE_CONFIG;

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    // 1. Set global titles
    document.title = config.pageTitle;
    document.getElementById('valentineTitle').textContent = config.valentineName ? `${config.valentineName}, my love...` : "My Love";

    // 2. Setup Music
    setupMusic();

    // 3. Initialize Itinerary
    setupItinerary();

    // 4. Initialize Questions (Text & Logic)
    setupQuestions();

    // 5. Initialize Monologue
    setupMonologue();

    // 6. Show first section
    showSection('monologueSection');

    // Mobile Fix: Global click to start music if autoplay failed
    document.addEventListener('click', handleGlobalClick, { once: true });
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.question-section, .celebration').forEach(el => el.classList.add('hidden'));
    // Show target
    const target = document.getElementById(sectionId);
    if (target) target.classList.remove('hidden');
}

// ============================================
// MUSIC LOGIC
// ============================================

function setupMusic() {
    if (!config.music.enabled) return;

    elements.musicSource.src = config.music.musicUrl;
    elements.bgMusic.volume = 0.5;
    elements.bgMusic.load();

    if (config.music.autoplay) {
        playMusic();
    }
}

function playMusic() {
    const playPromise = elements.bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay prevented by browser");
        });
    }
}

function handleGlobalClick() {
    // Try to play music on first interaction if it's not playing
    if (config.music.enabled && elements.bgMusic.paused) {
        playMusic();
    }
}

// ============================================
// MONOLOGUE LOGIC
// ============================================

function setupMonologue() {
    elements.monologueText.textContent = config.monologue.text;
    elements.monologueYes.textContent = config.monologue.yesBtn;
    elements.monologueNo.textContent = config.monologue.noBtn;

    elements.monologueYes.addEventListener('click', () => handleMonologue('yes'));
    elements.monologueNo.addEventListener('click', () => handleMonologue('no'));
}

function handleMonologue(answer) {
    if (answer === 'yes') {
        startItinerary();
    } else {
        elements.monologueText.textContent = config.monologue.noResponse;
        setTimeout(() => {
            startItinerary();
        }, 2000);
    }
}

function startItinerary() {
    showSection('itinerarySection');
}

// ============================================
// ITINERARY SLIDESHOW LOGIC
// ============================================

function setupItinerary() {
    // Set Texts
    elements.itineraryTitle.textContent = config.rabatItinerary.title;
    elements.itinerarySubtitle.textContent = config.rabatItinerary.subtitle;

    // Render first slide
    renderSlide(0);

    // Event Listeners
    elements.prevSlideBtn.addEventListener('click', prevSlide);
    elements.nextSlideBtn.addEventListener('click', nextSlide);
    
    // Hide manual button since slideshow handles flow
    elements.itineraryNextBtn.style.display = 'none';
}

function renderSlide(index) {
    const slides = config.rabatItinerary.slides;
    
    // Prevent out of bounds
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    
    currentSlideIndex = index;
    
    const slide = slides[currentSlideIndex];
    elements.itineraryImage.src = slide.image;
    elements.itineraryCaption.textContent = slide.caption;
}

function nextSlide() {
    if (currentSlideIndex === config.rabatItinerary.slides.length - 1) {
        showSection('dinnerMenuSection');
        startDinner();
    } else {
        renderSlide(currentSlideIndex + 1);
    }
}

function prevSlide() {
    renderSlide(currentSlideIndex - 1);
}

// ============================================
// DINNER MENU LOGIC
// ============================================

function startDinner() {
    // Set Texts
    elements.menuTitle.textContent = config.dinnerMenu.title;
    elements.menuSubtitle.textContent = config.dinnerMenu.subtitle;
    
    // Start with first course
    currentCourseIndex = 0;
    renderCourse();

    // Next button logic
    elements.menuNextBtn.onclick = nextCourse;
    elements.menuNextBtn.style.display = 'none'; // Hide initially until selection
}

function renderCourse() {
    const courseKey = courses[currentCourseIndex];
    const courseData = config.dinnerMenu.courses[courseKey];
    
    // Clear display
    elements.courseDisplay.innerHTML = '';
    elements.menuNextBtn.style.display = 'none';
    
    // Reset selection view
    elements.menuSelectionImage.classList.add('hidden');
    elements.menuSelectionImage.src = '';
    elements.resultText.textContent = '';

    // Create Title
    const title = document.createElement('div');
    title.className = 'menu-title';
    title.textContent = courseData.title;
    elements.courseDisplay.appendChild(title);

    // Create Options
    courseData.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'menu-option';
        
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="course_${courseKey}" value="${index}">
            ${option.label}
        `;
        
        optionDiv.appendChild(label);
        
        // Click event
        optionDiv.addEventListener('click', () => {
            // Uncheck others
            document.querySelectorAll(`input[name="course_${courseKey}"]`).forEach(input => input.checked = false);
            optionDiv.querySelector('input').checked = true;

            // Call selection handler
            selectOption(option.response, option.image);
        });

        elements.courseDisplay.appendChild(optionDiv);
    });
}

function selectOption(response, image) {
    // Show text response
    elements.resultText.textContent = response;
    
    // Show image if available
    if (image) {
        elements.menuSelectionImage.src = image;
        elements.menuSelectionImage.classList.remove('hidden');
    } else {
        elements.menuSelectionImage.classList.add('hidden');
    }

    // Show Next button
    elements.menuNextBtn.style.display = 'inline-block';
}

function nextCourse() {
    currentCourseIndex++;
    if (currentCourseIndex < courses.length) {
        renderCourse();
    } else {
        // Finished menu, go to Question 1
        showSection('question1');
    }
}

// ============================================
// QUESTIONS LOGIC
// ============================================

function setupQuestions() {
    // --- Question 1 ---
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;

    // Yes Button 1
    document.getElementById('yesBtn1').addEventListener('click', () => {
        showSection('question2');
    });

    // No Button 1 (Move away)
    document.getElementById('noBtn1').addEventListener('mouseover', moveButton);
    document.getElementById('noBtn1').addEventListener('click', moveButton);

    // Secret Answer
    document.getElementById('secretAnswerBtn').addEventListener('click', () => {
        showSection('question2');
    });

    // --- Question 2 (Love Meter) ---
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;

    const loveMeter = document.getElementById('loveMeter');
    const nextBtn2 = document.getElementById('nextBtn');
    
    // Initial state
    loveMeter.value = 100;
    nextBtn2.style.display = 'none'; // Hide initially? Or logic says "If slider > X, show Next"

    loveMeter.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        document.getElementById('loveValue').textContent = value;

        // Show Next button if value is high enough (e.g., > 500)
        if (value > 500) {
            nextBtn2.style.display = 'inline-block';
        } else {
            nextBtn2.style.display = 'none';
        }

        // Extra Love Messages
        const extraLove = document.getElementById('extraLove');
        if (value > 100) {
            extraLove.classList.remove('hidden');
            if (value >= 5000) {
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.textContent = config.loveMessages.normal;
            }
        } else {
            extraLove.classList.add('hidden');
        }
    });

    // Next Button 2
    nextBtn2.addEventListener('click', () => {
        showSection('question3');
    });

    // --- Question 3 (Final) ---
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    // Yes Button 3 -> Celebration
    document.getElementById('yesBtn3').addEventListener('click', celebrate);

    // No Button 3 (Move away)
    document.getElementById('noBtn3').addEventListener('mouseover', moveButton);
    document.getElementById('noBtn3').addEventListener('click', moveButton);
}

// Helper: Move Button
function moveButton(e) {
    const btn = e.target;
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
}

// ============================================
// CELEBRATION
// ============================================

function celebrate() {
    showSection('celebration');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    // Heart explosion
    createHeartExplosion();
}

function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)] || '💖';
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animationDuration = (Math.random() * 2 + 1) + 's';
        
        container.appendChild(heart);
    }
}