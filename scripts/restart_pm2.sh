#!/bin/bash
LOG_FILE="/home/ubuntu/.pm2/logs/pm2_restart.log"

echo "Restarting PM2 at $(date)" >> $LOG_FILE
/home/ubuntu/.nvm/versions/node/v16.16.0/bin/pm2 restart all >> $LOG_FILE
/home/ubuntu/.nvm/versions/node/v16.16.0/bin/pm2 save >> $LOG_FILE
echo "PM2 restarted" >> $LOG_FILE

