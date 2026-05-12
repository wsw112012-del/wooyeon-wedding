// ================================================
//  모바일 청첩장 설정 파일
//  이 파일만 수정하면 청첩장 내용이 바뀝니다!
// ================================================

const WEDDING_CONFIG = {

  // ===== 기본 정보 =====
  groomName:       '우승우',
  brideName:       '김라연',
  groomNameEn:     'Seungwoo',
  brideNameEn:     'Rayeon',

  // 결혼식 일시 (ISO 8601 형식)
  weddingDatetime: '2026-08-22T18:30:00',
  weddingDateKo:   '2026년 8월 22일 토요일',
  weddingTimeKo:   '오후 6시 30분',

  // ===== 연락처 =====
  groomPhone: '010-0000-0000',   // 신랑 전화번호
  bridePhone: '010-0000-0000',   // 신부 전화번호

  // ===== 가족 정보 =====
  groomFather: '우상정',
  groomMother: '박민숙',
  brideFather: '김경식',
  brideMother: '문연숙',

  // 혼주 연락처 (전화번호 없으면 phone: '' 로 비워두세요)
  groomParents: [
    { relation: '아버지', name: '우상정', phone: '010-0000-0000' },
    { relation: '어머니', name: '박민숙', phone: '010-0000-0000' },
  ],
  brideParents: [
    { relation: '아버지', name: '김경식', phone: '010-0000-0000' },
    { relation: '어머니', name: '문연숙', phone: '010-0000-0000' },
  ],

  // ===== 청첩장 본문 =====
  invitationText: `시간이 지날수록 선명해지고
함께할수록 따뜻함이 깊어지는 사람.
그런 사람을 만났습니다.

이제 평생을 함께하기로 약속하며
네 번째로 같이 맞는 여름날
소중한 분들 앞에서 그 마음을 전하려 합니다.

저희, 결혼합니다!
기쁜 날 함께 자리해주시면 감사하겠습니다.`,

  // ===== 예식장 정보 =====
  venueName:    '빌라드지디 논현',
  venueHall:    '',
  venueAddress: '서울특별시 강남구 언주로 126길 23 (논현동)',
  venuePhone:   '02-547-3381',

  // 위도/경도
  lat: 37.514213,
  lng: 127.037277,

  // ===== 교통 정보 =====
  transport: {
    subway:  '7호선 강남구청역 2번 출구 7분 · 7호선 학동역 1번 출구 10분',
    bus:     '지선 2011, 3414, 6411, 3219, 4412 / 간선 141, 401, 640, 472, 147',
    parking: '논현동 241-3 SK허브블루(학동로342) 지하주차장 이용',
  },

  // ===== 사진 설정 =====
  showHeroPhoto: true,
  heroBg: 'assets/images/hero.webp',

  // 갤러리 사진 목록
  gallery: [
    'assets/images/gallery/photo1.webp',
    'assets/images/gallery/photo2.webp',
    'assets/images/gallery/photo3.webp',
    'assets/images/gallery/photo4.webp',
    'assets/images/gallery/photo5.webp',
    'assets/images/gallery/photo6.webp',
    'assets/images/gallery/photo7.webp',
    'assets/images/gallery/photo8.webp',
    'assets/images/gallery/photo9.webp',
    'assets/images/gallery/photo10.webp',
    'assets/images/gallery/photo11.webp',
    'assets/images/gallery/photo12.webp',
    'assets/images/gallery/photo13.webp',
    'assets/images/gallery/photo14.webp',
    'assets/images/gallery/photo15.webp',
    'assets/images/gallery/photo16.webp',
    'assets/images/gallery/photo17.webp',
    'assets/images/gallery/photo18.webp',
    'assets/images/gallery/photo19.webp',
  ],

  // ===== 계좌번호 =====
  accounts: {
    groom: [
      { bank: '신한은행', number: '110-445-883849',   holder: '우승우' },
      { bank: '신한은행', number: '110-000-000000',   holder: '우상정' },
      { bank: '국민은행', number: '000000-00-000000', holder: '박민숙' },
    ],
    bride: [
      { bank: '국민은행', number: '123456-78-901234', holder: '김라연' },
      { bank: '우리은행', number: '000-000000-00-000', holder: '김경식' },
      { bank: '하나은행', number: '000-0000-0000-00',  holder: '문연숙' },
    ],
  },

  // ===== 배경음악 =====
  // mp3 파일을 assets/music/ 폴더에 넣고 경로를 입력하세요. 없으면 '' 로 비워두세요.
  musicSrc: 'assets/music/bgm.mp3',

  // ===== 카카오 공유 =====
  kakaoAppKey: 'e783273e9d9c862ebf7bd9d65a888cea',

  // ===== 공유 설정 =====
  // 배포 후 실제 URL로 변경하세요
  shareUrl: 'https://wooyeon-wedding.pages.dev',
  shareTitle: '우승우 ♡ 김라연 결혼합니다',
  shareDescription: '2026년 8월 22일 토요일 오후 6시 30분 빌라드지디 논현',
};
