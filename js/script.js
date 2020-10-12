/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */



/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
          movieList = document.querySelector('.promo__interactive-list'),
          promoInteractiveItem = document.getElementsByClassName('promo__interactive-item');
    
    const form = document.querySelector('.add'),
          inputAdd = form.querySelector('.adding__input'),
          btnAdd = form.lastElementChild,
          checkBox = form.querySelector('[type="checkbox"]');
    
    
    const deleteAdv = (arr) => {
        arr.forEach(item => {  //удаляем рекламные блоки
            item.remove();
        });    
    };
    
    const makeChanges = () => {
    promoGenre.textContent = "Драмма";
    promoBg.style.cssText = "background: url('img/bg.jpg') center / cover no-repeat";
    };
    makeChanges();

    const sortArr = (arr) => {
        arr.sort(); // Сортируем по алфавиту
    };

    function createMovieList(films, parent) {
        parent.innerHTML = ''; //Очищаем список фильмов
        sortArr(movieDB.movies);
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1} - ${film}
                    <div class="delete"></div>
                </li>
            `;     // (movieList.innerHTML=movieList.innerHTML+"чтото") = movieList.innerHTML+="чтото"
        });  // movieDB.movies.forEach((film, i) => перебираем елементы объекта movieDB.movies
        
        document.querySelectorAll('.delete').forEach((btn, i) => {  // выбираем все delete, и сразу перебираем с помощью forEach, btn - каждый delete, i нумерация в массиве
            btn.addEventListener('click', () => { // к каждой btn навешиваем обработчик события клик
                btn.parentElement.remove(); // удаляем родительский элемент, т.е. название фильма
                movieDB.movies.splice(i, 1); // splice метод который вырезает определенный элемент (i какой элемент удалить, 1 сколько удалить)
                createMovieList(films, parent); // еще раз создаем список с правильно нумерацией, вызываем функцию внутри себя
            });
        });
        
    }
    

    form.addEventListener('submit', (event) => {  //отследить отправку собыия у формы
        event.preventDefault();                  //отменили стандартное поведение формы при отправке (не перезагружается страница) 
        
        let newFilm = inputAdd.value;     // добавляем переменную для провеки инпута(value)
        const favorite = checkBox.checked;  // добавляем переменную для провеки чекбокса(checked)


        if (newFilm) { // newFilm true если заполнен, false если нет значения
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`; // проверка длинны вводимого фильма
            }
            if (favorite) {
                console.log("Добавляем любимый фильм");
            }
            movieDB.movies.push(newFilm); // newFilm попадает в наш объект
            //sortArr(movieDB.movies);         Сортируем по алфавиту
       
            createMovieList(movieDB.movies, movieList);

            event.target.reset(); // очищаем форму в конце, event.target это form
        } 
    });
    
   
    deleteAdv(promoRemove);
    createMovieList(movieDB.movies, movieList);
    
 });