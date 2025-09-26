import React, { useState, useEffect } from 'react';
import { ArrowRight, Database, Zap, BarChart3, Brain, Layers, CheckCircle, AlertTriangle } from 'lucide-react';

// Nom de code: SafeGraph-IGNITIA-Integration-Bridge
// Localisation: src/components/SafeGraphIGNITIABridge.tsx

interface IGNITIAModule {
  id: string;
  name: string;
  status: number;
  integration: 'critical' | 'high' | 'medium' | 'low';
  enrichmentType: 'CNESST' | 'STORM' | 'GAIN' | 'Multiple';
  currentData: string;
  enrichedData: string;
  impact: string;
  icon: React.ReactNode;
}

interface EnrichmentFlow {
  step: number;
  module: string;
  action: string;
  dataSource: string;
  result: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const SafeGraphIGNITIABridge: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('PROJECT_FORM');
  const [enrichmentActive, setEnrichmentActive] = useState(false);
  const [flowProgress, setFlowProgress] = useState(0);

  // Configuration des modules IGNITIA avec intégration SafeGraph
  const ignitiaModules: IGNITIAModule[] = [
    {
      id: 'PROJECT_FORM',
      name: 'Project Form',
      status: 100,
      integration: 'critical',
      enrichmentType: 'Multiple',
      currentData: 'Formulaires basiques',
      enrichedData: '697K+ lésions CNESST + GAIN 9 axes',
      impact: 'Enrichissement automatique des projets',
      icon: <Layers className="w-5 h-5 text-blue-500" />
    },
    {
      id: 'ASSISTANT_IA',
      name: 'Assistant IA',
      status: 70,
      integration: 'critical',
      enrichmentType: 'STORM',
      currentData: 'Recommandations statiques',
      enrichedData: 'Données temps réel STORM + SafetyAgentic',
      impact: 'Recommandations contextuelles dynamiques',
      icon: <Brain className="w-5 h-5 text-purple-500" />
    },
    {
      id: 'MODELS',
      name: 'Models (1000+)',
      status: 95,
      integration: 'high',
      enrichmentType: 'CNESST',
      currentData: 'Modèles génériques',
      enrichedData: 'Modèles enrichis avec vraies données',
      impact: 'Précision et pertinence améliorées',
      icon: <BarChart3 className="w-5 h-5 text-green-500" />
    },
    {
      id: 'PROFILE_SCIAN',
      name: 'Profile SCIAN',
      status: 75,
      integration: 'medium',
      enrichmentType: 'CNESST',
      currentData: 'Analyses sectorielles basiques',
      enrichedData: 'Benchmarking avec données réelles',
      impact: 'Analyses sectorielles précises',
      icon: <Database className="w-5 h-5 text-orange-500" />
    },
    {
      id: 'DONNEES',
      name: 'Données Sectorielles',
      status: 85,
      integration: 'high',
      enrichmentType: 'Multiple',
      currentData: 'Données limitées',
      enrichedData: 'Multi-sources (CNESST + STORM + International)',
      impact: 'Base de données complète et actualisée',
      icon: <Database className="w-5 h-5 text-cyan-500" />
    },
    {
      id: 'SERVICES',
      name: 'Services Intégration',
      status: 80,
      integration: 'high',
      enrichmentType: 'Multiple',
      currentData: 'APIs basiques',
      enrichedData: 'Cache intelligent + APIs enrichies',
      impact: 'Performance et fonctionnalités étendues',
      icon: <Zap className="w-5 h-5 text-yellow-500" />
    }
  ];

  // Flux d'enrichissement en temps réel
  const enrichmentFlow: EnrichmentFlow[] = [
    {
      step: 1,
      module: 'SafeGraph',
      action: 'Récupération données CNESST',
      dataSource: '697,602 lésions',
      result: 'Données temps réel disponibles',
      status: 'completed'
    },
    {
      step: 2,
      module: 'SafetyAgentic',
      action: 'Import données STORM',
      dataSource: '7 fichiers internationaux',
      result: 'Base internationale intégrée',
      status: 'completed'
    },
    {
      step: 3,
      module: 'IGNITIA Bridge',
      action: 'Fusion des données',
      dataSource: 'CNESST + STORM + GitHub',
      result: 'Dataset unifié créé',
      status: 'in-progress'
    },
    {
      step: 4,
      module: 'Project Form',
      action: 'Enrichissement GAIN',
      dataSource: 'Dataset + 9 axes GAIN',
      result: 'Recommandations enrichies',
      status: 'pending'
    },
    {
      step: 5,
      module: 'Assistant IA',
      action: 'Génération dynamique',
      dataSource: 'Contexte temps réel',
      result: 'Suggestions intelligentes',
      status: 'pending'
    }
  ];

  const getIntegrationColor = (integration: string) => {
    switch (integration) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Zap className="w-4 h-4 text-orange-500 animate-pulse" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-gray-400" />;
      default: return null;
    }
  };

  const startEnrichment = () => {
    setEnrichmentActive(true);
    setFlowProgress(0);
    
    // Simulation du processus d'enrichissement
    const interval = setInterval(() => {
      setFlowProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setEnrichmentActive(false);
          return 100;
        }
        return prev + 20;
      });
    }, 1000);
  };

  const selectedModuleData = ignitiaModules.find(m => m.id === selectedModule);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">SafeGraph + IGNITIA Integration</h2>
              <p className="text-gray-600">Enrichissement intelligent des 8 modules IGNITIA avec données SafeGraph</p>
            </div>
          </div>
          <button
            onClick={startEnrichment}
            disabled={enrichmentActive}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
          >
            <Zap className="w-5 h-5" />
            <span>{enrichmentActive ? 'Enrichissement...' : 'Démarrer Enrichissement'}</span>
          </button>
        </div>

        {/* Barre de progression */}
        {enrichmentActive && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progression de l'enrichissement</span>
              <span>{flowProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${flowProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Modules IGNITIA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des modules */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">Modules IGNITIA</h3>
            <p className="text-sm text-gray-600">Sélectionnez un module pour voir l'intégration</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {ignitiaModules.map((module) => (
              <div 
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`px-6 py-4 cursor-pointer transition-colors ${
                  selectedModule === module.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {module.icon}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{module.name}</h4>
                      <p className="text-xs text-gray-500">Status: {module.status}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getIntegrationColor(module.integration)}`}>
                      {module.integration}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {module.enrichmentType}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Détails du module sélectionné */}
        {selectedModuleData && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                {selectedModuleData.icon}
                <h3 className="text-lg font-semibold text-gray-900">{selectedModuleData.name}</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Impact de l'enrichissement</h4>
                <p className="text-sm text-gray-600">{selectedModuleData.impact}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-red-800 mb-1">Données actuelles</h5>
                  <p className="text-sm text-red-700">{selectedModuleData.currentData}</p>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-green-800 mb-1">Données enrichies</h5>
                  <p className="text-sm text-green-700">{selectedModuleData.enrichedData}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Priorité d'intégration</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getIntegrationColor(selectedModuleData.integration)}`}>
                    {selectedModuleData.integration.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flux d'enrichissement */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Flux d'Enrichissement en Temps Réel</h3>
          <p className="text-sm text-gray-600">Processus d'intégration SafeGraph → IGNITIA</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {enrichmentFlow.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.status === 'completed' ? 'bg-green-100 text-green-800' :
                    step.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {step.step}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{step.module}</h4>
                      <p className="text-sm text-gray-600">{step.action}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(step.status)}
                      <span className="text-xs text-gray-500">{step.dataSource}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{step.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métriques d'impact */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Données enrichies</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-2">697K+</p>
          <p className="text-xs text-blue-700">Lésions CNESST intégrées</p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Modules enrichis</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-2">6/8</p>
          <p className="text-xs text-purple-700">Modules IGNITIA intégrés</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Sources multiples</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-2">3</p>
          <p className="text-xs text-green-700">CNESST + STORM + GitHub</p>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Temps réel</span>
          </div>
          <p className="text-2xl font-bold text-orange-900 mt-2">Live</p>
          <p className="text-xs text-orange-700">Synchronisation continue</p>
        </div>
      </div>
    </div>
  );
};

export default SafeGraphIGNITIABridge;