from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Person
from .serializers import PersonSerializer

@api_view(["GET"])
def get_data(request):
    """
    Retrieve all people data
    """
    people = Person.objects.all()
    serializer = PersonSerializer(people, many=True)
    return Response(serializer.data)

@api_view(["PUT"])
def add_form(request):
    """
    Add or update a person's information
    """
    # Extract data from request body
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    color = request.data.get("color")

    if not first_name or not last_name:
        return Response({"error": "First name and last name are required."}, status=400)

    try:
        person = Person.objects.get(first_name=first_name, last_name=last_name)
        # Person with the same first and last name exists, update the color
        person.color = color
    except Person.DoesNotExist:
        # Person does not exist, create a new person
        person = Person(first_name=first_name, last_name=last_name, color=color)

    # Serialize the updated or new person
    serializer = PersonSerializer(instance=person, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)  # Successful creation/update response
    return Response(serializer.errors, status=400)  # Bad request response

@api_view(["DELETE"])
def delete_person(request, first_name, last_name):
    """
    Delete a person
    """
    person = get_object_or_404(Person, first_name=first_name, last_name=last_name)
    color = person.color
    person.delete()

    serializer = PersonSerializer(person)  # Serialize the deleted person

    return Response(serializer.data, status=200)  # Successful deletion response with person data