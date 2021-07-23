import CONFIG from '../../globals/config';

const createRestauransTemplate = (restaurant, index, description) => `
    <article class="post-item">
    <img class="post-item__thumbnail lazyload"
        data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
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
        <h1 class="post-item__title"><a class="post-item__link" href="#/detail/${restaurant.id}">${restaurant.name}</a></h1>
        <p class="post-item__description">${description}</p>
    </div>
    </article>
`;

const restaurantDetailTemplate = (detail) => `
<div class="detail-container">
  
  <div class="card-detail detail-container__info">
    <div class="detil-info">
    <img class="detail-img-mobile lazyload" style="width:100%; border-radius:20px; margin-bottom:20px" alt="${detail.name}" data-src="${
  CONFIG.BASE_IMAGE_URL + detail.pictureId
}" crossorigin="anonymous"/>
      <div class="detail-info__title">
        <h3>${detail.name}</h3>
      </div>
      <div class="detail-info__address fa fa-map-marker">
        ${detail.address}, ${detail.city}
      </div>
      <div class="detail-info__desc">
        ${detail.description}
      </div>
      <div class="stars">
          <div class="stars-outer">
              <div class="stars-inner" id="post_detail"></div>
          </div>
          <span>${detail.rating}</span>
      </div>
      <div class="menu-title">
        <h4>Our Menu</h4>
      </div>
      <div class="menu-type">
        <div class="menu-foods">
          <p>Foods Menu :</p>
          <ul class="food-list">
            ${detail.menus.foods.map((food) => `
            <li>${food.name}</li>
            `)}
          </ul>
        </div>
        <div class="menu-drinks">
          <p>Drinks Menu :</p>
          <ul class="drink-list">
            ${detail.menus.drinks.map((drink) => `
            <li>${drink.name}</li>
            `)}
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="detail-container__image">
    <img class="lazyload" alt="${detail.name}" data-src="${
  CONFIG.BASE_IMAGE_URL + detail.pictureId
}" crossorigin="anonymous"/>
    <div class="card-detail card-review" style="padding-top:10px">
        <div id="alert-review-container">
          
        </div>
        <div class="card-review__title">
          <h4>Post Review</h4>
        </div>
        <form>
          <div class="form-group">
            <label>Nama</label>
          <input id="input-name" type="text" class="review-input" name="inputName">
          </div>
          <div class="form-group">
            <label>Review</label>
            <textarea name="inputReview" id="input-review">
            </textarea>
          </div>
          <div class="form-group">
            <input id="submit-review" type="submit" class="review-submit" value="POST">
          </div>
        </form>
    </div>
  </div>
</div>

<div class="card-review__title">
    <h4>Reviews</h4>
  </div>
  <div class="review-container mb-30">
  ${detail.customerReviews.map((review) => `
    <div class="card-detail card-review card-review-list" >
      <div class="form-group review-list_head">
          <label><i class="fa fa-user mr-10" aria-hidden="true"></i>
          ${review.name}</label>
          <label class="review-date">
          ${review.date}<i class="fa fa-calendar ml-10" aria-hidden="true"></i></label>
      </div>
      <div class="form-group">
          <label class="review-text">${review.review}</label>
      </div>
  </div>
  `)}
</div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestauransTemplate,
  restaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
