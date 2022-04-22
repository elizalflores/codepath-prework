# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Eliza Flores

Time spent: **29** hours spent in total

Link to project: (https://glitch.com/edit/#!/antique-delicious-woodpecker)

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [ ] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] "Start" and "Stop" buttons have their own static & lit colors
- [x] 4 difficulty buttons: "Easy", "Medium", "Hard", and "Endless"
- [x] Selected difficulty stays lit while game is being played
- [x] Features specific to Endless Mode: "Best Score" scoreboard & "Best Replay"
- [x] Specific win/lose audio & messages
- [x] Specific error/alert messages: 1) User clicks on "Best Replay" with no replay saved 2) User clicks "Start" before selecting difficulty
- [x] Disabled difficulty and "Best Replay" buttons once game starts
- [x] Disabled game buttons while clue sequence is being played
- [x] Hidden easter egg (a special song is played when a certain sequence of buttons are pressed: Green, Blue, Red, Green, Blue, Red)
- [ ] Best Replay animation (button will flash a few times after new best score) (chose not to implement)
- [ ] "Stop Replay" button & function

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![](gif1-link-here)
![](gif2-link-here)
![](gif3-link-here)
![](gif4-link-here)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
    - HTML/CSS/JS: [MDN](https://developer.mozilla.org/en-US/), [W3S](https://www.w3schools.com/), [StackOverflow](https://stackoverflow.com/), [YouTube](https://www.youtube.com/), [DigitalOcean](https://www.digitalocean.com/community/tutorials/css-align-justify#justify-content), [Programiz](https://www.programiz.com/javascript/examples/function-overloading#:~:text=In%20programming%2C%20function%20overloading%20refers,at%20the%20last%20gets%20executed.)
    - Color Codes: [HTML Color Codes](https://html-color.codes/purple), [Google Color Picker](https://g.co/kgs/S72M7M)
    - Rotating the images:[Pine Tools](https://pinetools.com/rotate-image)
    - Audio: [Noproblo - Zelda Sounds](http://noproblo.dayjo.org/ZeldaSounds/)
    - Inspiration: [2048](https://play2048.co/), the electronic Simon Says game, The Legend of Zelda video game series :bow_and_arrow: :shield:
    - User testing, gathering feedback, and bouncing ideas around: Friends & Family :family_man_woman_boy: :sparkling_heart:
    - General Project Help & Questions: CodePath Prework Support Slack Channel :iphone: :speech_balloon:

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
    - **Disabling Buttons**
  
      During the many iterations of playtesting, I realized that I had an issue where I was able to press the game buttons while the clue sequence played, accidentally sabatoging the run by either: confusing myself by interrupting the sequence or triggering a Game Over due to the "incorrect" guess. Since I know my peers might have considered this same issue, I decided to search through the CodePath Prework Support Slack Channel to see if anybody had already posted this issue.
      
      Luckily, I came across a thread that described the issue I looked for, and it was resolved (by the applicant themselves - kudos to them!). And even luckier was that they were encouraged by the TA to post a hint for other applicants to see. Using that hint, I realized that I needed to modify both my CSS and JS code to implement this feature: I needed to add an element to disable mouse-clicks and figure out where to trigger that element in my logic. In addition, I had to decide how long these buttons would need to be disabled (another key hint). After I found the right spot in my logic, I just had to figure out the timeout equation and disable the buttons for that duration while the clue sequence ran.
      
      (Once implemented, I used this key function in other ways, namely adjusting the audio and custom message pop up for smoother transitions.)
    - **Formatting "Best Score" & "Best Replay"**
  
      Once I decided to implement the Endless difficulty mode, I knew I wanted to display a scoreboard (the idea for adding the replay feature came later). Once I had my buttons created in HTML, I struggled with formatting the buttons in the way I wanted on the page (centered, above the game itself, placed on the right side with the informational text on the left - the inspiration came from seeing 2048's scoreboard & text layout).
      
      I spent a good amount of time referencing 2048 (using the inspect tool - F12) and using the various HTML/CSS/JS tools listed above to try and find out what elements I needed to add or modify to get my desired styling. Eventually, I came across the CSS grid layout (initially with DigitalOcean) and decided to explore that option. The final result is a culmination of all these resources and trial & error.
    
3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
    - **How do frameworks improve my code?**

      I understand the general idea and concept behind frameworks, but I would like to see how they are actually implemented for a better understanding. Ideally, the best way for me to learn and try myself.
      
      (On that note, I would love to find/experiment with CSS frameworks. While making and learning how to make style adjustments, I found the constant trial & error of making minor adjustments tedious. I understand this is due to having little to no experience in CSS beforehand, so I would like to learn how to use a framework and gain better web development practices.)
      
    - **How do you work up to implementing complicated features?**
    
      While working on this project, I began to gain an understanding on how all of these elements (HTML, CSS, and JavaScript) work together. As time progressed, I saw myself getting more comfortable with the development environment - learning how to use the Inspect tool (F12) to review certain elements and debug with the console.log() were major tools in the process.
      
      However, when it comes to complicated websites and features how are they approached/implemented on a bigger scale? How do they all work together efficiently? Aside from gaining personal experience, is there a standardized and structured approach to this?
    
    - **Is mobile development similar to web development?**
    
      One area I am particularly interested in is mobile development. Having worked on this program, to make my it more mobile-friendly, would I develop it in a similar way using mobile tools? How similar are mobile and web development? Is it best to learn both?
      
      (I learned mobile apps can be web, hybrid, or native. I understand that choosing one depends on the needs/purpose of app, but is there a preference or trend in the current market? Why?)
    
4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
    - **setTimeout() length for disabling buttons**
      
      My feature that disabled the game buttons for the duration of the clue sequence does not work as fully intended. Due to my timeout equation, if the clue sequence is less than or equal to 3 (give or take), the user can still press a game button mid clue sequence - the buffer time is not adequate for low clue sequences. I would like to find a better equation to properly disable the game buttons for the entire duration of the clue sequence.

    - **Game button tone plays indefinitely when user clicks and drags off said button**
      
      I have a feeling this comes from the way HTML and JavaScript work together on the events "onmousedown" and "onmouseup". Since "onmouseup" happens outside of the button, the tone will play indefinitely. Pressing any game button after this will get the continuous tone to stop. I would like to prevent this from happening.

    - **Implement the Win Animation**
      
      As I mentioned above, I implemented a win animation when the user gets a new best score: the "Best Replay" button would flash on/off to visually indicate the win. Using setInterval() and setTimeout(), I managed to get the button to flash 2 or 3 times; however, I was not confident in the length of time it took to run that code block and properly animate enough times at the speed I desired. At the time, I still had many other features to implement and prioritize, so I decided to remove this feature and come back to it later (unfortunately, I wasn't able to).

    - **"Stop Replay" button**
      
      A friend suggested a button to stop the replay sequence. While I could theorize the logic, I could not find a solution to stop the sequence from running mid loop.



## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright [Eliza Flores]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
