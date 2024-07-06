#!/bin/bash

set -e  # 오류 발생 시 스크립트 실행 중단
set -u  # 미선언 변수 사용 시 오류 발생

# 로그 파일 경로 설정
LOG_FILE="/var/log/init-db.log"

# 로그 기록 함수
log() {
    echo "$(date): $1" >> "$LOG_FILE"
}

# 데이터베이스 생성 및 권한 부여 함수
function create_user_and_database() {
    local database=$1
    log "Creating user and database '$database'"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE DATABASE "$database";
        GRANT ALL PRIVILEGES ON DATABASE "$database" TO $POSTGRES_USER;
EOSQL
    log "Database '$database' created successfully"
}

# POSTGRES_MULTIPLE_DATABASES 환경 변수가 설정되어 있는지 확인
if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    log "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
    # 쉼표로 구분된 데이터베이스 목록을 순회하며 각 데이터베이스 생성
    for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        create_user_and_database $(echo $db | tr -d ' ')
    done
    log "Multiple databases created successfully"
else
    log "No multiple databases requested. Skipping database creation."
fi