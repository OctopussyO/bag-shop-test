# Bag Shop

<img align="right" width="400px" src="https://raw.githubusercontent.com/OctopussyO/bag-shop-test/master/static/preview.png" alt="Иллюстрация к проекту">

Cтраница вывода списка товаров с возможностью сортировки товаров, добавления/удаления товаров в корзине.

Ознакомиться с приложением можно по [ссылке](test-bag-shop.netlify.app).

### Функциональность

1. Первая страница проекта представляет из себя список товаров первой категории из имеющихся и выбранной первой категорией в списке (данные должны быть получены и отрисованы на сервере).
2. Переключение между категориями, при этом список товаров обновляется в соответствии с выбранной категорией.
3. Добавление в корзину и удаление из нее любого из представленных товаров, посредством нажатия соответствующего триггера на карточке товара, при этом иконка меняет свое состояния в зависимости от наличия данного товара в корзине.
4. Открытие корзины в модальной панели по клику соответствующего триггера в шапке сайта.
5. Просмотр пустой корзины.
6. Просмотр корзины с товарами.
7. Удаление из корзины товаров из списка по клику соответствующего триггера на карточке товара в корзине.
8. Отправка заявки на исполнение заказа с валидацией и масками для соответствующих полей.
9. Отображение блока удачной отправки заявки.
10. Удаление товаров из корзины после удачной отправки заявки.

- Каждая категория реализована в отдельный странице посредствам Nested Routes.
- Содержимое корзины будет сохраняться, даже если пользователь закроет вкладку и снова зайдет на сайт.

### Используемый стек

[![JavaScript](https://img.shields.io/badge/-JavaScript-464646??style=flat-square&logo=javascript)](https://www.javascript.com/)
[![Vue.js](https://img.shields.io/badge/-Vue.js-464646??style=flat-square&logo=vue.js)](https://ru.vuejs.org/)
[![Vuex](https://img.shields.io/badge/-Vuex-464646??style=flat-square&logo=vuex.js)](https://vuex.vuejs.org/)
[![Nuxt.js](https://img.shields.io/badge/-Nuxt.js-464646??style=flat-square&logo=nuxt.js)](https://https://nuxtjs.org/)
[![Axios](https://img.shields.io/badge/-Axios-464646??style=flat-square&logo=axios.js)](https://www.npmjs.com/package/axios)
[![SCSS](https://img.shields.io/badge/-SCSS-464646??style=flat-square&logo=scss)](https://https://sass-scss.ru/)
[![CSS](https://img.shields.io/badge/-CSS-464646??style=flat-square&logo=css3)](https://www.w3.org/Style/CSS/specs.ru.html)
[![HTML](https://img.shields.io/badge/-HTML-464646??style=flat-square&logo=HTML5)](https://www.w3.org/TR/html52/introduction.html#introduction)
[![Netlify](https://img.shields.io/badge/-Netlify-464646??style=flat-square&logo=netlify)](https://https://www.netlify.com/)

### Инструкция по разрёртыванию проекта:
```bash
# клонирование репозитория
$ git clone https://github.com/OctopussyO/news-explorer-frontend.git

# установка зависимостей
$ npm install

# запуск приложения в режиме разработчика
$ npm run start

# сборка проекта
$ npm run build
```

### Планы по доработке проекта:

1. Сверстать страницу ошибки.
2. Добавить возможность поставить "звёздочку" товару.
3. Добавить попапы с подтверждением при удалении товара из корзины.
4. Доработать компонент формы (валидация, рефакторинг).
5. Выделить компонент поля ввода с маской.
6. Сделать адаптивную версию для мобильных устройств.
7. Анимировать действия пользователя: открытие панели корзины, смена списка товаров и т.п.
