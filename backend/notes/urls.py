from django.urls import path
from .views import NoteListCreateView

urlpatterns = [
    path('', NoteListCreateView.as_view(), name='notes-list-create'),  # Handles POST and GET
]
