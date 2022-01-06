const express = require("express");
const router = express.Router();
const auth = require("./auth/accessToken");
const userRouter = require("./users/userRouter");
const reviewRouter = require("./reviews/reviewRouter");

//users
router.post("/users/signup", userRouter.signUp); // 회원가입
router.post("/users/signin", userRouter.signIn); // 로그인
router.post("/users/signout", auth.accessToken, userRouter.signOut); // 로그아웃

router.get("/users/kakao", userRouter.kakao); // kakao 토큰 받기
router.get("/users/kakaoCallback", userRouter.kakaoCallback); // kakao 로그인
router.get("/users/google", userRouter.google); // google 토큰 받기
router.get("/users/googleCallback", userRouter.googleCallback); // google 로그인

//mypage
router.get("/users/mypage", auth.accessToken, userRouter.userInfo); // 유저정보 확인, 좋아요 누른 컨텐츠 5개, 내가쓴 리뷰글 5개
router.patch("/users/mypage", auth.accessToken, userRouter.modifyUser); // 회원정보 수정
router.delete("/users/mypage", auth.accessToken, userRouter.withdrawal); // 회원탈퇴

router.get("/users/mypage/myLike", auth.accessToken, userRouter.myLike); // 내가 좋아요 누른 컨텐츠 more
router.get("/users/mypage/myReview", auth.accessToken, userRouter.myReview); // 내가쓴 리뷰글 more

//reviews
router.get("/reviews", reviewRouter.reviewList); // 리뷰 전체 불러오기
router.get("/reviews/:postId", reviewRouter.reviewPick); // 리뷰 하나 불러오기

router.post("/reviews", auth.accessToken, null); // 리뷰 작성하기
router.delete("/reviews/:postId", auth.accessToken, null); // 리뷰 삭제

router.post("/reviews/:postId/like", auth.accessToken, null) // 리뷰에 좋아요
router.post("/reviews/:postId/comment", auth.accessToken, null) // 리뷰에 댓글

router.delete("/reviews/:postId/:commentId", auth.accessToken, null); // 리뷰 댓글 지우기
router.delete("/reviews/:postId/:likeId", auth.accessToken, null); // 리뷰 좋아요 지우기

//contents
router.get("/contents", null); // 컨텐츠 전체 불러오기
router.get("/contents/:category", null); // 컨텐츠 카테고리 필터링
router.get("/contents/:category/:type", null); // 컨텐츠 카테고리&타입 필터링
router.get("/contents/:id", null); // 컨텐츠 하나 선택

//https://github.com/codestates/moongori/blob/main/server/controllers/index.js 참조