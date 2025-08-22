import type { IronSessionOptions } from 'iron-session';

// 세션에 저장될 데이터의 타입을 정의합니다.
export interface SessionData {
  username: string;
  isLoggedIn: true;
}

export const sessionOptions: IronSessionOptions = {
  // .env 파일에서 불러온 세션 비밀번호입니다.
  password: process.env.SESSION_PASSWORD as string,
  cookieName: 'cleanair-session', // 웹사이트에서 사용할 쿠키 이름
  
  // 프로덕션 환경(HTTPS)에서는 쿠키를 더 안전하게 전송하기 위한 설정입니다.
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
