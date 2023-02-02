import random

from django.shortcuts import render


db = [
    {
        "question": "What color are Mario's overalls in Super Mario Bros.?",
        "answer": "Red",
        "wrong_answer_1": "Olive green",
        "wrong_answer_2": "Blue"
    },
    {
        "question": "Who is the strongest character in Super Mario Bros. 2?",
        "answer": "Toad",
        "wrong_answer_1": "Mario",
        "wrong_answer_2": "Luigi"
    },
    {
        "question": "What creature is Bowser actually revealed to be after Mario defeats him with fireballs in World 1 of Super Mario Bros.?",
        "answer": "A Goomba",
        "wrong_answer_1": "A Koopa Troopa",
        "wrong_answer_2": "Luigi"
    }
]


def index(request):
    return render(request, "smb_quiz/index.html")


def quiz(request):
    # This will be done with objects, not dictionaries:
    num = 1
    questions = []
    correct_answers = []
    for q in db:
        correct = q["answer"]
        correct_answers.append(correct)
        answers = [
            q["answer"], q["wrong_answer_1"], q["wrong_answer_2"]
        ]
        random.shuffle(answers)
        question_answers = num, q["question"], answers
        questions.append(question_answers)
        num +=1

    # Silly little encryption so answers aren't readily visible
    # in dev tools :)
    coded_answers = []
    for answer in correct_answers:
        a = ""
        for letter in answer:
            letter = chr(ord(letter) + 5)
            a += letter
        coded_answers.append(a)

    context = {
        "questions": questions,
        "array": coded_answers
    }

    return render(request, "smb_quiz/quiz.html", context)
