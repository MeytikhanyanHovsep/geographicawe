import './style.css'
import Alpine from 'alpinejs'

window.Alpine = Alpine

document.addEventListener('alpine:init', () => {
    Alpine.data('headerData', () => ({
        openedIndex: null,
        isMobileMenuOpen: false,
        menuItems: [
            { name: 'Натуральные камни', link: 'stone-catalog', sub: ['Мрамор', 'Оникс', 'Гранит'] },
            { name: 'Изделия из камней', link: 'stone-catalog', sub: ['Столешницы', 'Подоконники'] },
            { name: 'Услуги', link: 'services', sub: ['Монтаж', 'Полировка'] },
            { name: 'Блог', link: 'blog', sub: null },
            { name: 'О компании', link: 'about', sub: null },
            { name: 'Контакты', link: 'contacts', sub: null }
        ],
        toggleSubmenu(index) {
            this.openedIndex = this.openedIndex === index ? null : index;
        }
    }));

    Alpine.data('sortTags', () => ({
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
            }
            // ... остальные теги
        ],
        toggle(key) { this.open = this.open === key ? null : key; },
        select(tagKey, value) {
            this.selected[tagKey] = value;
            this.open = null;
        }
    }));
});

// 2. ЗАПУСК ДОЛЖЕН БЫТЬ В САМОМ КОНЦЕ
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