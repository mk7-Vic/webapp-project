window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 100) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});

const pickup = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");

if (pickup && returnDate) {
    const today = new Date().toISOString().split("T")[0];

    pickup.min = today;
    returnDate.min = today;

    pickup.addEventListener("change", function () {
        returnDate.min = pickup.value;
    });
}

const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / 100;

        if(count<target) {
            counter.innerText=
                Math.ceil(count + increment);
                setTimeout(updateCounter,20);
            }
        else{
            counter.innerText=target + '+';
            }
    };
    updateCounter();
})


const filterButtons = document.querySelectorAll('.filter-btn');
const vehicleItems = document.querySelectorAll('.vehicle-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => {
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-outline-dark');
        });

        button.classList.remove('btn-outline-dark');
        button.classList.add('btn-warning');

        //Filter logic
        const filter = button.getAttribute('data-filter');
        
        vehicleItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block'; // Show all
            } else if (item.classList.contains(filter)) {
                item.style.display = 'block'; // Show matching
            } else {
                item.style.display = 'none';  // Hide non-matching
            }
        });
    });
});

const searchInput = document.getElementById("vehicleSearch");
if(searchInput){
    searchInput.addEventListener("keyup", () => {
        const searchValue = searchInput.value.toLowerCase();

        vehicleItems.forEach(item => {
            const vehicleName = item.querySelector(".vehicle-name").innerText.toLowerCase();

            if(vehicleName.includes(searchValue)) {
                item.style.display='block';
            }
            else{
                item.style.display='none';
            }
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const vehicleContainer = document.getElementById('vehicleContainer');
    const sortSelect = document.getElementById('sortSelect');

    if(!vehicleContainer || !sortSelect) return;

    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const items = Array.from(document.querySelectorAll('.vehicle-item'));

        if (sortValue === 'default') {
            items.sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));
        } else {
            items.sort((a, b) => {
                const priceA = parseInt(a.querySelector('.vehicle-price').dataset.price);
                const priceB = parseInt(b.querySelector('.vehicle-price').dataset.price);
                return sortValue === 'low-high' ? priceA - priceB : priceB - priceA;
            });
        }

        items.forEach(item => vehicleContainer.appendChild(item));
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");

    if(bookingForm) {
        bookingForm.addEventListener("submit", function(e){
            e.preventDefault(); 
            console.log("Validation script is successfully running!");

            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const pickupDateValue = document.getElementById("pickupDate").value;
            const returnDateValue = document.getElementById("returnDate").value;
            
            const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
            const modalIcon = document.getElementById('modalIcon');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');

            //show errors
            const showError = (message) => {
                modalIcon.className = "bi bi-x-circle-fill text-danger display-1 mb-3";
                modalTitle.textContent = "Oops!";
                modalMessage.textContent = message;
                bookingModal.show();
            };

            //phone validation
            const validCharsRegex = /^\+?[\d\s\-]+$/;
            if(!validCharsRegex.test(phone)){
                showError("Phone numbers cannot contain letters. Please use only numbers, spaces, or dashes.");
                return;
            }

            //check length
            const cleanPhone = phone.replace(/[\s-]/g, '');
            if(cleanPhone.length < 10){
                showError("Please enter a valid phone number with at least 10 digits.");
                return;
            }

            //email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)){
                showError("Please enter a valid email address (e.g., name@example.com).");
                return;
            }

            //Date validation
            if(!pickupDateValue || !returnDateValue) {
                showError("Please select both pickup and return dates.");
                return;
            }

            const pickup = new Date(pickupDateValue);
            const dropoff = new Date(returnDateValue);

            if(dropoff <= pickup){
                showError("Your return date must be at least one day after your pickup date.");
                return;
            }

            // Success state
            modalIcon.className = "bi bi-check-circle-fill text-success display-1 mb-3";
            modalTitle.textContent = "Booking Confirmed!";
            modalMessage.textContent = "Your reservation has been submitted successfully. Our team will contact you shortly to finalize details.";
            bookingModal.show();
            
            bookingForm.reset();
            const totalPriceDisplay = document.getElementById("totalPrice");
            if(totalPriceDisplay) totalPriceDisplay.textContent = "0";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const loadBtn = document.getElementById("loadMoreReviews");
    const hiddenReviews = document.querySelectorAll(".extra-review");

    if (!loadBtn || hiddenReviews.length === 0) return;

    let currentIndex = 0;
    const reviewsPerClick = 3;

    loadBtn.addEventListener("click", () => {

        for (
            let i = currentIndex;
            i < currentIndex + reviewsPerClick && i < hiddenReviews.length;
            i++
        ) {
            hiddenReviews[i].classList.remove("d-none");
        }

        currentIndex += reviewsPerClick;

        if (currentIndex >= hiddenReviews.length) {
            loadBtn.style.display = "none";
        }
    });
});

const helpfulButtons = document.querySelectorAll(".helpful-btn");
helpfulButtons.forEach((button, index) => {
    const saved = localStorage.getItem("review" + index);

    if(saved){
        button.dataset.count = saved;
        button.querySelector("span").textContent = saved;
        button.disabled = true;
        button.innerHTML = `✔ Helpful (<span>${saved}</span>)`;
    }

    button.addEventListener("click", function(){
        let count = Number(this.dataset.count);
        count++;
        this.dataset.count = count;
        this.querySelector("span").textContent = count;
        this.disabled = true;
        this.innerHTML = `✔ Helpful (<span>${count}</span>)`;
        localStorage.setItem("review"+index,count);
    });
});


const reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const message = document.getElementById("reviewMessage");
        message.classList.remove("d-none");
        reviewForm.reset();
        setTimeout(() => {
            message.classList.add("d-none");
        }, 5000);
    });
}

// FAQ Search

const faqSearch = document.getElementById("faqSearch");

if(faqSearch){

    faqSearch.addEventListener("keyup",function(){

        const value=this.value.toLowerCase();

        const items=document.querySelectorAll(".faq-item");

        items.forEach(item=>{

            const text=item.innerText.toLowerCase();

            if(text.includes(value)){
                item.style.display="block";
            }
            else{
                item.style.display="none";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const location = params.get("location");
    const car = params.get("car");

    if(service){
        const serviceSelect = document.getElementById("serviceSelect");
        if(serviceSelect) serviceSelect.value = service;
    }

    if(location){
        const locationSelect = document.getElementById("pickupLocation");
        if(locationSelect) locationSelect.value = location;
    }

    if(car){
        const vehicleSelect = document.getElementById("preferredVehicle");
        if(vehicleSelect) vehicleSelect.value = car;
    }
});

//Vehicle Details logic

//Matches feature names to Bootstrap icons
const featureIcons = {
    "Air Conditioning": "bi-snow",
    "Bluetooth": "bi-bluetooth",
    "USB Charging": "bi-usb-symbol",
    "Reverse Camera": "bi-camera-video-fill",
    "ABS Brakes": "bi-shield-check",
    "GPS Navigation": "bi-geo-alt-fill",
    "Cruise Control": "bi-airplane-engines-fill",
    "Airbags": "bi-shield-fill-check",
    "Leather Seats": "bi-star-fill",
    "Panoramic Roof": "bi-sun-fill",
    "Premium Audio": "bi-speaker-fill",
    "4WD / AWD": "bi-gear-wide-connected"
};

//Vehicle Database
const vehicleDatabase = {
    "demio": {
        name: "Mazda Demio", category: "Economy Small Car", price: "Ksh 4,000", image: "images/mazda demio.jpg",
        description: "Fuel efficient and perfect for city driving. This compact car offers excellent maneuverability and parking ease.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes"]
    },
    "note": {
        name: "Nissan Note", category: "Economy Small Car", price: "Ksh 4,000", image: "images/Nissan-note.png",
        description: "A surprisingly spacious interior for a compact car, offering great fuel economy and a smooth ride.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes"]
    },
    "vitz": {
        name: "Toyota Vitz", category: "Economy Small Car", price: "Ksh 4,000", image: "images/toyota-vitz.jpeg",
        description: "One of the most popular and reliable small cars on the market. Zippy, easy to park, and extremely fuel-efficient.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes"]
    },

    "axio": {
        name: "Toyota Axio", category: "Economy Medium Car", price: "Ksh 5,000", image: "images/Axio.jpeg",
        description: "A comfortable and reliable sedan. Ideal for both city driving and longer highway trips with plenty of trunk space.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera"]
    },
    "premio": {
        name: "Toyota Premio", category: "Economy Medium Car", price: "Ksh 5,000", image: "images/premio.jpg",
        description: "An elegant executive sedan that blends comfort with fuel efficiency. Features premium interior finishes.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Leather Seats"]
    },
    "atenza": {
        name: "Mazda Atenza", category: "Economy Medium Car", price: "Ksh 5,000", image: "images/atenza.jpeg",
        description: "A sporty and stylish sedan with dynamic handling. Offers a premium driving experience without breaking the bank.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Cruise Control"]
    },

    "xtrail": {
        name: "Nissan Xtrail", category: "Economy Mid-size SUV", price: "Ksh 7,500", image: "images/xtrail new shape.jpeg",
        description: "The perfect balance of space and power. Smooth handling for the city, with the clearance to handle upcountry roads.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "4WD / AWD"]
    },
    "cx5": {
        name: "Mazda CX-5", category: "Standard Mid-Size SUV", price: "Ksh 8,000", image: "images/CX-5.png",
        description: "A beautifully designed modern SUV with excellent comfort, advanced safety features, and incredible fuel economy.",
        transmission: "Automatic", fuel: "Petrol/Diesel", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Leather Seats", "GPS Navigation"]
    },
    "forester": {
        name: "Subaru Forester", category: "Standard Mid-Size SUV", price: "Ksh 8,500", image: "images/forester.jpg",
        description: "Symmetrical All-Wheel-Drive makes this SUV the ultimate choice for both city cruising and rugged adventure travel.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "4WD / AWD", "Cruise Control"]
    },
    "cx8": {
        name: "Mazda CX-8", category: "Premium Mid-Size SUV", price: "Ksh 9,000", image: "images/CX-8.png",
        description: "A spacious 3-row SUV offering premium comfort for larger families or groups without compromising on style or performance.",
        transmission: "Automatic", fuel: "Diesel", seats: "7 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Leather Seats", "GPS Navigation"]
    },
    "harrier": {
        name: "Toyota Harrier", category: "Premium Mid-Size SUV", price: "Ksh 9,500", image: "images/harrier.jpg",
        description: "A luxury crossover SUV that prioritizes premium comfort, a silent cabin, and a highly refined driving experience.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Leather Seats", "Panoramic Roof"]
    },
    "prado": {
        name: "Toyota Prado TX", category: "Premium SUV", price: "Ksh 13,000", image: "images/TX.jpg",
        description: "A powerful, commanding SUV suitable for safaris, VIP transport, and long-distance travel. Built to conquer any terrain.",
        transmission: "Automatic", fuel: "Diesel", seats: "7 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "4WD / AWD", "Leather Seats", "Cruise Control"]
    },

    "v8": {
        name: "Toyota Land Cruiser V8", category: "Luxury SUV", price: "Ksh 28,000", image: "images/v8.jpg",
        description: "The ultimate luxury and performance SUV. Designed for VIP transport, high-end corporate travel, and premium safaris.",
        transmission: "Automatic", fuel: "Diesel", seats: "7 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "4WD / AWD", "Leather Seats", "Cruise Control", "Premium Audio"]
    },
    "c200": {
        name: "Mercedes Benz C200", category: "Premium Medium Car", price: "Ksh 18,000", image: "images/c200.jpg",
        description: "Executive luxury sedan offering unmatched German engineering, premium leather interiors, and a sophisticated ride.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Leather Seats", "Cruise Control", "GPS Navigation"]
    },
    "x5": {
        name: "BMW X5", category: "Luxury SUV", price: "Ksh 48,000", image: "images/x5.jpg",
        description: "The benchmark for luxury performance SUVs. Offers breathtaking speed, cutting-edge technology, and profound comfort.",
        transmission: "Automatic", fuel: "Petrol/Diesel", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Leather Seats", "Panoramic Roof", "Premium Audio", "GPS Navigation"]
    },
    "Gwagon": {
        name: "Mercedes G Wagon", category: "Luxury SUV", price: "Ksh 60,000", image: "images/G-wagon.png",
        description: "An absolute icon of luxury and status. The G-Class blends rugged military-grade capabilities with the finest luxury interiors.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "4WD / AWD", "Leather Seats", "Premium Audio", "GPS Navigation"]
    },
    "S350": {
        name: "Mercedes Benz S350", category: "Luxury Medium Car", price: "Ksh 30,000", image: "images/s350.jpg",
        description: "The pinnacle of executive luxury. Perfect for chauffeur-driven VIPs, offering a whisper-quiet cabin and first-class seating.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Leather Seats", "Panoramic Roof", "Premium Audio", "Cruise Control", "GPS Navigation"]
    },
    "golfR": {
        name: "Volkswagen Golf R", category: "Premium Medium Car", price: "Ksh 18,000", image: "images/golfR.png",
        description: "A high-performance hatchback that delivers thrilling speeds, sharp handling, and premium interior styling.",
        transmission: "Automatic", fuel: "Petrol", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Leather Seats", "Premium Audio", "GPS Navigation"]
    },
    "gle": {
        name: "Mercedes GLE", category: "Luxury SUV", price: "Ksh 48,000", image: "images/gle.avif",
        description: "An incredibly spacious and technologically advanced luxury SUV. Designed for those who demand the absolute best.",
        transmission: "Automatic", fuel: "Petrol/Diesel", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "Reverse Camera", "Leather Seats", "Panoramic Roof", "Premium Audio", "GPS Navigation"]
    },

    "hilux": {
        name: "Toyota Hilux", category: "Pickup Truck", price: "Ksh 14,000", image: "images/double-cabs.jpeg",
        description: "A legendary, rugged double-cab pickup truck built for heavy-duty work, construction sites, and off-road adventures.",
        transmission: "Manual/Auto", fuel: "Diesel", seats: "5 Passengers",
        features: ["Air Conditioning", "Bluetooth", "USB Charging", "Airbags", "ABS Brakes", "4WD / AWD"]
    },
    "caravan": {
        name: "Safari Van", category: "Van", price: "Ksh 22,500", image: "images/caravan.jpg",
        description: "A spacious, custom-built touring van perfect for large groups, family holidays, and professional wildlife safaris.",
        transmission: "Manual", fuel: "Diesel", seats: "8 Passengers",
        features: ["Air Conditioning", "USB Charging", "Airbags", "ABS Brakes", "4WD / AWD", "Panoramic Roof"]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const vehicleTitle = document.getElementById("vehicleTitle");
    if (!vehicleTitle) return;

    const params = new URLSearchParams(window.location.search);
    const carKey = params.get("car");

    if (carKey && vehicleDatabase[carKey]) {
        const car = vehicleDatabase[carKey];

        //Header and main info
        vehicleTitle.textContent = car.name;
        document.getElementById("vehicleImage").src = car.image;
        document.getElementById("vehicleImage").alt = car.name;
        document.getElementById("vehicleCategory").textContent = car.category;
        document.getElementById("vehicleName").textContent = car.name;
        document.getElementById("vehiclePrice").innerHTML = `${car.price}<span class="text-muted fs-6 fw-normal"> / day</span>`;
        document.getElementById("vehicleDescription").textContent = car.description;

        //Specs
        document.getElementById("vehicleTransmission").textContent = car.transmission;
        document.getElementById("vehicleFuel").textContent = car.fuel;
        document.getElementById("vehicleSeats").textContent = car.seats;
        
        document.getElementById("specName").textContent = car.name;
        document.getElementById("specCategory").textContent = car.category;
        document.getElementById("specTransmission").textContent = car.transmission;
        document.getElementById("specFuel").textContent = car.fuel;
        document.getElementById("specSeats").textContent = car.seats;
        document.getElementById("specPrice").textContent = car.price;

        //Book Button
        const bookBtn = document.querySelector('a[href="contact.html"]');
        if(bookBtn) {
            bookBtn.href = `contact.html?car=${carKey}`;
        }

        //feature generation
        const featuresContainer = document.getElementById("vehicleFeaturesList");
        if (featuresContainer && car.features) {
            let featuresHTML = "";
            car.features.forEach(feature => {
                // Look up the icon in our dictionary, default to a checkmark if not found
                const iconClass = featureIcons[feature] || "bi-check-circle-fill";
                featuresHTML += `
                <div class="col-md-3 col-6">
                    <div class="feature-box text-center p-4 h-100">
                        <i class="bi ${iconClass} fs-1 text-warning"></i>
                        <h5 class="mt-3">${feature}</h5>
                    </div>
                </div>`;
            });
            featuresContainer.innerHTML = featuresHTML;
        }

        //"you may also like"
        const relatedContainer = document.getElementById("relatedVehicles");
        if(relatedContainer) {
            let matches = [];
            const currentClass = car.category.split(" ")[0]; 

            //Exact matches
            for (const [key, v] of Object.entries(vehicleDatabase)) {
                if (key !== carKey && v.category === car.category) {
                    matches.push({ key, ...v });
                }
            }

            //Broad matches
            for (const [key, v] of Object.entries(vehicleDatabase)) {
                if (key !== carKey && !matches.find(m => m.key === key) && v.category.includes(currentClass)) {
                    matches.push({ key, ...v });
                }
            }

            matches = matches.slice(0, 3);

            let relatedHTML = "";
            matches.forEach(v => {
                relatedHTML += `
                <div class="col-lg-4 mb-4">
                    <div class="card fleet-card h-100 shadow-sm border-0">
                        <img src="${v.image}" class="card-img-top p-3" style="height:200px; object-fit:contain;" alt="${v.name}">
                        <div class="card-body text-center">
                            <span class="badge bg-light text-dark mb-2">${v.category}</span>
                            <h5 class="fw-bold text-dark">${v.name}</h5>
                            <p class="text-warning fw-bold mb-3">${v.price}/day</p>
                            <a href="vehicle-details.html?car=${v.key}" class="btn btn-outline-dark btn-sm w-100">View Details</a>
                        </div>
                    </div>
                </div>`;
            });
            relatedContainer.innerHTML = relatedHTML;
        }

    } else {
        vehicleTitle.textContent = "Vehicle Not Found";
        document.getElementById("vehicleDescription").textContent = "We couldn't find the details for this vehicle. Please return to the fleet page to select a valid car.";
    }
});


function calculateTotal() {
    const pickupStr = document.getElementById("pickupDate").value;
    const returnStr = document.getElementById("returnDate").value;
    const carKey = document.getElementById("preferredVehicle").value;
    const deliveryFee = parseInt(document.getElementById("deliveryOption").value) || 0;
    const cleaningFee = document.getElementById("unwashedReturn").checked ? 500 : 0;
    const totalDisplay = document.getElementById("totalPrice");

    if (pickupStr && returnStr && carKey) {
        const pickup = new Date(pickupStr);
        const returnDate = new Date(returnStr);
        
        //Calculate days
        const diffTime = returnDate - pickup;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        //Only calculate if dates are valid
        if (diffDays > 0 && vehicleDatabase[carKey]) {
            const dailyRate = parseInt(vehicleDatabase[carKey].price.replace(/[^0-9]/g, ''));
            const total = (dailyRate * diffDays) + deliveryFee + cleaningFee;
            totalDisplay.textContent = total.toLocaleString();
        } else {
            totalDisplay.textContent = "0";
        }
    }
}

["pickupDate", "returnDate", "preferredVehicle", "deliveryOption", "unwashedReturn"].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener("change", calculateTotal);
    }
});

function goBack() {
    window.history.back();
}

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    // Toggle Icon
    if(document.body.classList.contains("dark-mode")){
        themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
    } else {
        themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
    }
});