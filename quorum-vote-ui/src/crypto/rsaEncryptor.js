import forge from 'node-forge';

/**
 * Verschlüsselt eine Nachricht (z. B. "Partei A") mit einem gegebenen öffentlichen Schlüssel.
 * @param {string} voteText - Die zu verschlüsselnde Stimme (Klartext).
 * @param {string} publicKeyPem - Der öffentliche Schlüssel im PEM-Format.
 * @returns {string} Base64-codierter verschlüsselter Text.
 */
export function encryptVote(voteText, publicKeyPem) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedBytes = publicKey.encrypt(voteText, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
  const encryptedBase64 = forge.util.encode64(encryptedBytes);
  return encryptedBase64;
}
