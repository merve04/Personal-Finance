const ESIK_DEGER = 80;
const XP = 50;
const SEVIYE_XP = 150;
const ad = document.getElementById("ad");
const profilSecim = document.getElementById("profilSecim");
const limit = document.getElementById("limit");
const harcama = document.getElementById("harcama");
const gonderLimit = document.getElementById("gonderLimit");
const gonderHarcama = document.getElementById("gonderHarcama");
const ayıKapat = document.getElementById("ayıKapat");
const bar = document.getElementById("bar");
const butceBar = document.getElementById("butceBar");
const guncelYuzdeMetni = document.getElementById("guncelYuzdeMetni");
const limitGosterge = document.getElementById("limitGosterge");
const harcamaGosterge = document.getElementById("harcamaGosterge");
const disiplinGosterge = document.getElementById("disiplinGosterge");
const seviyeGosterge = document.getElementById("seviyeGosterge");

let seviye = 1;
let disiplinPuanı = 0;
let limitDegeri = 0;
let toplamHarcama = 0;

// FONKSİYONLAR
function barGuncelle(gelenYuzde) {
  if (gelenYuzde >= ESIK_DEGER) {
    butceBar.style.backgroundColor = "red";
  }
  butceBar.style.width = gelenYuzde + "%";
  guncelYuzdeMetni.style.left = gelenYuzde + "%";
  guncelYuzdeMetni.innerText = "%" + Math.round(gelenYuzde);
}
function ayıSıfırla() {
  butceBar.style.backgroundColor = "#1B3C53";
  limitDegeri = 0;
  toplamHarcama = 0;
  limitGosterge.innerText = "Aylık Limitiniz: ";
  harcamaGosterge.innerText = "Aylık Toplam Harcamanız: ";
  guncelYuzdeMetni.innerText = "%0";
  butceBar.style.width = "0%";
  guncelYuzdeMetni.style.left = "0%";
  limit.value = "";
  harcama.value = "";
  console.log("Ay kapatıldı, tüm veriler sıfırlandı.");
}
// PROFİL SEÇİM
ad.addEventListener("input", function () {
  profilSecim.innerText = "";
  if (ad.value.length > 0) {
    profilSecim.innerText = "Hoş geldin, " + ad.value;
  } else {
    profilSecim.innerText = "Profilinizi Oluşturun";
  }
});
// LİMİT AYARLAMA
gonderLimit.addEventListener("click", function () {
  limitDegeri = Number(limit.value);
  console.log("Yeni Limit Belirlendi: " + limitDegeri);
  limitGosterge.innerText = "Limitiniz : " + " " + limitDegeri + "TL";
});
// HARCAMA GİRDİSİ AYARLAMA
gonderHarcama.addEventListener("click", function () {
  if (limitDegeri === 0) {
    alert("Önce bir limit belirlemelisin!");
    return;
  }
  toplamHarcama += Number(harcama.value);
  harcamaGosterge.innerText =
    "Toplam Harcamanız : " + " " + toplamHarcama + "TL";
  let yuzde = (toplamHarcama / limitDegeri) * 100;
  if (yuzde > 100) {
    yuzde = 100;
  }
  barGuncelle(yuzde);
});
// AY KAPANIŞI
ayıKapat.addEventListener("click", function () {
  if (limitDegeri > 0) {
    if (limitDegeri > toplamHarcama) {
      disiplinPuanı += XP;
    } else {
      disiplinPuanı -= XP;
    }
  } else {
    alert("Önce bir limit belirlemelisin!");
    return;
  }

  if (disiplinPuanı >= SEVIYE_XP) {
    seviye += 1;
    disiplinPuanı = 0;
  }
  disiplinGosterge.innerText =
    "Disiplin Puanı:" + " " + disiplinPuanı + " " + "xp";
  seviyeGosterge.innerText = "Seviye: " + " " + seviye;
  ayıSıfırla();
});
