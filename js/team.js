/* =========================================================
   TEAM.JS — Team roster + profile modal
   Admin-friendly: to add a new member later, just add one
   object to TEAM_DATA. No HTML editing needed. Each member
   gets their own profile view via the modal popup (acts as
   an individual profile page without a page reload).
========================================================= */

const TEAM_DATA = [
  {
    id: "president",
    name: "Nitanshul Sharma",
    role: "President",
    group: "Leadership",
    photo: "images/team/nitanshul-sharma.jpg",
    bio: "Leads the club and represents community initiatives across Chauhag and neighbouring areas.",
    facebook: "#", instagram: "#", linkedin: "#"
  },
  {
    id: "vice-president",
    name: "Diwaker Sharma",
    role: "Vice President",
    group: "Leadership",
    photo: "images/team/diwaker-sharma.jpg",
    bio: "Supports the President and coordinates club activities and events.",
    facebook: "#", instagram: "#", linkedin: "#"
  },
  {
    id: "secretary",
    name: "Hanta Arush",
    role: "Secretary",
    group: "Leadership",
    photo: "images/team/hanta-arush.jpg",
    bio: "Manages club records, correspondence and meeting documentation.",
    facebook: "#", instagram: "#", linkedin: "#"
  },
  {
    id: "media-incharge",
    name: "Aarush Sharma",
    role: "Media Incharge / Website Handler",
    group: "Leadership",
    photo: "images/team/aarush-sharma.jpg",
    bio: "Handles media, social channels and website updates for the club.",
    facebook: "#", instagram: "#", linkedin: "#"
  },
  {
    id: "treasurer",
    name: "Suraj Sharma",
    role: "Treasurer",
    group: "Leadership",
    photo: "images/team/suraj-sharma.jpg",
    bio: "Looks after club funds, donations and expense records.",
    facebook: "#", instagram: "#", linkedin: "#"
  },
  {
    id: "consultant",
    name: "Nishant Sharma",
    role: "Consultant",
    group: "Leadership",
    photo: "images/team/nishant-sharma.jpg",
    bio: "Provides advisory and strategic guidance for club projects.",
    facebook: "#", instagram: "#", linkedin: "#"
  },
  {
    id: "second-consultant",
    name: "Starish Sharma",
    role: "Second Consultant",
    group: "Leadership",
    photo: "images/team/starish-sharma.jpg",
    bio: "Second consultant supporting planning and execution of initiatives.",
    facebook: "#", instagram: "#", linkedin: "#"
  },
];

function initials(name){
  return name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase();
}

function teamCardHTML(m){
  return `
  <div class="team-card" data-reveal>
    <img class="team-photo" src="${m.photo}" alt="${m.name}, ${m.role}" loading="lazy"
         onerror="this.src='https://placehold.co/240x240/0F3D2E/8FD3A0?text=${initials(m.name)}'">
    <h3 class="font-display font-bold text-lg text-[var(--forest)]">${m.name}</h3>
    <p class="text-[var(--gold-d)] font-semibold text-sm">${m.role}</p>
  </div>`;
}

function renderTeam(){
  const groups = ["Leadership", "Executive Members", "Volunteers"];
  groups.forEach(group => {
    const el = document.getElementById("team-" + group.toLowerCase().replace(/\s+/g,'-'));
    if(!el) return;
    const members = TEAM_DATA.filter(m => m.group === group);
    el.innerHTML = members.map(teamCardHTML).join("");
  });

  document.querySelectorAll(".view-profile").forEach(btn => {
    btn.addEventListener("click", () => openProfile(btn.dataset.id));
  });
}

function openProfile(id){
  const m = TEAM_DATA.find(x => x.id === id);
  if(!m) return;
  const overlay = document.getElementById("profileModal");
  document.getElementById("profilePhoto").src = m.photo;
  document.getElementById("profilePhoto").onerror = function(){ this.src = `https://placehold.co/240x240/0F3D2E/8FD3A0?text=${initials(m.name)}`; };
  document.getElementById("profileName").textContent = m.name;
  document.getElementById("profileRole").textContent = m.role;
  document.getElementById("profileBio").textContent = m.bio;

  const contactWrap = document.getElementById("profileContact");
  contactWrap.innerHTML = ``;
  const socialWrap = document.getElementById("profileSocial");
  socialWrap.innerHTML = ``;
  overlay.classList.add("open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderTeam();
  document.getElementById("profileClose")?.addEventListener("click", () => {
    document.getElementById("profileModal")?.classList.remove("open");
  });
  document.getElementById("profileModal")?.addEventListener("click", (e) => {
    if(e.target.id === "profileModal") e.currentTarget.classList.remove("open");
  });
});
