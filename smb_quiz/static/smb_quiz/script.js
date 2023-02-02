const optionBtns = document.querySelectorAll(".option a");
const codedAnswers = JSON.parse(
    document.getElementById("array").textContent)


function decodeAnswers() {
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
    optionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            for (let i = 0; i <= optionBtns.length; i ++) {
                // Match index number to actual btn number, hence i + 1
                if (btn.classList.contains(`btn-${i + 1}`)) {
                    let allOptions = btn.parentElement.parentElement.children;
                    let message = document.querySelector(`#message-${i + 1}`);

                    console.log(allOptions);
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
                    } else {
                        for (let i = 0; i < allOptions.length; i++) {
                            allOptions[i].style.opacity = .5;
                        }
                        message.innerText = "Sorry, incorrect.";
                    }
                    for (let i = 0; i <= allOptions.length; i++) {
                        allOptions[i].style.pointerEvents = "none";
                    }
                }
            }
        });
    });
}

window.addEventListener("DOMContentLoaded", decodeAnswers);
// window.addEventListener("DOMContentLoaded", checkBtnAnswer);
