# How to use
Build and serve app over `localhost:3000` by running `docker-compose up` from the project root directory (this directory)

## What's included
A prototype visualization platform with 1 functional visualization for menu performance. The visualization scatters the menu items by price and cook time, with larger bubbles corresponding to items with higher net revenue. Bubble color will scale from blue to light green based off of the average difference between expected revenue and actual revenue from the processed data provided by the Python data_processing package.

The framework is designed to be easily spun into docker containers with hooks for ingesting data. Currently, it pulls from the static json files in the project directory, but this could just as easily be configured to hit an endpoint configured from the Docker container's environment.

## Future work
- Build more visualizations to host on the dashboard to support different use cases
- Add authentication mechanism to support multi-tenant use cases
- Create generic filter logic and other mechanisms for interacting with the visualizations