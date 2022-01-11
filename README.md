# vscode-clear-working-tree-tabs [WIP: Not functioning yet]

Close all those annoying tabs that are left after committing!

## Features

- Command for closing all tabs that contain `Working Tree` or `Index` in the name. These are created by Source Control extension built into VS Code.

## Development and contributing

You can just fork this repo and get going.

Optionally, if you want to open specific folder automatically in debugged VS Code (`Run Extension (with testing folder opened)` debug configuration), you can install `direnv`, create `.envrc` and set custom folder path.

```bash
$ echo "export TEST_FOLDER=PATH_TO_YOUR_FOLDER" > .envrc
$ direnv allow
```

Or you can just run `$ TEST_FOLDER=PATH_TO_YOUR_FOLDER code .` when opening repo.