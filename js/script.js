window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 100) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
});

const today = new Date().toISOString().split("T")[0];

document.getElementById("pickupDate").min = today;
document.getElementById("returnDate").min = today;

const pickup = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");

pickup.addEventListener("change", function () {
    returnDate.min = pickup.value;
});

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
