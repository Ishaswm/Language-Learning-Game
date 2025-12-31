// Simple test script to validate NPC conversation templates
const fs = require('fs');

// Load the templates file
const templatesCode = fs.readFileSync('./data/npcConversationTemplates.js', 'utf8');

// Create a global context and execute the code
const vm = require('vm');
const context = vm.createContext({});
vm.runInContext(templatesCode, context);

console.log('Available objects in context:', Object.keys(context));

// Extract the objects from the context
const npcConversationTemplates = context.npcConversationTemplates;
const NPCTemplateUtils = context.NPCTemplateUtils;

console.log('npcConversationTemplates:', typeof npcConversationTemplates);
console.log('NPCTemplateUtils:', typeof NPCTemplateUtils);

if (NPCTemplateUtils) {
  console.log('\nTesting NPC Conversation Templates...\n');

  // Test each character
  ['npc1', 'npc2', 'npc3', 'npc4'].forEach(npcId => {
    console.log(`=== Testing ${npcId} ===`);
    
    const template = NPCTemplateUtils.getTemplate(npcId);
    if (template) {
      console.log(`✓ Template loaded for ${template.character.name}`);
      console.log(`  Role: ${template.character.role}`);
      console.log(`  Personality: ${template.character.personality}`);
      
      // Test greeting
      const greeting = NPCTemplateUtils.getRandomGreeting(npcId);
      console.log(`  Sample Greeting: "${greeting}"`);
      
      // Test topics
      const topics = NPCTemplateUtils.getAllTopics(npcId);
      console.log(`  Available Topics (${topics.length}): ${topics.join(', ')}`);
      
      // Test a random topic prompt
      if (topics.length > 0) {
        const randomTopic = topics[0];
        const prompt = NPCTemplateUtils.getRandomPrompt(npcId, randomTopic);
        console.log(`  Sample ${randomTopic} prompt: "${prompt}"`);
      }
      
      // Test farewell
      const farewell = NPCTemplateUtils.getRandomFarewell(npcId);
      console.log(`  Sample Farewell: "${farewell}"`);
      
      console.log('');
    } else {
      console.log(`✗ Template not found for ${npcId}`);
    }
  });

  console.log('Template validation complete!');
} else {
  console.log('NPCTemplateUtils not found in context');
}