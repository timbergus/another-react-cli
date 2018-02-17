# Another React CLI (ARC)

> ## This project has being __deprecated__ in favor of __[Fullstack CLI](https://www.npmjs.com/package/fullstack-cli)__ and it is no longer maintained. This new project covers both, the front and the back.

This is another React CLI to manage and create React projects, using  [inquirer.js](https://github.com/SBoudrias/Inquirer.js/) to ask questions to the user to configure the creation process.

The environment created uses [WebPack](https://webpack.github.io/) to pack the application, and [npm](https://www.npmjs.com/)/[yarn](https://yarnpkg.com/en/) script to automatize the process.

The build process creates a __dist__ folder with the application, the vendor libraries, the styles and other bundles, result of dynamic importing (already set the tools and the linter rules).

We also add a tool to clean the __dist__ folder when building.

So right now, you can create a full application, and a single component. The options for the full application are:

*   Routes ([react-router](https://reacttraining.com/react-router/))
*   [Material UI](http://www.material-ui.com)
*   Websockets ([socket.io](https://socket.io/))
*   [Redux](https://github.com/reactjs/redux)

If you choose nothing, you have the simple app with an only file and an only component. If you choose all, you need to also create a back using [another-api-cli](https://www.npmjs.com/package/another-api-cli), to connect using websockets.

To use it, just install it from [npm](https://www.npmjs.com/package/another-react-cli):

```bash
npm -g install another-react-cli
```

And create a new project, just typing __arc__ and answering a few questions.

Have fun :)
