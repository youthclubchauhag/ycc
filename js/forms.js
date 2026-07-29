/* =========================================================
   FORMS.JS — Volunteer / Help Request / Contact
   Validates, submits to Firebase Realtime Database, and shows
   toast feedback. Import as a module after firebase-config.js.
========================================================= */
import { submitToFirebase } from "./firebase-config.js";

function showToast(message, isError = false){
  const toast = document.getElementById("toast");
  if(!toast) return;
  toast.querySelector("#toast-msg").textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
}

function setLoading(btn, loading){
  if(!btn) return;
  btn.disabled = loading;
  btn.dataset.label = btn.dataset.label || btn.innerHTML;
  btn.innerHTML = loading
    ? `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...`
    : btn.dataset.label;
}

function readForm(form, fields){
  const out = {};
  fields.forEach(f => {
    const el = form.elements[f];
    out[f] = el ? (el.value || "").trim() : "";
  });
  return out;
}

function attachForm(formId, nodePath, fields, requiredFields, successMsg){
  const form = document.getElementById(formId);
  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    const data = readForm(form, fields);

    const missing = requiredFields.filter(f => !data[f]);
    if(missing.length){
      showToast("Please fill all required fields.", true);
      return;
    }
    if(data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){
      showToast("Please enter a valid email address.", true);
      return;
    }
    if(data.phone && !/^[0-9+\-\s]{7,15}$/.test(data.phone)){
      showToast("Please enter a valid phone number.", true);
      return;
    }

    try{
      setLoading(btn, true);
      await submitToFirebase(nodePath, data);
      showToast(successMsg);
      form.reset();
    }catch(err){
      console.error(err);
      showToast("Something went wrong. Please try again.", true);
    }finally{
      setLoading(btn, false);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Volunteer registration -> /volunteers
  attachForm(
    "volunteerForm", "volunteers",
    ["fullName","fatherName","gender","age","phone","email","village","district","occupation","skills","whyJoin"],
    ["fullName","gender","age","phone","village","district"],
    "Thank you for registering! Our team will contact you soon."
  );

  // Help request -> /helpRequests
  attachForm(
    "helpForm", "helpRequests",
    ["fullName","phone","email","village","subject","requestType","description"],
    ["fullName","phone","village","subject","requestType","description"],
    "Your request has been submitted. We will reach out as soon as possible."
  );

  // Contact -> /contactMessages
  attachForm(
    "contactForm", "contactMessages",
    ["name","email","phone","message"],
    ["name","email","message"],
    "Message sent! Thank you for reaching out to Youth Club Chauhag."
  );
});
