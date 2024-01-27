# Use an official Python runtime as a parent image
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SECRET_KEY "django-insecure-t+xbauo+!_8a9e(yqk0ut6=_qkvb8qr&o5&$p0(idk8r^ljayw"

# Set the working directory in the container
WORKDIR /server

# Copy the current directory contents into the container at /server
COPY . /server/

# Install dependencies
RUN pip install -r requirements.txt

# Expose port 8000
EXPOSE 8000

# Run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
