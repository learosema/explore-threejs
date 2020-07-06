#!/bin/sh
cd `dirname $0`
cp ../node_modules/three/LICENSE .
cp ../node_modules/three/build/three.module.js .
cp -r ../node_modules/three/examples/jsm/controls .

# TODO: patch the imports of the controls...
# "../../../build/three.module.js" to "../three.module.js"
# '../../../src/Three' to '../three.module.js';

# experimental folder
# "../../../../build/three.module.js" to '../../three.module.js'

cd controls
# sed -i '*.bak'
# https://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line
# tooo tired....