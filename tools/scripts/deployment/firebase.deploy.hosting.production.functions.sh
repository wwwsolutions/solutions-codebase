#!/bin/bash

# DEPLOY TO FIREBASE

echo
echo Check if you are in the RIGHT PROJECT to run this script.
echo

echo Firebase Hosting Deployment Started && \
echo target: functions  && \
echo environment: production && \

firebase use --clear && \
firebase use production && \
npm run postinstall.web && \
ng build functions && \
firebase deploy --only functions && \

echo
echo Firebase Hosting Deployment Ended
echo
