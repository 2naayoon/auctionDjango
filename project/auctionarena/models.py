from django.db import models

# Create your models here.


class Market(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(blank=True, null=True, upload_to="image")
    price = models.IntegerField()

    def __str__(self) -> str:
        return self.title
