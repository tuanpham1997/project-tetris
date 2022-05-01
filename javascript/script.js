console.log('Hello')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
console.log(canvas)
// Tetris is a grid with a pre-set amount of columns and rows. Canvas dimensions will be scaled to my boxSize which is the size of one square. Looked up the scale method in MDN.
const rows = 20
const col = 10
const boxSize = 20
canvas.width = col*boxSize
canvas.height = rows*boxSize
ctx.scale(boxSize, boxSize)
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height)
for(let i=0; i< col; i++){
    if(i % 2 === 0){
        ctx.fillStyle = "gray"
        ctx.fillRect(i,0,1,canvas.height)
    }
}
// Tetrominoes!!!! After researching games that had grid arrangement like chess or checkers, decided to make Tetris using arrays in matrix format. The tetrominoes are called T,I,J,L,O,Z, and S.
const T = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
]
const O = [
    [1, 1],
    [1, 1]
]
const S = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
]
const Z = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
]
const J = [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
]
const L = [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
]
const I = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
// Drawing logic if given a tetromino. Using array accessing logic of array[row][column] === value of that coordinate, will draw the tetromino using forEach as it's an array and forEach simulates accessing the matrix in an (x,y) manner. 
// Canvas fillRect method syntax: fillRect(x, y, width, height)
// Therefore, tetris logic dictates it's 
// ctx.fillRect(row, column, 1, 1). ctx.scale takes care of the scaling way up there.

function drawPiece(piece){
    piece.forEach((row, y) => {
        row.forEach((val, x) => {
            if(val !== 0){
                ctx.fillStyle = 'pink'
                ctx.fillRect(x + 3, y, 1, 1)
            }})
    })
}
drawPiece(I)