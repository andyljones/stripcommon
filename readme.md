### Dev install
```sh
jupyter nbextension install stripcommon --symlink --sys-prefix
jupyter nbextension enable stripcommon --sys-prefix
```
Jupyter will complain that there's an error while loading the extension. It lies. Watch the Chrome console instead.