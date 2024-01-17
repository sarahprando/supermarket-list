function initMenu() {
    const buttonMenu = document.querySelectorAll('.btn-menu img');
    const activeClass = 'ativo'
    
    if(buttonMenu.length){
    buttonMenu[0].nextElementSibling.classList.add(activeClass);
    
    function activeAccordion(event) {
        this.classList.toggle(activeClass);
        this.nextElementSibling.classList.toggle(activeClass);
    }
    
    buttonMenu.forEach((item) => {
        item.addEventListener('mouseover', activeAccordion);
    });
    }
    }
    

    initMenu();