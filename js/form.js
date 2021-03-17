const PRICE_TYPE = {//заведем внешний глобальный объект
  bungalow: {
    placeholder: '0',
    min: 0,
  },
  flat: {
    placeholder: '1 000',
    min: 1000,
  },
  house: {
    placeholder: '5 000',
    min: 5000,
  },
  palace: {
    placeholder: '10 000',
    min: 10000,
  },
}
//(Помощь друга часть 2)
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
//форма
const form = document.querySelector('.ad-form');
//фильтр под картой
const filterForm = document.querySelector('.map__filters');
//координаты жилья
const coordinateInput = form.querySelector('#address');
//типы жилья, вывести выбранный тип
const typeOfDwelling  = form.querySelector('#type');
//синхронное время
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');
//комнаты и гости
const roomInput = form.querySelector('#room_number');
const guestInput = form.querySelector('#capacity');
const rooms = parseInt(roomInput.value, 10);
//console.log(rooms);
const guests = parseInt(guestInput.value, 10);
//console.log(guests);

//функция для координат на карте
const updateAdress = (coordinates) => {
  coordinateInput.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
  //toFixed если нужно опред.кол-во после запятой
};


//функция для фильтров под картой неактивная фаза
const disableFilterForm = () => {
  filterForm.classList.add('map__filters--disabled');
  [...filterForm.children].forEach((item) => { //спред оператор
    item.disabled = true;
  });
};
//функция для фильтров под картой активная фаза
const activeFilterForm = () => {
  filterForm.classList.remove('map__filters--disabled');
  [...filterForm.children].forEach((item) => { //спред оператор
    item.disabled = false;
  });
};

//функция для формы неактивная фаза
const disableForm = () => {
  form.classList.add('ad-form--disabled');
  [...form.children].forEach((item) => {
    item.disabled = true;
  });
}
//функция для формы активная фаза
const activeForm = () => {
  form.classList.remove('ad-form--disabled');
  [...form.children].forEach((item) => {
    item.disabled = false;
  });

}

const typeofDwellingHandler = (evt) => {
  const minPrice = document.querySelector('#price');//находим цену
  const selectedItem = evt.target.value; //означает выделенный параметр selected (выбранный тип жилья)
  const setting = PRICE_TYPE[selectedItem];//нашли соответствующие параметры в объекте
  if (setting) { //проверка, действительно ли мы параметры нашли
    minPrice.placeholder = setting.placeholder;//установили их
    minPrice.min = setting.min;
  }
};

const onChangeOfTime = (evt) => {
  const itemTime = evt.target.value;
  checkIn.value = itemTime;
  checkOut.value = itemTime;
};

checkIn.addEventListener('change', onChangeOfTime);//установка слушателей вконце!
checkOut.addEventListener('change', onChangeOfTime);
typeOfDwelling.addEventListener('change', typeofDwellingHandler);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

//заголовок (Помощь друга часть 2)
const titleUserInput = form.querySelector('#title');
//валидация формы заголовка (Помощь друга часть 2)
titleUserInput.addEventListener('input', (evt) => {
  const valueLength = evt.target.value.length;//получаем значение поля
  titleUserInput.setCustomValidity('');
  if (valueLength < MIN_TITLE_LENGTH) {
    titleUserInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
  }
  if (valueLength > MAX_TITLE_LENGTH) {
    titleUserInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  }
  titleUserInput.reportValidity();
});

//цена за ночь (Помощь друга часть 2)
const priceUserInput = form.querySelector('#price');
//валидация формы цены за ночь (Помощь друга часть 2)
priceUserInput.addEventListener('input', (evt) => {
  const valuePrice = evt.target.value;
  priceUserInput.setCustomValidity('');
  if (valuePrice > MAX_PRICE) {
    priceUserInput.setCustomValidity('Вы превысили допустимое значение.');
  }
  if (valuePrice < priceUserInput.min) {
    priceUserInput.setCustomValidity('Слишком низкая цена.');
  }
  priceUserInput.reportValidity();
});
/*На пример можно так. ^ это операция XOR - исключающее или.
 Магические значения в константы вынести не забудь.*/
//комнаты и гости. (Помощь друга часть 2)
const ratioOfRoomsToGuests = () => {
  //валидация формы комнат
  if (rooms === 100 ^ guests === 0) {
    guestInput.setCustomValidity('Вы выбрали вариант не подходящий для заселения');
  } else if (rooms < guests) {
    guestInput.setCustomValidity('Невозможно заселить. Выберите большее количество комнат');
  } else {
    guestInput.setCustomValidity('');
  }
  guestInput.reportValidity();
}
roomInput.addEventListener('change', ratioOfRoomsToGuests);


export {updateAdress, disableFilterForm, activeFilterForm, disableForm, activeForm};
