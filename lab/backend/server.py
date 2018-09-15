import random
import json
import graphene
from flask_graphql import GraphQLView
from flask import Flask

app = Flask(__name__)

with open('data.json', 'r') as fd:
    # data = {row['id']: row for row in json.loads(fd.read())['rows']}
    data = json.loads(fd.read())['rows']


def get_point_of_interest_from_row(row):
    id = row['id']
    name = row['value']['name']['en']
    description = row['value']['description']['text']['en']

    # geolocation
    longitude = row['value']['geo']['lon']
    latitude = row['value']['geo']['lat']
    site = row['value']['geo']['site']['name']

    # categories
    category = row['value']['category']['name']
    subcategory = row['value']['subcategory']['name']

    # images
    image1 = row['value']['images']['1']
    image2 = row['value']['images']['2']
    image3 = row['value']['images']['3']

    # times
    estimated_activity_time = row['value']['estimated_activity_time']
    waiting_time = row['value']['waiting_time']
    capacity_usage = row['value']['capacity_usage']

    # misc
    opened = row['value']['opened'] == 'Y'
    affluence = row['value']['affluence']

    # restrictions
    restriction_reduce_mobility = row['value']['restrictions']['reduced_mobility'] == 'Y'
    restriction_minimum_age = row['value']['restrictions']['minimum_age']
    restriction_children = row['value']['restrictions']['children'] == 'Y'
    restrictions_open_saturday = row['value']['restrictions']['open_saturday'] == 'Y'
    restrictions_open_sunday = row['value']['restrictions']['open_sunday'] == 'Y'

    # our own stuff
    user_walking_distance = row['value'].get('user', {}).get('walking_distance', random.random())
    user_favorited = row['value'].get('user', {}).get('favorited', False)

    # TODO
    # - walking or bus
    # - reviews
    # - videos
    # - short description

    return PointOfInterest(
        id=id,
        name=name,
        description=description,
        longitude=longitude,
        latitude=latitude,
        site=site,
        category=category,
        subcategory=subcategory,
        image1=image1,
        image2=image2,
        image3=image3,
        estimated_activity_time=estimated_activity_time,
        waiting_time=waiting_time,
        capacity_usage=capacity_usage,
        opened=opened,
        affluence=affluence,
        restriction_reduce_mobility=restriction_reduce_mobility,
        restriction_minimum_age=restriction_minimum_age,
        restriction_children=restriction_children,
        restrictions_open_saturday=restrictions_open_saturday,
        restrictions_open_sunday=restrictions_open_sunday,
        user_walking_distance=user_walking_distance,
        user_favorited=user_favorited,
    )


class PointOfInterest(graphene.ObjectType):

    id = graphene.String()
    name = graphene.String()
    description = graphene.String()

    # geolocation
    longitude = graphene.String()
    latitude = graphene.String()
    site = graphene.String()

    # categories
    category = graphene.String()
    subcategory = graphene.String()

    # images
    image1 = graphene.String()
    image2 = graphene.String()
    image3 = graphene.String()

    # times
    estimated_activity_time = graphene.Int()
    waiting_time = graphene.Int()
    capacity_usage = graphene.Int()

    # misc
    opened = graphene.Boolean()
    affluence = graphene.Int()

    # restrictions
    restriction_reduce_mobility = graphene.Boolean()
    restriction_minimum_age = graphene.Int()
    restriction_children = graphene.Boolean()
    restrictions_open_saturday = graphene.Boolean()
    restrictions_open_sunday = graphene.Boolean()

    # our own stuff
    user_walking_distance = graphene.Int()
    user_favorited = graphene.Boolean()


class Query(graphene.ObjectType):

    point_of_interest = graphene.List(
        PointOfInterest,
        id=graphene.String(),
        name=graphene.String(),
    )

    def resolve_point_of_interest(self, info, id=None, name=None):
        if id:
            return [get_point_of_interest_from_row(row) for row in data if id in row['id']]

        if name:
            return [get_point_of_interest_from_row(row) for row in data if name in row['value']['name']['en']]

        return [get_point_of_interest_from_row(row) for row in data]


schema = graphene.Schema(query=Query)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

# Optional, for adding batch query support (used in Apollo-Client)
# app.add_url_rule('/graphql/batch', view_func=GraphQLView.as_view('graphql', schema=schema, batch=True))

app.run()
