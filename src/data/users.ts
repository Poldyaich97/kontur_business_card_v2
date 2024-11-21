export interface User {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  photo: string;
  qr: string;
  telegramUsername?: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "Польдяев Даниил Cергеевич",
    position: "Руководитель группы",
    phone: "+7 (967) 853-28-13",
    email: "poldyaev@skbkontu.ru",
    photo: "https://github.com/Poldyaich97/kontur_business_card/blob/main/src/data/1.png?raw=true",
    qr: "https://raw.githubusercontent.com/Poldyaich97/kontur_business_card_v2/refs/heads/main/src/data/qr1.png?raw=true",
    telegramUsername: "PoldyaevD"
  },
  {
    id: 2,
    name: "Русаков Дмитрий Александрович",
    position: "Руководитель отдела",
    phone: "+7 (909) 003-22-76",
    email: "rusakov_da@skbkontur.ru",
    photo: "https://github.com/Poldyaich97/kontur_business_card/blob/main/src/data/2.png?raw=true",
    qr: "https://raw.githubusercontent.com/Poldyaich97/kontur_business_card_v2/refs/heads/main/src/data/qr2.png?raw=true",
    telegramUsername: ""
  },
  {
    id: 3,
    name: "Воробьев Дмитрий Александрович",
    position: "Руководитель управления",
    phone: "+7 (965) 546-44-64",
    email: "vord@skbkontur.ru",
    photo: "https://github.com/Poldyaich97/kontur_business_card_v2/blob/main/src/data/id3.jpg?raw=true",
    qr: "https://raw.githubusercontent.com/Poldyaich97/kontur_business_card_v2/refs/heads/main/src/data/qr3.png?raw=true",
    telegramUsername: "fader07"
  }, {
    id: 4,
    name: "Милюкова Жанна Витальевна",
    position: "Заместитель руководителя управления по общим вопросам",
    phone: "+7 (912) 219-94-39",
    email: "jmilukova@skbkontur.ru",
    photo: "https://github.com/Poldyaich97/kontur_business_card_v2/blob/main/src/data/id4.jpg?raw=true",
    qr: "https://raw.githubusercontent.com/Poldyaich97/kontur_business_card_v2/refs/heads/main/src/data/qr4.png?raw=true",
    telegramUsername: "@jmilukova"
  }

];