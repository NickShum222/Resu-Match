from django.http import Http404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.http import JsonResponse
from base.models import UserProfile, Job
from .serializers import UserProfileSerializer, JobSerializer, ResumeSerializer


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
# Need api view to link job to resume id
    # Given resume id & job id, change the job column to the resume id
# Unlink resume to job?

#Get all jobs by Resume Id

#Need service that updates job data


@api_view(['POST'])
def addJob(request):
    try:
        user_uid = request.data.get('user_uid')
        title = request.data.get('title')
        company = request.data.get('company')
        status = request.data.get('status')
        date_applied = request.data.get('date_applied')

        # Attempt to get the user profile based on the provided user_uid
        try:
            user_profile = UserProfile.objects.get(uid=user_uid)
        except UserProfile.DoesNotExist:
            raise Http404("User profile does not exist")

        job_data = {
            'user': user_profile.pk,
            'title': title,
            'company': company,
            'status': status,
            'date_applied': date_applied,
        }

        serializer = JobSerializer(data=job_data)
        
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    except Exception as e:
        return Response({"error": str(e)}, status=500)



@api_view(['GET'])
def getJobsByUserId(request, pk):
    try:
        jobs = Job.objects.filter(user__uid = pk)
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
    except Job.DoesNotExist:
        return Response({"error": "Jobs not found"}, status=404)

@api_view(['PUT'])
def editJobByUserId(request, pk):
    try:
        job = Job.objects.filter(id=pk)
    except Job.DoesNotExist:
        return Response({"error": "Jobs not found"}, status=404)
    
    serializer = JobSerializer(job, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=404)

@api_view(['DELETE'])
def deleteJobById(request, pk):
    try:
        job = Job.objects.filter(user__uid = pk)
        job.delete()
        return Response({"success": "Job deleted successfully"}, status=200)
    except Job.DoesNotExist:
        return Response({"error": "Job not found"}, status=404)

# Resume Services

@api_view(['POST'])
def addResume(request, pk):
    try:
        try:
            user = UserProfile.objects.get(uid=pk)
        except UserProfile.DoesNotExist:
            raise Http404("User profile does not exist")
    
        file_data = request.data.get('file')
        if not file_data:
            return Response({"error": "File data is required"}, status=400)
        
        serializer = ResumeSerializer(data={
            'user': user.id,
            'description': file_data.name,
            'file': file_data
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)
    except:
        return Response({"error": "Resume upload failed"}, status=404)
#Need service to upload resume
    #check if there are other resumes of the same name

#Need service to delete resumes
    #If delete resume, unlink all related jobs that have that resume id and change it to null

#Need service to update the resume data
