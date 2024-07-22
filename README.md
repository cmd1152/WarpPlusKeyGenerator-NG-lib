# WarpPlusKeyGenerator-NG Nodejs Library
Cloudflare Warp+ key generator.
Generates keys with 1.92EB quota by default.
This project is a Node.js implementation of https://github.com/0x24a/WarpPlusKeyGenerator-NG, developed into a dependency library.

## DISCLAIMER
cloudflare please do not sue me  
i did not make this generator  
my cat just made this and uploaded it to github  
do not sue me  
sue my cat

## Something you should know
If you want to use this library in your project, please put a link to my github page! thanks!  
Also, if you don't want to make changes to this repo, DO NOT FORK THIS, because i will recieve LOTS OF notifications.  
If you just want to make a backup in case of a takedown, GIT PULL it, do NOT fork it.

## Installation
Download WarpPlusKeyGenerator-NG.js and place it into your project, it's as simple as that.

## Usage
```
const WarpPlusKeyGenerator = require('./WarpPlusKeyGenerator-NG.js');
```

Then, using `WarpPlusKeyGenerator(quantity, showMsgInfo = false, maxRetry = 0)` allows you to fetch a specified number of keys. Normally, the function retrieves each key within an average time of less than 1 minute. This function returns a promise. Upon awaiting this promise, you will receive an array composed of objects structured like this:

```
{
  accountType: 'limited',
  referralCount: 1923837100,
  licenseCode: 'mrLY4576-Eo498zQ3-08d19VFC'
}
```

You can use `.map((key) => { return key.licenseCode }).join("\n")` to obtain a list of keys similar to the following format:
```
A9bl284M-C6F8l92V-283LQ0oA
SCg3089f-a1MT9u52-sy1qI739
uT890z1k-3WMF8L57-c38mf2B4
I18o7e0s-9fQW386M-N451h8Bn
3V7U21nx-3s2l58nC-lXk684W0
m35oj60h-9y648jUE-F4v6C78i
O306n7Jc-0V791uTe-8vh7B1L9
71G5Lq2O-5w182orS-T415W0Bg
GH701hg8-04p1k8AX-1N25ys4j
3e1v56wN-87p5m6Jf-92Rgiv17
9GY4F15i-g19d5t6V-59E1VKI8
769c2sSL-bZj971V8-k2VuW071
```

## Stargazers over time
![Stargazers over time](https://starchart.cc/cmd1152/WarpPlusKeyGenerator-NG-lib.svg?variant=adaptive)