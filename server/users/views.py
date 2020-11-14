from django.shortcuts import render, Http404
from django.http import JsonResponse
from rest_framework import generics
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer, UserDetailSerializer, UserUpdateSerializer

class RegisterUserView(views.APIView):
    def get(self, request):
        objects = User.objects.all()
        serializer = UserDetailSerializer(objects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        errors = {}

        try:
            username = request.data['username']
        except KeyError:
            errors['username'] = ['username is required']

        
        try:
            username = request.data['email']
        except KeyError:
            errors['email'] = ['email is required']

        try:
            password = request.data['password']
        except KeyError:
            errors['password'] = ['password is required']
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            password2 = request.data['password2']
        except KeyError:
            errors['password2'] = ['password2 is required']
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        if password != password2:
            errors['password2'] = ['passwords don\'t match']
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        request.data.pop('password2')

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        print(pk)
        print(request.data)



class UserDetailView(views.APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserUpdateSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AuthUserView(views.APIView):
    def get(self, request, format=None):
        permission_classes = [IsAuthenticated]
        user = request.user

        if user.__str__() == "AnonymousUser":
            return Response({},status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = UserDetailSerializer(user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, format=None):
        permission_classes = [IsAuthenticated]
        user = request.user

        if user.__str__() == "AnonymousUser":
            return Response({},status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = UserUpdateSerializer(user, request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)