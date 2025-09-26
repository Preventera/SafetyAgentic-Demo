import React from 'react';
import { AIAssistantTestComponent } from '@/components/ai-assistant/test/AIAssistantTest';

// =============================================
// 🧪 PAGE DE TEST IGNITIA - DÉVELOPPEMENT
// =============================================

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de la page test */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                🧪 IGNITIA - Page de Test Développement
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Extension AI Assistant
              </span>
            </div>
            
            {/* Status build */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Build: OK (5.43s)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">TypeScript: ✅</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Informations sur les tests */}
        <div className="mb-8 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              📋 Statut Extension AI Assistant
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Fonctions existantes */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">🔒</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-green-800">Fonctions Existantes</h4>
                    <p className="text-sm text-green-600">generateContent, analyzeContent</p>
                    <p className="text-xs text-green-500">Status: Préservées ✅</p>
                  </div>
                </div>
              </div>

              {/* Nouvelles interfaces */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">🆕</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Nouvelles Interfaces</h4>
                    <p className="text-sm text-blue-600">MaturityLevel, ObstacleContext</p>
                    <p className="text-xs text-blue-500">Status: Compilées ✅</p>
                  </div>
                </div>
              </div>

              {/* Fonctions enrichies */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold">🔄</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-orange-800">Fonctions Enrichies</h4>
                    <p className="text-sm text-orange-600">3 nouvelles fonctions</p>
                    <p className="text-xs text-orange-500">Status: En attente Edge Functions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Composant de test principal */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <AIAssistantTestComponent />
          </div>
        </div>

        {/* Informations techniques */}
        <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              🔧 Informations Techniques
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Edge Functions Status */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">📡 Edge Functions Supabase</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-600">openai-assistant</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✅ Existante
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-600">claude-analyzer</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✅ Existante
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-600">ignitia-contextual-ai</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      ❌ À créer
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-600">ignitia-workflow-guide</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      ❌ À créer
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-600">ignitia-obstacle-analyzer</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      ❌ À créer
                    </span>
                  </div>
                </div>
              </div>

              {/* Plan de déploiement */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">📋 Plan de Déploiement</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs font-medium">✓</span>
                    <span className="text-sm text-gray-600">Extension Hook AI Assistant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs font-medium">✓</span>
                    <span className="text-sm text-gray-600">Test de compilation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-medium">🔄</span>
                    <span className="text-sm text-gray-600">Test fonctions existantes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 text-gray-600 text-xs font-medium">○</span>
                    <span className="text-sm text-gray-600">Création Edge Functions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 text-gray-600 text-xs font-medium">○</span>
                    <span className="text-sm text-gray-600">Test intégration complète</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation retour */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ← Retour à l'application
          </button>
        </div>
      </main>
    </div>
  );
};

export default TestPage;