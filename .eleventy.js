module.exports = function (eleventyConfig) {
  // Copie des fichiers statiques (CSS, JS, images, flyers) vers _site/assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
