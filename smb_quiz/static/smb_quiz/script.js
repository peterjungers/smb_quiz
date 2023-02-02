const optionBtns = document.querySelectorAll(".option a");
const correctAnswers = JSON.parse(document.getElementById("correctAnswers").textContent)

function checkBtnAnswer() {
    optionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            for (i = 0; i <= optionBtns.length; i ++) {
                if (btn.classList.contains(`btn-${i}`)) {
                    console.log(`btn-${i}`);
                    console.log(correctAnswers[i]);
                    if (btn.nextElementSibling.innerText === correctAnswers[i]) {
                        console.log("hi");
                    }
                }
            }
        });
    });
}

window.addEventListener("DOMContentLoaded", checkBtnAnswer);
