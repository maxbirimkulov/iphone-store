document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.response);
                callback(response)
            } else {
                console.error(new Error('Ошибка:' + request.status))
            }
        });
    };
    // getData('./cross-sell-dbase/dbase.json', (data) =>{
    //     console.log(data)
    // });


    const tabs = () => {
        const cardDetailChangeElem = document.querySelectorAll('.card-detail__change');
        const cardDetailsTitleElem = document.querySelector('.card-details__title');
        const cardImageItemElem = document.querySelector('.card__image_item');
        const cardDetailsPriceElem = document.querySelector('.card-details__price');
        const descriptionMemory = document.querySelector('.description__memory')

        const data = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 95990,
                memoryROM: 128,

            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
                img: 'img/iPhone-silver.png',
                price: 120130,
                memoryROM: 256,
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 102340,
                memoryROM: 128,
            }
        ];

        const deactive = () => {
            cardDetailChangeElem.forEach((btn) => btn.classList.remove('active'))
        };

        cardDetailChangeElem.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                deactive();
                if (!btn.classList.contains('active')) {
                    btn.classList.add('active');
                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageItemElem.src = data[i].img;
                    cardImageItemElem.alt = data[i].name;
                    cardDetailsPriceElem.textContent = data[i].price + '₽';
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
                }
            })
        })

    };
    const accordion = () => {
        const characteristicsListElem = document.querySelector('.characteristics__list');
        const characteristicsItemElems = document.querySelectorAll('.characteristics__item');
        characteristicsItemElems.forEach(elem => {
            if (elem.children[1].classList.contains('active')) {
                elem.children[1].style.height = elem.children[1].scrollHeight + 'px';
            }
        });


        const close = (button, dropDown) => {
            button.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        };

        const closeAllDrops = (button, dropDown) => {
            characteristicsItemElems.forEach((elem) => {
                if (elem.children[0] !== button && elem.children[1] !== dropDown) {
                    close(elem.children[0], elem.children[1]);
                }
            })
        };
        const open = (button, dropDown) => {
            closeAllDrops(button, dropDown);
            dropDown.style.height = dropDown.scrollHeight + 'px';
            button.classList.add('active');
            dropDown.classList.add('active');
        };
        characteristicsListElem.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item');
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ? close(target, description) : open(target, description);
            }
        });
        document.body.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.closest('.characteristics__title')) {
                closeAllDrops()
            }
        })

    };
    const modal = () => {
        const cardDetailButtonBuy = document.querySelector('.card-details__button_buy');
        const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
        // const crossSellButton = document.querySelector('.cross-sell__button');
        const modal = document.querySelector('.modal');
        const cardDetailsTitle = document.querySelector('.card-details__title');
        const modalTitle = modal.querySelector('.modal__title');
        const modalSubtitle = document.querySelector('.modal__subtitle');
        const modalTitleSubmit = modal.querySelector('.modal__title-submit');


        const openModal = (event) => {
            const target = event.target;
            modal.classList.add('open');
            document.addEventListener('keydown', escapeHandler);
            modalTitle.textContent = cardDetailsTitle.textContent;
            modalSubtitle.textContent = target.dataset.buttonBuy;
            modalTitleSubmit.value = cardDetailsTitle.textContent;

        };
        const closeModal = () => {
            modal.classList.remove('open');
            document.removeEventListener('keydown', escapeHandler)
        };

        const escapeHandler = event => {
            if (event.code === 'Escape') {
                closeModal()
            }
        };
        modal.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('modal__close') || target === modal) {
                closeModal()
            }
        });
        cardDetailButtonBuy.addEventListener('click', openModal);
        cardDetailsButtonDelivery.addEventListener('click', openModal);
        // crossSellButton.addEventListener('click', openModal);
    };
    const renderCrossSell = () => {
        const crossSellList = document.querySelector('.cross-sell__list');
        const crossSellAdd = document.querySelector('.cross-sell__add');
        const allGoods = [];
        const shuffle = arr => arr.sort(() => Math.random() - 0.5);

        const createCrossSellItem = ({photo, name ,price }) => {
            const liItem = document.createElement('li');
            liItem.innerHTML = `
            <article class="cross-sell__item">
                        <img class="cross-sell__image" src="${photo}" alt="${name}">
                        <h3 class="cross-sell__title">${name}</h3>
                        <p class="cross-sell__price">${price}</p>
                        <button type="button" class="button button_buy cross-sell__button">Купить</button>
                    </article>
            `;
            return liItem;
        };

        const render = arr => {
            arr.forEach((item) => {
                crossSellList.append(createCrossSellItem(item));
            });
        };

        // const wrapper = (fn, count) => {
        //     let counter = 0;
        //     return (...args) => {
        //         if (counter === count)return;
        //         counter++;
        //         return fn(...args)
        //     }
        // };
        // const wrapRender = wrapper(render, 2)

        const createCrossSellList = (goods = []) => {
            allGoods.push(...shuffle(goods));
            const fourItems = allGoods.splice(0, 4);
            render(fourItems);
        };
        crossSellAdd.addEventListener('click', ()=> {
            render(allGoods);
            crossSellAdd.remove()
        });

        getData('cross-sell-dbase/dbase.json', createCrossSellList);
    };

    tabs();
    accordion();
    modal();
    renderCrossSell();
    amenu('.header__menu', '.header-menu__list', '.header-menu__item','.header-menu__burger')
});


//const cardImageElem = document.querySelectorAll('.card__image');
//
//     const hideAll = () => {
//         for (let i = 0; i <cardDetailChangeElem.length; i++){
//             cardDetailChangeElem[i].classList.remove('active');
//             cardDetailsTitleElem[i].classList.remove('active');
//             cardImageElem[i].classList.remove('active');
//         }
//     };
//
//
//     for (let i = 0 ; i < cardDetailChangeElem.length; i++){
//         cardDetailChangeElem[i].addEventListener('click', ()=>{
//             hideAll();
//             cardDetailChangeElem[i].classList.add('active');
//             cardDetailsTitleElem[i].classList.add('active');
//             cardImageElem[i].classList.add('active');
//         })
//     }
// };
// const accordion = () =>{
//     const characteristicsTitle = document.querySelectorAll('.characteristics__title');
//     const characteristicsDescription = document.querySelectorAll('characteristics__description');
//
//     characteristicsTitle.forEach((elem, i) =>{
//         elem.addEventListener('click', ()=>{
//             elem.classList.toggle('active');
//             characteristicsDescription[i].classList.toggle('active')
//         })
//     })