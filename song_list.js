//song list
let All_song = [
  {
    name: "คำหวาน (ที่เธอไม่เอา)",
    path: "musics/1.mp3",
    img: "images/1.jpg",
    singer: "UMA [LIVE] @TWIO3 KORAT",
    album: "คำหวาน (ที่เธอไม่เอา) Ft.Tossakan",
  },
  {
    name: "รจนาเอย",
    path: "musics/2.mp3",
    img: "images/2.jpg",
    singer: "จิ๋ว สกุณชัย",
    album: "รจนาเอย - Single 2023",
  },
  {
    name: "เปิดใจไม่เปิดตัว",
    path: "musics/3.mp3",
    img: "images/3.jpg",
    singer: "TIMETHAI",
    album: "เปิดใจไม่เปิดตัว - Single 2023",
  },
  {
    name: "ท็อปในรุ่น",
    path: "musics/4.mp3",
    img: "images/4.jpg",
    singer: "ฮันเตอร์",
    album: "ท็อปในรุ่น - Single 2023",
  },
  {
    name: "บักคนซั่ว",
    path: "musics/5.mp3",
    img: "images/5.jpg",
    singer: "TIMETHAI [LIVE SESSION]",
    album: "บักคนซั่ว Cover 2023",
  },
  {
    name: "ร้องไปกับฟ้า",
    path: "musics/6.mp3",
    img: "images/6.jpg",
    singer: "แหลม สมพล Ft.D GERRARD",
    album: "เพลงประกอบ 4kings2",
  },
  {
    name: "ไม่เหมือนใคร",
    path: "musics/7.mp3",
    img: "images/7.jpg",
    singer: "D GERRARD",
    album: "D Gerrard",
  },
  {
    name: "กระแซะเข้ามาซิ",
    path: "musics/8.mp3",
    img: "images/8.jpg",
    singer: "Tilly Birds",
    album: "กระแซ๊ะเข้ามาซิ Cover 2018 ",
  },
  {
    name: "ฤดูหนาว",
    path: "musics/9.mp3",
    img: "images/9.jpg",
    singer: "PARADOX Feat.LHAM",
    album: "ฤดูหนาว",
  },
  {
    name: "สุขาอยู่หนใด",
    path: "musics/10.mp3",
    img: "images/10.jpg",
    singer: "25hourห",
    album: "มัมแอนด์ป็อปช็อป",
  },
];
/*you can add more song & images from you computer*/

let tracks = document.querySelector(".tracks");

for (let i = 0; i < All_song.length; i++) {
  let Html = ` <div class="song">
      <div class="img">
      <img src="${All_song[i].img}"/>
      </div>
      <div class="more">
      <audio src="${All_song[i].path}" id="music"></audio>
      <div class="song_info">
         <p id="title">${All_song[i].name}</p>
         <p>${All_song[i].singer}</p>
         <p>${All_song[i].album}</p>
      </div>
      <button id="play_btn"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
      </div>
    </div>`;

  tracks.insertAdjacentHTML("beforeend", Html);
}
