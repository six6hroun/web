document.addEventListener('DOMContentLoaded', function () {
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
        $(input).addClass("invalid");
        $("<div>")
            .text(message)
            .addClass("error")
            .css({
                "color": "red",
                "font-size": "12px"
            })
            .insertAfter(input);
    }
});