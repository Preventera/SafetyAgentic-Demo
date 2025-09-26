// SafetyAgentic Integration Component - Version Simplifiée
// Nom de code: SafetyAgentic-Simple-Component
// Localisation: src/components/SafetyAgenticSimple.tsx

import React, { useState } from 'react';

interface SafetyStats {
  success: boolean;
  dataFolders: number;
  cnessFiles: number;
  stormFiles: number;
  error?: string;
}

const SafetyAgenticSimple: React.FC = () => {
  const [stats, setStats] = useState<SafetyStats | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    
    try {
      const baseUrl = 'https://api.github.com/repos/Preventera/SafetyAgentic/contents';
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SafeGraph-Integration'
      };

      // Test structure principale
      const response = await fetch(`${baseUrl}/data`, { headers });
      const dataStructure = await response.json();

      // Test CNESST
      const cnessResponse = await fetch(`${baseUrl}/data/CNESST`, { headers });
      const cnessFiles = cnessResponse.ok ? await cnessResponse.json() : [];

      // Test STORM
      const stormResponse = await fetch(`${baseUrl}/data/storm_knowledge`, { headers });
      const stormFiles = stormResponse.ok ? await stormResponse.json() : [];

      setStats({
        success: true,
        dataFolders: dataStructure.length,
        cnessFiles: cnessFiles.length,
        stormFiles: stormFiles.length
      });

    } catch (error) {
      setStats({
        success: false,
        dataFolders: 0,
        cnessFiles: 0,
        stormFiles: 0,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">SafetyAgentic Integration</h2>
        
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Connexion...' : 'Tester Connexion'}
        </button>

        {stats && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded ${stats.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
              <h3 className="font-semibold">
                Statut: {stats.success ? 'Connecté ✅' : 'Erreur ❌'}
              </h3>
              {stats.error && (
                <p className="text-red-600 mt-2">{stats.error}</p>
              )}
            </div>

            {stats.success && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded border">
                  <h4 className="font-medium">Sources de données</h4>
                  <p className="text-2xl font-bold text-blue-600">{stats.dataFolders}</p>
                </div>
                <div className="bg-green-50 p-4 rounded border">
                  <h4 className="font-medium">Fichiers CNESST</h4>
                  <p className="text-2xl font-bold text-green-600">{stats.cnessFiles}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded border">
                  <h4 className="font-medium">Fichiers STORM</h4>
                  <p className="text-2xl font-bold text-purple-600">{stats.stormFiles}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetyAgenticSimple;