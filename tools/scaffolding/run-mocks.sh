#!/bin/bash

# MOCK ANGULAR LIBRARIES
./tools/scaffolding/scripts/mocks/libraries.sh

# MOCK ANGULAR COMPONENTS
./tools/scaffolding/scripts/mocks/components.sh

# MOCK ANGULAR SERVICES
./tools/scaffolding/scripts/mocks/services.sh &&

# GENERATE MOCK PIPES
./tools/scaffolding/scripts/mocks/pipes.sh &&

