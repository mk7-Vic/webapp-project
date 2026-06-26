window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 100) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
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
        // 1. Remove active styling from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-outline-dark');
        });

        // 2. Add active styling to clicked button
        button.classList.remove('btn-outline-dark');
        button.classList.add('btn-warning');

        // 3. Filter logic
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
            // Sort by the original data-index
            items.sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));
        } else {
            items.sort((a, b) => {
                const priceA = parseInt(a.querySelector('.vehicle-price').dataset.price);
                const priceB = parseInt(b.querySelector('.vehicle-price').dataset.price);
                return sortValue === 'low-high' ? priceA - priceB : priceB - priceA;
            });
        }

        // Re-attach to the container
        items.forEach(item => vehicleContainer.appendChild(item));
    });
});

const bookingForm = document.getElementById("bookingForm");
if(bookingForm) {
    bookingForm.addEventListener("submit", function(e){
        
        const phone = document.getElementById("phone").value;

        if(phone.length >10){
            e.preventDefault();
            alert("Enter a valid phone number");
        }
    })
}

const form = document.querySelector("form");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();
        alert("Booking submitted successfully!");
    });
}

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");

    if(service){

        const serviceSelect =
            document.getElementById("serviceSelect");

        if(serviceSelect){
            serviceSelect.value = service;
        }
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