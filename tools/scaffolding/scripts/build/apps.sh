#!/bin/bash

## GENERATE APPLICATIONS

# ANGULAR APPLICATION
nx g @nrwl/angular:application admin-app \
    --routing --style=scss --prefix=admin --directory

# ANGULAR APPLICATION
nx g @nrwl/angular:application client-app \
    --routing --style=scss --prefix=client --directory

# TYPESCRIPT APPLICATION
nx g @nrwl/node:application functions \
    --unit-test-runner=jest --directory

# ELECTRON APPLICATION [admin-app]
# nx g @nstudio/xplat:application --name=admin \
#     --prefix=admin --platforms=electron --framework=angular --useXplat=false --target=admin-app --skipInstall


