#!/bin/bash

# DEPLOY TO FIREBASE

echo
echo Check if you are in the RIGHT PROJECT to run this script.
echo

echo Firebase Hosting Deployment Started && \
echo target: admin-app  && \
echo environment: production && \

firebase use --clear && \
firebase use production && \
ng build admin-app && \
firebase deploy --only hosting:admin && \

echo
echo Firebase Hosting Deployment Ended
echo
