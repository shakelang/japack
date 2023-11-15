# japack library

`japack` is a lightweight tool developed by the `shake` programming language team as a library to represent a java-style package storage in javascript.

## Installing

npm

```sh
npm install japack
```

yarn

```sh
yarn add japack
```

## Usage

```javascript
import { pImport, add as addPackage, require as requireFunction } from 'japack';
```

### Registering a package

You can register a package by calling the `add` function.

```javascript
addPackage({
    "io.github.shakelang.japack.test" : it => requireFunction(`${__dirname}/test.js`)
});
```


### Importing a package

This package will now be available using the `pImport` function.

```javascript
const test = pImport(`io.github.shakelang.japack.test`);
```

You can also create your own japack package host. This will be handled by the `japack` library, but not contain
the packages of the global japack host and not store the packages in the global japack host.

### Own japack host

```javascript
import { createPackageSystem } from 'japack';

const packages = createPackageSystem({
    "io.github.shakelang.japack.test" : requireFunction(`${__dirname}/test.js`)
});
```

You can of course also use the `pImport`  and `add` functions from the global japack host.

```javascript
const { pImport, add: addPackage } = packages;
```

### Inline japack installation

There is also the possibility to add a inline japack instance to your package. This is useful if you want to use 
the `japack` library in your package without the need to install the `japack` dependency. One advantage of this
is that japack will use the installed `japack` version instead of the inline version if it can find it. Also 
with the inline version you can import packages from other inline `japack` instances. The compressed version of
the inline japack instance can be easily added to your javascript file and is only about 1000 characters long.

- Inline Library: https://github.com/shakelang/japack/blob/master/inline-lib/index.js
- Minified Inline Library: https://github.com/shakelang/japack/blob/master/inline-lib/index.min.js
