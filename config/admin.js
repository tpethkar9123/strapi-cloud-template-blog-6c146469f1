module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      // ADDED QUOTES AROUND THE URL BELOW
      allowedOrigins: "http://localhost:3000", 
      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid).findOne({ documentId });
        
        let path = "/";
        if (uid === "api::article.article") path = `/blog/${document.slug}`;
        if (uid === "api::about.about") path = "/about";

        const urlSearchParams = new URLSearchParams({
          url: path,
          secret: "your-secret-key", // ADDED QUOTES AROUND THE SECRET
          status,
        });

        // ADDED QUOTES AROUND THE URL BELOW
        return `http://localhost:3000/api/preview?${urlSearchParams}`;
      },
    },
  },
});
