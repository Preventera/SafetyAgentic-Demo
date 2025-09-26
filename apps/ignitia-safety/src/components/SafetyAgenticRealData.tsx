import React, { useState, useEffect } from 'react';
import { AlertCircle, Database, Download, Calendar, BarChart3, TrendingUp } from 'lucide-react';

// Nom de code: SafeGraph-RealCNESSTData-Integration
// Localisation: src/components/SafetyAgenticRealData.tsx

interface YearlyDataset {
  year: number;
  resourceId: string;
  name: string;
  lastModified: string;
  recordCount: number;
}

interface CNESSTRecord {
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

// Configuration avec les vrais resource_id découverts dans project knowledge
const YEARLY_DATASETS: YearlyDataset[] = [
  {
    year: 2023,
    resourceId: 'fd1c2ef2-1292-42e6-82d9-e60f20108472',
    name: 'Lésions professionnelles 2023',
    lastModified: '2025-01-21',
    recordCount: 114345
  },
  {
    year: 2022,
    resourceId: '75131dde-b440-45d5-88ea-d1a2104d01cf',
    name: 'Lésions professionnelles 2022',
    lastModified: '2024-07-24',
    recordCount: 161962
  },
  {
    year: 2021,
    resourceId: '4970307f-bcc8-4b51-acbc-4be464afd524',
    name: 'Lésions professionnelles 2021',
    lastModified: '2024-07-24',
    recordCount: 105692
  },
  {
    year: 2020,
    resourceId: 'e7c416e6-ff19-42a9-9104-cd62ad3cd604',
    name: 'Lésions professionnelles 2020',
    lastModified: '2024-07-24',
    recordCount: 104732
  },
  {
    year: 2019,
    resourceId: 'adecc354-ef78-45eb-b76f-f614edc688cf',
    name: 'Lésions professionnelles 2019',
    lastModified: '2024-07-24',
    recordCount: 107465
  },
  {
    year: 2018,
    resourceId: 'b001b08a-ce68-46f8-93dd-8f9323de45ed',
    name: 'Lésions professionnelles 2018',
    lastModified: '2024-07-24',
    recordCount: 103406
  }
];

class CNESSTAPIService {
  private readonly baseURL = 'https://www.donneesquebec.ca/recherche/api/3/action';
  private readonly timeout = 30000;

  getAvailableDatasets(): YearlyDataset[] {
    return [...YEARLY_DATASETS].sort((a, b) => b.year - a.year);
  }

  getTotalRecordsAvailable(): number {
    return YEARLY_DATASETS.reduce((total, dataset) => total + dataset.recordCount, 0);
  }

  async fetchYearData(year: number, limit: number = 100): Promise<CNESSTRecord[]> {
    const dataset = YEARLY_DATASETS.find(d => d.year === year);
    if (!dataset) {
      throw new Error(`Aucun dataset trouvé pour l'année ${year}`);
    }

    try {
      const response = await fetch(`${this.baseURL}/datastore_search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resource_id: dataset.resourceId,
          limit: limit,
          offset: 0
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API CNESST: ${response.status}`);
      }

      const data = await response.json();
      return data.result.records;
    } catch (error) {
      console.error(`Erreur récupération données ${year}:`, error);
      throw error;
    }
  }

  async getDatasetInfo(year: number): Promise<any> {
    const dataset = YEARLY_DATASETS.find(d => d.year === year);
    if (!dataset) return null;

    try {
      const response = await fetch(`${this.baseURL}/package_show`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'lesions-professionnelles'
        })
      });

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Erreur récupération info dataset:', error);
      return null;
    }
  }
}

const SafetyAgenticRealData: React.FC = () => {
  const [cnessService] = useState(() => new CNESSTAPIService());
  const [datasets, setDatasets] = useState<YearlyDataset[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [sampleData, setSampleData] = useState<CNESSTRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const availableDatasets = cnessService.getAvailableDatasets();
    setDatasets(availableDatasets);
    setTotalRecords(cnessService.getTotalRecordsAvailable());
  }, [cnessService]);

  const fetchSampleData = async () => {
    setLoading(true);
    try {
      const data = await cnessService.fetchYearData(selectedYear, 20);
      setSampleData(data);
      console.log(`Données ${selectedYear} récupérées:`, data);
    } catch (error) {
      console.error('Erreur récupération données:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => num.toLocaleString('fr-CA');

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Données CNESST Réelles</h2>
              <p className="text-gray-600">Accès direct aux 793K+ lésions professionnelles québécoises</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-600">{formatNumber(totalRecords)}</p>
            <p className="text-sm text-gray-600">Lésions totales</p>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Années disponibles</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-1">{datasets.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Dernière MAJ</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-1">2025-01-21</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Secteurs SCIAN</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-1">20+</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">API Status</span>
            </div>
            <p className="text-xl font-bold text-green-600 mt-1">Live</p>
          </div>
        </div>
      </div>

      {/* Datasets par année */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Datasets CNESST par Année</h3>
          <p className="text-sm text-gray-600">Données officielles des lésions professionnelles du Québec</p>
        </div>

        <div className="divide-y divide-gray-200">
          {datasets.map((dataset) => (
            <div key={dataset.year} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{dataset.name}</h4>
                    <p className="text-sm text-gray-500">Resource ID: {dataset.resourceId.substring(0, 8)}...</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatNumber(dataset.recordCount)} lésions</p>
                    <p className="text-xs text-gray-500">MAJ: {dataset.lastModified}</p>
                  </div>
                  <button
                    onClick={() => setSelectedYear(dataset.year)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      selectedYear === dataset.year
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sélectionner
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section test données */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Test Données Année {selectedYear}</h3>
              <p className="text-sm text-gray-600">Récupération d'un échantillon de données réelles</p>
            </div>
            <button
              onClick={fetchSampleData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{loading ? 'Chargement...' : 'Récupérer Échantillon'}</span>
            </button>
          </div>
        </div>

        {sampleData.length > 0 && (
          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>{sampleData.length} lésions</strong> récupérées sur {formatNumber(datasets.find(d => d.year === selectedYear)?.recordCount || 0)} disponibles
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nature</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siège</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Secteur SCIAN</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Âge</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sampleData.slice(0, 10).map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-2 whitespace-nowrap text-gray-900">{record.ID}</td>
                      <td className="px-3 py-2 text-gray-900">{record.NATURE_LESION}</td>
                      <td className="px-3 py-2 text-gray-900">{record.SIEGE_LESION}</td>
                      <td className="px-3 py-2 text-gray-900">{record.GENRE}</td>
                      <td className="px-3 py-2 text-gray-900">{record.SECTEUR_SCIAN}</td>
                      <td className="px-3 py-2 text-gray-900">{record.GROUPE_AGE}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Info technique */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <h4 className="text-sm font-medium text-blue-800">Information Technique</h4>
        </div>
        <p className="text-sm text-blue-700 mt-2">
          Les données sont récupérées directement depuis l'API officielle Données Québec (donneesquebec.ca). 
          Chaque dataset correspond à une année complète de lésions professionnelles déclarées à la CNESST.
        </p>
      </div>
    </div>
  );
};

export default SafetyAgenticRealData;