# Raccoon Recycle

- (서비스종료)

### Introduction

- React Native 기반 안드로이드 어플리케이션

### Features

- Google Login
- 카메라를 이용한 barcode 스캔
- 분리수거 정보가 있을 경우
  - 이미지, 저장 정보 불러오기
- 분리수거 정보가 없을 경우
  - 재활용 이미지 Drag & Drop
  - 이미지 저장
- serverless

### Requirements

- Expo mobile Application
- Google Login

### Installation

```sh
$ yarn install

# src/HomeScreen.js
#line 27 주석 해제
#line 30 주석 처리

$ yarn start

# run expo app and scan qr code

```

### Tech

- Front: Javascript(ES6+), React Native, Expo
- Back: AWS API Gateway, Lambda, S3

### Things to do

- Test
- TypeScript
- 분리수거 정보에 좋아요, 싫어요 표시
- UI 개선
