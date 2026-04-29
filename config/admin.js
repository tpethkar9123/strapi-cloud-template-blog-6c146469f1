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
      allowedOrigins: env('CLIENT_URL'), // Usually http://localhost:3000
      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid).findOne({ documentId });
        
        // This logic tells Strapi which URL to open
        let path = "/";
        if (uid === "api::article.article") path = `/blog/${document.slug}`;
        if (uid === "api::about.about") path = "/about";

        const urlSearchParams = new URLSearchParams({
          url: path,
          secret: env('PREVIEW_SECRET'), // A password you create
          status,
        });

        return `${env('CLIENT_URL')}/api/preview?${urlSearchParams}`;
      },
    },
  },
});
