/**
 * Define Global Variables
 * 
*/
const navBarMenu = document.querySelector(".navbar__menu")
const navBarList = document.querySelector("#navbar__list");
let allSections = document.getElementsByTagName("section");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/*Inserting list items with links*/
function addNewLink(linkName, linkDest) {
  const menuItem = document.createElement("li");
  const newLink = document.createElement("a");
  menuItem.appendChild(newLink);
  newLink.className = "menu__link";
  newLink.innerText = linkName;
  newLink.setAttribute("data-target", linkDest);
  navBarList.appendChild(menuItem);
}
/*Adding active class*/
function activate(entries, observer) {
  console.log(entries);
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  else{
    console.log("section intersecting");
    const actLink = entry.target.getAttribute("id");
    Array.from(allSections).forEach(sec => sec.classList.remove("activated"));
    navBarList.querySelectorAll(".menu__link").forEach(link => link.classList.remove("highlight"));
    entry.target.classList.add("activated");
    document.querySelector(`a[data-target=${actLink}]`).classList.add("highlight");
  }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
function creatingNavLinks() {
  Array.from(allSections)
  .forEach(sec => {
    addNewLink(sec.dataset.nav, sec.getAttribute("id"));
  });
}

// Add class 'active' to section when near top of viewport
function observing() {
  const sectionsObserver = new IntersectionObserver(activate, {
    root: null,
    threshold: .3
  });
  Array.from(allSections)
    .forEach(sec => {
      sectionsObserver.observe(sec);
    });
}

// Scroll to anchor ID using scrollTO event
function scrolling(e) {
  const targetSec = document.querySelector("#" + e.target.dataset.target);
  targetSec.scrollIntoView({behavior: "smooth"});
}
/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu 
document.addEventListener('DOMContentLoaded', creatingNavLinks); 
// Scroll to section on link click
navBarList.addEventListener("click", function(e) {
  if(!e.target.classList.contains("menu__link")) return;
  scrolling(e);
});
// Set sections as active
document.addEventListener('DOMContentLoaded', observing);