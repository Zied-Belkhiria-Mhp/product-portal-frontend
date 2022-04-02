# Catena-X Portal Frontend

Frontend web application and shared UI components for the Catena-X Portal written in React and Typescript.

* Dev Install: https://catenaxdev003aksportal.germanywestcentral.cloudapp.azure.com/
* Components: https://catenaxdev003aksportal.germanywestcentral.cloudapp.azure.com/_storybook/


Here are three ways to run the application on your machine on http://localhost:3000/

### Local build & run

    yarn
    yarn build
    cd cx-portal
    yarn start


### Local docker build & run & publish

    yarn build:docker
    yarn publish:docker
    yarn start:docker


### Running the image from GitHub container registry

    export IMAGE=ghcr.io/catenax-ng/product-portal-hello-helm:main
    docker pull $IMAGE
    docker run --rm -d -p 3000:8080 --name cx-portal $IMAGE

