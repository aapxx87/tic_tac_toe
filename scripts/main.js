// ?----- SELECTORS -----

const container_playground_grid = document.querySelector('.playground_grid')
const container_notifications = document.querySelector('.notifications')
const btn__new_game = document.querySelector('.btn_new_game')



// ?----- CONSTANT -----  

const winning_combinations = [
  ['1-1', '1-2', '1-3'],
  ['2-1', '2-2', '2-3'],
  ['3-1', '3-2', '3-3'],
  // строки
  ['1-1', '2-1', '3-1'],
  ['1-2', '2-2', '3-2'],
  ['1-3', '2-3', '3-3'],
  // столбцы
  ['3-1', '2-2', '1-3'],
  ['1-1', '2-2', '3-3'],
  // диагонали
];



// ?----- ПЕРЕМЕННЫЕ СОСТОЯНИЯ -----

let current_marker = 'x' // Текущий маркер игрока, первый ход начинается с 'x'
let players_moves = [[], []] // Ходы игроков, сохраняются все ходы игроков, игрок Х в нулевой элемент массива, игрок 0 в певый элеиент массива. 
let current_player = 0 // ппеременная текущего активного игрока, 0 соответтсует ходу играка "Х", 1 соответствует "0"
let game_status = true // статус игры, после победы статус меняется на false и ходить больше нельзя
let players_wins_scores = [[], []] // сохранение количества победных раундов для каждого игрока, игрок Х в нулевой элемент массива, игрок 0 в певый элеиент массива. 



// ?----- ФУНКЦИИ СОЗДАНИЯ ЭЛЕМЕНТОВ ----- 

// создание элемента клетки с соответствующими атрибутами 
const create_cell = function (row, col) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.id = `${row}-${col}`
  return cell
}

// создание сетки 3 на 3
const create_playground_grid = function () {
  for (let row = 1; row <= 3; row++) {
    for (let col = 1; col <= 3; col++) {
      const cell = create_cell(row, col)
      container_playground_grid.appendChild(cell)
    }
  }
}



// ?----- ОСНОВНАЯ ЛОГИКА ИГРЫ ----- 

const handling_player_step = function () {

  arr__cells.forEach(function (cell) {

    cell.addEventListener('click', function () {

      // проверяем чтобы клетка была пустой и нельхя было походить в клетку, которая уже занята
      if (cell.textContent === '') {

        if (!game_status) {
          console.log('Игра завершена!');
          return; // Блокируем действия, если игра закончена
        }

        cell.textContent = current_marker

        players_moves[current_player].push(cell.id)

        remove_first_step(players_moves[current_player])

        switch_active_user_toggle(`${current_player === 0 ? '0' : '1'}`)

        check_victory(players_moves[current_player])

        switch_player()

        // подсвечиваем первый ход текущего игрока красным, когда кол-во ходов в массиве равно трем, то есть игрок собирается сделать четвертый ход и ему подсвечивается его первый ход, который будет удален после данного хода
        if (players_moves[current_player].length === 3) {
          document.getElementById(players_moves[current_player][0]).style.color = 'red'
        }

      } else {
        console.log('Клетка уже занята!');
      }

    })

  })

}

const remove_first_step = function (arr__steps) {

  if (arr__steps.length === 4) {

    const first_cell = document.getElementById(arr__steps[0])
    first_cell.textContent = ''
    first_cell.style.color = '#bdb6b6'
    arr__steps.shift()

  }

}

const switch_player = function () {

  if (current_player === 0) {
    current_player = 1
  } else {
    current_player = 0
  }

  if (current_marker === 'x') {
    current_marker = '0'
  } else {
    current_marker = 'x'
  }

}


const check_victory = function (player_steps_arr) {

  winning_combinations.forEach(function (combination) {

    if (player_steps_arr.length >= 3) {

      if (
        player_steps_arr.includes(combination[0])
        && player_steps_arr.includes(combination[1])
        && player_steps_arr.includes(combination[2])

      ) {

        if (current_player === 0) {
          display_notifications('Player X win')
          highlight_winning_streak(combination[0], combination[1], combination[2])
          game_status = false

          // убираем выделение активного игрока из тоггла 
          switch_active_user_toggle('')

          players_wins_scores[current_player].push('+')
          display_players_scores(current_player, players_wins_scores[current_player])

        } else {
          display_notifications('Player 0 win')
          highlight_winning_streak(combination[0], combination[1], combination[2])
          game_status = false

          // убираем выделение активного игрока из тоггла 
          switch_active_user_toggle('')

          players_wins_scores[current_player].push('+')
          display_players_scores(current_player, players_wins_scores[current_player])

        }

      } else {

      }

    }

  })

}




// ?----- ЛОГИКА СБРОСА ИГРЫ ----- 


const reset_cells = function () {

  arr__cells.forEach(function (cell) {
    cell.textContent = ''
    cell.classList.remove('winner_cell')
    cell.style.color = '#bdb6b6'
  })

}


const reset_state = function () {

  current_player = 0
  current_marker = 'x'
  game_status = true

  players_moves = [
    [],
    []
  ]

  display_notifications('')

}

const reset_game = function () {
  reset_state()
  reset_cells()

  switch_active_user_toggle('1')

}



// ?----- UTILITS ----- 

const display_notifications = function (notification_text) {
  container_notifications.textContent = notification_text
}


const switch_active_user_toggle = function (id) {

  // при победе одного из игроков, убираем класс в обоих частя тоггла, становитяс не актвиным 
  if (!id) {
    document.getElementById('0').classList.remove('active_player_marker')
    document.getElementById('1').classList.remove('active_player_marker')
  }

  if (id === "0") {
    document.getElementById('0').classList.remove('active_player_marker')
    document.getElementById('1').classList.add('active_player_marker')
  } else if (id === "1") {
    document.getElementById('0').classList.add('active_player_marker')
    document.getElementById('1').classList.remove('active_player_marker')
  }

}



const highlight_winning_streak = function (id1, id2, id3) {

  document.getElementById(id1).classList.add('winner_cell')
  document.getElementById(id2).classList.add('winner_cell')
  document.getElementById(id3).classList.add('winner_cell')

}

const display_players_scores = function (id, scores_arr) {

  const score = scores_arr.length

  document.querySelector(`[score_pl="${id}"]`).textContent = `${score} wins`

}




// ?----- Event Listeners ----- 

btn__new_game.addEventListener('click', reset_game)




// ?----- Инициализация игры ----- 

create_playground_grid() // Создаём игровое поле

const arr__cells = document.querySelectorAll('.cell') // Сохраняем клетки

handling_player_step() // Подключаем обработчики для ходов по клеткам














// ?----- Test data ----- 

// const players_steps_test = [
//   ['1-1', '1-2', '1-3', '2-3'],
//   ['2-1', '2-2', '2-3']
// ]













