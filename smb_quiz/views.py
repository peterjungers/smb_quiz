# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
# Program name:     Super Mario Bros. quiz
# Version:          1.0
# Author:           Peter Jungers
# Date:             January/February 2023
# Description:      Quiz about Super Mario Bros., Super Mario Bros. 2,
#                   Super Mario Bros. 3; based on an early Python project
#                   from the summer of 2022.
# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


import random
from django.shortcuts import render
from .models import Question


def index(request):
    return render(request, "smb_quiz/index.html")


def quiz(request):
    # Get unique numbers to use as id numbers:
    ids_to_query = []
    while len(ids_to_query) < 10:
        id = random.randrange(1, 51)
        if id not in ids_to_query:
            ids_to_query.append(id)

    # Query database using those primary key id numbers:
    questionObjects = []
    for id in ids_to_query:
        question = Question.objects.get(pk=id)
        questionObjects.append(question)

    # Separate each Question object so answers can be shuffled:
    num = 1
    questions = []
    correct_answers = []
    for q in questionObjects:
        correct = q.answer
        correct_answers.append(correct)
        answers = [
            q.answer, q.wrong_answer_1, q.wrong_answer_2
        ]
        random.shuffle(answers)
        # Question number, the question, the question's three answer choices:
        num_question_answers = num, q.question, answers
        questions.append(num_question_answers)
        num +=1

    # Silly little encryption so correct answers
    # aren't readily visible in dev tools :)
    coded_answers = []
    for answer in correct_answers:
        coded_answer = ""
        for letter in answer:
            letter = chr(ord(letter) + 5)
            coded_answer += letter
        coded_answers.append(coded_answer)

    context = {
        "questions": questions,
        "array": coded_answers
    }

    return render(request, "smb_quiz/quiz.html", context)
