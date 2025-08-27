from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email','company_name','phone', 'created_at')
    search_fields = ('name', 'email','company_name', 'message')
    list_filter = ('created_at',)
    ordering = ('-created_at',)
