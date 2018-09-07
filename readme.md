# Personal repository for learning Javascript
nothing to be interesting for you :)

## .gitconfig
```
[user]
 name = cptPrice
 email = elon_musk@mail.ru

[alias]
  hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
  amend = commit --amend --no-edit
  cm = commit -m
  co = checkout
  po = push origin
  plo = pull origin
  clear = reset --hard HEAD
  delLastCm = git reset --hard HEAD~1
```

## Make terminal to show your current branch

`.bash_profile`
```
# Git branch in prompt.

parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
```