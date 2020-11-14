from django.urls import path
from .views import RegisterUserView, UserDetailView, AuthUserView

app_name = 'users'

urlpatterns = [
    path('', RegisterUserView.as_view(), name='listcreate_user'),
    path('<int:pk>/', UserDetailView.as_view(), name='updateretrieve_user'),
    path('me/', AuthUserView.as_view(), name='auth_detail')
]