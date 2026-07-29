/* =========================================================
   GALLERY.JS — simple image gallery + lightbox
========================================================= */

const GALLERY_DATA = [
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop", caption: "Youth club meeting at the community hall" },
  { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=900&auto=format&fit=crop", caption: "Community event and cultural gathering" },
  { src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=900&auto=format&fit=crop", caption: "Sports activity in the village" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=900&auto=format&fit=crop", caption: "Village cleanliness drive" },
  { src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=900&auto=format&fit=crop", caption: "Nature and hillside landscape" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=900&auto=format&fit=crop", caption: "Blood donation camp support" },
  { src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=900&auto=format&fit=crop", caption: "Tree plantation drive" },
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop", caption: "Education support session" },
  { src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=900&auto=format&fit=crop", caption: "Social work and helping hands" },
  { src: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=900&auto=format&fit=crop", caption: "Community gathering and teamwork" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop", caption: "Village program in action" },
  { src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=900&auto=format&fit=crop", caption: "Youth participation in local activities" },
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
