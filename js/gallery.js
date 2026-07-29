/* =========================================================
   GALLERY.JS — simple image gallery + lightbox
========================================================= */

const GALLERY_DATA = [
  { src: "im/1.jpeg", category: "meetings" },
  { src: "im/2.jpeg", category: "meetings" },
  { src: "im/3.jpeg", category: "meetings" },
  { src: "im/4.jpeg", category: "meetings" },
  { src: "im/5.jpeg", category: "meetings" },
  { src: "im/6.jpeg", category: "meetings" },
  { src: "im/7.jpeg", category: "meetings" },
  { src: "im/8.jpeg", category: "meetings" },
  { src: "im/9.jpeg", category: "meetings" },
  { src: "im/10.jpeg", category: "meetings" },
  { src: "im/11.jpeg", category: "meetings" },
  { src: "im/12.jpeg", category: "meetings" },
  { src: "im/13.jpeg", category: "meetings" },
  { src: "im/14.jpeg", category: "meetings" },
  { src: "im/15.jpeg", category: "meetings" },
  { src: "im/16.jpeg", category: "meetings" },
  { src: "im/17.jpeg", category: "meetings" },
  { src: "im/18.jpeg", category: "meetings" },
  { src: "im/19.jpeg", category: "meetings" },
  { src: "im/20.jpeg", category: "meetings" },
];

function renderGallery(){
  const grid = document.getElementById("galleryGrid");
  if(!grid) return;

  grid.innerHTML = GALLERY_DATA.map((item, idx) => `
    <div class="gallery-item" data-reveal data-index="${idx}">
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
    </div>
  `).join("");

  document.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("revealed"));

  grid.querySelectorAll(".gallery-item").forEach(el => {
    el.addEventListener("click", () => openLightbox(parseInt(el.dataset.index, 10)));
  });
}

let currentIndex = 0;
function openLightbox(index){
  currentIndex = index;
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  if(!lb) return;
  img.src = GALLERY_DATA[index].src;
  img.alt = GALLERY_DATA[index].caption;
  cap.textContent = GALLERY_DATA[index].caption;
  lb.classList.add("open");
}
function closeLightbox(){ document.getElementById("lightbox")?.classList.remove("open"); }
function navLightbox(dir){
  currentIndex = (currentIndex + dir + GALLERY_DATA.length) % GALLERY_DATA.length;
  openLightbox(currentIndex);
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();

  document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
  document.getElementById("lightboxNext")?.addEventListener("click", () => navLightbox(1));
  document.getElementById("lightboxPrev")?.addEventListener("click", () => navLightbox(-1));
  document.getElementById("lightbox")?.addEventListener("click", (e) => {
    if(e.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if(!document.getElementById("lightbox")?.classList.contains("open")) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowRight") navLightbox(1);
    if(e.key === "ArrowLeft") navLightbox(-1);
  });
});
