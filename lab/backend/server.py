import os
import json
import graphene
from datetime import datetime
from flask_graphql import GraphQLView
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

blacklist = [
    'point_2',
    'point_21',
    'point_22',
    'point_23',
    'point_26',
    'point_27',
    'point_28',
    'point_29',
    'point_30',
    'point_32',
    'point_50'
]

with open('data.json', 'r') as fd:
    data = {
        row['id']: row for row in json.loads(fd.read())['rows']
        if row['id'] not in blacklist
    }


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
    user_walking_distance = row['value']['user']['walking_distance']
    user_favorited = row['value']['user']['favorited']

    short_description = '. '.join(row['value']['description']['text']['en'].split('.')[:1])

    review = [
        Review(id=r['id'], name=r['name'], text=r['text'], image_url=r['image_url'], stars=r['stars'])
        for r in row['value']['user']['review']
    ]

    # TODO
    # - videos

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
        short_description=short_description,
        review=review
    )


def get_point_of_interest_row(id):
    row = data.get(id)

    if not row:
        return None

    return get_point_of_interest_from_row(row)


def update_point_of_interest_waiting_time(id, time):
    data[id]['value']['waiting_time'] = time


def update_point_of_interest_user_favorited(id, favorited):
    data[id]['value']['user']['favorited'] = favorited


def append_point_of_interest_review(id, review):
    data[id]['value']['user']['review'].append({
        'id': review.id,
        'name': review.name,
        'image_url': review.image_url,
        'stars': review.stars,
        'text': review.text,
    })


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
    short_description = graphene.String()

    review = graphene.List(lambda: Review)


class Review(graphene.ObjectType):

    id = graphene.String()
    name = graphene.String()
    image_url = graphene.String()
    stars = graphene.Int()
    text = graphene.String()


class Query(graphene.ObjectType):

    point_of_interest = graphene.List(
        PointOfInterest,
        id=graphene.String(),
        name=graphene.String(),
    )

    def resolve_point_of_interest(self, info, id=None, name=None):
        if id:
            return [get_point_of_interest_from_row(row) for row in data.values() if id == row['id']]

        if name:
            return [get_point_of_interest_from_row(row) for row in data.values() if name in row['value']['name']['en']]

        return [get_point_of_interest_from_row(row) for row in data.values()]


class UpdatePointOfInterest(graphene.Mutation):
    class Arguments:
        id = graphene.String()
        waiting_time = graphene.Int()
        user_favorited = graphene.Boolean()

    ok = graphene.Boolean()
    point_of_interest = graphene.Field(lambda: PointOfInterest)

    def mutate(self, info, id, waiting_time=None, user_favorited=None):
        ok = True

        try:
            if waiting_time is not None:
                update_point_of_interest_waiting_time(id, waiting_time)
            if user_favorited is not None:
                update_point_of_interest_user_favorited(id, user_favorited)
        except:
            ok = False

        return UpdatePointOfInterest(
            ok=ok, point_of_interest=get_point_of_interest_row(id)
        )


class CreateReview(graphene.Mutation):
    class Arguments:
        point_id = graphene.String()
        name = graphene.String()
        image_url = graphene.String()
        stars = graphene.Int()
        text = graphene.String()

    ok = graphene.Boolean()
    review = graphene.Field(lambda: Review)

    def mutate(self, info, point_id, name, image_url, stars, text):
        ok = True
        review = Review(id=str(datetime.now()), name=name, image_url=image_url, stars=stars, text=text)
        append_point_of_interest_review(point_id, review)
        return CreateReview(ok=ok, review=review)


class Mutation(graphene.ObjectType):
    update_point_of_interest = UpdatePointOfInterest.Field()
    create_review = CreateReview.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))


@app.route("/")
def health():
    return "Hello World!"


# Optional, for adding batch query support (used in Apollo-Client)
# app.add_url_rule('/graphql/batch', view_func=GraphQLView.as_view('graphql', schema=schema, batch=True))

port = int(os.environ.get('PORT', 8084))
app.run(host='0.0.0.0', port=port)
