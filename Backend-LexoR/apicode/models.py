from django.db import models

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)  # Matches Long id with AutoField
    username = models.CharField(max_length=200, null=True)  # Renamed from 'name'
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=200)
    phno = models.CharField(max_length=50, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    profession = models.CharField(max_length=100, null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    github_url = models.URLField(null=True, blank=True)

    class Meta:
        db_table = 'user'



class Problems(models.Model):

    pid=models.AutoField(primary_key=True)
    pname=models.CharField(max_length=500)
    pdesc=models.CharField(max_length=1000)
    pconstraint=models.CharField(max_length=100)
    plevel=models.CharField(max_length=100,default="")
    pyoutube=models.CharField(max_length=200,default="")
    particle=models.CharField(max_length=200,default="")
    pinput=models.CharField(max_length=200,default="")
    poutput=models.CharField(max_length=200,default="")

class Snippets(models.Model):
    sid=models.AutoField(primary_key=True)
    snippets=models.TextField()
    pid=models.ForeignKey(Problems,on_delete=models.CASCADE,null=True)
    language=models.CharField(max_length=20,null=True)

class Testcase(models.Model):
    tid=models.AutoField(primary_key=True)
    tinput=models.CharField(max_length=200)
    toutput=models.CharField(max_length=200)
    status=models.CharField(max_length=200)
    pid=models.ForeignKey(Problems,on_delete=models.CASCADE)

class Solved(models.Model):
    sid = models.AutoField(primary_key=True) 
    uid = models.ForeignKey(User, on_delete=models.CASCADE) 
    pid = models.ForeignKey(Problems, on_delete=models.CASCADE)
    code = models.TextField(null=True)
    lang = models.CharField(max_length=20,default="")
    solved=models.BooleanField(default=False)
    date_solved = models.DateTimeField(auto_now_add=True, null=True, blank=True) 


