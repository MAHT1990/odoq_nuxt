#!/bin/bash

# 로그 파일 경로와 pm2 명령어 경로 설정
LOG_FILE="/home/ubuntu/.pm2/logs/pm2_restart.log"
PM2_PATH="/home/ubuntu/.nvm/versions/node/v16.16.0/bin/pm2"

# 특정 사용자 환경 변수 설정 (예: nvm 설정)
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# 스크립트 실행 시점의 현재 사용자 확인 (옵션)
echo "Current user: $(whoami)" >> $LOG_FILE

# 현재 날짜와 시간 기록
echo "Restarting PM2 at $(date)" >> $LOG_FILE

# pm2 재시작 및 저장
$PM2_PATH restart all >> $LOG_FILE 2>&1
$PM2_PATH save >> $LOG_FILE 2>&1

# 완료 메시지 기록
echo "PM2 restarted" >> $LOG_FILE


