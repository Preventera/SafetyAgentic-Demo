// Test Simple SafetyAgentic API - Sans import
// Nom de code: SafetyAgentic-Simple-Test
// Localisation: src/simple-test.ts

async function testGitHubConnection() {
  console.log('🚀 TEST SIMPLE CONNEXION GITHUB SAFETYAGENTIC');
  console.log('=============================================');

  const baseUrl = 'https://api.github.com/repos/Preventera/SafetyAgentic/contents';
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'SafeGraph-Integration-v1.0'
  };

  try {
    // Test basique de connexion
    console.log('🔍 Test connexion GitHub API...');
    const response = await fetch(`${baseUrl}/data`, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status} - ${response.statusText}`);
    }

    const contents = await response.json();
    console.log('✅ Connexion réussie !');
    console.log(`📁 ${contents.length} dossiers trouvés :`);
    
    contents.forEach((item: any) => {
      console.log(`  - ${item.name} (${item.type}) - ${item.size || 0} bytes`);
    });

    // Test spécifique dossier CNESST
    console.log('\n📊 Test accès dossier CNESST...');
    const cnessResponse = await fetch(`${baseUrl}/data/CNESST`, { headers });
    
    if (cnessResponse.ok) {
      const cnessContents = await cnessResponse.json();
      console.log(`✅ CNESST accessible ! ${cnessContents.length} fichiers`);
      
      cnessContents.slice(0, 5).forEach((file: any) => {
        console.log(`  📄 ${file.name} - ${Math.round(file.size/1024)}KB`);
      });
    } else {
      console.log('⚠️ CNESST non accessible');
    }

    return { success: true, dataFolders: contents.length };

  } catch (error) {
    console.error('❌ ERREUR:', error);
    return { success: false, error: error.message };
  }
}

// Exécution automatique
testGitHubConnection()
  .then(result => {
    console.log('\n🎯 RÉSULTAT FINAL:', result);
    process.exit(result.success ? 0 : 1);
  })
  .catch(error => {
    console.error('💥 ERREUR FATALE:', error);
    process.exit(1);
  });