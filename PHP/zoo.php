<?php
$zoo = [
    "лев" => "Король",
    "тигр" => "Амур",
    "медведь" => "Косолапыч",
    "волк" => "Одинокий",
    "лиса" => "Рыжик",
    "слон" => "Дамбо",
    "жираф" => "Шлагбаум",
    "зебра" => "Переход"
];

$userAnimal = strtolower($_POST['animal'] ?? '');

if (array_key_exists($userAnimal, $zoo)) {
    echo "<h2>{$userAnimal} - находится в списках зоопарка</h2>";
    echo "<p>Его кличка - <strong>{$zoo[$userAnimal]}</strong></p>";
} else {
    echo "<h2>{$userAnimal} данного зверя нет в нашем зоопарке.</h2>";
}

echo "<hr><h3>Все животные в нашем зоопарке:</h3>";
echo "<ul>";
foreach ($zoo as $animal => $name) {
    echo "<li>{$animal} - {$name}</li>";
}
echo "</ul>";
?>