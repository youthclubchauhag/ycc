/* =========================================================
   GALLERY.JS — category filter + lightbox
   To add photos later: just push new objects into GALLERY_DATA
   below (admin-friendly, no HTML editing required).
========================================================= */

const GALLERY_DATA = [
  { src: "images/gallery/meeting-1.jpg", category: "meetings",       caption: "Monthly planning meeting at the community hall" },
  { src: "images/gallery/event-1.jpg",   category: "events",         caption: "Annual foundation day celebration" },
  { src: "images/gallery/sports-1.jpg",  category: "sports",         caption: "Inter-village volleyball tournament" },
  { src: "images/gallery/village-1.jpg", category: "village",        caption: "Village cleanliness drive, Chauhag" },
  { src: "images/gallery/nature-1.jpg",  category: "nature",         caption: "Morning view of the Himalayan ridgeline" },
  { src: "images/gallery/blood-1.jpg",   category: "blood-donation", caption: "Blood donation camp with local health centre" },
  { src: "images/gallery/tree-1.jpg",    category: "tree-plantation",caption: "Sapling plantation along the school road" },
  { src: "images/gallery/edu-1.jpg",     category: "education",      caption: "Free evening tuition for children" },
  { src: "images/gallery/social-1.jpg",  category: "social-work",    caption: "Ration distribution to elderly residents" },
  { src: "images/gallery/meeting-2.jpg", category: "meetings",       caption: "Executive committee review session" },
  { src: "images/gallery/event-2.jpg",   category: "events",         caption: "Cultural evening during the harvest festival" },
  { src: "images/gallery/sports-2.jpg",  category: "sports",         caption: "Youth cricket league finals" },
];

const CATEGORY_LABELS = {
  all: "All", meetings: "Meetings", events: "Events", sports: "Sports",
  village: "Village", nature: "Nature", "blood-donation": "Blood Donation",
  "tree-plantation": "Tree Plantation", education: "Education", "social-work": "Social Work"
};

function renderGallery(filter = "all"){
  const grid = document.getElementById("galleryGrid");
  if(!grid) return;
  const items = filter === "all" ? GALLERY_DATA : GALLERY_DATA.filter(i => i.category === filter);

  grid.innerHTML = items.map((item, idx) => `
    <div class="gallery-item" data-reveal data-index="${GALLERY_DATA.indexOf(item)}">
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <div class="gallery-overlay">
        <div>
          <span class="badge-soft mb-2">${CATEGORY_LABELS[item.category] || item.category}</span>
          <p class="text-white text-sm font-medium">${item.caption}</p>
        </div>
      </div>
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
  renderGallery("all");

  document.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      renderGallery(pill.dataset.filter);
    });
  });

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
