from rest_framework import serializers
from .models import *

class User_serializer(serializers.ModelSerializer):
    uid = serializers.IntegerField(source='id')  # Map 'id' to 'uid'
    name = serializers.CharField(source='username')  # Map 'username' to 'name'

    class Meta:
        model = User
        fields = ['uid', 'name', 'email', 'password', 'phno', 'dob', 'gender', 'location', 'profession', 'linkedin_url', 'github_url']

class SnippetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippets
        fields = '__all__'

class ProblemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problems
        fields = '__all__'

class TestcaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testcase
        fields = ['tid', 'tinput', 'toutput', 'status', 'pid']

class SolvedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solved
        fields = '__all__'