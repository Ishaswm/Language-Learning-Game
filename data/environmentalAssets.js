// Environmental assets for the Language Learning RPG
// These assets create natural boundaries, decorative elements, and visual variety

const environmentalAssets = {
  // Environmental decorations using available assets
  decorations: [
    {
      id: 'env1',
      name: 'City Fountain',
      sprite: './assets/Gemini_Generated_Image_194dv5194dv5194d.png',
      type: 'decoration',
      scale: 1.5,
      hasCollision: true,
      description: 'A beautiful fountain in the city center'
    },
    {
      id: 'env2', 
      name: 'Park Bench',
      sprite: './assets/Gemini_Generated_Image_ghp5wmghp5wmghp5.png',
      type: 'decoration',
      scale: 1.2,
      hasCollision: true,
      description: 'A comfortable bench for resting'
    },
    {
      id: 'env3',
      name: 'Garden Area',
      sprite: './assets/Gemini_Generated_Image_hp5qdqhp5qdqhp5q.png',
      type: 'decoration',
      scale: 1.0,
      hasCollision: false,
      description: 'A small garden with flowers'
    },
    {
      id: 'env4',
      name: 'Street Lamp',
      sprite: './assets/Gemini_Generated_Image_vby7auvby7auvby7.png',
      type: 'decoration',
      scale: 0.8,
      hasCollision: true,
      description: 'A decorative street lamp'
    }
  ],

  // Natural boundaries using environmental elements
  boundaries: [
    {
      id: 'boundary1',
      name: 'Hedge Row',
      sprite: './assets/Gemini_Generated_Image_hp5qdqhp5qdqhp5q.png',
      type: 'boundary',
      scale: 0.6,
      hasCollision: true,
      description: 'Natural hedge boundary'
    },
    {
      id: 'boundary2',
      name: 'Rock Formation',
      sprite: './assets/Gemini_Generated_Image_194dv5194dv5194d.png',
      type: 'boundary',
      scale: 0.8,
      hasCollision: true,
      description: 'Natural rock boundary'
    }
  ],

  // Placement configuration for environmental elements
  placements: [
    // Central fountain area - main focal point
    {
      assetId: 'env1',
      position: { x: 25, y: 25 },
      gridPosition: { x: 25, y: 25 },
      symbol: 1040 // New symbol for environmental elements
    },
    
    // Park benches strategically placed around the city
    {
      assetId: 'env2',
      position: { x: 18, y: 32 },
      gridPosition: { x: 18, y: 32 },
      symbol: 1041
    },
    {
      assetId: 'env2',
      position: { x: 32, y: 18 },
      gridPosition: { x: 32, y: 18 },
      symbol: 1041
    },
    {
      assetId: 'env2',
      position: { x: 12, y: 15 },
      gridPosition: { x: 12, y: 15 },
      symbol: 1041
    },
    {
      assetId: 'env2',
      position: { x: 38, y: 35 },
      gridPosition: { x: 38, y: 35 },
      symbol: 1041
    },

    // Garden areas for visual variety - scattered throughout
    {
      assetId: 'env3',
      position: { x: 14, y: 20 },
      gridPosition: { x: 14, y: 20 },
      symbol: 1042
    },
    {
      assetId: 'env3',
      position: { x: 28, y: 12 },
      gridPosition: { x: 28, y: 12 },
      symbol: 1042
    },
    {
      assetId: 'env3',
      position: { x: 36, y: 28 },
      gridPosition: { x: 36, y: 28 },
      symbol: 1042
    },
    {
      assetId: 'env3',
      position: { x: 20, y: 38 },
      gridPosition: { x: 20, y: 38 },
      symbol: 1042
    },
    {
      assetId: 'env3',
      position: { x: 8, y: 25 },
      gridPosition: { x: 8, y: 25 },
      symbol: 1042
    },
    {
      assetId: 'env3',
      position: { x: 42, y: 20 },
      gridPosition: { x: 42, y: 20 },
      symbol: 1042
    },

    // Street lamps for atmosphere - creating pathways
    {
      assetId: 'env4',
      position: { x: 10, y: 18 },
      gridPosition: { x: 10, y: 18 },
      symbol: 1043
    },
    {
      assetId: 'env4',
      position: { x: 22, y: 10 },
      gridPosition: { x: 22, y: 10 },
      symbol: 1043
    },
    {
      assetId: 'env4',
      position: { x: 40, y: 15 },
      gridPosition: { x: 40, y: 15 },
      symbol: 1043
    },
    {
      assetId: 'env4',
      position: { x: 15, y: 40 },
      gridPosition: { x: 15, y: 40 },
      symbol: 1043
    },
    {
      assetId: 'env4',
      position: { x: 35, y: 42 },
      gridPosition: { x: 35, y: 42 },
      symbol: 1043
    },
    {
      assetId: 'env4',
      position: { x: 45, y: 25 },
      gridPosition: { x: 45, y: 25 },
      symbol: 1043
    },

    // Natural boundaries using hedge rows - creating defined areas
    {
      assetId: 'boundary1',
      position: { x: 6, y: 12 },
      gridPosition: { x: 6, y: 12 },
      symbol: 1044
    },
    {
      assetId: 'boundary1',
      position: { x: 44, y: 18 },
      gridPosition: { x: 44, y: 18 },
      symbol: 1044
    },
    {
      assetId: 'boundary1',
      position: { x: 30, y: 45 },
      gridPosition: { x: 30, y: 45 },
      symbol: 1044
    },
    {
      assetId: 'boundary1',
      position: { x: 12, y: 8 },
      gridPosition: { x: 12, y: 8 },
      symbol: 1044
    },

    // Rock formations as natural boundaries - corner and edge placements
    {
      assetId: 'boundary2',
      position: { x: 4, y: 35 },
      gridPosition: { x: 4, y: 35 },
      symbol: 1045
    },
    {
      assetId: 'boundary2',
      position: { x: 48, y: 28 },
      gridPosition: { x: 48, y: 28 },
      symbol: 1045
    },
    {
      assetId: 'boundary2',
      position: { x: 25, y: 5 },
      gridPosition: { x: 25, y: 5 },
      symbol: 1045
    },
    {
      assetId: 'boundary2',
      position: { x: 8, y: 45 },
      gridPosition: { x: 8, y: 45 },
      symbol: 1045
    }
  ]
}

// Environmental element creation utility
function createEnvironmentalElements() {
  const environmentalElements = []
  const environmentalBoundaries = []
  
  // Get offset from global scope (defined in index.js)
  const gameOffset = typeof offset !== 'undefined' ? offset : { x: -735, y: -650 }
  
  // Load environmental asset images
  const environmentalImages = {}
  
  // Create promises for image loading to ensure they're loaded before use
  const imageLoadPromises = []
  
  environmentalAssets.decorations.forEach(decoration => {
    const img = new Image()
    img.src = decoration.sprite
    environmentalImages[decoration.id] = img
    
    // Add load promise for proper initialization
    const loadPromise = new Promise((resolve) => {
      img.onload = resolve
      img.onerror = resolve // Continue even if image fails to load
    })
    imageLoadPromises.push(loadPromise)
  })
  
  environmentalAssets.boundaries.forEach(boundary => {
    const img = new Image()
    img.src = boundary.sprite
    environmentalImages[boundary.id] = img
    
    // Add load promise for proper initialization
    const loadPromise = new Promise((resolve) => {
      img.onload = resolve
      img.onerror = resolve // Continue even if image fails to load
    })
    imageLoadPromises.push(loadPromise)
  })

  // Create environmental elements from placements
  environmentalAssets.placements.forEach((placement, index) => {
    const assetData = environmentalAssets.decorations.find(d => d.id === placement.assetId) ||
                     environmentalAssets.boundaries.find(b => b.id === placement.assetId)
    
    if (assetData) {
      try {
        const element = new EnvironmentalElement({
          position: {
            x: placement.position.x * Boundary.width + gameOffset.x,
            y: placement.position.y * Boundary.height + gameOffset.y
          },
          image: environmentalImages[placement.assetId],
          scale: assetData.scale,
          type: assetData.type,
          hasCollision: assetData.hasCollision,
          name: assetData.name,
          description: assetData.description,
          id: assetData.id
        })
        
        environmentalElements.push(element)
        
        // Add collision boundary if needed
        if (assetData.hasCollision) {
          environmentalBoundaries.push(
            new Boundary({
              position: {
                x: placement.position.x * Boundary.width + gameOffset.x,
                y: placement.position.y * Boundary.height + gameOffset.y
              }
            })
          )
        }
      } catch (error) {
        console.warn(`Failed to create environmental element ${placement.assetId}:`, error)
      }
    } else {
      console.warn(`Asset data not found for placement ${index}:`, placement.assetId)
    }
  })

  console.log(`Created ${environmentalElements.length} environmental elements and ${environmentalBoundaries.length} boundaries`)
  
  return { elements: environmentalElements, boundaries: environmentalBoundaries }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { environmentalAssets, createEnvironmentalElements }
}