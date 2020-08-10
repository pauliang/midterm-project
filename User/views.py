from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from .forms import UserLoginForm, UserRegisterForm, ProfileForm
from django.contrib.auth.decorators import login_required
from .models import Profile
from django.contrib.auth.models import User

# Create your views here.

# 主页面
def index(request):
    return render(request, 'index.html')


# 用户登录
def user_login(request):
    print(request.method)
    if request.method == 'POST':
        user_login_form = UserLoginForm(data=request.POST)
        if user_login_form.is_valid():
            data = user_login_form.cleaned_data

            user = authenticate(username=data['username'], password=data['password'])
            if user:
                login(request, user)
                return render(request, 'index.html', user)
            else:
                return HttpResponse("账号或密码输入有误。请重新输入!")
        else:
            return HttpResponse("账号或密码输入不合法")
    elif request.method == 'GET':
        user_login_form = UserLoginForm()
        context = {'form': user_login_form}
        return render(request, 'login.html', context)
    else:
        return HttpResponse("请使用GET或POST请求数据")


# 用户登出
def user_logout(request):
    logout(request)
    return render(request, 'index.html')


# 用户注册
def user_register(request):
    if request.method == 'POST':
        user_register_form = UserRegisterForm(data=request.POST)
        if user_register_form.is_valid():
            new_user = user_register_form.save(commit=False)
            # 设置密码
            new_user.set_password(user_register_form.cleaned_data['password'])
            new_user.save()
            # 保存好数据后 登录并返回主页面
            login(request, new_user)
            return render(request, 'index.html')
        else:
            return HttpResponse("注册表单输入有误。请重新输入!")
    elif request.method == 'GET':
        user_register_form = UserRegisterForm()
        context = { 'form': user_register_form }
        return render(request, 'register.html', context)
    else:
        return HttpResponse("请使用GET或POST请求数据")


@login_required(login_url='/User/login/')
def profile_edit(request, id):
    user = User.objects.get(id=id)
    # user_id 是 OneToOneField 自动生成的字段
    if Profile.objects.filter(user_id=id).exists():
        profile = Profile.objects.get(user_id=id)
    else:
        profile = Profile.objects.create(user=user)

    if request.method == 'POST':
        # 验证用户是否是本人
        if request.user != user:
            return HttpResponse("权限不足!")

        profile_form = ProfileForm(request.POST, request.FILES)
        if profile_form.is_valid():
            # 取得清洗后的合法数据
            data = profile_form.cleaned_data
            profile.phone = data['phone']
            profile.introduction = data['introduction']
            # 如果图片存在FILES中
            if 'img' in request.FILES:
                profile.img = data["img"]

            profile.save()
            return render(request, 'index.html', locals())
        else:
            return HttpResponse("修改表单有误，请重新输入!")
    elif request.method == 'GET':
        profile_form = ProfileForm()
        context = {'profile_form': profile_form, 'profile': profile, 'user': user}
        return render(request, 'edit.html', context)
    else:
        return HttpResponse("请使用GET或POST请求数据")