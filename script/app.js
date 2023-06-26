// base obj

const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: './img/products/burger-1.png',
        amount: 0,
        get totalsumm() {
            return this.amount * this.price
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: './img/products/burger-2.png',
        amount: 0,
        get totalsumm() {
            return this.amount * this.price
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: './img/products/burger-3.png',
        amount: 0,
        get totalsumm() {
            return this.amount * this.price
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: './img/products/burger-4.png',
        amount: 0,
        get totalsumm() {
            return this.amount * this.price
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
const basketbtn = document.querySelector('.wrapper__navbar-btn'),
    closeBasketBtn = document.querySelector('.wrapper__navbar-close'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    productbtns = document.querySelectorAll('.wrapper__list-btn'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totleprice = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.wrapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom')

basketbtn.addEventListener('click', function () {
    basketModal.classList.toggle('active')
})

closeBasketBtn.addEventListener('click', function () {
    basketModal.classList.remove('active')
})
productbtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrminus(this)
    })
})

function plusOrminus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')

    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIdicator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            parentIdicator.classList.add('active')
            parentIdicator.innerHTML = po.amount
        } else {
            parentIdicator.classList.remove('active')
            parentIdicator.innerHTML = 0
        }

    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allcount = totalcountproduct()
    allcount ? basketBtnCount.classList.add('active') : basketBtnCount.classList.remove('active')
    basketBtnCount.innerHTML = allcount
    totleprice.innerHTML = totlepriceProduct()


}

function totalcountproduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total

}

function totlepriceProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalsumm
    }
    return total.toLocaleString()

}

function cardItemBurger(productData) {
    const {
        name,
        totalSumm: price,
        amount,
        img
    } = productData
    return `
        <div class="wrapper__navbar-product">
            <div class="wrapper__navbar-info">
                <img src="${img}" class="wrapper__navbar-productImage" alt="">
                <div class="wrapper__navbar-infoSub">
                    <p class="wrapper__navbar-infoName">${name}</p>
                    <p class="wrapper__navbar-infoPrice">
                        <span>${price}</span> сум
                    </p>
                </div>
            </div>
            <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
                <button class="wrapper__navbar-symbol minus" data-symbol="-">-</button>
                <output class="wrapper__navbar-counter">${amount}</output>
                <button class="wrapper__navbar-symbol plus" data-symbol="+">+</button>
             </div>
        </div>
    `
}

window.addEventListener('click', (e) => {
    const btn = e.target
    console.log(btn);
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idParent = parent.getAttribute('id').split('_')[0]
            
            if (attr == '-') {
            product[idParent].amount--    
            }else if (attr == '+') {
                product[idParent].amount++
            }
            basket()
        }
    }
})