FROM python:3.6

COPY ./ /app
WORKDIR /app

RUN pip install pipenv
RUN pipenv install

CMD ["/bin/bash"]
