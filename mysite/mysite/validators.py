import os
from django.core.exceptions import ValidationError
def validate_extension(value):    
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.pdf', '.jpg', '.png', '.txt']
    if not ext.lower() in valid_extensions:
        raise ValidationError(u'Unsupported file extension.')
