// Debug CNESST Data Investigation
// Nom de code: CNESST-Data-Deep-Investigation
// Localisation: Investigation complète dossier CNESST

async function investigateCNESSTData() {
  console.log('🔍 INVESTIGATION APPROFONDIE DONNÉES CNESST');
  console.log('===========================================');

  const baseUrl = 'https://api.github.com/repos/Preventera/SafetyAgentic/contents';
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'SafeGraph-Investigation'
  };

  try {
    // 1. EXPLORATION COMPLÈTE DOSSIER CNESST
    console.log('\n📁 EXPLORATION COMPLÈTE DOSSIER CNESST...');
    const cnessResponse = await fetch(`${baseUrl}/data/CNESST`, { headers });
    
    if (!cnessResponse.ok) {
      throw new Error(`Erreur accès CNESST: ${cnessResponse.status}`);
    }

    const cnessFiles = await cnessResponse.json();
    console.log(`📊 TOTAL FICHIERS TROUVÉS: ${cnessFiles.length}`);
    
    // Détail de tous les fichiers
    cnessFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name} (${file.type}) - ${Math.round(file.size/1024)}KB`);
      if (file.download_url) {
        console.log(`   📥 URL: ${file.download_url}`);
      }
    });

    // 2. RECHERCHE SPÉCIFIQUE FICHIERS LÉSIONS PAR ANNÉE
    console.log('\n🔍 RECHERCHE FICHIERS LÉSIONS PAR ANNÉE...');
    const lesionFiles = cnessFiles.filter(f => 
      f.name.toLowerCase().includes('lesion') || 
      f.name.toLowerCase().includes('2017') ||
      f.name.toLowerCase().includes('2018') ||
      f.name.toLowerCase().includes('2019') ||
      f.name.toLowerCase().includes('2020') ||
      f.name.toLowerCase().includes('2021') ||
      f.name.toLowerCase().includes('2022') ||
      f.name.toLowerCase().includes('2023')
    );

    console.log(`📈 FICHIERS LÉSIONS TROUVÉS: ${lesionFiles.length}`);
    lesionFiles.forEach(file => {
      console.log(`  ✅ ${file.name} - ${Math.round(file.size/1024)}KB`);
    });

    // 3. RECHERCHE FICHIERS CSV SPÉCIFIQUEMENT
    console.log('\n📄 RECHERCHE FICHIERS CSV...');
    const csvFiles = cnessFiles.filter(f => f.name.endsWith('.csv'));
    console.log(`📊 FICHIERS CSV: ${csvFiles.length}`);
    csvFiles.forEach(file => {
      console.log(`  📋 ${file.name} - ${Math.round(file.size/1024)}KB`);
    });

    // 4. EXPLORATION DOSSIER DATA RACINE
    console.log('\n🌐 EXPLORATION DOSSIER DATA RACINE...');
    const dataResponse = await fetch(`${baseUrl}/data`, { headers });
    const dataContents = await dataResponse.json();
    
    console.log('📁 CONTENU DOSSIER DATA:');
    dataContents.forEach(item => {
      console.log(`  ${item.type === 'dir' ? '📁' : '📄'} ${item.name}`);
    });

    // 5. RECHERCHE ALTERNATIVE - Peut-être dans un autre dossier ?
    console.log('\n🔍 RECHERCHE ALTERNATIVE DONNÉES OUVERTES...');
    
    // Vérifier s'il y a d'autres dossiers
    const possibleFolders = dataContents.filter(item => 
      item.type === 'dir' && 
      (item.name.toLowerCase().includes('open') ||
       item.name.toLowerCase().includes('ouvert') ||
       item.name.toLowerCase().includes('public') ||
       item.name.toLowerCase().includes('data') ||
       item.name.toLowerCase().includes('csv'))
    );

    for (const folder of possibleFolders) {
      console.log(`\n📂 EXPLORATION ${folder.name}...`);
      try {
        const folderResponse = await fetch(`${baseUrl}/data/${folder.name}`, { headers });
        const folderContents = await folderResponse.json();
        console.log(`  📊 ${folderContents.length} éléments trouvés:`);
        folderContents.slice(0, 10).forEach(item => {
          console.log(`    ${item.type === 'dir' ? '📁' : '📄'} ${item.name}`);
        });
      } catch (error) {
        console.log(`  ❌ Erreur accès ${folder.name}: ${error.message}`);
      }
    }

    // 6. VÉRIFICATION PROJECT KNOWLEDGE
    console.log('\n🧠 RAPPEL: DONNÉES DANS PROJECT KNOWLEDGE...');
    console.log('Les fichiers suivants sont mentionnés dans votre project knowledge:');
    console.log('  - lesions-2017.csv');
    console.log('  - lesions-2018.csv'); 
    console.log('  - lesions-2019.csv');
    console.log('  - lesions-2020.csv');
    console.log('  - lesions-2021.csv');
    console.log('  - lesions-2022.csv');
    console.log('  - lesions-2023.csv');
    console.log('  - Plus de 793K+ lésions au total');

    return {
      totalCNESSTFiles: cnessFiles.length,
      lesionFiles: lesionFiles.length,
      csvFiles: csvFiles.length,
      filesList: cnessFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
    };

  } catch (error) {
    console.error('❌ ERREUR INVESTIGATION:', error);
    return { error: error.message };
  }
}

// Exécution automatique
console.log('🚀 Démarrage investigation CNESST...\n');

investigateCNESSTData()
  .then(result => {
    console.log('\n🎯 RÉSULTAT INVESTIGATION:');
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(error => {
    console.error('💥 ERREUR FATALE:', error);
  });