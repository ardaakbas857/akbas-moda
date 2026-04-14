/* ================= ÜRÜNLER (FİYAT EKLENDİ) ================= */
const products = [
{ name:"Erkek Tişört", price:200, img:"images/erkektisort.png" },
{ name:"Erkek Pantolon", price:500, img:"images/erkekpantolon.png" },
{ name:"Erkek Ceket", price:900, img:"images/erkekceket.png" },
{ name:"Erkek Spor Ayakkabı", price:1200, img:"images/erkeksporayakkabi.png" },
{ name:"Erkek Gömlek", price:350, img:"images/erkekgomlek.png" },
{ name:"Erkek Hoodie", price:600, img:"images/erkekhoodie.png" },

{ name:"Kadın Elbise", price:700, img:"images/kadinelbise.png" },
{ name:"Kadın Bluz", price:300, img:"images/kadinbluz.png" },
{ name:"Kadın Etek", price:400, img:"images/kadinetek.png" },
{ name:"Kadın Çanta", price:800, img:"images/kadincanta.png" },
{ name:"Kadın Ayakkabı", price:1100, img:"images/kadinayakkabi.png" },
{ name:"Kadın Takı", price:250, img:"images/kadintaki.png" }
];
/* ================= SEPET ================= */
let cart = [];

/* ELEMENTLER */
const productList = document.getElementById("productList");
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");

/* ================= ÜRÜNLERİ BAS ================= */
function renderProducts(){

productList.innerHTML = "";

products.forEach(p=>{

const div = document.createElement("div");
div.classList.add("product");

div.innerHTML = `
<img src="${p.img}" alt="${p.name}">
<h3>${p.name}</h3>
<p>${p.price} ₺</p>
<button onclick="addToCart('${p.name}', ${p.price})">Sepete Ekle</button>
`;

productList.appendChild(div);
});
}

/* ================= SEPETE EKLE (1x 2x SİSTEMİ) ================= */
function addToCart(name, price){

let item = cart.find(x => x.name === name);

if(item){
item.qty++;
} else {
cart.push({name, price, qty:1});
}

updateCart();
}

/* ================= SEPET GÜNCELLE ================= */
function updateCart(){

cartCount.innerText = cart.reduce((a,b)=>a+b.qty,0);

let total = 0;

if(cart.length === 0){
cartItems.innerHTML = "Sepet boş";
return;
}

cartItems.innerHTML = cart.map((item,i)=>{

total += item.price * item.qty;

return `
<p>
${item.name} ${item.qty}x - ${item.price} ₺
<button onclick="removeItem(${i})">Sil</button>
</p>
`;

}).join("");

// TOPLAM FİYAT GÖSTER
cartItems.innerHTML += `<hr><b>Toplam: ${total} ₺</b>`;
}

/* ================= SİL (ADET AZALTMA SİSTEMİ) ================= */
function removeItem(i){

let item = cart[i];

if(item.qty > 1){
item.qty--; // sadece 1 azalt
} else {
cart.splice(i,1); // 0 olursa tamamen sil
}

updateCart();
}

/* ================= SEPET AÇ ================= */
openCart.addEventListener("click", ()=>{
cartSidebar.classList.add("active");
});

/* ================= SEPET KAPAT ================= */
closeCart.addEventListener("click", ()=>{
cartSidebar.classList.remove("active");
});

/* ================= BAŞLAT ================= */
renderProducts();
updateCart();
/* ================= ÖDE BUTONU ================= */
const payBtn = document.getElementById("payBtn");

/* POPUP OLUŞTUR */
const popup = document.createElement("div");
popup.classList.add("popup");
popup.innerHTML = "<h2>İşleminiz Onaylandı ✅</h2><p>Teşekkür ederiz!</p>";

document.body.appendChild(popup);

/* ÖDE BASILINCA */
payBtn.addEventListener("click", ()=>{

if(cart.length === 0){
alert("Sepet boş!");
return;
}

popup.style.display = "block";

/* sepeti temizle */
cart = [];
updateCart();

/* 2 saniye sonra kapat */
setTimeout(()=>{
popup.style.display = "none";
},2000);

});

