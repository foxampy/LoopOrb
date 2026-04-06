const fs = require('fs');

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((o, k) => o && o[k], obj);
}

function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

// System 1: next-intl messages
const messagesEn = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const messagesRu = JSON.parse(fs.readFileSync('messages/ru.json', 'utf8'));

const messagesEnKeys = new Set(getAllKeys(messagesEn));
const messagesRuKeys = new Set(getAllKeys(messagesRu));

const inEnNotRu = [...messagesEnKeys].filter(k => !messagesRuKeys.has(k));
const inRuNotEn = [...messagesRuKeys].filter(k => !messagesEnKeys.has(k));

console.log('=== SYSTEM 1: next-intl messages ===');
console.log(`EN keys: ${messagesEnKeys.size}`);
console.log(`RU keys: ${messagesRuKeys.size}`);
console.log(`\nKeys in EN but NOT in RU (${inEnNotRu.length}):`);
inEnNotRu.forEach(k => console.log(`  - ${k}`));
console.log(`\nKeys in RU but NOT in EN (${inRuNotEn.length}):`);
inRuNotEn.forEach(k => console.log(`  - ${k}`));

// System 2: custom i18n locales
const localesEn = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));
const localesRu = JSON.parse(fs.readFileSync('src/i18n/locales/ru.json', 'utf8'));

const localesEnKeys = new Set(getAllKeys(localesEn));
const localesRuKeys = new Set(getAllKeys(localesRu));

const inLocEnNotLocRu = [...localesEnKeys].filter(k => !localesRuKeys.has(k));
const inLocRuNotLocEn = [...localesRuKeys].filter(k => !localesEnKeys.has(k));

console.log('\n\n=== SYSTEM 2: Custom i18n locales ===');
console.log(`EN keys: ${localesEnKeys.size}`);
console.log(`RU keys: ${localesRuKeys.size}`);
console.log(`\nKeys in EN but NOT in RU (${inLocEnNotLocRu.length}):`);
inLocEnNotLocRu.forEach(k => console.log(`  - ${k}`));
console.log(`\nKeys in RU but NOT in EN (${inLocRuNotLocEn.length}):`);
inLocRuNotLocEn.forEach(k => console.log(`  - ${k}`));

// Check wallet_ru.json against messages/en.json wallet section
const walletRu = JSON.parse(fs.readFileSync('messages/wallet_ru.json', 'utf8'));
const walletRuKeys = new Set(getAllKeys(walletRu));
const enWalletKeys = new Set(getAllKeys(messagesEn.wallet || {}));

// Prefix wallet_ru keys with "wallet." for comparison
const walletRuKeysPrefixed = new Set([...walletRuKeys].map(k => `wallet.${k}`));

const inWalletRuNotEn = [...walletRuKeysPrefixed].filter(k => !messagesEnKeys.has(k));
const inEnWalletNotWalletRu = [...enWalletKeys].filter(k => !walletRuKeys.has(k));

console.log('\n\n=== WALLET_RU vs MESSAGES/EN ===');
console.log(`Wallet RU keys (prefixed): ${walletRuKeysPrefixed.size}`);
console.log(`EN wallet keys: ${enWalletKeys.size}`);
console.log(`\nKeys in wallet_ru but NOT in en.json (${inWalletRuNotEn.length}):`);
inWalletRuNotEn.forEach(k => console.log(`  - ${k}`));
console.log(`\nKeys in en.json wallet but NOT in wallet_ru (${inEnWalletNotWalletRu.length}):`);
inEnWalletNotWalletRu.forEach(k => console.log(`  - ${k}`));

// Output JSON for sync script
const output = {
  messages: {
    add_to_ru: inEnNotRu,
    add_to_en: inRuNotEn
  },
  locales: {
    add_to_ru: inLocEnNotLocRu,
    add_to_en: inLocRuNotLocEn
  },
  wallet_ru_extra_keys: inWalletRuNotEn.map(k => k.replace('wallet.', '')),
  en_wallet_missing_keys: inEnWalletNotWalletRu
};

fs.writeFileSync('sync_report.json', JSON.stringify(output, null, 2));
console.log('\n\nFull report saved to sync_report.json');
