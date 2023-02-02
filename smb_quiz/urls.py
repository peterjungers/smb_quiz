from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="smb-quiz-index"),
    path("quiz/", views.quiz, name="smb-quiz-quiz"),
]