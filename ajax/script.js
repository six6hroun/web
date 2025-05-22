document.getElementById('getProduct').addEventListener('click', function() {
    const article = document.getElementById('article').value;
    const resultDiv = document.getElementById('result');
    
    // Проверяем, что введен допустимый артикул
    if (article !== '1' && article !== '2') {
        resultDiv.innerHTML = '<p style="color: red;">Пожалуйста, введите артикул 1 или 2</p>';
        return;
    }
    
    // Очищаем предыдущие результаты
    resultDiv.innerHTML = '<p>Загрузка данных...</p>';
    
    // Создаем AJAX-запрос
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `goods.php?art=${article}`, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const product = JSON.parse(xhr.responseText);
                
                // Формируем HTML для отображения товара
                let html = `
                    <h3>${product.name}</h3>
                    <p><strong>Вес:</strong> ${product.weight} кг</p>
                    <p><strong>Цена:</strong> ${product.cost} руб.</p>
                    <img src="${product.img}" alt="${product.name}" class="product-img">
                `;
                
                resultDiv.innerHTML = html;
            } catch (e) {
                resultDiv.innerHTML = '<p style="color: red;">Ошибка при обработке данных сервера</p>';
            }
        } else {
            resultDiv.innerHTML = '<p style="color: red;">Ошибка при запросе данных</p>';
        }
    };
    
    xhr.onerror = function() {
        resultDiv.innerHTML = '<p style="color: red;">Ошибка соединения</p>';
    };
    
    xhr.send();
});
