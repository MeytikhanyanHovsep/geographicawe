import './style.css'
import Alpine from 'alpinejs'

window.Alpine = Alpine

document.addEventListener('alpine:init', () => {
  document.body.innerHTML += `<div x-data="{ 
    showButton: false, 
    lastScrollY: 0,
    init() {
        this.lastScrollY = window.pageYOffset;
    },
    handleScroll() {
        const currentScrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const distanceToBottom = docHeight - windowHeight - currentScrollY;

        if (distanceToBottom < 100) {
            this.showButton = true;
        } 
        else if (currentScrollY < 10) {
            this.showButton = false;
        } 
        else if (currentScrollY > this.lastScrollY) {
            this.showButton = true;
        } 
        else if (currentScrollY < this.lastScrollY) {
            this.showButton = false;
        }

        this.lastScrollY = currentScrollY;
    }
}" 
@scroll.window.throttle.20ms="handleScroll()">

    <img src="/images/icons/arrow-top.svg" 
        x-show="showButton" 
        x-cloak
        x-transition:enter="transition ease-out duration-300" 
        x-transition:enter-start="opacity-0 translate-y-10"
        x-transition:enter-end="opacity-100 translate-y-0" 
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-end="opacity-0" 
        @click="window.scrollTo({ top: 0, behavior: 'smooth' }); showButton = false"
        class="cursor-pointer z-50 bottom-40 max-lg:bottom-[130px] max-md:right-5 max-[1520px]:right-20  right-[calc((100%-1420px)/4)] shadow-sm rounded-full fixed w-[60px] object-contain"
        alt="Top" />

</div>
    
  `
});

Alpine.start()


function sortTags() {
  return {
    open: null,
    selected: {},

    tags: [
      {
        key: 'discount',
        name: 'Скидка',
        options: [
          { label: 'По возрастанию', value: 'asc' },
          { label: 'По убыванию', value: 'desc' },
        ],
      },
      {
        key: 'price',
        name: 'Цена',
        options: [
          { label: 'Сначала дешёвые', value: 'low' },
          { label: 'Сначала дорогие', value: 'high' },
        ],
      },
      {
        key: 'delivery',
        name: 'Доставка',
        options: [
          { label: 'Бесплатная', value: 'free' },
          { label: 'Платная', value: 'paid' },
        ],
      },
    ],

    toggle(key) {
      this.open = this.open === key ? null : key;
    },

    select(tagKey, value) {
      this.selected[tagKey] = value;
      this.open = null;

      // тут вызываешь сортировку
      console.log('sort:', tagKey, value);
    },
  }
}



class ProductCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || 'Без названия';
    const img = this.getAttribute('img') || '';

    this.innerHTML = `
        <div class="group relative flex flex-col overflow-hidden transition-all duration-500 gap-2">
          <div class="overflow-hidden">
            <img src="${img}" alt="${name}"
                class="stone-image w-full max-sm:h-[162px] h-[188px] object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110">
          </div>
          <ul class="w-full mt-[10px] grid grid-cols-3 gap-[18px]">
            <li class="h-[28px] text-[14px] grid place-items-center border border-primary/50 text-center">гранит</li>
            <li class="h-[28px] text-[14px] grid place-items-center border border-primary/50 text-center">песчаник</li>
            <li class="h-[28px] text-[14px] grid place-items-center border border-primary/50 text-center">камень</li>
          </ul>
          <h3 class="text-[14px] font-bold text-dark tracking-wide">${name}</h3>
          <p class="text-dark leading-[130%] max-sm:tracking-[0.3px] max-w-[353px] text-[14px] mb-[7px]">
            Благодаря превосходным качествам, изделия из гранита находят широкое применение во всех сферах жизнедеятельности человека
          </p>
          <div class="flex mb-[10px] gap-[17px] justify-center items-center text-[14px] text-dark">
            <span class="text-dark font-bold whitespace-nowrap">от 7 950 руб. / м²</span>
            <p class="bg-dark/4 w-full h-[28px] flex justify-center gap-[11px] items-center">
              <span class="w-[9px] animate-pulse aspect-square rounded-full bg-primary"></span> хорошая цена
            </p>
          </div>
          <button class="h-[55px] bg-transparent text-dark cursor-pointer font-bold text-[14px] border-2 border-primary hover:bg-primary transition-all">
            Заказать
          </button>
        </div>
    `;

    this.initParallax();
  }

  initParallax() {
    const img = this.querySelector('.stone-image');

    const handleParallax = () => {
      if (window.innerWidth >= 768) {
        if (img.style.transform !== '') img.style.transform = '';
        return;
      }

      const rect = this.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollFraction = (windowHeight - rect.top) / (windowHeight + rect.height);
        const scale = 1 + (Math.max(0, Math.min(scrollFraction, 1)) * 0.25);

        img.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(handleParallax);
    }, { passive: true });

    // Также вызываем при ресайзе, чтобы сразу включить/выключить эффект
    window.addEventListener('resize', handleParallax);
  }
}

customElements.define('product-card', ProductCard);