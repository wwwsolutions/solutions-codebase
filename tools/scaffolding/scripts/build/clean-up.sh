#!/bin/bash

### CLEAN UP


## SHARED STYLES ----------------------------------------------------------------------------------------------------

# CLEAN FILES
find libs/shared/styles/src/ -name 'index.ts' -delete
find libs/shared/styles/src/lib/ -name 'shared-styles.ts' -delete

# GENERATE FILES FROM TEMPLATES
tools/scaffolding/scripts/templates/tpl-index_scss.sh > libs/shared/styles/src/index.scss
tools/scaffolding/scripts/templates/tpl-global_scss.sh > libs/shared/styles/src/lib/global.scss

## SHARED ASSETS -----------------------------------------------------------------------------------------------------

# CLEAN FILES
find libs/shared/assets/src/ -name '*.ts' -delete
find libs/shared/assets/src/lib/ -name '*.ts' -delete


