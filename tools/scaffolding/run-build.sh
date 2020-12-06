#!/bin/bash

# INSTALL DEPENDENCIES
./tools/scaffolding/scripts/build/deps.sh &&

# GENERATE APPLICATIONS
./tools/scaffolding/scripts/build/apps.sh &&

# GENERATE LIBRARIES
./tools/scaffolding/scripts/build/libs.sh &&

# CREATE DIRECTORY STRUCTURE
./tools/scaffolding/scripts/build/structure.sh &&

# CREATE DIRECTORY STRUCTURE
./tools/scaffolding/scripts/build/clean-up.sh
