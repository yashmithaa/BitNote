from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def create(self, request, *args, **kwargs):
        # Log or process metadata here
        print(f"Received metadata: {request.data}")
        return super().create(request, *args, **kwargs)

# Create your views here.
