

function decodeAnswers() {
    const codedAnswers = JSON.parse(document.querySelector("#array").textContent)
    correctAnswers = [];

    codedAnswers.forEach(answer => {
        decodedAnswer = "";
        for (let i = 0; i < answer.length; i++) {
            letter = String.fromCharCode(answer[i].charCodeAt(0) - 5);
            decodedAnswer += letter;
        }
        correctAnswers.push(decodedAnswer);
    });
    checkBtnAnswer(correctAnswers);
}


function checkBtnAnswer(correctAnswers) {
    const optionBtns = document.querySelectorAll(".option a");
    let counterCorrectAnswers = 0;
    let counterAllQuestions = 0;

    optionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            for (let i = 0; i <= optionBtns.length; i ++) {
                // Match index number to actual btn number, hence i + 1
                if (btn.classList.contains(`btn-${i + 1}`)) {
                    let allOptions = btn.parentElement.parentElement.children;
                    let message = document.querySelector(`.message-${i + 1}`);

                    btn.style.backgroundColor = "#f1f1f1";
                    btn.style.color = "#1a1a1a";
                    if (btn.nextElementSibling.innerText
                            === correctAnswers[i]) {
                        for (let i = 0; i < allOptions.length; i++) {
                            if (allOptions[i] !== btn.parentElement) {
                                allOptions[i].style.opacity = .5;
                            }
                        }
                        message.style.opacity = 1;
                        message.innerText = "Correct!";
                        counterCorrectAnswers += 1;
                        counterAllQuestions += 1;
                    } else {
                        for (let i = 0; i < allOptions.length; i++) {
                            allOptions[i].style.opacity = .5;
                        }
                        message.innerText = "Sorry, incorrect.";
                        counterAllQuestions += 1;
                    }
                    // Disable question options after click
                    for (let i = 0; i < allOptions.length; i++) {
                        allOptions[i].style.pointerEvents = "none";
                    }
                }
            }
            if (counterAllQuestions === correctAnswers.length) {
                const score = document.querySelector("#score-container");
                score.scrollIntoView({behavior: "smooth", block: "start"});
                showCalculating(counterCorrectAnswers, counterAllQuestions);
            }
        });
    });
}


function showCalculating(counterCorrectAnswers, counterAllQuestions) {
    const scoreSprite = document.querySelector("#score-sprite");
    const calculatingScore = document.querySelector("#calculating-score");
    const dotsSpan = document.querySelector("#dots");

    scoreSprite.style.display = "none";

    setTimeout(() => {
        calculatingScore.style.display = "block";
        addDots = setInterval(() => {
            dotsSpan.innerText += " .";
            if (dotsSpan.innerText.length === 8) {  // 4 spaces, 4 dots
                clearInterval(addDots);
                showFinalScore(counterCorrectAnswers, counterAllQuestions);
            }
        }, 1000);
    }, 1000);
}


function showFinalScore(counterCorrectAnswers, counterAllQuestions) {
    // calculatingScore contains calculating score message:
    const calculatingScore = document.querySelector("#calculating-score");
    // scoreResults contains score-circle and score-message elements:
    const scoreResults = document.querySelector("#score-results");
    const scoreCircleText = document.querySelector("#score-circle p");
    const scoreMessage = document.querySelector("#score-message");

    calculatingScore.style.display = "none";
    scoreResults.style.display = "flex";
    scoreCircleText.innerText = `${counterCorrectAnswers}/${counterAllQuestions}`;

    if (counterCorrectAnswers === 10) {
        scoreMessage.innerText = "Excellent!";
    } else if (counterCorrectAnswers >= 8) {
        scoreMessage.innerText = "Great job!";
    } else if (counterCorrectAnswers >= 6) {
        scoreMessage.innerText = "Pretty good!";
    } else {
        scoreMessage.innerText = "You'll do better next time!";
    }
}


window.addEventListener("DOMContentLoaded", decodeAnswers);
