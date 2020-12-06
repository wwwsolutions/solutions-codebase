#!/bin/bash

# DEPLOY TO FIREBASE

## admin-app

echo
echo Check if you are in the RIGHT PROJECT to run this script.
echo

echo Firebase Deployment Started && \
echo targets: admin-app, client-app, functions && \
echo environment: staging && \

firebase use --clear && \
firebase use staging && \

ng build admin-app && \
ng build client-app && \
npm run postinstall.web && \
ng build functions && \
firebase deploy

echo
echo Firebase Deployment Ended
echo
