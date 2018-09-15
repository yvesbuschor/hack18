#! /bin/bash

bundle:
	bash -c "pipenv run pip install -r <(pipenv lock -r) --target _build/"
	zip -r python-app.zip .
