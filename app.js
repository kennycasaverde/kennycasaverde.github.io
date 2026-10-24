/* Motor de contenido de la web (sin dependencias ni servicios externos). */
(function () {
  "use strict";
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const qs = (selector, root = document) => root.querySelector(selector);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };
  const add = (parent, ...nodes) => { for (const node of nodes) if (node) parent.append(node); return parent; };
  const validExternal = url => { try { const u = new URL(url); return ["https:", "http:"].includes(u.protocol); } catch { return false; } };
  const validLocal = path => typeof path === "string" && path.length > 0 && !path.startsWith("/") && !path.startsWith("\\") && !path.includes("..") && !path.includes(":") && !path.includes("\\");
  const validHref = path => validExternal(path) || validLocal(path);
  const safeLink = (node, href) => {
    if (!validHref(href)) return false;
    node.href = href;
    if (validExternal(href)) { node.target = "_blank"; node.rel = "noopener noreferrer"; }
    return true;
  };
  const createTags = tags => {
    const row = el("div", "tags");
    (tags || []).forEach(label => row.append(el("span", "tag", label)));
    return row;
  };

  function setupShared() {
    const year = qs("#footer-year");
    if (year) year.textContent = String(new Date().getFullYear());
    const menuButton = qs(".menu-toggle");
    const menu = qs(".nav-links");
    if (menuButton && menu) {
      menuButton.addEventListener("click", () => {
        const open = menu.classList.toggle("nav-open");
        menuButton.setAttribute("aria-expanded", String(open));
      });
      menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        menu.classList.remove("nav-open");
        menuButton.setAttribute("aria-expanded", "false");
      }));
    }
  }

  function setupProfile() {
    const profile = data.profile;
    ["#linkedin-link", "#contact-linkedin"].forEach(selector => { const node = qs(selector); if (node) safeLink(node, profile.linkedin); });
    const yt = qs("#youtube-link"); if (yt) safeLink(yt, profile.youtube);
    const email = qs("#contact-email"); if (email) email.href = "mailto:" + encodeURIComponent(profile.email || "");
    const cv = qs("#cv-link"); if (cv && validLocal(profile.cvFile)) cv.href = profile.cvFile;
    const companies = qs("#companies-link");
    if (companies && validExternal(profile.companiesUrl)) {
      companies.classList.remove("link-unavailable");
      companies.removeAttribute("aria-disabled");
      companies.removeAttribute("title");
      companies.setAttribute("target", "_blank");
      companies.setAttribute("rel", "noopener noreferrer");
      companies.href = profile.companiesUrl;
    } else if (companies) {
      companies.removeAttribute("href");
      companies.addEventListener("click", event => event.preventDefault());
    }
  }

  function renderExperiences() {
    const root = qs("#experience-list");
    if (!root) return;
    root.replaceChildren();
    data.experiences.forEach((role, index) => {
      const article = el("article", "experience-card");
      const number = el("span", "experience-number", String(index + 1).padStart(2, "0"));
      const content = el("div", "experience-content");
      const date = el("div", "card-date");
      if (role.current) date.append(el("span", "current-dot"));
      date.append(document.createTextNode(role.period));
      add(content, date, el("h3", "experience-title", role.position), el("p", "experience-org", role.organization), el("p", "experience-context", role.context), el("p", "experience-summary", role.summary), createTags(role.tags));
      const right = el("div", "experience-right");
      const icon = el("span", "experience-icon", index === 0 ? "⌁" : index === 1 ? "▥" : "⚙");
      icon.setAttribute("aria-hidden", "true");
      const link = el("a", "experience-link");
      link.href = "experiencia.html?id=" + encodeURIComponent(role.id);
      link.append(document.createTextNode("VER EXPERIENCIA "));
      link.append(el("span", "", "↗"));
      add(right, icon, link);
      add(article, number, content, right);
      root.append(article);
    });
  }

  function renderEducation() {
    const root = qs("#education-grid"); if (!root) return;
    root.replaceChildren();
    data.education.forEach((entry, index) => {
      const card = el("article", "education-card");
      add(card, el("span", "edu-icon", index === 0 ? "⌘" : index === 1 ? "</>" : "◎"), el("div", "edu-label", entry.label), el("h3", "edu-title", entry.title), el("p", "edu-institution", entry.institution), el("span", "edu-period", entry.period), el("p", "edu-description", entry.description));
      root.append(card);
    });
    const certSection = qs("#certifications-block"); const certGrid = qs("#certification-grid");
    if (certSection && certGrid && Array.isArray(data.certifications) && data.certifications.length) {
      certSection.hidden = false;
      data.certifications.forEach(cert => {
        const card = el("article", "certificate-card");
        add(card, el("h4", "", cert.title), el("p", "", `${cert.issuer} · ${cert.year}`));
        if (validHref(cert.url)) { const a = el("a", "", "Consultar acreditación ↗"); safeLink(a, cert.url); card.append(a); }
        certGrid.append(card);
      });
    }
  }

  function renderSkills() {
    const root = qs("#skills-grid"); if (!root) return;
    root.replaceChildren();
    data.skills.forEach(group => {
      const panel = el("article", "skill-panel");
      const list = el("ul");
      group.items.forEach(item => list.append(el("li", "", item)));
      add(panel, el("h3", "", group.title), list);
      root.append(panel);
    });
  }

  function youtubeId(url) {
    try {
      const u = new URL(url);
      const host = u.hostname.toLowerCase();
      let id = "";
      if (host === "youtu.be" || host === "www.youtu.be") id = u.pathname.slice(1);
      else if (["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com", "youtube-nocookie.com"].includes(host)) {
        if (u.pathname === "/watch") id = u.searchParams.get("v") || "";
        else if (u.pathname.startsWith("/shorts/") || u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2] || "";
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : "";
    } catch { return ""; }
  }

  function renderEvidence(role) {
    if (!Array.isArray(role.evidence) || !role.evidence.length) return null;
    const section = el("section", "evidence-section");
    const top = el("div", "evidence-top");
    const topLeft = el("div");
    add(topLeft, el("h2", "", "Evidencias profesionales"), el("p", "", "Material documental incorporado para esta experiencia."));
    add(top, topLeft, el("span", "evidence-count", `${role.evidence.length} ELEMENTO(S)`));
    section.append(top);
    const grid = el("div", "evidence-grid");
    for (const item of role.evidence) {
      const card = el("article", "evidence-card");
      const title = item.title || "Evidencia profesional";
      let media = null;
      if (item.type === "image" && validLocal(item.src)) {
        const button = el("button", "evidence-open");
        button.type = "button";
        button.setAttribute("aria-label", "Ampliar " + title);
        const img = el("img", "evidence-image");
        img.src = item.src;
        img.alt = item.alt || title;
        img.loading = "lazy";
        button.append(img);
        button.addEventListener("click", () => openLightbox(item.src, img.alt, title));
        media = button;
      } else if (item.type === "youtube" && youtubeId(item.url)) {
        const frame = el("iframe", "evidence-video");
        frame.src = "https://www.youtube-nocookie.com/embed/" + youtubeId(item.url);
        frame.title = title;
        frame.loading = "lazy";
        frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        frame.allowFullscreen = true;
        media = frame;
      } else if (item.type === "video" && validLocal(item.src)) {
        const video = el("video", "evidence-video");
        video.src = item.src;
        video.controls = true;
        video.preload = "metadata";
        media = video;
      } else if (item.type === "pdf" && validHref(item.src)) {
        const link = el("a", "evidence-link");
        safeLink(link, item.src);
        link.append(el("div", "evidence-doc", "▤"));
        media = link;
      }
      if (!media) continue;
      card.append(media);
      const info = el("div", "evidence-info");
      add(info, el("h3", "", title), el("p", "", item.description || (item.type === "pdf" ? "Documento disponible para consulta." : "")));
      card.append(info);
      grid.append(card);
    }
    if (!grid.childElementCount) return null;
    section.append(grid, el("p", "evidence-safety", "Las evidencias se publican únicamente con autorización y sin información operativa confidencial."));
    return section;
  }

  let lastFocused = null;
  function openLightbox(src, alt, caption) {
    const overlay = qs("#lightbox"); if (!overlay) return;
    lastFocused = document.activeElement;
    const img = qs("#lightbox-image");
    img.src = src;
    img.alt = alt;
    qs("#lightbox-caption").textContent = caption;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    qs(".lightbox-close").focus();
  }
  function closeLightbox() {
    const overlay = qs("#lightbox"); if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    qs("#lightbox-image").removeAttribute("src");
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }
  function setupLightbox() {
    const overlay = qs("#lightbox"); if (!overlay) return;
    qs(".lightbox-close").addEventListener("click", closeLightbox);
    overlay.addEventListener("click", event => { if (event.target === overlay) closeLightbox(); });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "Tab" && !overlay.hidden) { event.preventDefault(); qs(".lightbox-close").focus(); }
    });
  }

  function renderDetail() {
    const root = qs("#experience-detail"); if (!root) return;
    const role = data.experiences.find(r => r.id === new URLSearchParams(window.location.search).get("id"));
    root.replaceChildren();
    if (!role) { add(root, el("h1", "", "Experiencia no encontrada"), el("p", "detail-text", "Este enlace no corresponde a una experiencia disponible.")); return; }
    document.title = `${role.position} | ${role.organization} — Kenny Casaverde`;
    const back = el("a", "detail-back", "← VOLVER A EXPERIENCIA LABORAL"); back.href = "index.html#experiencia";
    const head = el("header", "detail-head");
    add(head, el("p", "detail-eyebrow", "TRAYECTORIA / EXPERIENCIA PROFESIONAL"), el("h1", "", role.position), el("p", "detail-org", role.organization), el("p", "detail-context", role.context), el("p", "detail-date", role.period));
    const columns = el("div", "detail-columns");
    const main = el("div");
    main.append(el("h2", "detail-subheading", "Descripción del puesto"), el("p", "detail-text", role.summary), el("h2", "detail-subheading", "Funciones y responsabilidades"));
    const list = el("ul", "detail-bullets");
    role.responsibilities.forEach(text => list.append(el("li", "", text)));
    main.append(list);
    const achievement = el("div", "detail-achievement");
    add(achievement, el("h3", "", "Experiencia destacada"), el("p", "", role.achievement));
    main.append(achievement);
    const aside = el("aside", "detail-aside");
    add(aside, el("h3", "", "Áreas y herramientas"), createTags(role.tags), el("h3", "", "¿Deseas conocer mi trayectoria completa?"), el("p", "", "Consulta mi currículum en PDF o contáctame para más información."));
    const download = el("a", "button button-ghost", "Descargar CV ↓");
    if (validLocal(data.profile.cvFile)) download.href = data.profile.cvFile;
    download.setAttribute("download", "");
    aside.append(download);
    add(columns, main, aside);
    add(root, back, head, columns);
    const evidence = renderEvidence(role); if (evidence) root.append(evidence);
  }

  setupShared();
  if (document.body.dataset.page === "home") { setupProfile(); renderExperiences(); renderEducation(); renderSkills(); }
  if (document.body.dataset.page === "experience") { renderDetail(); setupLightbox(); }
})();
