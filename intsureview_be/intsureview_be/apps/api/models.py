from django.db import models


class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    color = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)