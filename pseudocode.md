Foundations first

List of needed things for Tetris:
1. Setup the 7 tetrominoes to interact with along with initial board state
--Lots of arrays are required. Looking into other grid-like such as chess could give me an idea on how to draw tetris.
2. Figure out the clockwise or counter-clockwise rotation of standard Tetris
3. How to advance game state: lower the selected tetromino 1 line after a brief interval
-- Based on the video, will use requestAnimationFrame. Seems that it auto plays the function if you self callback. Useful to setup a time.
4. Figure out how to register collision with other pieces and the game walls
-- Decided to follow the same logic I've been using and treat Tetris's grid as either "filled" or "not filled" based on the array's value (either 1 or 0).
5. Keep tetromino placement and get the next piece
-- Using new Array method, convert my whole playing board as an array to match the data type of my tetrominoes. Using some array logic, I could save these values from one array to another. 
6. Register and clear completed rows

To-do:
Learned how to use canvas to display game -- https://www.youtube.com/watch?v=gm1QtePAYTM Learned how to potentially "animate" player's object, how to move objects in canvas, and how to potentially code event listeners using keys for input