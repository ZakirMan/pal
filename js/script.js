// Переключение вкладок
const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
  });
});

// Выбираем элементы
const listItems = document.querySelectorAll('li');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeButton = document.querySelector('.close-button');

// Обработчик клика на элемент списка
listItems.forEach(item => {
  item.addEventListener('click', () => {
    // Проверяем наличие атрибутов data-text-1 и data-text-2
    const text1 = item.getAttribute('data-text-1');
    const text2 = item.getAttribute('data-text-2');
    const text3 = item.getAttribute('data-text-3');

    if (text1 && text2) {
      // Отображаем тексты с новой строки
      modalText.innerHTML = `${text1}<br>${text2}<br>${text3}`;
      modal.classList.add('visible');
    } else {
      // Показываем ошибку, если атрибуты отсутствуют
      modalText.innerHTML = "Text data is missing!";
      modal.classList.add('visible');
    }
  });
});

// Закрытие модального окна
closeButton.addEventListener('click', () => {
  modal.classList.remove('visible');
});

// Закрытие модального окна при клике вне контента
modal.addEventListener('click', event => {
  if (event.target === modal) {
    modal.classList.remove('visible');
  }
});

// Данные для городов
const cities = [
  { name: "London", timezone: "Europe/London", texts: ["Text 1 for London", "Text 2 for London", "Text 3 for London", "Text 4 for London", "Text 5 for London"] },
  { name: "Almaty", timezone: "Asia/Almaty", texts: ["Text 1 for Almaty", "Text 2 for Almaty", "Text 3 for Almaty", "Text 4 for Almaty", "Text 5 for Almaty"] },
  { name: "Seoul", timezone: "Asia/Seoul", texts: ["Text 1 for Seoul", "Text 2 for Seoul", "Text 3 for Seoul", "Text 4 for Seoul", "Text 5 for Seoul"] }
];

const citySearch = document.getElementById('city-search');
const cityList = document.getElementById('city-list');
const cityModal = document.getElementById('city-modal');
const closeButtonС = document.querySelector('.close-button');
const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTexts = document.getElementById('city-texts');

// Обработка ввода текста в поле поиска города
citySearch.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  
  // Фильтруем города по введенному тексту
  const filteredCities = cities.filter(city => city.name.toLowerCase().includes(query));

  // Очищаем список перед обновлением
  cityList.innerHTML = "";
  
  // Добавляем города в список, если они подходят
  filteredCities.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city.name;
    li.addEventListener('click', () => selectCity(city));
    cityList.appendChild(li);
  });

  // Показываем список, если есть подходящие города
  if (filteredCities.length > 0) {
    cityList.classList.remove('hidden');
  } else {
    cityList.classList.add('hidden');
  }
});

// Функция для отображения информации о выбранном городе
function selectCity(city) {
  cityName.textContent = city.name;
  const currentTime = new Date().toLocaleString('en-US', { timeZone: city.timezone });
  cityTime.textContent = `Current time: ${currentTime}`;

  // Отображаем тексты города
  cityTexts.innerHTML = city.texts.map(text => `<p>${text}</p>`).join('');

  // Показываем модальное окно
  cityModal.classList.add('visible');
  cityList.classList.add('hidden');
  citySearch.value = "";  // очищаем поле поиска
}

// Закрыть модальное окно
closeButtonС.addEventListener('click', () => {
  cityModal.classList.remove('visible');
});

// Закрытие модального окна при клике вне контента
cityModal.addEventListener('click', event => {
  if (event.target === cityModal) {
    cityModal.classList.remove('visible');
  }
});