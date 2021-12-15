---
title: "Using GPG"
date: 2021-12-15T22:21:02+08:00
draft: false
tags:
    - linux
    - encryption
    - command
---

# Function of GPG
mainly:
- Encrypt and decrypt files
- Verify the signature

# Generate GPG key

## Generate key

```bash
gpg --full-generate-key # It's fine to using default value
```
## List key
```bash
gpg --list-secret-key
gpg --list-public-key
```
the `result` may look like:
```bash 
┌──(zarkli㉿kali)-<Saber>-[~/test]
└─$ gpg --list-public-keys
/home/zarkli/.gnupg/pubring.kbx
-------------------------------
pub   rsa3072 2021-12-15 [SC]
      661D1790DF31028BEA5CB2987B472490023BA0D6
uid           [ 绝对 ] Leonardo Zarkli (For testing) <user@example.com>
sub   rsa3072 2021-12-15 [E]
```

Where `661D1790DF31028BEA5CB2987B472490023BA0D6` is the `id`

# Encrypt and decrypt files

## Encrypt

For instance, `file` -> `file.gpg`
```shell
gpg --encrypt --output file.gpg --recipient user@example.com file
```

## Decrypt
assume we have got a `gpg` file, we'd like to change it into original file
```shell
gpg --decrypt --output file file.gpg
```

# Send and Receive GPG key

## Send

```bash
gpg --output key.gpg --export id
```
where `id` can be found by `gpg --list-public-keys` command.

## Receive

We need to not only `import` it, but `signature` it to trust it.

### import

```bash
gpg --import key.gpg
```

### signature

```bash
gpg --edit-key-id # will go into a sub shell
# sub shell look like:
# .....
# gpg>

# in the sub shell
fpr # print fingerprint, others may want to compare with your signature to make sure it is your public key
sign # signature
```


