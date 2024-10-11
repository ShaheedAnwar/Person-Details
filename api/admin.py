# admin.py
from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Person

class PersonResource(resources.ModelResource):
    class Meta:
        model = Person


@admin.register(Person)
class PersonAdmin(ImportExportModelAdmin):
    resource_class = PersonResource
    
    list_display = ('first_name', 'middle_name', 'last_name', 'contact', 'email', 'company_name', 'notes', 'received_from', 'instrest', 'created_at')
    search_fields = ('first_name', 'middle_name', 'last_name', 'contact', 'email', 'company_name','received_from')
    
    list_filter = ('contact','email','company_name', 'instrest', 'received_from', 'created_at')
