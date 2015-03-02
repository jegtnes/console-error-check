# console-error-check
A Node task. Feed it a set of webpages and it will throw an error if any of those webpages have console errors. Simple.

## Installation
console-error-check has a couple of dependencies. I recommend you install these with Homebrew, the OS X package manager, but of course, there are a million ways to skin a dependency, and you can download and install these dependency binaries yourself if you prefer.

First off, update Homebrew's packages:

```
brew update
```

If you have node.js installed, you can skip this step:

```
brew install node
```

Grab a version of Phantom.js that's below 2.0.0, as Casper.js doesn't yet support it

```
brew install phantomjs198
```

Install the perpetually-beta CasperJS:

```
brew install casperjs --devel
```

This should have taken care of all your dependencies.

If you want to install console-error-check globally, run:

```
npm install -g console-error-check
```

If you want to use it in a project as a dependency, run:

```
npm install --save console-error
```
