from django.contrib import admin
from .models import Item, UserProfile, Job
# Register your models here.
admin.site.register(Item)
admin.site.register(UserProfile)
admin.site.register(Job)
