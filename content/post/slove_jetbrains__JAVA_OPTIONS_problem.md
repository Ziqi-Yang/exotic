---
title: "Slove jetbrains JAVA OPTIONS problem"
date: 2021-12-15T14:17:23+08:00
draft: false
tags:
    - linux
    - editor
    - jetbrains
---

The problem looks:
![problem](https://s2.loli.net/2021/12/15/VhkMgGXxwAF37Ca.png)

to solve this problem, we only need to modify its `desktop` file(e.g. `DataSpell.desktop`):  

```desktop
[Desktop Entry]
Name=DataSpell
Comment=DataSpell-2021-03
Exec=unset _JAVA_OPTIONS; /home/zarkli/Public/dataspell/bin/dataspell.sh
Icon=/home/zarkli/Public/dataspell/bin/dataspell.png
Terminal=false
Type=Application
Categories=Development;
```
