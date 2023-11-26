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
    try:
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    except:
        return Response({"error":serializer.errors}, status=404)

@api_view(['GET'])
def getUserById(request, pk):
    try:
        user = UserProfile.objects.get(uid=pk)
        serializer = UserProfileSerializer(user, many=False)
        return Response(serializer.data)
    except UserProfile.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


# Job Services

@api_view(['POST'])
def addJob(request):
        user_uid = request.data.get('user_uid')
        title = request.data.get('title')
        company = request.data.get('company')
        status = request.data.get('status')
        date_applied = request.data.get('date_applied')

        
        user_profile = UserProfile.objects.get(uid=user_uid)

        job_data = {
            'user': user_profile.pk,
            'title': title,
            'company': company,
            'status': status,
            'date_applied': date_applied,
        }

        serializer = JobSerializer(data=job_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"error": serializer.errors}, status=404)

@api_view(['GET'])
def getJobsById(request, pk):
    try:
        jobs = Job.objects.filter(user__uid = pk)
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
    except Job.DoesNotExist:
        return Response({"error": "Jobs not found"}, status=404)
