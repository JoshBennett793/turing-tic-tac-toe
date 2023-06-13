<div align="center">

# Tic-Tac-Toe
**Created by [Josh Bennett](https://www.linkedin.com/in/joshua-bennett793)**
  
</div>

## 📝 Description

This Tic-Tac-Toe application is a recreation of the classic Tic-Tac-Toe game we all know and love. Players take turns placing their token on the gameboard in an attempt to place their token in 3 grid squares in a row. First to place 3 tokens in a row wins!

## 🧑‍💻 Set Up

1. Clone this repo to your local machine by running the command
`git clone git@github.com:JoshBennett793/turing-tic-tac-toe.git`
2. Type  `cd turing-tic-tac-toe` to move into the root directory
3. Open the application in your browser by running the command `open index.html`
4. Have fun playing Tic-Tac-Toe!

## 📚 Learning Goals
- Solidify and demonstrate my understanding of:
    - DRY JavaScript
    - event delegation to handle similar event listeners
- Understand the difference between the data model and how the data is displayed on the DOM
- Iterate through/filter DOM elements using only for loops
- Use a problem solving process to break down large problems, solve things step by step, and not rely on an outside “answer” to a logical challenge

## 🎥 Videos
<details open>
  <summary> ⚙️ Functionality </summary>
  
  | Description | Screenshot |
  |------------ | -----------|
  | <h3 align="center">X wins! | ![x wins](assets/ttt-x-wins.gif)
  | <h3 align="center">Tie Game! | ![tie game](assets/ttt-tie-game.gif)

</details>

## 💻 Technologies Used
  
![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript) 
![HTML5](https://img.shields.io/badge/-HTML5-05122A?style=flat&logo=html5)
![CSS3](https://img.shields.io/badge/-CSS-05122A?style=flat&logo=css3)
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)
![Github](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)
![VSCode](https://img.shields.io/badge/-VS_Code-05122A?style=flat&logo=visualstudio)
  
## 🧘‍♂️ Reflections
<details open>
  <summary> </> Code Architecture </summary>

  - I implemented an event-driven architecture by incorporating event listeners that updated the data model and manipulated the DOM accordingly. I isolated functionality pertaining to the data model from DOM manipulation functions in order to achieve better modularity and maintainability.

  - I made use of object key methods that update local data model objects using the `this` keyword. I did this to encapsulate functionality to a specific state variable and manage that state in other areas of the codebase. I chose this route as opposed to writing nested functions in order to expose that state variable and allow access to it in other functions. 

</details>
<details open>
  <summary> 🎉 Wins </summary>

  1. I felt the urge to use JavaScript's built-in array methods wherever possible but challenged myself to accomplish the most of the same tasks by writing for loops to perform the same functionality. What I could write in ~2 lines of code I accomplished with ~40 lines of code. This forced me to get closer to the code and really consider how and why I was storing and manipulating my data.

  2. My code is many times more DRY and my workflow processes have been vastly improved from when I wrote my first [tic-tac-toe](https://github.com/JoshBennett793/tic-tac-toe) application 9 months ago. I used GitHub Projects for the first time on this project and I found it to be immensely helpful in keeping me from getting side-tracked with other tasks and providing for a central location to track my progress throughout the building of this application.

</details>
<details open>
  <summary> 🤔 Challenges </summary>
  
  1. A challenge I was met with during this project was in my attempt to add more documentation to the codebase. I had become accustomed to not providing any sort of documentation in my code given that no one was ever reviewing or collaborating with me on a single codebase. Since software development is a team effort and requires communication via clean, readable code and clarifying documentation, I made steps toward improving on where and what to communicate in my documentation.

  2. Another challenge I faced was in what I named my functions and variables and in precisely what variables I decided to make global and what to keep local. I feel this is an area that needs some improvement. I believe I could refactor some of the functions to make use of local variables and pass those along to other functions rather than cloud the global namespace.

</details>
