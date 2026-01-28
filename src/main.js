import './style.css'
import Alpine from 'alpinejs'

window.Alpine = Alpine

document.addEventListener('alpine:init', () => {
  let isLight = document.querySelector(".light-header")

  document.querySelector("header").innerHTML = `
    
    <div class="container gap-[14px]  relative h-full flex items-center justify-between">

      <a href="/" class="z-50 shrink-0">
        <h1 class="uppercase font-forum leading-[100%] text-[28.5px] max-sm:text-[16.5px]  ${isLight ? "text-dark" : "text-white"}">Географика</h1>
      </a>

      <div class="flex-1 flex justify-end items-center h-full relative ">

        <div x-show="searchOpen" @click.outside="searchOpen = false; openedIndex = null" x-cloak
            x-transition:enter="transition all duration-500 ease-out" x-transition:enter-start="opacity-0 scale-95"
            x-transition:enter-end="opacity-100 scale-100" x-transition:leave="transition all duration-300 ease-in"
            x-transition:leave-end="opacity-0 scale-95"
            class="absolute max-sm:hidden! inset-0 flex items-center justify-center z-40">
          <div class="max-w-[861px] w-full will-change-transform bg-white h-[50px] flex items-center px-4 shadow-2xl">
            <input type="text" placeholder="Поиск" @click.stop
                class="w-full will-change-transform bg-transparent border-none outline-none ${isLight ? "text-dark" : "text-white"} placeholder:text-gray-400">
            <div class="bg-[#1a1a1a] will-change-transform w-5 h-5 opacity-60 cursor-pointer"
                style="mask: url('/images/icons/search.svg') no-repeat center; -webkit-mask: url('/images/icons/search.svg') no-repeat center; mask-size: contain;">
            </div>
          </div>
        </div>

        <nav class="max-sm:hidden max-w-full flex justify-center transition-all duration-500"
            :class="searchOpen ? 'opacity-0 pointer-events-none translate-y-2' : 'opacity-100 translate-y-0'">
          <ul
              class="flex max-xl:hidden max-w-max justify-end antialiased tracking-[0.5px] gap-[25px] items-center">

            <template x-for="(item, index) in menuItems" :key="index">
              <li class="relative">
                <template x-if="item.sub">
                  <button type="button" @click.outside="openedIndex=null"
                      @click.stop="openedIndex = (openedIndex === index ? null : index)"
                      class="${isLight ? "text-dark  " : "text-white font-bold"} max-xl:text-[14px] group hover:text-primary flex items-center whitespace-nowrap transition-all duration-300 gap-[10px] cursor-pointer outline-none">
                    <span x-text="item.name"></span>
                    <span class="w-[10px] h-[6px] transition-all duration-300"
                        :class="openedIndex === index ? 'bg-primary rotate-180' : '${isLight ? "bg-dark  " : "bg-white"} group-hover:bg-primary'"
                        style="mask: url('/images/icons/arrow-down.svg') no-repeat center; -webkit-mask: url('/images/icons/arrow-down.svg') no-repeat center; mask-size: contain;">
                    </span>
                  </button>
                </template>
                <template x-if="!item.sub">
                  <a :href="item.link"
                      class="${isLight ? "text-dark" : "text-white font-bold"} whitespace-nowrap max-xl:text-[14px] hover:text-primary transition-all leading-none"
                      x-text="item.name"></a>
                </template>

                <template x-if="item.sub">
                  <ul x-show="openedIndex === index" x-transition
                      class="absolute flex flex-col gap-[4px] left-1/2 -translate-x-1/2 top-full mt-4 p-[10px] w-[230px] bg-white shadow-xl z-50">
                    <template x-for="subItem in item.sub">
                      <li><a :href="item.link"
                            class="text-dark bg-light transition-all duration-300 px-[18px] h-8 flex items-center hover:bg-gray-300"
                            x-text="subItem"></a></li>
                    </template>
                  </ul>
                </template>
              </li>
            </template>

            <li class="max-w-min ${isLight ? " ml-[20px]" : " "}">
              <button @click.stop="searchOpen = true"
                  class="group flex items-center cursor-pointer outline-none 2xl:ml-2">
                <div href="#"
                    class="min-h-10 max-h-10 grid place-items-center rounded-full group cursor-pointer aspect-square border ${isLight ? "border-dark/20" : "border-white/30"} duration-300 hover:border-primary/30 max-sm:hidden">
                  <div class="${isLight ? "bg-dark" : "bg-white"} min-w-6 max-w-6 aspect-square group-hover:bg-primary transition-colors"
                      style="mask: url('/images/icons/search.svg') no-repeat center; mask-size: contain;"></div>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div class="flex items-center gap-[14px] shrink-0 z-50">
        <button @click.stop="searchOpen = true"
            class="group  max-sm:hidden xl:hidden flex items-center cursor-pointer outline-none 2xl:ml-2">
          <div href="#"
              class="min-h-10 max-h-10 grid place-items-center rounded-full group cursor-pointer aspect-square border ${isLight ? "border-dark/20" : "border-white/30"} duration-300 hover:border-primary/30">
            <div class="${isLight ? "bg-dark" : "bg-white"} min-w-6 max-w-6 aspect-square group-hover:bg-primary transition-colors"
                style="mask: url('/images/icons/search.svg') no-repeat center; mask-size: contain;"></div>
          </div>
        </button>
        <a href="tel:+74991131104" class="flex group  max-sm:gap-[10px] items-center gap-5">
          <div href="#"
              class="min-h-10 max-sm:border-0 max-h-10 grid place-items-center rounded-full group cursor-pointer aspect-square border ${isLight ? "border-dark/20" : "border-white/30"}  duration-300 group-hover:border-primary/30 ">
            <div class="${isLight ? "bg-dark" : "bg-white"} min-w-6 max-w-6 aspect-square group-hover:bg-primary transition-colors"
                style="mask: url('/images/icons/whatsapp.svg') no-repeat center; mask-size: contain;"></div>
          </div>

          <div
              class="${isLight ? "text-dark" : "text-white"} group-hover:text-primary tracking-[0.1px] leading-[100%] font-bold transition-all whitespace-nowrap max-sm:text-[14px]">
            +7 (499) 113-11-04
          </div>
        </a>

      </div>
    </div>
    <div class="pt-[22px] flex gap-3 px-[20px] w-full min-h-[62px] border-t  ${isLight ? "border-dark/20" : "border-white/30"} sm:hidden">
      <div
          class="border leading-[100%] ${isLight ? "border-dark/20" : "border-white/30"} uppercase grid place-items-center ${isLight ? "text-dark/80" : "text-white/80"} max-w-[92px] w-full h-[40px] font-semi text-[10.35px] tracking-0">
        Фильтр
      </div>
      <div
          class="flex leading-[100%] justify-between w-full text-[10.35px] items-center border ${isLight ? "border-dark/20" : "border-white/30"} px-[14px] ">
        <input placeholder="ПОИСК" class=" ${isLight ? "text-dark placeholder-dark/80" : "text-white placeholder-white/80"}" />
        <div class="${isLight ? "bg-dark" : "bg-white"} min-w-[17px] aspect-square object-contain group-hover:bg-primary transition-colors"
                style="mask: url('/images/icons/search.svg') no-repeat center; mask-size: contain;"></div>
      </div>
    </div>
    <ul @click.outside="menuToggle=false"
        class="fixed xl:hidden shadow-[-1px_-1px_3px_#dfdfdf] pt-6 pb-5 flex justify-center md:gap-[60px] max-md:justify-between px-[14px] bottom-0 w-screen bg-white">
      <template x-for="(item, index) in mobileMenu" :key="index">
        <li>
          <a :href="item.link" class="text-[12px] flex flex-col gap-1 items-center font-semibold leading-[140%]">
            <img :alt="item.name" class="w-[45px] object-contain" :src="'/images/icons/'+item.icon+'.svg'" />
            <span x-text="item.name"></span>
          </a>
        </li>
      </template>
      <li>
        <button @click.stop="menuToggle=!menuToggle"
            class="text-[12px] flex flex-col gap-1 items-center font-semibold leading-[140%]">
          <img alt="=" class="w-[45px] object-contain" src="/images/icons/menu.svg" />
          <span>Меню</span>
        </button>
      </li>
    </ul>

    <div x-show="menuToggle==true" x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 translate-y-4" x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 translate-y-4"
        class="bottom-[104px] border-b border-primary shadow-[0_4px_14px_#0000001a] flex flex-col gap-[2px] fixed w-screen p-[10px] pt-[11px] pb-[12px] bg-white"
        @click.outside="menuToggle=false" style="display: none;">
      <a href="/blog.html" class="bg-l-white h-[42px] flex items-center pl-4 font-medium text-dark">Блог</a>
      <a href="/about.html" class="bg-l-white h-[42px] flex items-center pl-4 font-medium text-dark">О компании</a>
      <a href="/contacts.html" class="bg-l-white h-[42px] flex items-center pl-4 font-medium text-dark">Контакты</a>
    </div>
    `

  document.body.innerHTML += `<div x-data="{ 
    showButton: false, 
    lastScrollY: 0,
    init() {
        this.lastScrollY = window.pageYOffset;
    },
    handleScroll() {
        const currentScrollY = window.pageYOffset;
        
        if (currentScrollY < 10) {
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
        class="cursor-pointer z-50 bottom-40 max-lg:bottom-[130px] max-md:right-5 max-[1520px]:right-20  right-[calc((100%-1420px)/4)] [1520px]:translate-x-1/2 fixed w-[60px] object-contain"
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