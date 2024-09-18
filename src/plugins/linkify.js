import linkifyIt from 'linkify-it';

const linkify = linkifyIt();

export default {
  install(app) {
    app.directive('linkify', {
      beforeMount(el, binding) {
        let text = binding.value || '';  // Ensure text is defined

        // Function to clean up and format the URLs
        const cleanUpUrls = (text) => {
          const matches = linkify.match(text);
          if (matches) {
            matches.forEach((match) => {
              // Create clickable link for the URL
              const clickableLink = `<a href="${match.url}" target="_blank">here</a>`;

              // Define the specific patterns to look for, e.g., "here:" or "from:"
              const patternsToReplace = [
                { pattern: new RegExp(`(here:)\\s*${match.raw}`, 'g'), replacement: 'here' }
              ];

              // Process the patterns
              let replaced = false;
              patternsToReplace.forEach(({ pattern, replacement }) => {
                if (pattern.test(text)) {
                  // Remove the colon and wrap "here" or "from" with the anchor tag
                  text = text.replace(pattern, `<a href="${match.url}" target="_blank">${replacement}</a>`);
                  replaced = true;
                }
              });

              // If no pattern was matched, replace the raw URL with a standard clickable link
              if (!replaced) {
                text = text.replace(match.raw, clickableLink);
              }
            });
          }
          return text;
        };

        // Apply the cleanup function to the text
        el.innerHTML = cleanUpUrls(text);
      },
    });
  },
};
