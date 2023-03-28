# Use the official Python image as the base image
FROM python:3.9-slim-buster

# Set the working directory
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app files to the container
COPY . .

# Expose port 5000 for the Flask app
EXPOSE 5000

# Set the command to run when the container starts
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]