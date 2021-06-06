import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';

// Drawer navigation bar

const menu = document.querySelector('#menu');
const hero = document.querySelector('.hero');
const main = document.querySelector('main');
const drawer = document.querySelector('#drawer');


menu.addEventListener('click', function (event) {
    drawer.classList.toggle('open');
    event.stopPropagation();
});

hero.addEventListener('click', function () {
    drawer.classList.remove('open');
});

main.addEventListener('click', function () {
    drawer.classList.remove('open');
});

// read JSON file
fetch("../DATA.json")
    .then((Response) => Response.json())
    .then((data) => {
        getRestaurants(data);
    });

    function getRestaurants(data){
        var restauranHTML = "";
        data.restaurants.forEach(function (restaurant, index) {
            restauranHTML += `
            <article class="post-item">
                <img class="post-item__thumbnail"
                    src="${
                        restaurant.pictureId
                      }"
                    alt="${restaurant.name}">
                <div class="post-item__content">
                    <div class="post-item__prop">
                        <div class="stars">
                            <div class="stars-outer">
                                <div class="stars-inner" id="post_${index}"></div>
                            </div>
                            <span>${restaurant.rating}</span>
                        </div>
                        <p class="post-item__city">Kota ${restaurant.city}
                        </p>
                    </div>
                    <h1 class="post-item__title"><a href="#">${restaurant.name}</a></h1>
                    <p class="post-item__description">${restaurant.description}</p>
                </div>
            </article>
            `;

        });

        document.getElementById("posts").innerHTML = restauranHTML;

        data.restaurants.forEach(function (restaurant, index) {
            const starTotal = 5;
            const starPercentage = restaurant.rating / starTotal * 100;
            const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
            document.getElementById(`post_${index}`).style.width = starPercentageRounded; 
        });
    }


