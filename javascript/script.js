console.log('Hello')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
console.log(canvas)
// Tetris is a grid with a pre-set amount of columns and rows. Canvas dimensions will be scaled to my boxSize which is the size of one square. Looked up the scale method in MDN.
const rows = 20
const col = 10
const boxSize = 20
canvas.width = col * boxSize
canvas.height = rows * boxSize
ctx.scale(boxSize, boxSize)

// Tetrominoes!!!! After researching games that had grid arrangement like chess or checkers, decided to make Tetris using arrays in matrix format. The tetrominoes are called T,I,J,L,O,Z, and S.
const T = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
]
const O = [
    [2, 2],
    [2, 2]
]
const S = [
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0]
]
const Z = [
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0]
]
const J = [
    [5, 0, 0],
    [5, 5, 5],
    [0, 0, 0]
]
const L = [
    [0, 0, 6],
    [6, 6, 6],
    [0, 0, 0]
]
const I = [
    [0, 0, 0, 0],
    [7, 7, 7, 7],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
// Drawing logic if given a tetromino. Using array accessing logic of array[row][column] === value of that coordinate, will draw the tetromino using forEach as it's an array and forEach simulates accessing the matrix in a (y,x) manner. 
// Canvas fillRect method syntax: fillRect(x, y, width, height)
// Therefore, tetris logic dictates it's 
// ctx.fillRect(row, column, 1, 1). ctx.scale takes care of the scaling way up there.
const currentPiece = {
    x: 4,
    y: 0,
    shape: T,
}
let bag = [T, T, T, T, O, O, O, O, L, L, L, L, S, S, S, S, Z, Z, Z, Z, I, I, I, I, J, J, J, J]
const nextPiece = ['red']
const board = []
for (let y = 0; y < rows; y++) {
    // further research made the for x loop obsolete. Array() takes in desired length as the argument.
    board.push(new Array(col))
    board[y].fill(0)
    // for(let x = 0; x < col; x++){
    //     // board[y][x] = 0
    // }
}
function checkColor(val){
    switch(val){
        case 1: return 'purple'
        case 2: return 'yellow'
        case 3: return 'green'
        case 4: return 'red'
        case 5: return 'blue'
        case 6: return 'orange'
        case 7: return 'cyan'
        default: return 'pink'
    }
}

function changePiece(piece) {
    if (nextPiece.length === 1) {
        nextPiece.push(bag.splice(Math.floor(Math.random() * bag.length), 1))
    }
    piece.shape = nextPiece.pop()
    piece.shape = piece.shape.pop()
    nextPiece.push(bag.splice(Math.floor(Math.random() * bag.length), 1))
    if (bag.length < 1) {
        bag = [T, T, T, T, O, O, O, O, L, L, L, L, S, S, S, S, Z, Z, Z, Z, I, I, I, I, J, J, J, J]
    }
    if (nextPiece.length === 1) {
        nextPiece.push(bag.splice(Math.floor(Math.random() * bag.length), 1))
    }
}
changePiece(currentPiece)
function reset(piece) {
    changePiece(piece)
    // console.log(piece.shape)
    piece.x = 4
    piece.y = 0
    if (checkOccupied(board, piece)) {
        board.forEach(row => (row.fill(0)))
    }
    // console.log(bag)
    // console.log(nextPiece)
    // console.log(currentPiece.shape)
}

function drawPiece(piece, move) {
    piece.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) {
                ctx.fillStyle = checkColor(val)
                ctx.fillRect(x + move.x, y + move.y, 1, 1)
            }
        })
    })
}
// I've decided to make another array to save my values to simulate tetrominoes freezing in place. The array will be a matrix like the tetrominoes but in 20x10 dimensions. Reminder :increasing y value increases the row count while x increases column count.
// This for loop is to create my board. Using similiar accessing logic as my drawPiece function to make my board matrix. Looked up how to make an array, using new Array() method
// console.log(board)
function drawBoard(board) {
    board.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) {
                ctx.fillStyle = checkColor(val)
                ctx.fillRect(x, y, 1, 1)
            }
        })
    })
}
function drawGame() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < col; i++) {
        if (i % 2 === 0) {
            ctx.fillStyle = "gray"
            ctx.fillRect(i, 0, 1, canvas.height)
        }
    }
    drawBoard(board)
    drawPiece(currentPiece.shape, currentPiece)
}
let timeNow = 0
let lastTime = 0
let timeDiff = 0

function dropPiece(time) {
    currentPiece.y++
    // console.log(checkOccupied(board, currentPiece))
    if (checkOccupied(board, currentPiece)) {
        currentPiece.y--
        freeze(board, currentPiece)
        reset(currentPiece)
    }
    return lastTime = time
}

function update(time) {
    // let lastTime = 0 If I did this, the requestAnimationFrame function will continuously set my variable to 0. Put it outside.
    timeNow = time
    timeDiff = timeNow - lastTime
    // console.log(timeDiff)
    if (timeDiff > 1000) {
        dropPiece(timeNow)
    }
    drawGame()
    requestAnimationFrame(update)
}
update()
// using logic established in drawPiece to access currentPiece and copy it to my game board
function freeze(board, piece) {
    piece.shape.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0)
                board[y + currentPiece.y][x + currentPiece.x] = val
        })
    })
    // console.log(board)
}
function checkOccupied(board, piece) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] !== 0 &&
                (board[y + piece.y] && board[y + piece.y][x + piece.x]) !== 0) {
                return true
            }
        }
    }
    return false
}
console.log(board)
// const T = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ]
// const T = [
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9]
// ]
// const T = [
//     [7, 4, 1],
//     [8, 5, 2],
//     [9, 6, 3]
// ]
function rotate(piece, direction) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < y; x++) {
            [piece.shape[y][x], piece.shape[x][y]] = [piece.shape[x][y], piece.shape[y][x]]
        }
    }
    if (direction > 0) {
        piece.shape.forEach(array => {
            array.reverse()
        })
        // console.log(piece)
    } else if (direction < 0) {
        piece.shape.reverse()
        // console.log(piece)
    }
    // console.log(piece.shape)
}
// rotate(currentPiece, 1)
// rotate(currentPiece, -1)
function rotateCurrentPiece(direction) {
    const originalX = currentPiece.x
    let buffer = 1
    rotate(currentPiece, direction)
    while (checkOccupied(board, currentPiece)) {
        currentPiece.x += buffer
        buffer = -(buffer + (buffer > 0 ? 1 : -1))
        if (buffer > currentPiece.shape.length) {
            rotate(currentPiece, -direction)
            currentPiece.x = originalX
            return
        }
    }
}
function move(direction) {
    currentPiece.x += direction
    if (checkOccupied(board, currentPiece)) {
        currentPiece.x -= direction
    }
}
function dropDown(event) {
    while (!checkOccupied(board, currentPiece)) {
        currentPiece.y++
    }
    currentPiece.y--
    // dropPiece(timeNow)
}
function movePiece(event) {
    // console.log(event) //Consoled to check event properties to use for movement. Decided on keyCode
    // keyCodes are 37 : leftArrow, 39 : rightArrow, 40 : downArrow,88: x, 90: z, 32: space
    if (event.keyCode === 37) {
        move(-1)
    } else if (event.keyCode === 39) {
        move(1)
    } else if (event.keyCode === 40) {
        dropPiece(timeNow)
        timeDiff = 0
    } else if (event.keyCode === 88) {
        rotateCurrentPiece(1)
    } else if (event.keyCode === 90) {
        rotateCurrentPiece(-1)
    } else if (event.keyCode === 32) {
        dropDown(event)
    }
}
document.addEventListener('keydown', movePiece)