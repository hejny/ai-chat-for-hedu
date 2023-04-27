#!/bin/bash
# 📜 This script is used to (re)generate the certificates for the server.

systemctl stop nginx;

# Collboard for education
certbot certonly --expand --standalone --noninteractive --domain ai.proedu.cz

# Note: To add new service search tag [🧷] for all important places in the code

# TODO: Probably use domain api.collboard.com
# TODO: How to list domains into multiple rows
# Note: [🎑] This script is copied also in terminals script


systemctl start nginx;
