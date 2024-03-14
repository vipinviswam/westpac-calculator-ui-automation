#!/bin/bash

set -ueo pipefail
#environment tag
env=$1
#cucumber tag
tag=$2

#run cucumber test and on failure run post cucumber to generate report
if ! yarn run cucumber:$env --profile $tag; then
  yarn run postcucumber;
  exit 1;
fi