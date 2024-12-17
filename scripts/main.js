const container_playground_grid = document.querySelector('.playground_grid')
const container_notifications = document.querySelector('.notifications')
const btn__new_game = document.querySelector('.btn_new_game')


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


let in_marker = 'x'

let players_steps = [
  [],
  []
]

let current_player = 0

let game_status = true



const create_cell = function (row, col) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.id = `${row}-${col}`
  return cell
}


const create_playground_grid = function () {

  for (let row = 1; row <= 3; row++) {
    for (let col = 1; col <= 3; col++) {

      const cell = create_cell(row, col)
      container_playground_grid.appendChild(cell)

    }
  }

}


create_playground_grid()


const display_notifications = function (notification_text) {
  container_notifications.textContent = notification_text
}

display_notifications('X step')



const arr__cells = document.querySelectorAll('.cell')



const cell_make_step = function () {

  arr__cells.forEach(function (cell) {

    cell.addEventListener('click', function () {

      // проверяем чтобы клетка была пустой и нельхя было походить в клетку, которая уже занята
      if (cell.textContent === '') {

        if (!game_status) {
          console.log('Игра завершена!');
          return; // Блокируем действия, если игра закончена
        }


        cell.textContent = in_marker

        players_steps[current_player].push(cell.id)


        remove_first_step(players_steps[current_player])

        display_notifications(`${current_player === 0 ? 'O' : 'X'} step`)

        check_victory(players_steps[current_player])

        if (current_player === 0) {
          current_player = 1
        } else {
          current_player = 0
        }

        if (in_marker === 'x') {
          in_marker = '0'
        } else {
          in_marker = 'x'
        }

        console.log(players_steps);

        if (players_steps[current_player].length === 3) {

          console.log(players_steps[current_player][0]);

          document.getElementById(players_steps[current_player][0]).style.color = 'red'
        }



      } else {
        console.log('Клетка уже занята!');
      }

    })

  })

}


// const players_steps_test = [
//   ['1-1', '1-2', '1-3', '2-3'],
//   ['2-1', '2-2', '2-3']
// ]


const remove_first_step = function (arr) {


  if (arr.length === 4) {

    // console.log(arr[0]);

    document.getElementById(arr[0]).textContent = ''

    document.getElementById(arr[0]).style.color = '#bdb6b6'

    arr.shift()
  }

  // console.log(arr);

}






const new_game = function () {

  arr__cells.forEach(function (cell) {
    cell.textContent = ''
  })

  current_player = 0

  in_marker = 'x'

  players_steps = [
    [],
    []
  ]

  display_notifications('')

  game_status = true

  arr__cells.forEach(function (cell) {
    cell.classList.remove('winner_cell')
    cell.style.color = '#bdb6b6'
  })

}


const highlight_vinner_streak = function (id1, id2, id3) {

  document.getElementById(id1).classList.add('winner_cell')
  document.getElementById(id2).classList.add('winner_cell')
  document.getElementById(id3).classList.add('winner_cell')

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
          game_status = false

          highlight_vinner_streak(combination[0], combination[1], combination[2])

        } else {
          display_notifications('Player 0 win')
          highlight_vinner_streak(combination[0], combination[1], combination[2])
          game_status = false

        }


      } else {
        // console.log('No victore');
      }

    }


  })


}


cell_make_step()


btn__new_game.addEventListener('click', new_game)







