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
  invitationText: `서로가 마주보며 다져온 사랑을
이제 함께 한 곳을 바라보며
걸어가고자 합니다.

저희 두 사람이 사랑의 결실을 맺는
소중한 자리에 오셔서
축복해 주시면 감사하겠습니다.`,

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
    // ── 야외 로맨틱 ──
    'assets/images/gallery/photo4.jpg',   // 골든아워 첫인상
    'assets/images/gallery/photo7.jpg',   // 나무 아래 밀착
    'assets/images/gallery/photo6.jpg',   // 브라이덜 우아함
    'assets/images/gallery/photo12.jpg',  // 나뭇잎 사이 조용한 둘만의 순간
    'assets/images/gallery/photo9.jpg',   // 신랑 독사진
    'assets/images/gallery/photo10.jpg',  // 신부 독사진
    'assets/images/gallery/photo8.jpg',   // 둘이 함께
    'assets/images/gallery/photo5.jpg',   // 자연스러운 캔디드
    'assets/images/gallery/photo11.jpg',  // 반지 — 축하로 전환
    // ── 야외 풍선 ──
    'assets/images/gallery/photo3.jpg',
    'assets/images/gallery/photo14.jpg',
    'assets/images/gallery/photo15.jpg',
    // ── 스튜디오 ──
    'assets/images/gallery/photo18.jpg',  // 눈맞춤 — 따뜻한 시작
    'assets/images/gallery/photo19.jpg',  // 브라이덜 우아함
    'assets/images/gallery/photo2.jpg',   // 모래시계 친밀감
    'assets/images/gallery/photo16.jpg',  // 캐주얼 밝음
    'assets/images/gallery/photo1.jpg',   // 환한 웃음
    'assets/images/gallery/photo17.jpg',  // 선물상자 장난기
    'assets/images/gallery/photo13.jpg',  // 점프 — 경쾌한 마무리
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
