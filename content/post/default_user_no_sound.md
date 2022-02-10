---
title: "Linux default user has no sound"
hiddenFromHomePage: false
date: 2022-01-06T21:57:15+08:00
tags:
    - linux

draft: false
---

# Error Presentation

`default user` has no sound, but the `root` user has sound.  
after some attempts, my user group is:  
```shell
zarkli adm dialout cdrom floppy sudo audio dip video plugdev netdev wireshark bluetooth lpadmin pulse-access kaboxer
```
but it is of no use.  
I tried to catch the log of `pulseaudio` service by using command `systemctl --user status pulseaudio`, and I  got `error log` like this :

```bash
xxx failed to create sink input: sink is suspended.
xxx failed to create sink input: sink is suspended.
...
```

# solution

change(comment) `/etc/pulse/default.pa`:

```shell
### Automatically suspend sinks/sources that become idle for too long
load-module module-suspend-on-idle
```
to  

```shell
### Automatically suspend sinks/sources that become idle for too long
#load-module module-suspend-on-idle
```


# reference

[StackExchange](https://unix.stackexchange.com/questions/114602/pulseaudio-sink-always-suspended)

