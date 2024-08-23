// navbar
const navEl = document.querySelector(".nav");
const hamburgerEl = document.querySelector(".hamburger");
hamburgerEl.addEventListener("click", ()=>{
    navEl.classList.toggle("nav--open");
    hamburgerEl.classList.toggle("hamburger--open");
})

navEl.addEventListener("click", ()=>{
    navEl.classList.remove("nav--open");
    hamburgerEl.classList.remove("hamburger--open");
})



// faq
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq)=>{
    faq.addEventListener("click",() =>{
        faq.classList.toggle("active");
    });
});




// search bar
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const faqList = document.getElementById('faqList');
    const faqItems = faqList.getElementsByClassName('faq');

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        
        for (const item of faqItems) {
            const title = item.getElementsByTagName('h3')[0].textContent.toLowerCase();
            const content = item.getElementsByTagName('p')[0].textContent.toLowerCase();

            if (title.includes(query) || content.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        }
    });
});
