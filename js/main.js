/* ==========================================================================
   Info Retraite — Script principal
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Année dynamique dans le footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Referme le menu au clic sur un lien
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Barème de la réforme 2023 ----------
     Renvoie l'âge légal (en années décimales) et les trimestres requis
     selon l'année de naissance. */
  function baremeRetraite(birthYear) {
    var legalAge, trimesters;
    if (birthYear <= 1960) { legalAge = 62; trimesters = 167; }
    else if (birthYear === 1961) { legalAge = 62; trimesters = 168; }
    else if (birthYear === 1962) { legalAge = 62.25; trimesters = 169; }
    else if (birthYear === 1963) { legalAge = 62.5; trimesters = 170; }
    else if (birthYear === 1964) { legalAge = 62.75; trimesters = 171; }
    else if (birthYear === 1965) { legalAge = 63; trimesters = 172; }
    else if (birthYear === 1966) { legalAge = 63.25; trimesters = 172; }
    else if (birthYear === 1967) { legalAge = 63.5; trimesters = 172; }
    else { legalAge = 64; trimesters = 172; } // 1968 et après
    return { legalAge: legalAge, trimesters: trimesters };
  }

  /* ---------- Formatage ---------- */
  function formatAge(ageDecimal) {
    var years = Math.floor(ageDecimal);
    var months = Math.round((ageDecimal - years) * 12);
    if (months === 0) return years + " ans";
    return years + " ans et " + months + " mois";
  }

  function formatEuro(value) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(value);
  }

  /* ---------- Simulateur ---------- */
  var form = document.getElementById("simForm");
  var placeholder = document.getElementById("simPlaceholder");
  var output = document.getElementById("simOutput");

  function markInvalid(el, isInvalid) {
    if (el) el.classList.toggle("invalid", !!isInvalid);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var birthEl = document.getElementById("birthYear");
      var startEl = document.getElementById("startAge");
      var salaryEl = document.getElementById("salary");
      var statusEl = document.getElementById("status");

      var birthYear = parseInt(birthEl.value, 10);
      var startAge = parseInt(startEl.value, 10);
      var salary = parseFloat(salaryEl.value);
      var status = statusEl.value;

      // Validation
      var ok = true;
      if (!birthYear || birthYear < 1940 || birthYear > 2005) { markInvalid(birthEl, true); ok = false; } else markInvalid(birthEl, false);
      if (!startAge || startAge < 14 || startAge > 40) { markInvalid(startEl, true); ok = false; } else markInvalid(startEl, false);
      if (isNaN(salary) || salary < 0) { markInvalid(salaryEl, true); ok = false; } else markInvalid(salaryEl, false);
      if (!ok) return;

      var bareme = baremeRetraite(birthYear);
      var legalAge = bareme.legalAge;
      var trimestersRequired = bareme.trimesters;

      // Trimestres estimés à l'âge légal (4 par an d'activité), plafonnés
      var yearsWorked = legalAge - startAge;
      var trimestersEarned = Math.max(0, Math.min(Math.round(yearsWorked * 4), trimestersRequired + 20));

      // Taux : 50 % au régime général, décote si trimestres manquants
      var maxRate = 0.50;
      var missing = Math.max(0, trimestersRequired - trimestersEarned);
      var decotePerTrim = 0.0125; // 1,25 % par trimestre manquant
      var rate = maxRate * (1 - Math.min(missing, 20) * decotePerTrim);

      // Salaire annuel moyen (approximation) puis pension de base
      var basePension = salary * rate * Math.min(trimestersEarned / trimestersRequired, 1);

      // Complémentaire : approximation forfaitaire selon le statut
      var complRate = status === "public" ? 0.25 : (status === "independant" ? 0.15 : 0.30);
      var totalAnnual = basePension * (1 + complRate);
      var monthly = totalAnnual / 12;

      var departureYear = birthYear + Math.floor(legalAge);

      // Injection des résultats
      document.getElementById("resLegalAge").textContent = formatAge(legalAge);
      document.getElementById("resTrimesters").textContent = trimestersEarned + " / " + trimestersRequired;
      document.getElementById("resYear").textContent = departureYear;
      document.getElementById("resPension").textContent = formatEuro(monthly);

      // Message contextuel
      var msg;
      if (missing === 0) {
        msg = "✅ À l'âge légal, vous atteignez le taux plein. Continuer au-delà générerait une surcote (+5 %/an).";
      } else if (missing <= 8) {
        msg = "⚠️ Il vous manquerait environ " + missing + " trimestre(s) pour le taux plein. Travailler un peu plus longtemps effacerait la décote.";
      } else {
        msg = "ℹ️ À l'âge légal, il manquerait " + missing + " trimestres. Le taux plein automatique reste garanti à 67 ans, sans décote.";
      }
      document.getElementById("resMessage").textContent = msg;

      // Affichage
      if (placeholder) placeholder.hidden = true;
      if (output) output.hidden = false;
      output.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  /* ---------- Surbrillance du lien de navigation actif ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-menu a[href^='#']");
  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.style.color = link.getAttribute("href") === "#" + id ? "var(--blue)" : "";
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }
})();
