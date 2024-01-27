# Use an official Python runtime as a parent image
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /server

# Install dependencies
COPY requirements.txt /server/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /server
COPY . /server/

# Expose port 8000
EXPOSE 8000

# Run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
