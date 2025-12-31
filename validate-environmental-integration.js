// Validation script for environmental assets integration
// This script checks if all components are properly integrated

console.log('=== Environmental Assets Integration Validation ===');

// Check 1: Environmental assets data structure
if (typeof environmentalAssets !== 'undefined') {
    console.log('✓ Environmental assets loaded');
    console.log(`  - Decorations: ${environmentalAssets.decorations.length}`);
    console.log(`  - Boundaries: ${environmentalAssets.boundaries.length}`);
    console.log(`  - Placements: ${environmentalAssets.placements.length}`);
} else {
    console.error('✗ Environmental assets not loaded');
}

// Check 2: Creation function
if (typeof createEnvironmentalElements === 'function') {
    console.log('✓ createEnvironmentalElements function available');
} else {
    console.error('✗ createEnvironmentalElements function not available');
}

// Check 3: EnvironmentalElement class
if (typeof EnvironmentalElement !== 'undefined') {
    console.log('✓ EnvironmentalElement class available');
} else {
    console.error('✗ EnvironmentalElement class not available');
}

// Check 4: Required dependencies
const requiredGlobals = ['Boundary', 'Sprite'];
requiredGlobals.forEach(globalName => {
    if (typeof window[globalName] !== 'undefined') {
        console.log(`✓ ${globalName} class available`);
    } else {
        console.error(`✗ ${globalName} class not available`);
    }
});

// Check 5: Asset file paths
console.log('\n=== Asset File Validation ===');
environmentalAssets.decorations.forEach(decoration => {
    console.log(`Decoration ${decoration.id}: ${decoration.sprite}`);
});

environmentalAssets.boundaries.forEach(boundary => {
    console.log(`Boundary ${boundary.id}: ${boundary.sprite}`);
});

console.log('\n=== Placement Validation ===');
environmentalAssets.placements.forEach((placement, index) => {
    const assetData = environmentalAssets.decorations.find(d => d.id === placement.assetId) ||
                     environmentalAssets.boundaries.find(b => b.id === placement.assetId);
    
    if (assetData) {
        console.log(`✓ Placement ${index + 1}: ${placement.assetId} -> ${assetData.name}`);
    } else {
        console.error(`✗ Placement ${index + 1}: ${placement.assetId} -> Asset not found`);
    }
});

console.log('\n=== Integration Test Complete ===');