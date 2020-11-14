from rest_framework import serializers
from .models import User
from .validators import validate_username
from rest_framework.response import Response
from rest_framework import status

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'is_superuser')
        read_only_field = ('id')
        extra_kwargs = {'password': {'write_only': True}}

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'get_full_name', 'is_superuser')

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'get_full_name', 'is_superuser')
        read_only_fields = ('id', 'username', 'email', 'get_full_name', 'is_superuser')
        extra_kwargs = {'first_name': {'write_only': True}, 'last_name': {'write_only': True}}