from django.shortcuts import render,redirect
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse

from django.shortcuts import render

def home(request):
    dashboards = [
        {
            'title': 'Management Review',
            'image': 'images/review1.jpg'
        },
        {
            'title': 'Advance Manpower',
            'image': 'images/man1.jpg'
        },
        {
            'title': 'Skills and Level',
            'image': 'images/skill1.jpg'
        },
        {
            'title': 'Process Dojo',
            'image': 'images/dash1.jpg'
        },
        {
            'title': 'Machine',
            'image': 'images/machine1.jpg'
        },
        {
            'title': 'Training',
            'image': 'images/dash1.jpg'
        }
    ]

    context = {
        'title': 'NL DOJO 2.0 Solution - V Train Platform',
        'key_features': [
            'AI Based Analytics and Trend Analysis',
            'Comprehensive Dashboards for HQ, Factories and Departments',
            'Realtime Visibility of Skills, Training Plans and Improvements',
            'IoT enabled connectivity between Man, Machine, Material and Methods',
            'Systematic Training and Realtime improvements',
            'Integration with AI Camera, Biometric System, Machines and Tools',
            'Realtime Alerts & Notifications',
            'Code developed with Latest programming platforms - Python, React & Django',
            'Cloud and Onsite hosting options'
        ],
        'features': [
            'IoT Enabled',
            'AI Enabled',
            '4M Approach',
            'AR/VR Modules',
            'Interactive Dashboards',
            'Effective Reports',
            'Real time Monitoring',
            'Digital Response Testing'
        ],
        'modules': [
            'Man Module',
            'Machine Module',
            'Test Module',
            'Training Module',
            '4M Change Module',
            'Red Bin module'
        ],
        'dashboards': dashboards
    }

    return render(request, 'home.html', context)

from .models import ContactMessage

def contact_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        if name and email and subject and message:
            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            messages.success(request, "Your message has been submitted.")
            return redirect('dojo_app:contact')
    
    return render(request, 'contact.html')
