#!/bin/sh

SRC=./js-share
DST=${SRC}.deploy

if [ ! -e ${SRC} ]; then
	echo Run archive script from parent directory of ${SRC}
	exit 1
fi

echo INFO: archiving...

rm -rf ${DST}
mkdir ${DST}
mkdir ${DST}/node_modules

cp ${SRC}/package.deploy.json ${DST}/package.json
cp ${SRC}/server.js ${DST}
cp -R ${SRC}/dist ${DST}
cp -R ${SRC}/clientdist ${DST}
cp -R ${SRC}/public ${DST}
cp -R ${SRC}/pages ${DST}
cp -R ${SRC}/state ${DST}
rm ${DST}/state/*
cp -R ${SRC}/node_modules/express ${DST}/node_modules
cp -R ${SRC}/node_modules/express-session ${DST}/node_modules
cp -R ${SRC}/node_modules/passport ${DST}/node_modules
cp -R ${SRC}/node_modules/passport-facebook ${DST}/node_modules
cp -R ${SRC}/node_modules/passport-local ${DST}/node_modules
cp -R ${SRC}/node_modules/body-parser ${DST}/node_modules
cp -R ${SRC}/node_modules/cookie-parser ${DST}/node_modules
cp -R ${SRC}/node_modules/connect-flash ${DST}/node_modules
cp -R ${SRC}/node_modules/bcryptjs ${DST}/node_modules
cp -R ${SRC}/node_modules/@terrencecrowley ${DST}/node_modules
cd ${DST}
zip -q -r archive.zip .
mv archive.zip ..
cd ..
rm -rf ${DST}
echo INFO: Archive created in archive.zip
exit 0
