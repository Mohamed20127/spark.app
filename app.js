const products = [
{name:"بيتزا مارغريتا",price:120,category:"بيتزا"},
{name:"بيتزا بيبروني",price:150,category:"بيتزا"},
{name:"كريب شاورما",price:110,category:"كريب"},
{name:"كالزوني لحم",price:130,category:"كالزوني"},
{name:"رول فراخ",price:95,category:"رول"},
{name:"بطاطس جبنة",price:60,category:"بطاطس"},
{name:"صوص إضافي",price:15,category:"إضافات"},
{name:"كوكاكولا",price:25,category:"مشروبات"}
];

let cart = [];
let currentCategory="all";

const container = document.getElementById("productsContainer");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

function renderProducts(){
container.innerHTML="";
let filtered = currentCategory==="all" ? products :
products.filter(p=>p.category===currentCategory);

filtered.forEach((p,i)=>{
container.innerHTML+=`
<div class="product">
<h4>${p.name}</h4>
<p class="price">${p.price} جنيه</p>
<button class="addBtn" onclick="addToCart(${i})">إضافة</button>
</div>`;
});
}

window.addToCart = function(i){
cart.push(products[i]);
updateCart();
}

function updateCart(){
cartItems.innerHTML="";
let total=0;
cart.forEach((item,index)=>{
total+=item.price;
cartItems.innerHTML+=`
<div>
${item.name} - ${item.price} جنيه
<button onclick="removeItem(${index})">❌</button>
</div>`;
});
totalPrice.innerText="الإجمالي: "+total+" جنيه";
cartCount.innerText=cart.length;
}

window.removeItem=function(i){
cart.splice(i,1);
updateCart();
}

checkoutBtn.addEventListener("click",()=>{
if(cart.length===0) return alert("السلة فاضية");

let total=cart.reduce((a,b)=>a+b.price,0);

let order={
items:cart,
total:total,
date:new Date()
};

if(window.sendOrderToFirebase){
sendOrderToFirebase(order);
}

cart=[];
updateCart();
});

document.querySelectorAll(".bottom-nav button").forEach(btn=>{
btn.addEventListener("click",()=>{
document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
document.getElementById(btn.dataset.view).classList.add("active");
document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
});
});

document.querySelectorAll(".card").forEach(card=>{
card.addEventListener("click",()=>{
currentCategory=card.innerText.trim();
document.getElementById("homeView").classList.add("active");
document.getElementById("categoriesView").classList.remove("active");
renderProducts();
});
});

document.getElementById("themeToggle").addEventListener("click",()=>{
document.body.classList.toggle("light");
document.body.classList.toggle("dark");
});

renderProducts();