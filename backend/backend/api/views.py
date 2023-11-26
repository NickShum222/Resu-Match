from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.http import JsonResponse
from base.models import Item, UserProfile, Job
from .serializers import ItemSerializer, UserProfileSerializer, JobSerializer

@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addItem(request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

# User Profile Services

@api_view(['POST'])
def addUser(request):
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


# Job Services

@api_view(['POST'])
def addJob(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

# @api_view(['GET'])
# def getJobsById(request):
#     jobs = Job.objects.filter(user=request.GET['user'])
#     serializer = JobSerializer(jobs, many=True)
#     return Response(serializer.data)
