document.addEventListener('DOMContentLoaded', () => {

  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0  //first div in grid
  let fruitIndex = 0    //first div in grid
  let currentSnake = [2, 1, 0]   // 2 -> head & 0 -> tail
  let direction = 1
  let score = 0
  let speed = 0.9    // initial speed
  let intervalTime = 0
  let interval = 0


  //to start, and restart the game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[fruitIndex].classList.remove('fruit')
    clearInterval(interval)
    score = 0
    randomFruit()  // randomly assigning the position to the fruit
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }


  //function that deals with all outcomes of the Snake
  function moveOutcomes() {

    //deals with snake hitting border or snake hitting self
    if (
      (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
      return clearInterval(interval) //this will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop() //removes last ite of the array and shows it
    squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

    //deals with snake getting fruit
    if (squares[currentSnake[0]].classList.contains('fruit')) {
      squares[currentSnake[0]].classList.remove('fruit')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomFruit()
      score++   // incrementing the score
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }


  //generate new fruit once fruit is eaten
  function randomFruit() {
    do {
      fruitIndex = Math.floor(Math.random() * squares.length)
    } while (squares[fruitIndex].classList.contains('snake')) //making sure apples dont appear on the snake
    squares[fruitIndex].classList.add('fruit')
  }


  //uUsing keycode for directions
  function control(e) {
    squares[currentIndex].classList.remove('snake')

    if (e.keyCode === 39) {
      direction = 1 //if we press the right arrow on our keyboard, the snake will go right side
    } else if (e.keyCode === 38) {
      direction = -width // if we press the up arrow, the snake will go back ten divs, appears to go up
    } else if (e.keyCode === 37) {
      direction = -1 // if we press left, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)

})
