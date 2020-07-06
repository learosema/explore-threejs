#!/bin/sh
cd `dirname $0`
cp ../node_modules/three/LICENSE .
cp ../node_modules/three/build/three.module.js .
cp -r ../node_modules/three/examples/jsm/controls .

# TODO: patch the imports of the examples...