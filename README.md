# Another React CLI (ARC)

This is another React CLI to manage and create React projects, but instead using complex command line instructions, it uses [inquirer.js](https://github.com/SBoudrias/Inquirer.js/) to ask questions to the user to configure the creation process.

The environment created uses [WebPack](https://webpack.github.io/) to pack the application, and [npm](https://www.npmjs.com/)/[yarn](https://yarnpkg.com/en/) script to automatize the process.

The build process creates a __dist__ folder with the application, the vendor libraries, the styles and other bundles, result of dynamic importing (already set the tools and the linter rules).

We also add a tool to clean the __dist__ folder when building.

So right now, you can create an empty application, a full application, and a single component, but I pretend to cover more functionality with time.

To use it, just install it from [npm](https://www.npmjs.com/package/another-react-cli):

```bash
npm -g install another-react-cli
```

And create a new project, just typing __arc__ and answering a few questions.

The empty application creates a single file project, with an stateless component. The full application creates a project with routing and authentication, using [react-router](https://reacttraining.com/react-router/) v4, and styles, using [Material UI](http://www.material-ui.com/#/) CSS framework.

Have fun :)
