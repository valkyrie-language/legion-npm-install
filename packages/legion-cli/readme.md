# `legion` on `npm`

```sh
# automatically download the latest version from github release
npm install @valkyrie-language/legion -D
# only for china user, and `vendor` is not the latest version automatically updated on github release
npm install @valkyrie-language/legion-vendor -D --registry=https://registry.npmmirror.com
```


```haskell
Valkyrie workspace manager

Usage: legion.exe [OPTIONS] [COMMAND]

Commands:
  new          Valkyrie workspace manager
  add, -a      add to local
  execute, -e  Execute script or command
  clone        Valkyrie workspace manager
  encode       Encode wat to wasm
  decode       Decode wasm to wat
  install, -i  add to global
  update, -u   Recursively update indirect dependencies
  upgrade      Update direct dependencies
  publish, -p  Valkyrie workspace manager
  help         Print this message or the help of the given subcommand(s)

Options:
  -t, --timing...
          Timing Tracing Debugging

          `-t`: show time `-tt`: show time and memory `-ttt`: show time, memory, and stack

      --yes
          Skip confirmation before irreversible side effects

          e.g. `rm`, `publish`

  -h, --help
          Print help (see a summary with '-h')

  -V, --version
          Print version
```