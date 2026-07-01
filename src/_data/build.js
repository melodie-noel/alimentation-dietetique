// Identifiant de build (horodatage) pour le cache-busting des assets.
// Change à chaque build → force le navigateur à recharger CSS/JS après un deploy.
module.exports = () => String(Date.now());
