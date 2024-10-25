#!/bin/bash

if [ -d ".git" ]; then
	echo "spotless check and apply"
	cp hooks/pre-commit .git/hooks/
	git config --replace-all core.hooksPath .git/hooks
	chmod +x .git/hooks/pre-commit
fi
