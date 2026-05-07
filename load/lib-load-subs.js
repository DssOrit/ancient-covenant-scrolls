// Load — Subscription / entitlement layer (X-SUBS Phase 1)
//
// Per master rule: MVP uses free / open-source / local-first
// providers only. Paid providers are future-optional, off by
// default, never hard-coded, never exported.
//
// Phase 1 scope: define the tier + entitlement matrix in one
// place, expose it as read-only data, and lock the active tier
// to 'free'. Nothing in this file charges anyone, gates a real
// feature, or talks to a billing service.
//
// Public API:
//   window.LoadSubs.TIERS                         - 3 tier defs
//   window.LoadSubs.PROVIDER_TYPE_ENTITLEMENTS    - per-tier provider type allow-list
//   window.LoadSubs.currentTier()                 - locked to 'free' in MVP
//   window.LoadSubs.tierAllowsProviderType(t, pt) - boolean
//   window.LoadSubs.tierAllowsProvider(tierId, providerObj) - boolean
//   window.LoadSubs.entitlementMatrix()           - { tierId: { types: [...], includesPaidApi: bool } }

(function () {
'use strict';

// Three tiers. Only 'free' is real in MVP. The other two exist
// so downstream code, audit pages, and the Project Memory store
// have a stable shape to record against.
var TIERS = [
  {
    id: 'free',
    label: 'Free',
    isPaid: false,
    isMvpDefault: true,
    description: 'Default. Everything Load needs to ship: built-in, free-api, local, prompt-only, user-imported. No payment, no key required for the default route.',
    futureOnly: false
  },
  {
    id: 'pro',
    label: 'Pro (future, off)',
    isPaid: true,
    isMvpDefault: false,
    description: 'Future-optional. Adds cloud-optional providers (Gemini, OpenRouter, HF, Cloudflare, etc.) when the user supplies their own key. Never enabled in MVP.',
    futureOnly: true
  },
  {
    id: 'studio',
    label: 'Studio (future, off)',
    isPaid: true,
    isMvpDefault: false,
    description: 'Future-optional. Adds Load-hosted-future engines (load-engine-*, load-hosted-llm). Not built yet. Never enabled in MVP.',
    futureOnly: true
  }
];

// Provider types from lib-provider-registry.js:
//   built-in, free-api, local, prompt-only, user-imported,
//   cloud-optional, load-hosted-future
var PROVIDER_TYPE_ENTITLEMENTS = {
  free:   ['built-in', 'free-api', 'local', 'prompt-only', 'user-imported'],
  pro:    ['built-in', 'free-api', 'local', 'prompt-only', 'user-imported', 'cloud-optional'],
  studio: ['built-in', 'free-api', 'local', 'prompt-only', 'user-imported', 'cloud-optional', 'load-hosted-future']
};

// Locked to 'free' in MVP. Reading from anywhere else is a no-op:
// this function deliberately ignores localStorage / IDB so a future
// caller can't promote the tier without code review.
function currentTier() { return 'free'; }

function tierById(id) {
  for (var i = 0; i < TIERS.length; i++) if (TIERS[i].id === id) return TIERS[i];
  return null;
}

function tierAllowsProviderType(tierId, providerType) {
  var ents = PROVIDER_TYPE_ENTITLEMENTS[tierId];
  if (!ents) return false;
  return ents.indexOf(providerType) !== -1;
}

function tierAllowsProvider(tierId, providerObj) {
  if (!providerObj) return false;
  return tierAllowsProviderType(tierId, providerObj.providerType);
}

function entitlementMatrix() {
  var out = {};
  TIERS.forEach(function (t) {
    var ents = PROVIDER_TYPE_ENTITLEMENTS[t.id] || [];
    out[t.id] = {
      label: t.label,
      isPaid: t.isPaid,
      types: ents.slice(),
      includesPaidApi: ents.indexOf('cloud-optional') !== -1,
      includesLoadHosted: ents.indexOf('load-hosted-future') !== -1,
      futureOnly: !!t.futureOnly
    };
  });
  return out;
}

if (typeof window !== 'undefined') {
  window.LoadSubs = {
    TIERS: TIERS.map(function (t) { return { id: t.id, label: t.label, isPaid: t.isPaid, isMvpDefault: t.isMvpDefault, description: t.description, futureOnly: t.futureOnly }; }),
    PROVIDER_TYPE_ENTITLEMENTS: PROVIDER_TYPE_ENTITLEMENTS,
    currentTier: currentTier,
    tierById: tierById,
    tierAllowsProviderType: tierAllowsProviderType,
    tierAllowsProvider: tierAllowsProvider,
    entitlementMatrix: entitlementMatrix
  };
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TIERS: TIERS, PROVIDER_TYPE_ENTITLEMENTS: PROVIDER_TYPE_ENTITLEMENTS, currentTier: currentTier, tierAllowsProviderType: tierAllowsProviderType, tierAllowsProvider: tierAllowsProvider, entitlementMatrix: entitlementMatrix };
}
})();
