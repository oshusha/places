'use strict';
let api = new Api(apiOptions);

//объект для хранения id user'а
let user = new User(api);

//init  profile form

new PopupProfile(optionsPopupProfile, new Validation(profileForm, { errorsText: errorsText }), api,user)
    .getProfile()
    .addEventListeners()
    .addFormEventListeners();


//init and create avatar form

new PopupAvatar(optionsPopupAvatar, new Validation(avatarForm, { errorsText: errorsText }), api,user)
    .getAvatar()
    .addEventListeners()
    .addFormEventListeners();

//init card list instance
let card = new Card(api,user);
let cardList = new CardList(optionsCardList, card);
cardList.addEventListeners().render();

//init and create Popup
new PopupImage(optionsPopupImage).addEventListeners();

//init new place add form

new PopupCard(optionsPopupCard, cardList, new Validation(newForm, { errorsText: errorsText }), api,user)
  .addEventListeners()
  .addFormEventListeners();


/**
* Здравствуйте.
*
* Молодцы, очень бальшая работа сделана. Я очень рад что делаете Вы её сами. Делая работу человек осознаёт и
* и проходит все этапы от и до, становится более опытным
*
* Надо исправить. Удалить в проекте везде  alert, использование  alert является очень плохой практикой.
* Как пример могу примести, если вам придёт много карточек в которых будет ошибка а ошибка будет воспроизводиться через alert
* то вам сложно будет даже  закрыть  окно браузера или допустим изменить информацию на странице, пока не закроете всплывающее окно.
*
* Надо исправить. В классе нехватает преобразование данных .then(res => res.json())
*
* Я думаю что Вам надо было ограничиться только обязательными заданиями, ненадо было делать необязательные сразу, а сделать их после
*
*
* Можно лучше : В классе PopupProfile вы вызываете this._init() Вызов реализации из конструтора является не очень хорошей практикой.
* Лучше вызывать из метода класса или вне класса, но не из конструтора
*
* Можно лучше : Вы проверяете на удаление карточки разделяя шаблоны. Лучше проверку делать прямо в (одном) шаблоне. Добавить класс стиля и
* показывать его в зависимости от условий, например так
*
 *
 * Самый правильный способ, как пример указан в брифе
 // url лучше передавать при инициализации класса в конструктор
 fetch(`url/cards`, {
   headers: {
  // ключ который надо передавать в параметрах
  authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
      }
      })
  .then(res => {
   if (res.ok) {
      return res.json();
      }
      // если ошибка, переходим в catch
    return Promise.reject(`Ошибка: ${res.status
      }`);
      })
  .then((result) => {
      // обрабатываем результат
      // а точнее возвращает результат работы прямо в тот класс откуда вызывали
  })
  .catch((err) => {
  console.log(err); // выведем ошибку в консоль
  });

 *
 * Вызывать же методы класса Api лучше из других классов
*
* Полагаю, что понадобится ещё одна иттерация для проверки и корректировки работы
*
*/

/**
 * Здравствуйте
 *
 *  можно лучше:  initialCards не нужен, удалите его. Вы же сейчас карточки получаете из класса Api
 *
 * Не объявляйте один класс при передаче параметров в другой
 * new CardList(optionsCardList, new Card(api));
 * лучше сперва записать в переменную и передать
 * const card = new Card(api);
 * new CardList(optionsCardList, card);
 * Так просто код понятнее.
 *
 * В профиле цепочка вызовов. Это конечно хорошо что Вы знаете об этом паттерне,
 * Но задумывался он для решения других задач, допустим для построения запросов к базе данных
 * или fetch().then().then().then().catch() и так далее.
 * Почитать можите здесь https://refactoring.guru/ru/design-patterns/chain-of-responsibility
 *
 * Заметил что в классе валидации вы обращаетесь к элементам по индексу, так делать нельзя.
 * this._errorHtmlFields[0].textContent = '';
 * При изменении вёрстки, класс перестанет работать, так как поменяется индекс.
 *
 * В классе Validation "в контрукторе" вы вызываете this._init(), в котором есть какие-то определённые условия
 * Так делать нельзя. Конструктор предназначен только для объявления(инициализации) переменных. не более
 *
 * Спасибо что поправили  create в классе Card, было больно смотреть, но метод toggleLike жирный, надо разбить на несколько небольших, логических методов
 *
 * В классе Api у вас очень много примитивных классов, это плохо. Лучше сделать 2-3 метода на запись, получение и обновление данных.
 * Этого будет достаточно, много мелких методов которые не несут какой либо нагрузки сложно поддерживать
 *
 * Я очень рад, что вы делаете все сами и думаете над проблемами, пытаетесь решить. Вы очень много добъётесь, но учитесь прислушиваться к советам ;)
 *
 * Работа принимается, ждём вас в следующем спринте
 *
 */