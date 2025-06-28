from django.db import models
import uuid
from django.db import models

class Note(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course_name = models.CharField(max_length=100)
    course_id = models.CharField(max_length=20)
    semester = models.CharField(max_length=20)
    creator = models.CharField(max_length=100)
    filename = models.CharField(max_length=255)
    peer_ip = models.GenericIPAddressField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.filename} by {self.creator}"


