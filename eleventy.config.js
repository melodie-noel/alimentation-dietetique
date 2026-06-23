module.exports = function (eleventyConfig) {
  // Copie des fichiers statiques (CSS, JS, images, flyers) vers _site/assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // --- Filtres de mise en forme « cadrée » pour les contenus du CMS ---
  // Échappe le HTML pour éviter toute balise non prévue saisie dans le CMS.
  const escapeHtml = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  // nl2br : un retour à la ligne (touche Entrée dans le CMS) devient un <br>.
  // Permet à Mélodie d'aérer un paragraphe sans connaître le HTML.
  eleventyConfig.addFilter("nl2br", (value) => {
    if (value == null) return "";
    return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>\n");
  });

  // rich : emphase contrôlée (façon Markdown léger) + retours à la ligne.
  //   *mot*   -> <em>mot</em>      (italique)
  //   **mot** -> <strong>mot</strong> (gras)
  // Aucune taille de police libre : on reste dans le design system.
  eleventyConfig.addFilter("rich", (value) => {
    if (value == null) return "";
    let out = escapeHtml(value);
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    out = out.replace(/\r\n|\r|\n/g, "<br>\n");
    return out;
  });

  // --- Typographie française : espaces insécables au build ---
  // Avant « : » -> espace insécable (U+00A0) ; avant « ; ! ? » et dans les
  // guillemets « … » -> espace fine insécable (U+202F). N'agit QUE sur le texte
  // affiché (jamais sur les URL, attributs, <script>/<style>).
  eleventyConfig.addTransform("frenchTypography", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const NBSP = "\u00A0";   // espace insécable
    const NNBSP = "\u202F";  // espace fine insécable

    // 1) Mettre de côté les blocs <script> et <style> (ne pas y toucher)
    const stash = [];
    let html = content.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, (m) => {
      stash.push(m);
      return "\u0000" + (stash.length - 1) + "\u0000";
    });

    const fix = (t) =>
      t
        .replace(/ :/g, NBSP + ":")
        .replace(/ ;/g, NNBSP + ";")
        .replace(/ \?/g, NNBSP + "?")
        .replace(/ !/g, NNBSP + "!")
        .replace(/« /g, "\u00AB" + NNBSP)
        .replace(/ »/g, NNBSP + "\u00BB");

    // 2) N'appliquer qu'au texte situé entre les balises
    html = html.replace(/>([^<]+)</g, (m, t) => ">" + fix(t) + "<");

    // 3) Restaurer les blocs mis de côté
    html = html.replace(/\u0000(\d+)\u0000/g, (m, i) => stash[+i]);
    return html;
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
