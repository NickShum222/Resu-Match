from django.contrib import admin
from .models import Item, UserProfile, Job, Resume
# Register your models here.
admin.site.register(Item)
admin.site.register(UserProfile)
admin.site.register(Job)
admin.site.register(Resume)