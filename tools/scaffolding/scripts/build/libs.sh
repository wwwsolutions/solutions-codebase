#!/bin/bash

### GENERATE LIBRARIES

## SHARED UI-FORMATERS ---------------------------------------------------------------------------------------------

# ANGULAR LIBRARY
nx g @nrwl/angular:lib ui-formatters \
  --style=none --unit-test-runner=jest --directory=shared

## SHARED SERVICES -------------------------------------------------------------------------------------------------

# ANGULAR LIBRARY
nx g @nrwl/angular:lib data-access-services \
  --style=none --unit-test-runner=jest --directory=shared

## SHARED UTILS ----------------------------------------------------------------------------------------------------

# TYPESCRIPT LIBRARY
nx g @nrwl/workspace:lib utils-e2e \
  --unit-test-runner=none --directory=shared

## SHARED MODELS ---------------------------------------------------------------------------------------------------

# TYPESCRIPT LIBRARY
nx g @nrwl/workspace:lib data-access-models \
  --unit-test-runner=none --directory=shared

## SHARED STYLES ----------------------------------------------------------------------------------------------------

# TYPESCRIPT LIBRARY
nx g @nrwl/workspace:lib styles \
  --unit-test-runner=none --directory=shared

## SHARED ASSETS -----------------------------------------------------------------------------------------------------

# TYPESCRIPT LIBRARY
nx g @nrwl/workspace:lib assets \
  --unit-test-runner=none --directory=shared


