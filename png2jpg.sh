#!/bin/bash

# PNG에서 JPG로 변환하는 스크립트
# 현재 디렉토리와 하위 디렉토리의 모든 PNG 파일을 찾아 JPG로 변환

cd /Users/hyunsoocha/GitHub/hyunsoocha.github.io/perse/static/images/interpolation/mouth/stacked

# 변환할 파일이 있는지 확인
if ! command -v convert &> /dev/null; then
    echo "ImageMagick이 설치되어 있지 않습니다. 설치 후 다시 실행하세요."
    exit 1
fi

# PNG 파일을 탐색하여 변환
find . -type f -name "*.png" | while read -r file; do
    # 확장자 제거 및 JPG 경로 설정
    base_name="${file%.png}"
    jpg_file="${base_name}.jpg"

    # PNG를 JPG로 변환
    convert "$file" -quality 100 "$jpg_file"
    
    # 결과 출력
    if [ $? -eq 0 ]; then
        echo "변환 완료: $file -> $jpg_file"
        rm "$file"
    else
        echo "변환 실패: $file"
    fi
done

echo "모든 변환이 완료되었습니다."