# Pool Time Webapp

## Purpose

The purpose of this application is manage reservations at my pool. It allows for users to sign up for specific times, see who else may be coming, and notify others about the snacks they plan to bring. The service has text alert integrations for notifying users of status changes.


## Architectural Highlights:
 * java spring mvc backend
 * typescript react frontend
 * postgresql database
 * text alert capabilities

Once started locally, the application can be accessed at http://localhost:82

## Plugins

The spring app contains the following plugins:

  * frontend-maven-plugin

    Builds and packages the frontend react code for the java spring app to serve

  * spotless-maven-plugin

    https://github.com/diffplug/spotless/tree/main/plugin-maven

    Formats the files in the codebase. Before each commit, spotless:apply runs to check the set of
    files to be submitted.

### Building the application

The project uses [maven](https://maven.apache.org/) as a build tool.

To build the application run:

```bash
  maven install
```

### Running the application

The repository provides some helper scripts to ease building and starting the application:

start.sh

```bash
  ./start.sh build
```

This script will export the required environment variables, ensure docker is running a database container,
and start the spring application. Providing the `build` arg will reinstall the backend, and build a fresh
bundle of the frontend to serve.

connect.sh

```bash
  ./connect.sh
```

This script will export the required environment variables and connect to the locally running instance of postgreSQL.
This allows for easy access to the data backing the application.

## License

This project is the intellectual property of michael dias

