from django.db import models

# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    email = models.EmailField(max_length=200, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    uid = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.email


class Resume(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    resume_data = models.TextField()

    def __str__(self):
        return self.user.email

class Job(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    resume = models.ForeignKey(Resume, on_delete=models.PROTECT, null=True)
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    date_applied = models.DateTimeField()
    status = models.CharField(max_length=200)

    def __str__(self):
        return self.title





    

