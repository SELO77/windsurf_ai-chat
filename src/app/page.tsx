import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Sample character data - this would typically come from your database
  const recommendedCharacters = [
    {
      id: "1",
      name: "윤세아",
      description: "고내 사인 여사친 듣기.",
      views: "31.3만",
      image: "https://i.imgur.com/JCWWHbZ.jpg",
      creator: "@A.S.R"
    },
    {
      id: "2",
      name: "서아리",
      description: "거기 너무, 이것도 마셔봐",
      views: "28.2만",
      image: "https://i.imgur.com/K2TvFs7.jpg",
      creator: "@MaengDelegation"
    },
    {
      id: "3",
      name: "오민영",
      description: "소방관 구조대원인 나무위 구해내인 오민영",
      views: "10.8만",
      image: "https://i.imgur.com/Xj7U9Wd.jpg",
      creator: "@Qiyana"
    }
  ];

  const trendingCharacters = [
    {
      id: "4",
      name: "이리나",
      description: "난 너의 '모든 걸' 받아줄 거야. 그게, 사랑이니까...",
      views: "3754",
      image: "https://i.imgur.com/7Uxw3Ov.jpg",
      creator: "@speak.7100"
    },
    {
      id: "5",
      name: "조로리/안나",
      description: "안녕! 조로리",
      views: "2226",
      image: "https://i.imgur.com/XnGwJKn.jpg",
      creator: "@Queennofred"
    },
    {
      id: "6",
      name: "심파야",
      description: "내 전승레이트 (여기가 최고가 있음)",
      views: "512",
      image: "https://i.imgur.com/NqgJdAZ.jpg",
      creator: "@SunnyDodo6484"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header with search icon */}
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">zeta</h1>
        <button className="rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </header>

      {/* Featured character banner */}
      <div className="relative mx-4 mb-6 overflow-hidden rounded-xl">
        <div className="relative h-24 w-full overflow-hidden rounded-xl bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="absolute inset-0 flex items-center p-4">
            <div className="z-10 flex-1">
              <h2 className="text-lg font-bold">이렇게 대답할지 몰라?루</h2>
              <p className="text-sm">답변 추천을 써봐 ⚡⚡⚡</p>
              <div className="mt-1 text-xs text-gray-400">2/8</div>
            </div>
            <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="mb-4 border-b border-gray-800">
        <div className="flex px-4">
          <button className="border-b-2 border-purple-500 pb-2 pr-4 font-medium text-white">추천</button>
          <button className="pb-2 px-4 text-gray-500">랭킹</button>
        </div>
      </div>

      {/* Today's recommended characters */}
      <div className="px-4">
        <h3 className="mb-4 text-lg">오늘만큼은 나도 알파메일</h3>
        <div className="mb-8 grid grid-cols-3 gap-2">
          {recommendedCharacters.map((character) => (
            <Link href={`/chat/${character.id}`} key={character.id} className="block">
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image 
                    src={character.image} 
                    alt={character.name}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 flex items-center rounded bg-black/70 px-1 py-0.5 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                      <path d="m9 10 2 2 4-4"></path>
                    </svg>
                    {character.views}
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{character.name}</h4>
                    <button className="text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">{character.description}</p>
                  <p className="mt-1 text-xs text-gray-500">{character.creator}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending characters section */}
      <div className="px-4">
        <h3 className="mb-4 text-lg">이제 막 주목받기 시작한 캐릭터들</h3>
        <div className="grid grid-cols-3 gap-2">
          {trendingCharacters.map((character) => (
            <Link href={`/chat/${character.id}`} key={character.id} className="block">
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image 
                    src={character.image} 
                    alt={character.name}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 flex items-center rounded bg-black/70 px-1 py-0.5 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                      <path d="m9 10 2 2 4-4"></path>
                    </svg>
                    {character.views}
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{character.name}</h4>
                    <button className="text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">{character.description}</p>
                  <p className="mt-1 text-xs text-gray-500">{character.creator}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom message */}
      <div className="mt-8 px-4 text-center text-sm text-gray-500">
        <p>나무님 마음에 쏙 들 거에요</p>
      </div>

      {/* Create character button */}
      <div className="fixed bottom-20 right-4 z-10">
        <Link href="/create">
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </button>
        </Link>
      </div>

      {/* Bottom navigation bar */}
      <div className="mt-auto flex border-t border-gray-800 bg-black p-2">
        <Link href="/" className="flex flex-1 flex-col items-center py-1 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs">홈</span>
        </Link>
        <Link href="/my-characters" className="flex flex-1 flex-col items-center py-1 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="text-xs">내 캐릭터</span>
        </Link>
        <Link href="/chat" className="flex flex-1 flex-col items-center py-1 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="text-xs">대화</span>
        </Link>
        <Link href="/create" className="flex flex-1 flex-col items-center py-1 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
          <span className="text-xs">제작</span>
        </Link>
        <Link href="/profile" className="flex flex-1 flex-col items-center py-1 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="text-xs">마이페이지</span>
        </Link>
      </div>
    </div>
  );
}
