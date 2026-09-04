module.exports = function (eleventyConfig) {
  // Copy static files as-is to output folder
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  // CMS admin — copy config.yml as passthrough (index.html gets processed as template)
  eleventyConfig.addPassthroughCopy({ "src/admin/config.yml": "admin/config.yml" });

  // Helper filter: get value or default
  eleventyConfig.addFilter("default", (value, fallback) => value || fallback);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};

