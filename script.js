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

ad.addEventListener("input", function () {
  profilSecim.innerText = "";
  if (ad.value.length > 0) {
    profilSecim.innerText = "Hoş geldin, " + ad.value;
  } else {
    profilSecim.innerText = "Profilinizi Oluşturun";
  }
});

gonderLimit.addEventListener("click", function () {
  limitDegeri = Number(limit.value);
  console.log("Yeni Limit Belirlendi: " + limitDegeri);
  limitGosterge.innerText = "Limitiniz : " + " " + limitDegeri + "TL";
});

gonderHarcama.addEventListener("click", function () {
  toplamHarcama += Number(harcama.value);
  harcamaGosterge.innerText =
    "Toplam Harcamanız : " + " " + toplamHarcama + "TL";
  let yuzde = (toplamHarcama / limitDegeri) * 100;
  if (yuzde > 100) {
    yuzde = 100;
  }
  if (yuzde >= 80) {
    butceBar.style.backgroundColor = "red";
  }
  butceBar.style.width = yuzde + "%";
  guncelYuzdeMetni.style.left = yuzde + "%";
  guncelYuzdeMetni.innerText = "%" + Math.round(yuzde);
});

ayıKapat.addEventListener("click", function () {
  if (limitDegeri > 0) {
    if (limitDegeri > toplamHarcama) {
      disiplinPuanı += 50;
    } else {
      disiplinPuanı -= 50;
    }
  } else {
    alert("Önce bir limit belirlemelisin!");
    return;
  }

  if (disiplinPuanı >= 150) {
    seviye += 1;
    disiplinPuanı = 0;
  }
  disiplinGosterge.innerText =
    "Disiplin Puanı:" + " " + disiplinPuanı + " " + "xp";
  seviyeGosterge.innerText = "Seviye: " + " " + seviye;
  butceBar.style.backgroundColor = "#1B3C53";
  limitDegeri = 0;
  toplamHarcama = 0;
  limitGosterge.innerText = "Aylık Limitiniz: 0 TL";
  harcamaGosterge.innerText = "Aylık Toplam Harcamanız: 0 TL";
  guncelYuzdeMetni.innerText = "%0";
  butceBar.style.width = "0%";
  guncelYuzdeMetni.style.left = "0%";
  limit.value = "";
  harcama.value = "";
  console.log("Ay kapatıldı, tüm veriler sıfırlandı.");
});
