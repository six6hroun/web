<?php
header('Content-Type: application/json');

// Проверяем полученный артикул
$article = isset($_GET['art']) ? $_GET['art'] : '';

// Массив с данными товаров
$products = [
    '1' => [
        'name' => 'Смартфон Premium X',
        'weight' => 0.2,
        'cost' => 29990,
        'img' => 'https://example.com/images/phone.jpg'
    ],
    '2' => [
        'name' => 'Ноутбук Business Pro',
        'weight' => 1.5,
        'cost' => 54990,
        'img' => 'https://example.com/images/laptop.jpg'
    ]
];

// Проверяем, есть ли такой артикул
if (array_key_exists($article, $products)) {
    echo json_encode($products[$article]);
} else {
    echo json_encode(['error' => 'Товар с таким артикулом не найден']);
}
?>
