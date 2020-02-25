## Тестовое задание стажера frontend 
	
Дана доска размером M × N клеток. Клетка может находиться в одном из двух состояний: 1 — живая, 0 — мёртвая. Каждая клетка взаимодействует с восемью соседями. Правила таковы:<br />

Живая клетка, у которой меньше двух живых соседей, погибает.<br />
Живая клетка, у которой два или три живых соседа, выживает.<br />
Живая клетка, у которой больше трёх живых соседей, погибает.<br />
Мёртвая клетка, у которой три живых соседа, возрождается.<br />

Напишите программу, которая будет:<br />
— случайным образом генерить стартовое состояние;<br />
— уметь получать его из файла (способ выбирается через параметры запуска в консоли);<br />
— каждую секунду выводить в консоль новое состояние доски.<br />

## Комментарий

"Жизнь" на js с работой в консоли и чтением файлов конечно интересное требование... <br />
Ну нет ничего невозможного. Использовал node.js