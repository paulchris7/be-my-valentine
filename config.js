const CONFIG = {
    valentineName: "Ruth",

    // The title that appears in the browser tab
    pageTitle: "Will You Be My Valentine? 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: [],  // Heart emojis
        bears: []    // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Do you like me?",                                    // First interaction
            yesBtn: "Yes",                                             // Text for "Yes" button
            noBtn: "No",                                               // Text for "No" button
            secretAnswer: "I don't like you, I love you! ❤️"           // Secret hover message
        },
        second: {
            text: "How much do you love me?",                          // For the love meter
            startText: "This much!",                                   // Text before the percentage
            nextBtn: "Next ❤️"                                         // Text for the next button
        },
        third: {
            text: "Will you be my Valentine on February 14th, 2026? 🌹", // The big question!
            yesBtn: "Yes!",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        }
    },

    // Love meter messages
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",  // Shows when they go past 5000%
        high: "To infinity and beyond! 🚀💝",              // Shows when they go past 1000%
        normal: "And beyond! 🥰"                           // Shows when they go past 100%
    },

    // Messages that appear after "Yes!"
    celebration: {
        title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
        message: "Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💝💋❤️💕"  // These will bounce around
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#ffafbd",      // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#ffc3a0",        // Gradient end (should complement backgroundStart)
        buttonBackground: "#ff6b6b",     // Button color (should stand out against the background)
        buttonHover: "#ff8787",          // Button hover color (slightly lighter than buttonBackground)
        textColor: "#ff4757"             // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5         // Size of heart explosion effect (1.2-2.0 recommended)
    },

    // Background Music
    music: {
        enabled: true,                     // Music feature is enabled
        autoplay: true,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    },

    // Itinerary for Rabat based on your PDF
    rabatItinerary: {
        title: "Our Romantic Journey to Rabat 🇲🇦",
        subtitle: "A day of art, history, and us...",
        slides: [
            {
                // Stop 1: Modern Art Museum [cite: 2, 10]
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mus%C3%A9e_Mohammed_VI_d%27art_moderne_et_contemporain.jpg/800px-Mus%C3%A9e_Mohammed_VI_d%27art_moderne_et_contemporain.jpg", 
                caption: "Starting with art at the Musée Mohammed VI 🎨"
            },
            {
                // Stop 2: Mausoleum Mohammed V [cite: 5, 16]
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mausoleum_of_Mohammed_V%2C_Rabat.jpg/800px-Mausoleum_of_Mohammed_V%2C_Rabat.jpg",
                caption: "Visiting the magnificent Mausolée Mohammed V 🏛️"
            },
            {
                // Stop 3: Kasbah des Oudayas [cite: 8, 12, 13]
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Kasbah_des_Oudayas_Rabat.jpg/800px-Kasbah_des_Oudayas_Rabat.jpg",
                caption: "Getting lost together in the blue streets of the Kasbah 💙"
            },
            {
                // Stop 4: Andalusian Gardens [cite: 3, 14]
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Jardin_Andalou_Rabat.jpg/800px-Jardin_Andalou_Rabat.jpg",
                caption: "A romantic walk in the Jardins Andalous 🌿"
            },
            {
                // Stop 5: Oudayas Museum [cite: 4, 9, 15]
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Museum_of_Oudayas_1.jpg/800px-Museum_of_Oudayas_1.jpg",
                caption: "Discovering treasures at the Musée des Oudayas 🏺"
            }
        ],
        finishBtn: "Now... what's for dinner? 🍽️"
    },

    dinnerMenu: {
        title: "The Valentine's Feast 🍔",
        subtitle: "Pick your favorites! (Chef's Warning: It's all me)",
        courses: {
            entree: {
                title: "Appetizers",
                options: [
                    { 
                        label: "Loaded Nachos with Jalapeños 🧀", 
                        response: "Spicy & Cheesy Christopher! 🌶️",
                        image: "./images/menu-nachos-chris.jpg"
                    },
                    { 
                        label: "Crispy Mozzarella Sticks 🥖", 
                        response: "The 'Cheesiest' Guy You Know! 🧀",
                        image: "./images/menu-mozzarella-chris.jpg"
                    }
                ]
            },
            main: {
                title: "Main Course",
                options: [
                    { 
                        label: "The Ultimate Smash Burger 🍔", 
                        response: "Juicy, Real & 100% Beefcake Christopher! 💪",
                        image: "./images/menu-burger-chris.jpg" 
                    },
                    { 
                        label: "Spicy Chicken Tacos 🌮", 
                        response: "Hot, Fun & Zesty Christopher! 🌮",
                        image: "./images/menu-tacos-chris.jpg" 
                    }
                ]
            },
            dessert: {
                title: "Sweet Treats",
                options: [
                    { 
                        label: "Triple Chocolate Brownie 🍫", 
                        response: "Warm, Sweet & Melty Christopher! 🫠",
                        image: "./images/menu-brownie-chris.jpg" 
                    },
                    { 
                        label: "Strawberry Milkshake 🥤", 
                        response: "Cool, Smooth & Sweet Christopher! 🍓",
                        image: "./images/menu-shake-chris.jpg" 
                    }
                ]
            }
        },
        finishBtn: "I'm Stuffed! (With Love) 💋"
    }
};

window.VALENTINE_CONFIG = CONFIG; 