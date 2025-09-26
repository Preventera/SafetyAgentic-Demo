// SafetyAgentic GitHub API Service
// Nom de code: SafetyAgentic-GitHub-Live-Integration
// Localisation: SafeGraph/src/services/safetyagentic-api.ts

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file' | 'dir';
  content?: string;
  encoding?: string;
}

interface CNESSTLesion {
  ID: number;
  NATURE_LESION: string;
  SIEGE_LESION: string;
  GENRE: string;
  AGENT_CAUSAL_LESION: string;
  SEXE_PERS_PHYS: string;
  GROUPE_AGE: string;
  SECTEUR_SCIAN: string;
  IND_LESION_SURDITE: string;
  IND_LESION_MACHINE: string;
  IND_LESION_TMS: string;
  IND_LESION_PSY: string;
  IND_LESION_COVID_19: string;
}

interface STORMData {
  source: string;
  country: string;
  incident_type: string;
  severity: number;
  prevention_measures: string[];
  timestamp: string;
}

interface SafetyAgenticDataSources {
  cnesst: {
    lesions_2017: CNESSTLesion[];
    lesions_2018: CNESSTLesion[];
    lesions_2019: CNESSTLesion[];
    lesions_2020: CNESSTLesion[];
    lesions_2021: CNESSTLesion[];
    lesions_2022: CNESSTLesion[];
    lesions_2023: CNESSTLesion[];
    codifications: any[];
  };
  storm_knowledge: STORMData[];
  international: any[];
  memory_vectorstore: any[];
  behavioral_db: any[];
}

class SafetyAgenticAPI {
  private readonly baseUrl = 'https://api.github.com/repos/Preventera/SafetyAgentic/contents';
  private readonly headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'SafeGraph-Integration-v1.0'
  };

  // 🔍 MÉTHODE 1: Explorer la structure des données
  async exploreDataStructure(): Promise<GitHubContent[]> {
    try {
      console.log('🔍 Exploration structure SafetyAgentic...');
      const response = await fetch(`${this.baseUrl}/data`, {
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      const contents: GitHubContent[] = await response.json();
      console.log('📁 Dossiers trouvés:', contents.map(c => c.name));
      return contents;
    } catch (error) {
      console.error('❌ Erreur exploration:', error);
      throw error;
    }
  }

  // 📊 MÉTHODE 2: Récupérer les données CNESST
  async fetchCNESSTData(year?: string): Promise<CNESSTLesion[]> {
    try {
      console.log(`📊 Récupération données CNESST ${year || 'toutes années'}...`);
      
      // Lister les fichiers CNESST
      const cnessContents = await fetch(`${this.baseUrl}/data/CNESST`, {
        headers: this.headers
      });

      if (!cnessContents.ok) {
        throw new Error(`Erreur accès CNESST: ${cnessContents.status}`);
      }

      const files: GitHubContent[] = await cnessContents.json();
      console.log('📁 Fichiers CNESST:', files.map(f => f.name));

      // Filtrer par année si spécifiée
      let targetFiles = files.filter(f => f.name.endsWith('.csv'));
      if (year) {
        targetFiles = targetFiles.filter(f => f.name.includes(year));
      }

      const allData: CNESSTLesion[] = [];

      // Récupérer chaque fichier CSV
      for (const file of targetFiles) {
        console.log(`⬇️ Téléchargement ${file.name}...`);
        const csvData = await this.downloadCSVFile(file.download_url);
        const parsedData = await this.parseCSVData(csvData);
        allData.push(...parsedData);
        console.log(`✅ ${file.name}: ${parsedData.length} entrées`);
      }

      console.log(`🎯 Total CNESST récupéré: ${allData.length} lésions`);
      return allData;
    } catch (error) {
      console.error('❌ Erreur récupération CNESST:', error);
      throw error;
    }
  }

  // 🌍 MÉTHODE 3: Récupérer les données STORM internationales
  async fetchSTORMData(): Promise<STORMData[]> {
    try {
      console.log('🌍 Récupération données STORM internationales...');
      
      const stormContents = await fetch(`${this.baseUrl}/data/storm_knowledge`, {
        headers: this.headers
      });

      if (!stormContents.ok) {
        throw new Error(`Erreur accès STORM: ${stormContents.status}`);
      }

      const files: GitHubContent[] = await stormContents.json();
      console.log('📁 Fichiers STORM:', files.map(f => f.name));

      const stormData: STORMData[] = [];

      for (const file of files) {
        if (file.name.endsWith('.json') || file.name.endsWith('.csv')) {
          console.log(`⬇️ Téléchargement STORM ${file.name}...`);
          const fileContent = await this.downloadFile(file.download_url);
          
          if (file.name.endsWith('.json')) {
            const jsonData = JSON.parse(fileContent);
            stormData.push(...(Array.isArray(jsonData) ? jsonData : [jsonData]));
          }
        }
      }

      console.log(`🎯 Total STORM récupéré: ${stormData.length} entrées`);
      return stormData;
    } catch (error) {
      console.error('❌ Erreur récupération STORM:', error);
      throw error;
    }
  }

  // 🧠 MÉTHODE 4: Récupérer les données vectorielles
  async fetchVectorStoreData(): Promise<any[]> {
    try {
      console.log('🧠 Récupération memory vectorstore...');
      
      const vectorContents = await fetch(`${this.baseUrl}/data/memory_vectorstore`, {
        headers: this.headers
      });

      if (!vectorContents.ok) {
        throw new Error(`Erreur accès vectorstore: ${vectorContents.status}`);
      }

      const files: GitHubContent[] = await vectorContents.json();
      console.log('📁 Fichiers vectorstore:', files.map(f => f.name));

      const vectorData: any[] = [];

      for (const file of files) {
        if (file.name.endsWith('.json') || file.name.endsWith('.pkl')) {
          console.log(`⬇️ Téléchargement vectorstore ${file.name}...`);
          // Note: Les fichiers .pkl nécessitent un traitement spécial
          if (file.name.endsWith('.json')) {
            const fileContent = await this.downloadFile(file.download_url);
            const jsonData = JSON.parse(fileContent);
            vectorData.push(jsonData);
          }
        }
      }

      console.log(`🎯 Total vectorstore récupéré: ${vectorData.length} entrées`);
      return vectorData;
    } catch (error) {
      console.error('❌ Erreur récupération vectorstore:', error);
      throw error;
    }
  }

  // 🔄 MÉTHODE 5: Synchronisation complète
  async syncAllData(): Promise<SafetyAgenticDataSources> {
    console.log('🔄 Début synchronisation complète SafetyAgentic...');
    const startTime = Date.now();

    try {
      // Exploration structure
      await this.exploreDataStructure();

      // Récupération parallèle des données
      const [cnessData, stormData, vectorData] = await Promise.all([
        this.fetchCNESSTData(),
        this.fetchSTORMData(),
        this.fetchVectorStoreData()
      ]);

      // Organisation des données CNESST par année
      const cnessOrganized = this.organizeCNESSTByYear(cnessData);

      const syncedData: SafetyAgenticDataSources = {
        cnesst: cnessOrganized,
        storm_knowledge: stormData,
        international: [], // À implémenter selon structure découverte
        memory_vectorstore: vectorData,
        behavioral_db: [] // À implémenter selon safetyagentic_behaviorx.db
      };

      const duration = Date.now() - startTime;
      console.log(`✅ Synchronisation complète en ${duration}ms`);
      console.log(`📊 CNESST: ${cnessData.length} lésions`);
      console.log(`🌍 STORM: ${stormData.length} entrées`);
      console.log(`🧠 Vectorstore: ${vectorData.length} entrées`);

      return syncedData;
    } catch (error) {
      console.error('❌ Erreur synchronisation complète:', error);
      throw error;
    }
  }

  // 🛠️ MÉTHODES UTILITAIRES PRIVÉES

  private async downloadFile(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur téléchargement: ${response.status}`);
    }
    return await response.text();
  }

  private async downloadCSVFile(url: string): Promise<string> {
    return this.downloadFile(url);
  }

  private async parseCSVData(csvContent: string): Promise<CNESSTLesion[]> {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data: CNESSTLesion[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        if (values.length === headers.length) {
          const lesion: any = {};
          headers.forEach((header, index) => {
            lesion[header] = values[index];
          });
          data.push(lesion as CNESSTLesion);
        }
      }
    }

    return data;
  }

  private organizeCNESSTByYear(data: CNESSTLesion[]): SafetyAgenticDataSources['cnesst'] {
    const organized: SafetyAgenticDataSources['cnesst'] = {
      lesions_2017: [],
      lesions_2018: [],
      lesions_2019: [],
      lesions_2020: [],
      lesions_2021: [],
      lesions_2022: [],
      lesions_2023: [],
      codifications: []
    };

    // Organisation par année basée sur l'ID ou autre critère
    // À adapter selon la structure réelle des données
    data.forEach(lesion => {
      // Logic d'organisation par année
      // Pour l'instant, on met tout dans 2023 comme exemple
      organized.lesions_2023.push(lesion);
    });

    return organized;
  }

  // 📈 MÉTHODE 6: Statistiques en temps réel
  async getRealTimeStats(): Promise<any> {
    try {
      const data = await this.syncAllData();
      
      return {
        cnesst_total: Object.values(data.cnesst).flat().length,
        storm_total: data.storm_knowledge.length,
        last_sync: new Date().toISOString(),
        data_sources: ['CNESST', 'STORM', 'International', 'VectorStore'],
        status: 'active'
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message,
        last_sync: new Date().toISOString()
      };
    }
  }
}

// Export singleton
export const safetyAgenticAPI = new SafetyAgenticAPI();

// Export types
export type {
  CNESSTLesion,
  STORMData,
  SafetyAgenticDataSources,
  GitHubContent
};