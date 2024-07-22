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

Then, using `WarpPlusKeyGenerator(quantity, showMsgInfo = false)` allows you to fetch a specified number of keys. Normally, the function retrieves each key within an average time of less than 1 minute. This function returns a promise. Upon awaiting this promise, you will receive an array composed of objects structured like this:

```
{
  accountType: 'limited',
  referralCount: 1923837100,
  licenseCode: 'mrLY4576-Eo498zQ3-08d19VFC'
}
```