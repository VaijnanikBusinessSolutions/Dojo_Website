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

from django.core.mail import EmailMessage
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ContactMessage

def contact_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        company_name = request.POST.get('company_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')  # NEW
        message = request.POST.get('message')

        if name and email and message:
            # Save in DB
            ContactMessage.objects.create(
                name=name,
                company_name=company_name,
                email=email,
                phone=phone,
                message=message
            )

            # Prepare email content
            subject = f"New Contact Form Submission from {name}"
            body = (
                f"Name: {name}\n"
                f"Company: {company_name or 'N/A'}\n"
                f"Email: {email}\n"
                f"Phone: {phone or 'N/A'}\n\n"
                f"Message:\n{message}"
            )

            try:
                email_msg = EmailMessage(
                    subject=subject,
                    body=body,
                    from_email='contactus@dojo2o.com',
                    to=['monika.sai@nltecsolutions.com'],
                    bcc=['contactus@dojo2o.com'],
                    headers={'Reply-To': email}
                )
                email_msg.send(fail_silently=False)

                messages.success(request, "Your message has been submitted.")
            except Exception as e:
                messages.error(request, f"Message saved, but email not sent: {e}")

            return redirect('dojo_app:contact')
        else:
            messages.error(request, "Please fill in all required fields.")

    return render(request, 'contact.html')


from .models import ContactMessage

def products(request):
   return render(request, 'products.html')

# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart

# def send_email(sender_email, sender_password, recipient_email, subject, body):
#     try:
#         # SMTP server details for BlueHost
#         smtp_server = "mail.dojo2o.com"  # Your domain's mail server
#         smtp_port = 465  # SSL port

#         # Create the email
#         msg = MIMEMultipart()
#         msg['From'] = sender_email
#         msg['To'] = recipient_email
#         msg['Subject'] = subject
#         msg.attach(MIMEText(body, 'plain'))

#         # Connect to server with SSL
#         server = smtplib.SMTP_SSL(smtp_server, smtp_port)
#         server.login(sender_email, sender_password)
#         server.sendmail(sender_email, recipient_email, msg.as_string())
#         server.quit()

#         print(f"✅ Email sent successfully to {recipient_email}")

#     except smtplib.SMTPRecipientsRefused:
#         print(f"❌ Recipient address rejected: {recipient_email} — check if it exists.")
#     except smtplib.SMTPAuthenticationError:
#         print("❌ Authentication failed — check email and password.")
#     except Exception as e:
#         print(f"❌ Error: {e}")


