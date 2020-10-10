/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Алладин",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const promoMainBlock = document.querySelector('.promo'),
      promoBlockRemove = promoMainBlock.querySelector('.promo__adv'),
      promoRemove = promoBlockRemove.querySelectorAll('img'),
      promoGenre = document.querySelector('.promo__genre'),
      promoBg = document.querySelector('.promo__bg'),
      promoInteractiveItem = document.getElementsByClassName('promo__interactive-item');


promoRemove.forEach(item => {
    item.remove();
});

promoGenre.textContent = "Драмма";

promoBg.style.cssText = "background: url('img/bg.jpg') center / cover no-repeat";


movieDB.movies.sort();
movieDB.movies.forEach((film, i) => {
    promoInteractiveItem[i].textContent = `${i+1} : ${film}`;
});

// for (let i = 0; i < movieDB.movies.length; i++) {
//     movieDB.movies.sort();
//     promoInteractiveItem[i].textContent = `${movieDB.movies[i]}`; 
// без нумерации
// };

