document.addEventListener('DOMContentLoaded', function () {

    //1
    function formatDateTime() {
        let now = new Date();

        let days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
        let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

        let day = String(now.getDate()).padStart(2, '0');
        let month = months[now.getMonth()];
        let year = now.getFullYear();
        let weekday = days[now.getDay()];

        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let seconds = String(now.getSeconds()).padStart(2, '0');

        let formattedDate = `${hours}:${minutes}:${seconds}, ${day} ${month} ${year}, ${weekday}`;
        document.getElementById("datetime").innerText = formattedDate;
    }

    formatDateTime();
    setInterval(formatDateTime, 1000);

    let accordions = document.querySelectorAll('.accordion');
    accordions.forEach((accordion, index) => {
        accordion.addEventListener('click', function () {
            let panel = this.nextElementSibling;
            panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
        });
    });

    //2
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    function generateCalendar(year, month) {
        let calendarContainer = document.querySelectorAll('.accordion_content')[1];
        calendarContainer.innerHTML = '';

        let daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        firstDay = (firstDay === 0) ? 6 : firstDay - 1;

        let calendarHeader = document.createElement('div');
        calendarHeader.classList.add('calendar-header');

        let prevButton = document.createElement('button');
        prevButton.innerText = '<';
        prevButton.addEventListener('click', function () {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentYear, currentMonth);
        });

        let nextButton = document.createElement('button');
        nextButton.innerText = '>';
        nextButton.addEventListener('click', function () {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentYear, currentMonth);
        });

        let monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        let monthYearLabel = document.createElement('span');
        monthYearLabel.innerText = `${monthNames[month]} ${year}`;

        calendarHeader.appendChild(prevButton);
        calendarHeader.appendChild(monthYearLabel);
        calendarHeader.appendChild(nextButton);

        let calendar = document.createElement('table');
        calendar.classList.add('calendar-table');

        let headerRow = document.createElement('tr');
        daysOfWeek.forEach(day => {
            let th = document.createElement('th');
            th.innerText = day;
            headerRow.appendChild(th);
        });
        calendar.appendChild(headerRow);

        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            let emptyCell = document.createElement('td');
            row.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (row.children.length === 7) {
                calendar.appendChild(row);
                row = document.createElement('tr');
            }
            let cell = document.createElement('td');
            cell.innerText = day;
            row.appendChild(cell);
        }

        if (row.children.length > 0) {
            while (row.children.length < 7) {
                let emptyCell = document.createElement('td');
                row.appendChild(emptyCell);
            }
            calendar.appendChild(row);
        }

        calendarContainer.appendChild(calendarHeader);
        calendarContainer.appendChild(calendar);
    }

    generateCalendar(currentYear, currentMonth);
});


document.addEventListener('DOMContentLoaded', function () {
    let lists = document.querySelectorAll('ul, ol, dl');
    let allListItems = [];

    lists.forEach(list => {
        allListItems.push(...list.children);
    });

    //3
    let task3Container = document.querySelectorAll('.accordion_content')[2];
    let resultContainer = task3Container.querySelector('h2');
    resultContainer.innerText = `Число элементов в списках: ${allListItems.length}`;


    //4
    document.getElementById('startButton').addEventListener('click', function () {
        const blocks = document.querySelectorAll('.numberv');
        let currentIndex = 0;
      
        function toggleNextBlock() {
          if (currentIndex >= blocks.length) {
            currentIndex = 0;
          }
      
          blocks.forEach(block => {
            const content = block.querySelector('.accordion_content');
            content.style.display = 'none';
          });
      
          const currentBlock = blocks[currentIndex];
          const currentContent = currentBlock.querySelector('.accordion_content');
          currentContent.style.display = 'block';
          currentIndex++;
          setTimeout(toggleNextBlock, 80);
        }

        toggleNextBlock();
      });


    //5
    const createListButton = document.getElementById('createlist');
    const swapItemsButton = document.getElementById('swap');
    const myList = document.getElementById('speesok');

    createListButton.addEventListener('click', function () {
        myList.innerHTML = '';
        while (true) {
            const input = prompt('Введите элемент списка (ESC для выхода):');
            if (input === null) break;

            const li = document.createElement('li');
            li.textContent = input;

            li.addEventListener('click', function () {
                alert(`Вы собираетесь удалить элемент: "${li.textContent}"`);
                const confirmDelete = confirm('Вы уверены, что хотите удалить этот элемент?');
                if (confirmDelete) {
                    myList.removeChild(li);
                }
            });

            myList.appendChild(li);
        }
    });

    swapItemsButton.addEventListener('click', function () {
        const items = myList.querySelectorAll('li');
        if (items.length < 2) {
            alert('Недостаточно элементов для обмена!');
            return;
        }

        const firstIndex = prompt(`Введите индекс первого элемента для обмена (0 до ${items.length - 1}):`);
        const index = parseInt(firstIndex, 10);

        if (isNaN(index) || index < 0 || index >= items.length - 1) {
            alert('Некорректный индекс!');
            return;
        }

        const firstItem = items[index];
        const secondItem = items[index + 1];

        myList.insertBefore(secondItem, firstItem);
});



      //6
      const Block = document.getElementById('Color');
      const backgrounds = ['blue', 'green', 'black', 'yellow'];
      let T = 0;
  
      Block.addEventListener('mouseleave', function () {
          this.style.backgroundColor = backgrounds[T];
          T = (T + 1) % backgrounds.length;
      });


    //7
    const button = document.querySelector('.but');
    const listContainer = document.querySelector('.list');
    const items = listContainer.querySelectorAll('li');
    const endMessage = document.getElementById('mes');

    button.addEventListener('click', function () {
        if (listContainer.style.display === 'none' || listContainer.style.display === '') {
            listContainer.style.display = 'block';
        } else {
            listContainer.style.display = 'none';
        }
    });

    function hideItem(item, callback) {
        item.style.transition = 'opacity 1s';
        item.style.opacity = 0;

        setTimeout(function () {
            item.classList.add('hidden');
            callback();
        }, 1000);
    }

    items.forEach(function (item) {
        item.addEventListener('click', function () {
            hideItem(item, function () {
                let remainingItems = listContainer.querySelectorAll('li:not(.hidden)');
                if (remainingItems.length === 0) {
                    endMessage.style.display = 'block';
                }
            });
        });
    });


    //8
    const image = document.getElementById("photo");
    const text = document.getElementById("textik");
    const container = document.getElementById("imgcon");

    container.addEventListener("mouseenter", () => {
      image.style.opacity = "0.4";
      text.style.opacity = "1";
    });

    container.addEventListener("mouseleave", () => {
      image.style.opacity = "1";
      text.style.opacity = "0";
    });

    //9-10
    document.getElementById("myForm").addEventListener("submit", function (e) {
        e.preventDefault();
        document.querySelectorAll(".error").forEach(el => el.remove());
        document.querySelectorAll("input, textarea, select").forEach(el => el.classList.remove("invalid"));
    
        const login = document.getElementById("login");
        const name = document.getElementById("name");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("repeatPassword");
        const email = document.getElementById("email");
        const dob = document.getElementById("data");
        const about = document.getElementById("side");
        const skills = document.getElementById("skill");
        const experience = document.getElementById("expa");
        let valid = true;
    
        // Проверка логина
        if (!/^[a-zA-Z0-9]{3,16}$/.test(login.value)) {
            showError(login, "Логин: от 3 до 16 латинских букв и цифр.");
            valid = false;
        }
    
        // Проверка имени
        if (!/^[А-Яа-яЁё]+([\s-][А-Яа-яЁё]+)*$/.test(name.value)) {
            showError(name, "Имя: только кириллица, допустимы пробелы и дефисы.");
            valid = false;
        }
    
        // Проверка пароля
        const passRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[~!?@#$%^&*_\-+()\[\]{}<>\/\\|\"'.:,;]).{8,128}$/;
        if (!passRegex.test(password.value)) {
            showError(password, "Пароль: 8-128 символов, минимум 1 строчная, 1 заглавная, 1 цифра, 1 спецсимвол.");
            valid = false;
        }
    
        // Проверка подтверждения пароля
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Пароли не совпадают.");
            valid = false;
        }
    
        // Проверка email
        const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (email.value && !emailRegex.test(email.value)) {
            showError(email, "Email некорректен.");
            valid = false;
        }
    
        // Проверка даты рождения
        if (dob.value && new Date(dob.value) > new Date()) {
            showError(dob, "Дата рождения не может быть в будущем.");
            valid = false;
        }
    
        // Проверка "О себе"
        if (about.value.trim().length < 20) {
            showError(about, "Поле 'О себе' должно содержать минимум 20 символов.");
            valid = false;
        }
    
        // Проверка "Навыки"
        if (skills.value.trim().length < 20) {
            showError(skills, "Поле 'Навыки' должно содержать минимум 20 символов.");
            valid = false;
        }
    
        // Проверка опыта работы
        if (experience.value && experience.value < 0) {
            showError(experience, "Опыт работы не может быть отрицательным.");
            valid = false;
        }
    
        if (valid) {
            alert("Форма успешно отправлена!");
            this.reset();
        }
    });
    
    // Функция для отображения ошибок
    function showError(input, message) {
        input.classList.add("invalid");
        const error = document.createElement("div");
        error.textContent = message;
        error.classList.add("error");
        error.style.color = "red";
        error.style.fontSize = "12px";
        input.insertAdjacentElement("afterend", error);
    }
      

});

