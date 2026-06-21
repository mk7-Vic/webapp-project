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