from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

from .validators import validate_username

class UserManager(BaseUserManager):
    def create(self, username, email, password, **kwargs):
        user = self.model(email=self.normalize_email(email), username=username, **kwargs)
        try:
            is_superuser = kwargs['is_superuser']
            if is_superuser == True:
                user.is_staff = True
        except KeyError:
            user.is_staff = False

        user.set_password(password)

        user.save()
        
        return user

class User(AbstractUser):
    username = models.CharField(max_length=30, unique=True, validators=[validate_username])
    email = models.EmailField(max_length=255, unique=True)
    objects = UserManager()

    def __str__(self):
        return self.username

    @property
    def get_full_name(self):
        full_name = f'{self.first_name} {self.last_name}'
        full_name = full_name.strip()
        if full_name == ' ':
            full_name = ""

        return full_name
