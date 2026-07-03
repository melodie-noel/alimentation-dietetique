// Contexte d'environnement, calculé au build.
// Netlify expose la variable BRANCH (branche Git buildée).
//   - build de "main"     -> prod  (indexable, robots ouvert, canoniques)
//   - build de "preprod"  -> preprod (noindex, robots fermé)
//   - build local         -> non-prod (comme preprod)
// On peut aussi forcer la prod en local avec SITE_ENV=prod.
module.exports = () => {
  const prodUrl = "https://www.alimentation-dietetique.com";
  const branch = process.env.BRANCH || "";
  const isProd = branch === "main" || process.env.SITE_ENV === "prod";
  return { prodUrl, isProd, branch };
};
