import { Cell } from "./intefaces";
import { random } from "./helpers";
import colors from 'colors';
import fs from 'fs';

colors.enable();
console.clear();

let cells: Cell[][];

for(let i = 0; i < process.argv.length; i++) { //Ищем параметры запуска
    if(process.argv[i] === '--fromFile') { //Если задано "из файла" - грузим из файла
        fs.readFile(process.argv[i + 1], "utf-8", (err, data) => {
            cells = readCells(data);
            startGame();
        });
        break;
    }
    else if(process.argv[i] === '--random') { //Либо генерируем случайно
        const xSize = random(10, 15);
        const ySize = random(10, 15);
        cells = randomCells(xSize, ySize);
        startGame();
        break;
    }
}


/**
 * Запустить цикл обработки
 */
function startGame() {
    showCells(cells);
    setInterval(step, 1000);
}

/**
 * Прочитать данные из файла и инициализировать ячейки
 * @param data текст из файла инициализации
 */
function readCells(data: string) {
    const cells: Cell[][] = [];

    const lines = data.split('\n');
    for(let x = 0; x < lines.length; x++) {
        cells[x] = [];
        const line = lines[x].split(' ');
        for(let y = 0; y < line.length; y++) {
            cells[x][y] = {
                x,
                y,
                state: line[y] === '1',
                nextState: false
            };
        }
    }

    return cells;
}

/**
 * Заполнить ячейки рандомными данными
 * @param xSize размер по горизонтали
 * @param ySize размер по вертикали
 */
function randomCells(xSize: number, ySize: number) {
    const cells: Cell[][] = [];

    for (let x = 0; x < xSize; x++) {
        cells[x] = [];
        for (let y = 0; y < ySize; y++) {
            const cell: Cell = {
                x: x,
                y: y,
                state: Math.random() >= 0.5,
                nextState: false
            }
            cells[x][y] = cell;
        }
    }

    return cells;
}

/**
 * Вывести ячейки в консоль
 * @param cells 
 */
function showCells(cells: Cell[][]) {
    cells.forEach(line => {
        let text: string = '';
        line.forEach(cell => {
            text += cell.state ? 'X '.green : 'O '.white;
        })
        console.log(text);
    })
}

/**
 * Просчитать ячейки и определить, будут ли они жить в следующем ходу
 * @param cells 
 */
function setNextState(cells: Cell[][]) {
    for(let x = 0; x < cells.length; x++) {
        const line = cells[x];
        for(let y = 0; y < line.length; y++) {
            const cell = cells[x][y];
            const count = getAlives(cells, x, y);
            if(count < 2 || count > 3)
                cell.nextState = false;
            else if(cell.state && count == 2)
                cell.nextState = true;
            else if(count === 3)
                cell.nextState = true;
            else
                cell.nextState = false;
        }
    }
}

/**
 * Обновить статус ячейки. Установить просчитанный
 * @param cells 
 */
function updateState(cells: Cell[][]) {
    cells.forEach(line => {
        line.forEach(cell => {
            cell.state = cell.nextState;
            cell.nextState = false;
        })
    })
}

/**
 * Количество живых клеток вокруг заданной точки (не считая точку)
 * @param cells 
 * @param x 
 * @param y 
 */
function getAlives(cells: Cell[][], x: number, y: number) {
    let count = 0;
    for(let xx = Math.max(0, x - 1); xx <= Math.min(x + 1, cells.length - 1); xx++) {
        for(let yy = Math.max(0, y - 1); yy <= Math.min(cells[xx].length - 1, y + 1); yy++) {
            if(x === xx && y === yy) {
                continue;
            }
            if(cells[xx][yy].state) {
                count += 1;
            }
        }
    }
    //console.log(`x: ${x} y: ${y} count: ${count}`);
    return count;
}

/**
 * Обработка итераций
 */
function step() {
    console.clear(); //Очистить консоль
    setNextState(cells); //Просчитать, что будет с ячейкой в следующем ходу
    updateState(cells); //Обновить данные ячейки
    showCells(cells); //Вывести их в консоль
}