#!/bin/bash

ssh_profile="root@agencyboz"
user="nando1964"
domain="nandoburgos.dev"
subdomain="gyh.nandoburgos.dev"

path="/home/${domain}/public_html/${subdomain}"

npx vite build
echo 'Uploading build to server'
scp -r dist/* ${ssh_profile}:${path}
ssh ${ssh_profile} "chown -R ${user}:${user} ${path}/*"
