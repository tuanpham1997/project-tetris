ReadMe file for Tuan Pham's Tetris clone

The Tetris clone can be played in either of these sites:
https://tuanpham1997.github.io/
https://tetris-tuan.netlify.app/

The following tools and progamming languages used to create the tetris game:
Javascript
CSS
HTML
Canvas API

Instructions on how to play
---------------------------------
The goal of the game is to last as long as possible without stacking all the tetris pieces up to the top row. Players gain points by completely
filling a row stacking various tetris shapes, which would then clear the row from the board. The more rows cleared using a single tetris block, 
the more points are awarded to the player. The player's total points alongside total rows cleared are tracked and displayed on the left. 
The game will hold up to the last game's score for comparison. If the player reaches all the way to the top row with their tetris stack, the game will
restart and clear the board.

Controls
---------------------------------
Left arrow key: move piece left 1 space
Right arrow key: move piece right 1 space
Down arrow key: move piece down 1 space
Z key: rotate piece counterclockwise once
X key: rotate piece clockwise once
Spacebar: drop piece the furthest it can go vertically
S key: swap piece with a piece or save current piece if none are available. Can only be done once per new piece
P key: pause/unpause the game

Coding Approach
---------------------------------
In order to even have a game, there must be a way to display the board and playing pieces. I chose to create my game using the Canvas API to display
my game state. The next step was to determine how to store the 7 various tetris blocks (officially called T,L,J,Z,S,O, and I) in order to manipulate them
to behave similarly to tetris. I settled on arrays formatted in matrices for easier visualization with the logic that values of 0 are non-filled sections and
values of 1 are filled sections of arrays.
The board was set up in a similiar fashion as a 20 by 10 -- that is an array containing 20 arrays each with 10 items in each separate array-- all filled with
the value of 0. Using accessing logic of array[row][column] along with the built in methods of the Canvas API, I was able to recreate the look and feel of 
tetris.

Unsolved Problems
--------------------------------
Currently, if either my pause button or new game button is clicked and then spacebar is pressed, the eventlistener assumes another click happened and executes
its attached callback function. The background image of my whole site changes between 1 of 4 backgrounds once every 40 lines cleared, but there's a brief delay 
before the image loads. Before the image loads, the background is completely white.

Future Additions
--------------------------------
Currently, the game plays like vanilla tetris --I.e. blocks drop after a brief 1 second delay, you may rotate pieces clockwise or counterclockwise, save a piece
for future use, drop a piece early, clear lines by filling a row, and lose once the tetris stack reaches the top row.
I'd like to implement more modes in future commits. One may be a lightning fast mode where the 1 second delay before dropping is minimal but to counteract 
that a player may "stick" to a row by rotating a piece. Another mode is where after a certain condition is met, a nearly filled row missing 1 block will spawn
at the bottom to give the player an extra challenge of clearing.
