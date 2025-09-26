import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Users, FileText, Database, Brain, AlertTriangle, BarChart3, Target, Shield, Zap, BookOpen, Settings, Activity, Eye, MessageSquare } from 'lucide-react';

const HSEHumanX = () => {
  const [activeModule, setActiveModule] = useState('assistant');
  const [searchQuery, setSearchQuery] = useState('');
  const [analysisResults, setAnalysisResults] = useState([]);
  const [clusterData, setClusterData] = useState([]);
  
  const modules = [
    { id: 'assistant', name: 'Assistant SST', icon: MessageSquare, description: 'Recherche sémantique intelligente' },
    { id: 'incidents', name: 'Analyse des Incidents', icon: BarChart3, description: 'Visualisation et analyse des données' },
    { id: 'trends', name: 'Analyse des Tendances', icon: TrendingUp, description: 'Patterns et prédictions' },
    { id: 'clustering', name: 'Clustering des Incidents', icon: Target, description: 'Regroupement automatique' },
    { id: 'external', name: 'Données Externes', icon: Database, description: 'CNESST, OSHA, HSE UK' },
    { id: 'hfacs', name: 'Modèle HFACS', icon: Brain, description: 'Analyse facteurs humains' },
    { id: 'demo', name: 'Démonstration Live', icon: Eye, description: 'Script de démo technique' }
  ];

  const scientificModels = [
    {
      name: "HFACS",
      description: "Human Factors Analysis and Classification System",
      levels: ["Actes dangereux", "Préconditions dangereuses", "Supervision dangereuse", "Influences organisationnelles"]
    },
    {
      name: "Swiss Cheese (Reason)",
      description: "Modèle de défaillances des barrières de sécurité",
      levels: ["Barrières organisationnelles", "Barrières techniques", "Barrières humaines", "Défaillances latentes vs actives"]
    },
    {
      name: "SRK (Rasmussen)",
      description: "Classification des erreurs humaines",
      levels: ["Skill-based (automatique)", "Rule-based (règles)", "Knowledge-based (résolution problèmes)"]
    }
  ];

  const demoMetrics = {
    incidents: 63,
    sources: 4,
    sectors: 8,
    embeddings: 1000,
    accuracy: 94,
    timeReduction: "10x plus rapide"
  };

  const sampleIncidents = [
    { id: 1, type: "Chute d'échafaudage", sector: "Construction", severity: "Critique", hfacsLevel: "Préconditions dangereuses", score: 0.94 },
    { id: 2, type: "Contact électrique", sector: "Industrie", severity: "Majeur", hfacsLevel: "Actes dangereux", score: 0.87 },
    { id: 3, type: "Trouble ergonomique", sector: "Logistique", severity: "Mineur", hfacsLevel: "Influences organisationnelles", score: 0.82 }
  ];

  const trends = [
    { period: "Q1 2024", incidents: 23, prediction: 28, reduction: "12%" },
    { period: "Q2 2024", incidents: 18, prediction: 22, reduction: "18%" },
    { period: "Q3 2024", incidents: 15, prediction: 19, reduction: "21%" },
    { period: "Q4 2024", incidents: 12, prediction: 16, reduction: "25%" }
  ];

  useEffect(() => {
    setAnalysisResults(sampleIncidents);
    setClusterData([
      { cluster: "Chutes en hauteur", incidents: 15, pattern: "Défaut d'EPI + météo", prevention: "Formation renforcée" },
      { cluster: "Erreurs procédurales", incidents: 12, pattern: "Pression temporelle", prevention: "Révision workflow" },
      { cluster: "Défaillances techniques", incidents: 8, pattern: "Maintenance différée", prevention: "Audit préventif" }
    ]);
  }, []);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critique': return 'bg-red-500';
      case 'Majeur': return 'bg-orange-500';
      case 'Mineur': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const AssistantView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Assistant SST Conversationnel</h2>
        <p className="opacity-90">Recherche sémantique intelligente avec IA générative</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <Search className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-bold">Recherche Sémantique Avancée</h3>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Ex: Facteurs organisationnels dans les électrocutions"
            className="w-full p-4 border rounded-lg text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Incidents de chute dans le secteur construction", "Recommandations EPI pour travail en hauteur", "Analyse des causes d'accidents électriques"].map((query, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(query)}
                className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-left border border-blue-200"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4">Reformulation IA Automatique</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
              <p className="text-sm text-gray-600">Requête originale:</p>
              <p className="font-medium">"Accidents électriques"</p>
            </div>
            <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-600">
              <p className="text-sm text-blue-600">Enrichissement IA:</p>
              <p className="font-medium">"Incidents électrocution + facteurs organisationnels + défaillances barrières + préconditions dangereuses"</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4">Résultats avec Score de Pertinence</h3>
          <div className="space-y-3">
            {analysisResults.map((result) => (
              <div key={result.id} className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{result.type}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {(result.score * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {result.sector} • HFACS: {result.hfacsLevel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const HFACSView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Modèles Scientifiques Intégrés</h2>
        <p className="opacity-90">Analyse basée sur HFACS, Swiss Cheese et SRK</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scientificModels.map((model, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-purple-500 mr-2" />
              <h3 className="text-lg font-bold">{model.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{model.description}</p>
            <div className="space-y-2">
              {model.levels.map((level, levelIndex) => (
                <div key={levelIndex} className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mr-3 bg-purple-${(levelIndex + 1) * 200}`}></div>
                  <span className="text-sm">{level}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Analyse en Temps Réel</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description de l'incident:</label>
            <textarea 
              className="w-full p-3 border rounded-lg" 
              rows="4" 
              placeholder="Un opérateur expérimenté a omis de vérifier la consignation électrique avant maintenance, malgré 15 ans d'expérience. Pression de production élevée ce jour-là..."
            ></textarea>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            Analyser avec HFACS + SRK
          </button>
        </div>
      </div>
    </div>
  );

  const ClusteringView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-900 to-teal-900 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Clustering Intelligent des Incidents</h2>
        <p className="opacity-90">Identification automatique de patterns cachés</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {clusterData.map((cluster, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">{cluster.cluster}</h3>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {cluster.incidents} incidents
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">Pattern identifié:</p>
                <p className="text-sm">{cluster.pattern}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Recommandation:</p>
                <p className="text-sm text-green-700">{cluster.prevention}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Visualisation des Clusters ML</h3>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Graphique de clustering interactif</p>
            <p className="text-sm text-gray-400">Algorithme FAISS + embeddings sémantiques</p>
          </div>
        </div>
      </div>
    </div>
  );

  const TrendsView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-900 to-red-900 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Analyse Prédictive des Tendances</h2>
        <p className="opacity-90">Patterns saisonniers et corrélations sectorielles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {trends.map((trend, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-2">{trend.period}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Réel:</span>
                <span className="font-bold">{trend.incidents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Prédiction:</span>
                <span className="text-orange-600">{trend.prediction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Réduction:</span>
                <span className="text-green-600 font-bold">{trend.reduction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Facteurs de Risque Émergents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <h4 className="font-bold text-red-800 mb-2">Risque Croissant</h4>
            <p className="text-sm">Incidents liés au télétravail hybride (+34%)</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2">Amélioration</h4>
            <p className="text-sm">Chutes en hauteur avec nouveaux EPI (-28%)</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ExternalDataView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 to-blue-900 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Intégration Données Externes</h2>
        <p className="opacity-90">CNESST • OSHA • HSE UK • ARIA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "CNESST", country: "Québec", status: "Connecté", incidents: "1,247" },
          { name: "OSHA", country: "USA", status: "Connecté", incidents: "3,891" },
          { name: "HSE UK", country: "UK", status: "Connecté", incidents: "2,156" },
          { name: "ARIA", country: "France", status: "Connecté", incidents: "987" }
        ].map((source, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">{source.name}</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                {source.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{source.country}</p>
            <p className="text-2xl font-bold text-blue-600">{source.incidents}</p>
            <p className="text-xs text-gray-500">incidents analysés</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Benchmarking Sectoriel Automatisé</h3>
        <div className="space-y-4">
          {[
            { sector: "Construction", yourRate: "3.2", industryAvg: "4.1", status: "better" },
            { sector: "Industrie", yourRate: "2.8", industryAvg: "2.9", status: "similar" },
            { sector: "Logistique", yourRate: "4.1", industryAvg: "3.6", status: "worse" }
          ].map((benchmark, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">{benchmark.sector}</span>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-600">Votre taux: </span>
                  <span className="font-bold">{benchmark.yourRate}/1000</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Industrie: </span>
                  <span>{benchmark.industryAvg}/1000</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  benchmark.status === 'better' ? 'bg-green-500' :
                  benchmark.status === 'similar' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DemoView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-900 to-purple-900 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Démonstration Technique Live</h2>
        <p className="opacity-90">Script de démo pour clients et partenaires</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-3">Métriques de Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Incidents traités:</span>
              <span className="font-bold text-2xl text-blue-600">{demoMetrics.incidents}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sources officielles:</span>
              <span className="font-bold text-2xl text-green-600">{demoMetrics.sources}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Secteurs couverts:</span>
              <span className="font-bold text-2xl text-purple-600">{demoMetrics.sectors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Embeddings FAISS:</span>
              <span className="font-bold text-2xl text-orange-600">{demoMetrics.embeddings}+</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-3">ROI Démontrable</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{demoMetrics.timeReduction}</div>
              <div className="text-sm text-gray-600">plus rapide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{demoMetrics.accuracy}%</div>
              <div className="text-sm text-gray-600">précision</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">5 min</div>
              <div className="text-sm text-gray-600">vs 2h analyse manuelle</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-3">Points Forts Démo</h3>
          <div className="space-y-3">
            {[
              "Analyse SRK temps réel",
              "Modèle fromage suisse",
              "Dialogue IA interactif",
              "Génération documents SST",
              "Scénarios immersifs"
            ].map((point, index) => (
              <div key={index} className="flex items-center">
                <Zap className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Flow de Démonstration (15 minutes)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { phase: "Ouverture Forte", duration: "2 min", content: "25 ans expertise + IA pointe" },
            { phase: "Recherche Sémantique", duration: "3 min", content: "Query complexe + reformulation" },
            { phase: "Clustering Intelligent", duration: "3 min", content: "Patterns cachés + causes" },
            { phase: "Multi-Sources", duration: "2 min", content: "CNESST + OSHA temps réel" },
            { phase: "Vision SafeGraph", duration: "3 min", content: "Graphe connaissances" },
            { phase: "ROI & Call-to-Action", duration: "2 min", content: "Métriques + positionnement" }
          ].map((step, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">{step.phase}</span>
                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">{step.duration}</span>
              </div>
              <p className="text-xs text-gray-600">{step.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
        <h3 className="font-bold text-lg mb-2">Message de Clôture</h3>
        <p className="text-gray-800 italic">
          "HSE-HumanX incarne notre vision chez GenAISafety : faire de l'IA un partenaire de confiance pour sauver des vies. 
          Chaque algorithme, chaque modèle, chaque recommandation est conçue selon nos standards C-25 pour que la technologie 
          serve véritablement l'humain dans sa quête de sécurité."
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeModule) {
      case 'assistant': return <AssistantView />;
      case 'incidents': return <TrendsView />;
      case 'trends': return <TrendsView />;
      case 'clustering': return <ClusteringView />;
      case 'external': return <ExternalDataView />;
      case 'hfacs': return <HFACSView />;
      case 'demo': return <DemoView />;
      default: return <AssistantView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-10 w-10 mr-3" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-green-400 bg-clip-text text-transparent">
                  HSE Human X
                </h1>
                <p className="opacity-90">Human Factors in Health, Safety & Environment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm opacity-75">GenAISafety × Preventera</p>
                <p className="font-medium">IA Comportementale SST</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-80 space-y-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-start p-4 rounded-lg text-left transition-all duration-200 ${
                  activeModule === module.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <module.icon className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium">{module.name}</div>
                  <div className="text-xs opacity-75">{module.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSEHumanX;