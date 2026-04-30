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
      allowedOrigins: "http://localhost:1337",
      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid).findOne({
          documentId,
          locale
        });

        if (!document) return null;

        let path = "/";
        if (uid === "api::article.article") path = `/blog/${document.slug}`;
        if (uid === "api::about.about") path = "/about";

        const urlSearchParams = new URLSearchParams({
          url: path,
          status,
        });

        return `http://localhost:1337/api/preview?${urlSearchParams}`;
      },
    },
  },
});
