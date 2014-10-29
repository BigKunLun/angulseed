# angulseed — A seed project of angular apps is built with bower and gulp.

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app.
You can use it to quickly bootstrap your angular webapp projects and dev environment for these
projects.

The angulseed contains a sample AngularJS application and is preconfigured to install the Angular
framework.

The angulseed app doesn't do much, just shows how to wire two controllers and views together.


## Getting Started

To get you started you can simply clone the angulseed repository and install the dependencies:

### Prerequisites

You need git to clone the angulseed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize it. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone angulseed

Clone the angulseed repository using [git][git]:

```
git clone https://github.com/BigKunLun/angulseed.git
cd angulseed
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].
* We get the angular code via `gulp`, a [The streaming build system][gulp].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.



## Directory Layout

```
app/                    --> all of the source files for the application
  app.less              --> default stylesheet to import all less
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app,build by gulp)
  components/           --> all app specific modules
    common/               --> common js 
    directives/           --> custom directives
    filters/              --> custom filters
    services/             --> module services for restful api
  modules/              --> all modules for app
    module1/              --> the module1 view template
      module1.html        --> the partial template
      module1.js          --> the controller logic
      module1.less        --> tests of the controller
    module2/                --> the module2 view template
      module2.html            --> the partial template
      module2.js              --> the controller logic
      module2.less         --> tests of the controller
```

## Updating Angular

Previously we recommended that you merge in changes to angulseed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


## Serving the Application Files

While angular is client-side-only technology and it's possible to create angular webapps that
don't require a backend server at all, we recommend serving the project files using a local
webserver during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr,
etc to function properly when an html page is opened via `file://` scheme instead of `http://`.


### Running the App during Development

The angulseed project comes preconfigured with a local development webserver.  It is a node.js
tool called [http-server][http-server].  You can start this webserver with `npm start` but you may choose to
install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by
running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `app/` directory.

## Contact

For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[gulp]: http://gulpjs.com/
[http-server]: https://github.com/nodeapps/http-server
