#!/bin/sh

SRCSERVER=./js-share-server
SRCCLIENT=./js-share
DST=${SRCSERVER}.deploy

if [ ! -e ${SRCSERVER} ]; then
	echo Run archive script from parent directory of ${SRCSERVER}
	exit 1
fi

echo INFO: archiving...

rm -rf ${DST}
mkdir ${DST}
mkdir ${DST}/node_modules

cp ${SRCSERVER}/package.deploy.json ${DST}/package.json
cp ${SRCSERVER}/server.js ${DST}
cp -R ${SRCSERVER}/dist ${DST}
cp -R ${SRCCLIENT}/clientdist ${DST}
cp -R ${SRCCLIENT}/public ${DST}
cp -R ${SRCSERVER}/pages ${DST}
cp -R ${SRCSERVER}/state ${DST}
rm ${DST}/state/*
cp -R ${SRCSERVER}/node_modules/express ${DST}/node_modules
cp -R ${SRCSERVER}/node_modules/express-session ${DST}/node_modules
cp -R ${SRCSERVER}/node_modules/passport ${DST}/node_modules
cp -R ${SRCSERVER}/node_modules/passport-facebook ${DST}/node_modules
cp -R ${SRCSERVER}/node_modules/passport-local ${DST}/node_modules
cp -R ${SRCSERVER}/node_modules/body-parser ${DST}/node_modules
cp -R ${SRCSERVER}/node_modules/cookie-parser ${DST}/node_modules
cp -R ${SRCSERVER}/node_modules/connect-flash ${DST}/node_modules
cp -R ${SRCSERVER}/node_modules/bcryptjs ${DST}/node_modules
cp -R ${SRCSERVER}/node_modules/@terrencecrowley ${DST}/node_modules
cd ${DST}
zip -q -r archive.zip .
mv archive.zip ..
cd ..
rm -rf ${DST}
echo INFO: Archive created in archive.zip
exit 0
