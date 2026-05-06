// Load — Rights metadata validator library
// Implements Load_Main_Claude_Handoff_Report Section 13 / Part H.
//
// Public API:
//   window.LoadRightsValidator.validate(rights)
//     -> { valid, errors, warnings, blocksPublish }
//   window.LoadRightsValidator.LICENSE_VALUES
//   window.LoadRightsValidator.ASSET_STATUS_VALUES
//
// rights.json schema:
//   {
//     owner: string,
//     license: one of LICENSE_VALUES,
//     sourceMaterial: string,
//     assetDeclarations: [{ asset, status: one of ASSET_STATUS_VALUES }, ...],
//     notes: string
//   }
//
// Block LoadPlay publish-prep when any of:
//   - errors.length > 0
//   - license === 'unknown'
//   - any asset has status 'unknown'

(function(){
'use strict';

var LICENSE_VALUES = [
  'user-owned',
  'public-domain',
  'licensed',
  'platform-original',
  'user-generated',
  'user-recorded',
  'third-party-licensed',
  'unknown'
];
var ASSET_STATUS_VALUES = LICENSE_VALUES.slice();

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function validate(rights) {
  var errors = [];
  var warnings = [];

  if (rights === null || rights === undefined) {
    errors.push('rights.json is missing.');
    return { valid: false, errors: errors, warnings: warnings, blocksPublish: true };
  }
  if (typeof rights !== 'object' || Array.isArray(rights)) {
    errors.push('rights.json must be an object.');
    return { valid: false, errors: errors, warnings: warnings, blocksPublish: true };
  }

  if (!isNonEmptyString(rights.owner)) {
    errors.push('Rights owner is missing.');
  }

  if (!isNonEmptyString(rights.license)) {
    errors.push('License is missing.');
  } else if (LICENSE_VALUES.indexOf(rights.license) === -1) {
    errors.push('License "' + rights.license + '" is not one of: ' + LICENSE_VALUES.join(', ') + '.');
  }

  if (!isNonEmptyString(rights.sourceMaterial)) {
    errors.push('Source material is missing.');
  }

  if (!Array.isArray(rights.assetDeclarations)) {
    errors.push('Asset declarations must be an array.');
  } else {
    rights.assetDeclarations.forEach(function (a, idx) {
      if (!a || typeof a !== 'object' || Array.isArray(a)) {
        errors.push('assetDeclarations[' + idx + '] must be an object.');
        return;
      }
      if (!isNonEmptyString(a.asset)) {
        errors.push('assetDeclarations[' + idx + '] is missing "asset" path.');
      }
      if (!isNonEmptyString(a.status)) {
        errors.push('assetDeclarations[' + idx + '] is missing "status".');
      } else if (ASSET_STATUS_VALUES.indexOf(a.status) === -1) {
        errors.push('assetDeclarations[' + idx + '] status "' + a.status + '" is not one of: ' + ASSET_STATUS_VALUES.join(', ') + '.');
      }
    });
    var unknownAssets = rights.assetDeclarations.filter(function (a) {
      return a && a.status === 'unknown';
    });
    if (unknownAssets.length) {
      warnings.push(unknownAssets.length + ' asset(s) have status "unknown" — block LoadPlay publish until resolved.');
    }
  }

  if (rights.license === 'unknown') {
    warnings.push('License is "unknown" — block LoadPlay publish until resolved.');
  }

  if (!isNonEmptyString(rights.notes)) {
    warnings.push('Notes / creator confirmation is empty. Recommended for legal clarity.');
  }

  var blocksPublish = errors.length > 0
    || rights.license === 'unknown'
    || (Array.isArray(rights.assetDeclarations) && rights.assetDeclarations.some(function (a) {
        return a && a.status === 'unknown';
      }));

  return {
    valid: errors.length === 0 && warnings.length === 0,
    errors: errors,
    warnings: warnings,
    blocksPublish: blocksPublish
  };
}

if (typeof window !== 'undefined') {
  window.LoadRightsValidator = {
    validate: validate,
    LICENSE_VALUES: LICENSE_VALUES.slice(),
    ASSET_STATUS_VALUES: ASSET_STATUS_VALUES.slice()
  };
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validate: validate, LICENSE_VALUES: LICENSE_VALUES, ASSET_STATUS_VALUES: ASSET_STATUS_VALUES };
}
})();
