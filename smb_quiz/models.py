from django.db import models


class Question(models.Model):
    question = models.TextField()
    answer = models.TextField()
    wrong_answer_1 = models.TextField()
    wrong_answer_2 = models.TextField()

    def __str__(self):
        return self.question
