A notebook extension to strip common leading whitespace when pasting to Jupyter Notebook cells. That is
```python
    for x in xs:
        f(x)
```
is pasted as 
```python
for x in xs:
    f(x)
```
This is especially useful when experimenting with code that you're pulling from a module/class/function.

### Dev install
```sh
jupyter nbextension install stripcommon --symlink --sys-prefix
jupyter nbextension enable stripcommon --sys-prefix
```
Jupyter will complain that there's an error while loading the extension. It lies. Watch the Chrome console instead.