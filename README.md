## Introduction

바코드를 이용해 물건을 판별하고 카메라로 사진을 찍어 각 부분의 분리수거 정보를 저장하는 안드로이드 어플리케이션 입니다.

<div style="display: flex; justify-content: space-around">
  <img src="https://raccoon91.github.io/assets/img/recycle_login.jpg" width="200" />
  <img src="https://raccoon91.github.io/assets/img/recycle_barcode.jpg" width="200" />
  <img src="https://raccoon91.github.io/assets/img/recycle_info.jpg" width="200" />
  <img src="https://raccoon91.github.io/assets/img/recycle_save.jpg" width="200" />
</div>

<a href="https://play.google.com/store/apps/details?id=com.raccoon.recycle" target="_blank">Play Store Link</a>

## Requirements

- Expo mobile Application
- Google Login

## Installation

```sh
$ yarn install
$ yarn start
# run expo app and scan qr code

```

## Skills

- Front: Javascript, React Native
- Back: AWS API Gateway, Lambda, S3

## Features

- Google Login
- 카메라를 이용항 barcode 스캔
- 분리수거 정보가 있을 경우
  - 이미지, 저장 정보 불러오기
- 분리수거 정보가 없을 경우
  - 물건 사진을 찍고 분리수거 이미지 추가하기
  - 이미지 저장

## Things to do

- 분리수거 정보에 좋아요, 싫어요 표시
- Test
- UI 개선