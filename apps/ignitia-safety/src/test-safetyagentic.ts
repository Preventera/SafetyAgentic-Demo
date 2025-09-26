// Test SafetyAgentic API Connection
// Nom de code: SafetyAgentic-Live-Connection-Test
// Localisation: SafeGraph/src/test-safetyagentic.ts

import { safetyAgenticAPI } from './services/safetyagentic-api';

async function testSafetyAgenticConnection() {
  console.log('🚀 DÉBUT TEST CONNEXION SAFETYAGENTIC');
  console.log('=====================================');

  try {
    // TEST 1: Explorer la structure
    console.log('\n🔍 TEST 1: Exploration structure des données...');
    const structure = await safetyAgenticAPI.exploreDataStructure();
    console.log('✅ Structure récupérée:', structure.length, 'éléments');
    structure.forEach(item => {
      console.log(`  📁 ${item.name} (${item.type}) - ${item.size} bytes`);
    });

    // TEST 2: Statistiques temps réel
    console.log('\n📈 TEST 2: Statistiques temps réel...');
    const stats = await safetyAgenticAPI.getRealTimeStats();
    console.log('✅ Stats récupérées:', stats);

    // TEST 3: Aperçu données CNESST (limité pour test)
    console.log('\n📊 TEST 3: Aperçu données CNESST 2023...');
    const cnessData = await safetyAgenticAPI.fetchCNESSTData('2023');
    console.log(`✅ CNESST 2023: ${cnessData.length} lésions récupérées`);
    
    if (cnessData.length > 0) {
      console.log('📋 Exemple première lésion:', cnessData[0]);
    }

    // TEST 4: Données STORM
    console.log('\n🌍 TEST 4: Données STORM internationales...');
    const stormData = await safetyAgenticAPI.fetchSTORMData();
    console.log(`✅ STORM: ${stormData.length} entrées récupérées`);

    console.log('\n🎉 TOUS LES TESTS RÉUSSIS !');
    console.log('=====================================');
    
    return {
      success: true,
      structure: structure.length,
      cnesst_entries: cnessData.length,
      storm_entries: stormData.length,
      stats
    };

  } catch (error) {
    console.error('❌ ERREUR DURANT LES TESTS:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Fonction pour test rapide en développement
async function quickTest() {
  console.log('⚡ TEST RAPIDE - Exploration structure uniquement');
  
  try {
    const structure = await safetyAgenticAPI.exploreDataStructure();
    console.log('✅ Connexion GitHub OK!');
    console.log('📁 Dossiers disponibles:');
    structure.forEach(item => {
      console.log(`  - ${item.name} (${item.type})`);
    });
    return true;
  } catch (error) {
    console.error('❌ Connexion échouée:', error);
    return false;
  }
}

// Export pour utilisation dans d'autres composants
export { testSafetyAgenticConnection, quickTest };