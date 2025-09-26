window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const shadow = this.shadowRoot;

    const product = document.createElement('div');
    product.setAttribute('class', 'product-card');

    const name = this.getAttribute('name');
    const price = this.getAttribute('price');
    const colors = JSON.parse(this.getAttribute('colors'));

    let currentImage = colors[0].image;

    product.innerHTML = `
        <img src="${currentImage}" alt="${name}">
        <h3>${name}</h3>
        <p>${price}</p>
        <div class="color-swatches"></div>
        <button>Contact us</button>
    `;

    const colorSwatches = product.querySelector('.color-swatches');
    colors.forEach(color => {
        const swatch = document.createElement('span');
        swatch.classList.add('color-swatch');
        swatch.style.backgroundColor = color.color;
        swatch.addEventListener('click', () => {
            product.querySelector('img').src = color.image;
        });
        colorSwatches.appendChild(swatch);
    });


    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lato:wght@400;700&display=swap');

      :host {
        --accent-color: #ff0000;
      }

      .product-card {
        background-color: #2a2a2a;
        border-radius: 15px;
        padding: 25px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        transition: transform 0.3s, box-shadow 0.3s;
      }
      .product-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
      }
      .product-card img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
      }
      .product-card h3 {
        font-family: 'Bebas Neue', cursive;
        font-size: 2.2em;
        margin: 15px 0 10px;
        color: #fff;
      }
      .product-card p {
        font-family: 'Lato', sans-serif;
        font-size: 1.2em;
        color: var(--accent-color);
        margin: 0 0 20px;
      }
      .product-card button {
        background-color: var(--accent-color);
        color: white;
        border: none;
        padding: 12px 25px;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 1em;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s, box-shadow 0.3s;
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.4);

      }
      .product-card button:hover {
        background-color: #cc0000;
        box-shadow: 0 0 25px rgba(255, 0, 0, 0.7);

      }
      .color-swatches {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
      }

      .color-swatch {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin: 0 5px;
          cursor: pointer;
          border: 2px solid #fff;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(product);
  }
}

customElements.define('product-card', ProductCard);

const products = [
    {
        name: 'Lotus Hoodie',
        price: 'R599,00',
        colors: [
            { color: '#0000FF', image: 'hoodie1.png' },
            { color: '#FF0000', image: 'hoodie2.png' },
            { color: '#FFFF00', image: 'hoodie3.png' },
        ]
    },
    {
        name: 'Lotus T-Shirt',
        price: 'R329,00',
        colors: [
            { color: '#FFFFFF', image: 'shirt1.png' },
            { color: '#000000', image: 'shirt2.png' },
            { color: '#0000FF', image: 'shirt3.png' },
        ]
    },
];

const productGrid = document.querySelector('.product-grid');

products.forEach(product => {
    const productCard = document.createElement('product-card');
    productCard.setAttribute('name', product.name);
    productCard.setAttribute('price', product.price);
    productCard.setAttribute('colors', JSON.stringify(product.colors));
    productGrid.appendChild(productCard);
});
