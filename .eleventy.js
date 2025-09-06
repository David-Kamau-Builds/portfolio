module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.json");
  eleventyConfig.addPassthroughCopy("*.js");
  
  // Copy new utility files
  eleventyConfig.addPassthroughCopy("js/utils.js");
  eleventyConfig.addPassthroughCopy("js/form-handler.js");
  eleventyConfig.addPassthroughCopy("css/form-enhancements.css");
  eleventyConfig.addPassthroughCopy("css/modern-projects.css");
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};