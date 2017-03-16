# Another React CLI (ARC)

This is another React CLI to manage and create React projects, but instead using complex command line instructions, it uses [inquirer.js](https://github.com/SBoudrias/Inquirer.js/) to ask questions to the user to configure the creation process.

So right now, you can create a full project and a single component, but I pretend to cover more functionality with time.

To use it, just install it from [npm](https://www.npmjs.com/package/another-react-cli):

```bash
npm -g install another-react-cli
```

And create a new project just typing __arc__ and answering a few questions.

The empty application creates a single file project, with an stateless component. The full application creates a project with routing, using [react-router](https://reacttraining.com/react-router/) v4, and styles, using [Material UI](http://www.material-ui.com/#/) CSS framework.

Have fun :)
