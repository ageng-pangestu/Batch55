let isOpen = false;

function openHamburger(){
    // alert("kepencet");
    let hamburgerElement = document.getElementById("hamburger-nav-container");
    if (isOpen==false) {
        hamburgerElement.style.display="flex";
        isOpen = true
    } else {
        hamburgerElement.style.display="none";
        isOpen=false;
    }
}