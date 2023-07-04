# from django.contrib.auth.models import User, Group
# from rest_framework import viewsets
# from rest_framework import permissions
# from intsureview_be.apps.api.serializers import UserSerializer, GroupSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Person
from .serializers import PersonSerializer


@api_view(["GET"])
def get_data(request):
    people = Person.objects.all()
    serializer = PersonSerializer(people, many=True)
    return Response(serializer.data)


@api_view(["PUT"])
def add_form(request):
    # Extract data from request body
    print("I AM HERE")
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
        return Response(
            serializer.data, status=201
        )  # Successful creation/update response
    return Response(serializer.errors, status=400)  # Bad request response


@api_view(["DELETE"])
def delete_person(request, first_name, last_name):
    try:
        person = Person.objects.get(first_name=first_name, last_name=last_name)
        person.delete()
        return Response(status=204)  # Successful deletion response
    except Person.DoesNotExist:
        return Response(status=404)  # Person not found response


# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """

#     queryset = User.objects.all().order_by("-date_joined")
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]


# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """

#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]
