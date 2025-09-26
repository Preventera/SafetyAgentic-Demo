import React, { useState, useEffect } from 'react';
import { AlertCircle, Database, Download, Globe, Brain, BarChart3, RefreshCw } from 'lucide-react';

// Nom de code: SafeGraph-SafetyAgentic-Live-Component
// Localisation: src/components/SafetyAgenticIntegration.tsx

interface SafetyAgenticStats {
  success: boolean;
  timestamp: string;
  dataFolders: number;
  cnessFiles?: number;
  stormFiles?: number;
  vectorFiles?: number;
  error?: string;
}

interface DataSource {
  name: string;
  type: 'CNESST' | 'STORM' | 'VECTOR' | 'CONFIG';
  status: 'loading' | 'success' | 'error';
  fileCount: number;
  lastUpdate: string;
  icon: React.ReactNode;
  description: string;
}

const SafetyAgenticIntegration: React.FC = () => {
  const [stats, setStats] = useState<SafetyAgenticStats | null>(null);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string>('');

  // Initialisation des sources de données
  const initializeDataSources = (): DataSource[] => [
    {
      name: 'CNESST Québec',
      type: 'CNESST',
      status: 'loading',
      fileCount: 0,
      lastUpdate: '',
      icon: <Database className="w-5 h-5 text-blue-500" />,
      description: 'Données lésions professionnelles 2017-2023'
    },
    {
      name: 'STORM International',
      type: 'STORM',
      status: 'loading',
      fileCount: 0,
      lastUpdate: '',
      icon: <Globe className="w-5 h-5 text-green-500" />,
      description: 'Enrichissements quotidiens internationaux'
    },
    {
      name: 'Memory Vectorstore',
      type: 'VECTOR',
      status: 'loading',
      fileCount: 0,
      lastUpdate: '',
      icon: <Brain className="w-5 h-5 text-purple-500" />,
      description: 'Base vectorielle IA enrichie'
    },
    {
      name: 'Configuration',
      type: 'CONFIG',
      status: 'loading',
      fileCount: 1,
      lastUpdate: '',
      icon: <BarChart3 className="w-5 h-5 text-orange-500" />,
      description: 'Paramètres et comportements'
    }
  ];

  // Fonction de test de connexion SafetyAgentic
  const testSafetyAgenticConnection = async (): Promise<SafetyAgenticStats> => {
    const baseUrl = 'https://api.github.com/repos/Preventera/SafetyAgentic/contents';
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'SafeGraph-Integration-v1.0'
    };

    try {
      // Structure principale
      const response = await fetch(`${baseUrl}/data`, { headers });
      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }
      const dataStructure = await response.json();

      // Test CNESST
      const cnessResponse = await fetch(`${baseUrl}/data/CNESST`, { headers });
      const cnessFiles = cnessResponse.ok ? await cnessResponse.json() : [];

      // Test STORM
      const stormResponse = await fetch(`${baseUrl}/data/storm_knowledge`, { headers });
      const stormFiles = stormResponse.ok ? await stormResponse.json() : [];

      // Test Vectorstore
      const vectorResponse = await fetch(`${baseUrl}/data/memory_vectorstore`, { headers });
      const vectorFiles = vectorResponse.ok ? await vectorResponse.json() : [];

      return {
        success: true,
        timestamp: new Date().toISOString(),
        dataFolders: dataStructure.length,
        cnessFiles: cnessFiles.length,
        stormFiles: stormFiles.length,
        vectorFiles: vectorFiles.length
      };

    } catch (error) {
      return {
        success: false,
        timestamp: new Date().toISOString(),
        dataFolders: 0,
        error: error.message
      };
    }
  };

  // Synchronisation des données
  const syncData = async () => {
    setIsLoading(true);
    const sources = initializeDataSources();
    setDataSources(sources);

    try {
      const result = await testSafetyAgenticConnection();
      setStats(result);
      setLastSync(new Date().toLocaleString('fr-CA'));

      if (result.success) {
        // Mise à jour du statut des sources
        const updatedSources = sources.map(source => {
          switch (source.type) {
            case 'CNESST':
              return {
                ...source,
                status: 'success' as const,
                fileCount: result.cnessFiles || 0,
                lastUpdate: result.timestamp
              };
            case 'STORM':
              return {
                ...source,
                status: 'success' as const,
                fileCount: result.stormFiles || 0,
                lastUpdate: result.timestamp
              };
            case 'VECTOR':
              return {
                ...source,
                status: 'success' as const,
                fileCount: result.vectorFiles || 0,
                lastUpdate: result.timestamp
              };
            case 'CONFIG':
              return {
                ...source,
                status: 'success' as const,
                lastUpdate: result.timestamp
              };
            default:
              return source;
          }
        });
        setDataSources(updatedSources);
      } else {
        // Marquer toutes les sources en erreur
        const errorSources = sources.map(source => ({
          ...source,
          status: 'error' as const
        }));
        setDataSources(errorSources);
      }
    } catch (error) {
      console.error('Erreur sync:', error);
      const errorSources = sources.map(source => ({
        ...source,
        status: 'error' as const
      }));
      setDataSources(errorSources);
    } finally {
      setIsLoading(false);
    }
  };

  // Synchronisation automatique au montage
  useEffect(() => {
    syncData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'loading': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Connecté';
      case 'error': return 'Erreur';
      case 'loading': return 'Chargement...';
      default: return 'Inconnu';
    }
  };

  return (
    <div className=\"w-full max-w-6xl mx-auto p-6 space-y-6\">
      {/* Header */}
      <div className=\"bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200\">
        <div className=\"flex items-center justify-between mb-4\">
          <div className=\"flex items-center space-x-3\">
            <div className=\"w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center\">
              <Database className=\"w-6 h-6 text-white\" />
            </div>
            <div>
              <h2 className=\"text-2xl font-bold text-gray-900\">SafetyAgentic Integration</h2>
              <p className=\"text-gray-600\">Connexion live aux données HSE internationales</p>
            </div>
          </div>
          <button
            onClick={syncData}
            disabled={isLoading}
            className=\"flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors\"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Synchronisation...' : 'Synchroniser'}</span>
          </button>
        </div>

        {/* Statistiques globales */}
        {stats && (
          <div className=\"grid grid-cols-1 md:grid-cols-4 gap-4\">
            <div className=\"bg-white rounded-lg p-4 border border-gray-200\">
              <div className=\"flex items-center space-x-2\">
                <div className={`w-3 h-3 rounded-full ${stats.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className=\"text-sm font-medium text-gray-700\">Statut</span>
              </div>
              <p className=\"text-xl font-bold text-gray-900 mt-1\">
                {stats.success ? 'Connecté' : 'Erreur'}
              </p>
            </div>
            <div className=\"bg-white rounded-lg p-4 border border-gray-200\">
              <div className=\"flex items-center space-x-2\">
                <Database className=\"w-4 h-4 text-blue-500\" />
                <span className=\"text-sm font-medium text-gray-700\">Sources</span>
              </div>
              <p className=\"text-xl font-bold text-gray-900 mt-1\">{stats.dataFolders}</p>
            </div>
            <div className=\"bg-white rounded-lg p-4 border border-gray-200\">
              <div className=\"flex items-center space-x-2\">
                <Download className=\"w-4 h-4 text-green-500\" />
                <span className=\"text-sm font-medium text-gray-700\">Fichiers STORM</span>
              </div>
              <p className=\"text-xl font-bold text-gray-900 mt-1\">{stats.stormFiles || 0}</p>
            </div>
            <div className=\"bg-white rounded-lg p-4 border border-gray-200\">
              <div className=\"flex items-center space-x-2\">
                <Brain className=\"w-4 h-4 text-purple-500\" />
                <span className=\"text-sm font-medium text-gray-700\">Vectorstore</span>
              </div>
              <p className=\"text-xl font-bold text-gray-900 mt-1\">{stats.vectorFiles || 0}</p>
            </div>
          </div>
        )}

        {lastSync && (
          <p className=\"text-sm text-gray-500 mt-4\">
            Dernière synchronisation: {lastSync}
          </p>
        )}
      </div>

      {/* Sources de données */}
      <div className=\"bg-white rounded-lg border border-gray-200 overflow-hidden\">
        <div className=\"px-6 py-4 border-b border-gray-200 bg-gray-50\">
          <h3 className=\"text-lg font-semibold text-gray-900\">Sources de Données</h3>
          <p className=\"text-sm text-gray-600\">État des connexions aux différentes bases de données</p>
        </div>

        <div className=\"divide-y divide-gray-200\">
          {dataSources.map((source, index) => (
            <div key={index} className=\"px-6 py-4 hover:bg-gray-50 transition-colors\">
              <div className=\"flex items-center justify-between\">
                <div className=\"flex items-center space-x-3\">
                  {source.icon}
                  <div>
                    <h4 className=\"text-sm font-medium text-gray-900\">{source.name}</h4>
                    <p className=\"text-sm text-gray-500\">{source.description}</p>
                  </div>
                </div>
                <div className=\"flex items-center space-x-4\">
                  <div className=\"text-right\">
                    <p className=\"text-sm font-medium text-gray-900\">{source.fileCount} fichier(s)</p>
                    <p className=\"text-xs text-gray-500\">
                      {source.lastUpdate ? new Date(source.lastUpdate).toLocaleString('fr-CA') : 'Jamais'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(source.status)}`}>
                    {getStatusText(source.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Erreurs */}
      {stats && !stats.success && (
        <div className=\"bg-red-50 border border-red-200 rounded-lg p-4\">
          <div className=\"flex items-center space-x-2\">
            <AlertCircle className=\"w-5 h-5 text-red-600\" />
            <h4 className=\"text-sm font-medium text-red-800\">Erreur de connexion</h4>
          </div>
          <p className=\"text-sm text-red-700 mt-2\">{stats.error}</p>
        </div>
      )}
    </div>
  );
};

export default SafetyAgenticIntegration;