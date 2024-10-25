#!/bin/bash

if ! mvn spotless:check; then
	echo "spotless check failed. appyling spotless..."
	mvn spotless:apply
	if [ -d ".git/" ]; then
		git add $(git diff --name-only)
	fi
fi
