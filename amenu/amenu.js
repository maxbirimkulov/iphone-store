(() => {
    let lastWidthItems = 0;
    let burgerSize = 0;

    const init = (menu, menuList, itemsMenu, burgerMenu) => {
        itemsMenu.forEach(elem => {
            elem.classList.add('amenu__item');
        });

        burgerMenu.classList.add('amenu__burger');

        const [burgerBtn, burgerList] = createBurgerBlock(burgerMenu);

        updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList);

        window.addEventListener('resize', () => {
            updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList);
        });
    };


    const createBurgerBlock = (burgerMenu) => {
        const burgerBtn = document.createElement('button');
        burgerMenu.append(burgerBtn);
        burgerBtn.classList.add('amenu__burger-btn');

        burgerBtn.addEventListener('click', () => {
            burgerMenu.classList.toggle('amenu__burger-open');
        })

        const burgerList = document.createElement('ul');
        burgerMenu.append(burgerList);
        burgerList.classList.add('amenu__burger-list');

        return [burgerBtn, burgerList];
    };

    const updateMenu = (menu, menuList, burgerMenu, burgerBtn, burgerList) => {
        const menuItems = menuList.querySelectorAll('.amenu__item');
        const burgerItems = burgerList.querySelectorAll('.amenu__item');
        const widthMenu = menu.offsetWidth;

        burgerSize = burgerMenu.offsetWidth || burgerSize
        const widthAllItems = [...menuItems].reduce((width, elem) => {
            return elem.offsetWidth + width + parseFloat(getComputedStyle(elem).marginRight)
        }, 0) + burgerSize;


        if (widthMenu < widthAllItems) {
            const lastItems = menuItems[menuItems.length - 1];
            if (lastItems) {
                lastWidthItems = lastItems.offsetWidth;

                burgerList.prepend(lastItems)
                return updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList)
            }


        }

        if (widthMenu > widthAllItems + lastWidthItems * 2 && burgerItems.length) {
            const firstElem = burgerItems[0];
            menuList.append(firstElem);
            return updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList)
        }

        //add
        if (burgerItems.length) {
            burgerMenu.style.display = '';
        } else {
            burgerMenu.style.display = 'none';
        }
        // end add

        checkBurgerItems(burgerItems, burgerBtn);


    };

    const checkBurgerItems = (burgerItems, burgerBtn) => {
        if (burgerItems.length) {
            burgerBtn.classList.add('amenu__burger-btn_active')
        } else {
            burgerBtn.classList.remove('amenu__burger-btn_active')
        }
    }

    window.amenu = (selectorMenu, selectorMenuList, selectorItemsMenu, selectorBurgerMenu) => {

        const menu = document.querySelector(selectorMenu),
            menuList = document.querySelector(selectorMenuList),
            itemsMenu = document.querySelectorAll(selectorItemsMenu),
            burgerMenu = document.querySelector(selectorBurgerMenu);


        init(menu, menuList, itemsMenu, burgerMenu)

    };

})()