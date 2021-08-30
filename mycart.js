'use strict';

let myCartTable = document.querySelector('#my-cart-table');
let cart = document.querySelectorAll('.cart');
let productTotal = document.getElementsByClassName('my-product-total');
let quantityProduct = document.getElementsByClassName('my-product-quantity');
let removeButtons = document.getElementsByClassName('my-product-remove');
let myCartGrand = document.getElementById('my-cart-grand-total');
let empty = document.querySelector('.empty');
let myCartBadge = document.querySelector('.my-cart-badge');
let title = document.getElementById('title');

// Go to cartIcon
const badge = function () {
  myCartBadge.textContent = productTotal.length;
};

// addtoCart animation
const animation = function (event) {
  const img = event.target.nextElementSibling.nextElementSibling;
  img.style.opacity = 100;

  // add to cart interval
  let start = Date.now();
  let divide = 1.5;
  let timer = setInterval(function () {
    let timePassed = Date.now() - start;
    if (screen.width <= 600) divide = 10;
    if (
      timePassed >= 1000 ||
      (img.getBoundingClientRect().x + 200 >= screen.width &&
        screen.width >= 600)
    ) {
      clearInterval(timer);
      img.style.opacity = 0;
      img.style.transform = `translateX(-100px)`;
      return;
    }
    draw(timePassed, img, divide);
  }, 10);
};
// img move
const draw = function (timePassed, target, divide) {
  target.style.transform = `translate(${timePassed / divide}px,-${
    timePassed / 2
  }px)`;
};

// Nav sticky
const nav = document.querySelector('.navbar');
const section = document.getElementById('section1');

const call = function (entris) {
  const [entry] = entris;
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};
const observeSec = new IntersectionObserver(call, {
  root: null,
  threshold: 0,
  rootMargin: '-150px',
});
observeSec.observe(section);

// Add to cart
const addToCart = [...cart].forEach((car, i, arr) => {
  car.addEventListener('click', function (e) {
    if (currentCart.summary.includes(cartAll.cartId(i))) {
      alert('已加入購物車！');
    } else {
      currentCart.summary.push(cartAll.cartId(i));
      const html = `<tr title="${cartAll.cartId(i)}">
                                    <td class="text-center" style="width: 40px;"><img width="40px" height="40px"
                                            src="${cartAll.cartImage(i)}"></td>
                                    <td>${cartAll.cartName(i)}</td>
                                    <td title="Unit Price">$ ${cartAll.cartPrice(
                                      i
                                    )}</td>
                                    <td title="Quantity"><input type="number" min="1" style="width: 50px;"
                                            class="my-product-quantity" value="1" data-id="${cartAll.cartId(
                                              i
                                            )}" data-price="${cartAll.cartPrice(
        i
      )}"></td>
                                    <td title="Total" class="text-right my-product-total" data-id="${cartAll.cartId(
                                      i
                                    )}">$ ${cartAll.cartPrice(i)}
                                        </td>
                                    <td title="Remove from Cart" class="text-center" style="width: 30px;">
                                        <a href="javascript:void(0);" style="color: black; text-decoration:none;"
                                            class="fas fa-times my-product-remove"></a>
                                    </td>
                                </tr>`;
      myCartTable.insertAdjacentHTML('afterbegin', html);
      removeProduct();
      calcTotalPrice();
      badge();
      animation(e);
    }
  });
});
// Product information
const cartAll = {
  cartId: function (index) {
    return cart[index].dataset.id;
  },
  cartName: function (index) {
    return cart[index].dataset.name;
  },
  cartPrice: function (index) {
    return cart[index].dataset.price;
  },
  cartQuantity: function (index) {
    return cart[index].dataset.quantity;
  },
  cartImage: function (index) {
    return cart[index].dataset.image;
  },
  cartSummary: function (index) {
    return cart[index].dataset.summary;
  },
};
// Cart information
const currentCart = {
  summary: ['2', '3'],
};

// Remove Product
let removeProduct = function () {
  [...removeButtons].forEach((btn, i) => {
    btn.addEventListener('click', function () {
      let parent = this.parentElement.parentElement;
      let summary = parent.title.replace('summary ', '');
      //refresh summary array
      if (currentCart.summary.includes(summary)) {
        let index = currentCart.summary.indexOf(summary);
        currentCart.summary.splice(index, 1);
      }
      parent.remove();
      calcTotalPrice();
      badge();
    });
  });
};
removeProduct();

// Calc item price
let quantityChange = myCartTable.addEventListener('change', function (e) {
  let quantityChange = e.target.value;
  let targetId = e.target;
  const calcItemPrice = [...productTotal].forEach((total, i) => {
    if (targetId.dataset.id === total.dataset.id) {
      let itemPrice = targetId.dataset.price;
      let calc = itemPrice * quantityChange;
      productTotal[i].textContent = `$${calc}`;
    }
  });
  calcTotalPrice();
});

// Calc total price
const calcTotalPrice = function () {
  const itemTotal = Array.from(productTotal, pro =>
    Number(pro.textContent.replace('$', ''))
  ).reduce((acu, cur) => {
    return acu + cur;
  }, 0);

  if (itemTotal === 0) {
    console.log(myCartGrand.closest('tr'));
    myCartGrand.closest('tr').classList.add('hidden');
    title.classList.add('hidden');
    empty.classList.remove('hidden');
  } else {
    myCartGrand.closest('tr').classList.remove('hidden');
    myCartGrand.textContent = `$${itemTotal}`;
    title.classList.remove('hidden');
    empty.classList.add('hidden');
  }
};
calcTotalPrice();
