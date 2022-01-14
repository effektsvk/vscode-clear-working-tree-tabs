# vscode-clear-working-tree-tabs

Close all those annoying tabs that are left after committing!

## Features

- Command for closing all tabs (`Working Tree`, `Index`, etc.) created by Source Control extension built into VS Code.

## Install

Either download vsix package from [latest release](https://github.com/effektsvk/vscode-clear-working-tree-tabs/releases/latest) or get it from [marketplace](https://marketplace.visualstudio.com/items?itemName=effektsvk.vscode-clear-working-tree-tabs).

## Development and contributing

You can just fork this repo and get going.

Optionally, if you want to open specific folder automatically in debugged VS Code (`Run Extension (with testing folder opened)` debug configuration), you can install `direnv`, create `.envrc` and set custom folder path.

```bash
$ echo "export TEST_FOLDER=PATH_TO_YOUR_FOLDER" > .envrc
$ direnv allow
```

Or you can just run `$ TEST_FOLDER=PATH_TO_YOUR_FOLDER code .` when opening repo.