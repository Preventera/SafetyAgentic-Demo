// Test JavaScript SafetyAgentic API
// Nom de code: SafetyAgentic-JS-Test
// Localisation: src/test-safetyagentic.js

async function testSafetyAgenticAPI() {
  console.log('🚀 TEST CONNEXION SAFETYAGENTIC - VERSION JS');
  console.log('============================================');

  const baseUrl = 'https://api.github.com/repos/Preventera/SafetyAgentic/contents';
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'SafeGraph-Integration-v1.0'
  };

  try {
    // TEST 1: Structure principale
    console.log('\n🔍 TEST 1: Exploration structure SafetyAgentic...');
    const response = await fetch(`${baseUrl}/data`, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status} - ${response.statusText}`);
    }

    const dataStructure = await response.json();
    console.log(`✅ Structure récupérée: ${dataStructure.length} dossiers`);
    
    dataStructure.forEach(item => {
      console.log(`  📁 ${item.name} (${item.type}) - ${Math.round((item.size || 0)/1024)}KB`);
    });

    // TEST 2: Dossier CNESST
    console.log('\n📊 TEST 2: Accès données CNESST...');
    const cnessResponse = await fetch(`${baseUrl}/data/CNESST`, { headers });
    
    if (cnessResponse.ok) {
      const cnessFiles = await cnessResponse.json();
      console.log(`✅ CNESST accessible: ${cnessFiles.length} fichiers`);
      
      const csvFiles = cnessFiles.filter(f => f.name.endsWith('.csv'));
      console.log(`📄 Fichiers CSV trouvés: ${csvFiles.length}`);
      
      csvFiles.slice(0, 3).forEach(file => {
        console.log(`  - ${file.name} (${Math.round(file.size/1024)}KB)`);
      });
    } else {
      console.log('⚠️ CNESST non accessible');
    }

    // TEST 3: Dossier STORM
    console.log('\n🌍 TEST 3: Accès données STORM...');
    const stormResponse = await fetch(`${baseUrl}/data/storm_knowledge`, { headers });
    
    if (stormResponse.ok) {
      const stormFiles = await stormResponse.json();
      console.log(`✅ STORM accessible: ${stormFiles.length} fichiers`);
      
      stormFiles.slice(0, 3).forEach(file => {
        console.log(`  - ${file.name} (${Math.round((file.size || 0)/1024)}KB)`);
      });
    } else {
      console.log('⚠️ STORM non accessible');
    }

    // TEST 4: Memory vectorstore
    console.log('\n🧠 TEST 4: Accès memory vectorstore...');
    const vectorResponse = await fetch(`${baseUrl}/data/memory_vectorstore`, { headers });
    
    if (vectorResponse.ok) {
      const vectorFiles = await vectorResponse.json();
      console.log(`✅ Vectorstore accessible: ${vectorFiles.length} fichiers`);
    } else {
      console.log('⚠️ Vectorstore non accessible');
    }

    // TEST 5: Téléchargement d'un petit fichier
    console.log('\n⬇️ TEST 5: Téléchargement fichier test...');
    const configResponse = await fetch(`${baseUrl}/data/cnesst_config.json`, { headers });
    
    if (configResponse.ok) {
      const configFile = await configResponse.json();
      if (configFile.download_url) {
        const downloadResponse = await fetch(configFile.download_url);
        const content = await downloadResponse.text();
        console.log(`✅ Fichier téléchargé: ${content.length} caractères`);
        console.log('📋 Aperçu:', content.substring(0, 200) + '...');
      }
    } else {
      console.log('⚠️ Fichier config non trouvé');
    }

    console.log('\n🎉 TESTS TERMINÉS AVEC SUCCÈS !');
    console.log('====================================');
    
    return {
      success: true,
      timestamp: new Date().toISOString(),
      dataFolders: dataStructure.length
    };

  } catch (error) {
    console.error('\n❌ ERREUR DURANT LES TESTS:', error.message);
    console.error('Stack:', error.stack);
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Exécution immédiate
console.log('🎯 Démarrage test SafetyAgentic API...\n');

testSafetyAgenticAPI()
  .then(result => {
    console.log('\n🏁 RÉSULTAT FINAL:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('🎉 Tous les tests ont réussi !');
      process.exit(0);
    } else {
      console.log('💥 Des erreurs sont survenues.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('💥 ERREUR FATALE:', error);
    process.exit(1);
  });