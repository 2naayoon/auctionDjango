from django.db import models

# Create your models here.


class Market(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    content = models.TextField()
    # image 말고 image src 가져와서 바로 보여줘야하나 싶음
    # image = models.ImageField(blank=True, null=True, upload_to="image")
    product_src = models.TextField()
    image_src = models.TextField()
    price = models.IntegerField()

    def __str__(self) -> str:
        return self.title
