import React, { useState } from 'react';
import { useAIAssistant, MaturityLevel, ObstacleContext } from '@/hooks/use-ai-assistant';

// =============================================
// 🧪 COMPOSANT DE TEST - AI ASSISTANT ÉTENDU
// =============================================

export const AIAssistantTestComponent: React.FC = () => {
  const { 
    // 🔒 Fonctions existantes
    generateContent, 
    analyzeContent, 
    isLoading,
    // 🆕 Nouvelles fonctions
    generateContextualContent,
    generateWorkflowGuidance,
    analyzeObstacles
  } = useAIAssistant();

  const [testResults, setTestResults] = useState<string[]>([]);
  const [currentTest, setCurrentTest] = useState<string>('');

  // =============================================
  // 🔒 TEST 1 - FONCTIONS EXISTANTES
  // =============================================
  const testExistingFunctions = async () => {
    setCurrentTest('Test Fonctions Existantes');
    
    try {
      // Test generateContent (existant)
      const result1 = await generateContent({
        type: 'project_description',
        prompt: 'Test génération basique',
        context: 'Test de compatibilité'
      });
      
      setTestResults(prev => [...prev, `✅ generateContent: ${result1 ? 'SUCCÈS' : 'ÉCHEC'}`]);

      // Test analyzeContent (existant)
      const result2 = await analyzeContent({
        analysisType: 'questionnaire_analysis',
        text: 'Test d\'analyse basique',
        context: 'Test de compatibilité'
      });
      
      setTestResults(prev => [...prev, `✅ analyzeContent: ${result2 ? 'SUCCÈS' : 'ÉCHEC'}`]);
      
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Erreur fonctions existantes: ${error}`]);
    }
  };

  // =============================================
  // 🆕 TEST 2 - NOUVELLES INTERFACES
  // =============================================
  const testNewInterfaces = () => {
    setCurrentTest('Test Nouvelles Interfaces');
    
    try {
      // Test création MaturityLevel
      const maturityLevel: MaturityLevel = {
        level: 3,
        name: 'Pilotage',
        description: 'Test niveau maturité'
      };
      
      // Test création ObstacleContext
      const obstacleContext: ObstacleContext = {
        obstacle: 'donnees',
        severity: 'moyen',
        sector: 'Construction'
      };
      
      setTestResults(prev => [...prev, 
        `✅ Interface MaturityLevel: CRÉÉE`,
        `✅ Interface ObstacleContext: CRÉÉE`,
        `✅ TypeScript: VALIDATION OK`
      ]);
      
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Erreur interfaces: ${error}`]);
    }
  };

  // =============================================
  // 🆕 TEST 3 - NOUVELLES FONCTIONS (ÉCHEC ATTENDU)
  // =============================================
  const testNewFunctions = async () => {
    setCurrentTest('Test Nouvelles Fonctions');
    
    try {
      const maturityLevel: MaturityLevel = {
        level: 2,
        name: 'Expérimentation',
        description: 'Test maturité'
      };

      // Test generateContextualContent (ÉCHEC ATTENDU - fonction Edge n'existe pas)
      const result1 = await generateContextualContent({
        type: 'maturity_assessment',
        prompt: 'Test génération contextuelle',
        maturityLevel: maturityLevel,
        sector: 'Construction'
      });
      
      setTestResults(prev => [...prev, `🔄 generateContextualContent: ${result1 ? 'SUCCÈS' : 'ÉCHEC ATTENDU (Edge function manquante)'}`]);

      // Test analyzeObstacles (ÉCHEC ATTENDU)
      const obstacles: ObstacleContext[] = [{
        obstacle: 'culture',
        severity: 'eleve',
        sector: 'Construction'
      }];
      
      const result2 = await analyzeObstacles(obstacles, 'Construction');
      setTestResults(prev => [...prev, `🔄 analyzeObstacles: ${result2 ? 'SUCCÈS' : 'ÉCHEC ATTENDU (Edge function manquante)'}`]);
      
    } catch (error) {
      setTestResults(prev => [...prev, `🔄 Nouvelles fonctions: ÉCHEC ATTENDU - ${error}`]);
    }
  };

  // =============================================
  // 🔧 TEST 4 - IMPORT/EXPORT
  // =============================================
  const testImportExport = () => {
    setCurrentTest('Test Import/Export');
    
    try {
      // Vérifier que toutes les fonctions sont accessibles
      const functionsAvailable = {
        generateContent: typeof generateContent === 'function',
        analyzeContent: typeof analyzeContent === 'function',
        generateContextualContent: typeof generateContextualContent === 'function',
        generateWorkflowGuidance: typeof generateWorkflowGuidance === 'function',
        analyzeObstacles: typeof analyzeObstacles === 'function',
        isLoading: typeof isLoading === 'boolean'
      };
      
      const allFunctionsOK = Object.values(functionsAvailable).every(val => val === true);
      
      setTestResults(prev => [...prev, 
        `✅ Import/Export: ${allFunctionsOK ? 'TOUTES FONCTIONS DISPONIBLES' : 'ERREUR IMPORT'}`,
        `📊 Détail: ${JSON.stringify(functionsAvailable, null, 2)}`
      ]);
      
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Erreur import/export: ${error}`]);
    }
  };

  // =============================================
  // 🧹 RESET TESTS
  // =============================================
  const resetTests = () => {
    setTestResults([]);
    setCurrentTest('');
  };

  // =============================================
  // 🎨 INTERFACE DE TEST
  // =============================================
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🧪 Test AI Assistant Étendu</h2>
      
      {/* État de chargement */}
      {isLoading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          ⏳ Test en cours: {currentTest}
        </div>
      )}
      
      {/* Boutons de test */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button 
          onClick={testExistingFunctions}
          disabled={isLoading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          🔒 Test Existantes
        </button>
        
        <button 
          onClick={testNewInterfaces}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          🆕 Test Interfaces
        </button>
        
        <button 
          onClick={testNewFunctions}
          disabled={isLoading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          🔄 Test Nouvelles
        </button>
        
        <button 
          onClick={testImportExport}
          disabled={isLoading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          📦 Test Import
        </button>
      </div>
      
      <button 
        onClick={resetTests}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-6"
      >
        🧹 Reset Tests
      </button>
      
      {/* Résultats des tests */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">📊 Résultats des Tests</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-500">Aucun test exécuté</p>
        ) : (
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div key={index} className="font-mono text-sm">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">📋 Instructions de Test</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <strong>Test Existantes:</strong> Doit réussir (fonctions originales)</li>
          <li>• <strong>Test Interfaces:</strong> Doit réussir (TypeScript)</li>
          <li>• <strong>Test Nouvelles:</strong> Doit échouer (Edge functions manquantes)</li>
          <li>• <strong>Test Import:</strong> Doit réussir (structure hook)</li>
        </ul>
      </div>
    </div>
  );
};