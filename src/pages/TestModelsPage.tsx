// src/pages/TestModelsPage.tsx
// Page de test complète pour valider les 10 modèles JSON enrichis
// VERSION CORRIGÉE avec protections TypeScript complètes

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Eye, 
  Users, 
  Star, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Activity,
  Database,
  Settings,
  ArrowLeft,
  ExternalLink,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { testModelsJSON, testModelsCount, testModelsByCategory } from '../data/test-models';

const TestModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedModel, setSelectedModel] = useState<any | null>(null);

  // Filtrage des modèles
  const filteredModels = useMemo(() => {
    return testModelsJSON.filter(model => {
      const matchesSearch = model.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.mots_cles.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Tous' || model.contexte === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Statistiques CORRIGÉES avec protections
  const stats = useMemo(() => {
    const totalViews = testModelsJSON.reduce((sum, model) => sum + (model.metrics?.views || 0), 0);
    const totalUsage = testModelsJSON.reduce((sum, model) => sum + (model.metrics?.usage || 0), 0);
    const avgRating = testModelsJSON.reduce((sum, model) => sum + (model.metrics?.rating || 0), 0) / testModelsJSON.length;
    
    return { totalViews, totalUsage, avgRating };
  }, []);

  const categories = ['Tous', ...Object.keys(testModelsByCategory)];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Élevée': return 'bg-red-500';
      case 'Moyenne': return 'bg-yellow-500';
      case 'Faible': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🎯 Test des Modèles IA-SST Enrichis
            </h1>
            <p className="text-gray-600">
              Validation des {testModelsCount} modèles JSON avec enrichissement complet selon standards IGNITIA 2025
            </p>
          </div>
        </div>

        {/* Bannière de succès ÉTAPE 4 */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">
                🎉 ÉTAPE 4 - INTÉGRATION COMPLÈTE RÉUSSIE !
              </h3>
              <p className="text-green-700">
                Interface enrichie avec 10 modèles, recherche, filtres, badges de conformité et modal détaillé opérationnels.
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Modèles</p>
                  <p className="text-2xl font-bold text-gray-900">{testModelsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Vues</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Usage Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Note Moyenne</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="🔍 Rechercher dans les modèles (nom, description, tags)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'Tous' ? '📋 Tous les contextes' : `🎯 ${category}`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{filteredModels.length} / {testModelsCount} modèles</span>
          </div>
        </div>
      </div>

      {/* Liste des modèles */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <Card key={model.project_id} className="hover:shadow-lg transition-all duration-200 bg-white border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 text-gray-900">{model.nom}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className={getDifficultyColor(model.niveau)}>
                        {model.niveau}
                      </Badge>
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        {model.contexte}
                      </Badge>
                      <div 
                        className={`w-3 h-3 rounded-full ${getPriorityColor(model.priorite)} flex-shrink-0`} 
                        title={`Priorité: ${model.priorite}`}
                      />
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {model.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {model.mots_cles.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      {tag}
                    </Badge>
                  ))}
                  {model.mots_cles.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      +{model.mots_cles.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Secteurs */}
                <div className="text-sm text-gray-600 mb-3">
                  <strong className="text-gray-800">Secteurs:</strong> {model.secteur.join(', ')}
                </div>

                {/* Badges de conformité CORRIGÉS */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {model.indicateurs?.conformite_loi_25 && (
                    <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                      <CheckCircle className="h-3 w-3" />
                      Loi 25
                    </div>
                  )}
                  {model.indicateurs?.audit_biais_valide && (
                    <div className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                      <Shield className="h-3 w-3" />
                      Audit IA
                    </div>
                  )}
                  {model.indicateurs?.explicabilite_activee && (
                    <div className="flex items-center gap-1 text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded">
                      <Activity className="h-3 w-3" />
                      Explicable
                    </div>
                  )}
                </div>

                {/* Métriques CORRIGÉES */}
                <div className="flex justify-between text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {(model.metrics?.views || 0).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {model.metrics?.usage || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    {model.metrics?.rating || 0}
                  </span>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedModel(model)}
                    className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                  >
                    📋 Détails
                  </Button>
                  {model.marketstore_ref && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(model.marketstore_ref.url, '_blank')}
                      className="hover:bg-gray-100"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun modèle trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Tous');
              }}
              className="mt-4"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>

      {/* Modal de détails enrichi CORRIGÉ */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedModel.nom}</h2>
                  <p className="text-gray-600 mt-1">ID: {selectedModel.project_id}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedModel(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="general">📋 Général</TabsTrigger>
                  <TabsTrigger value="implementation">🔧 Implémentation</TabsTrigger>
                  <TabsTrigger value="governance">⚖️ Gouvernance</TabsTrigger>
                  <TabsTrigger value="security">🔒 Cybersécurité</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-800">📝 Description</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedModel.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-800">🏷️ Métadonnées</h3>
                      <div className="space-y-2 text-sm">
                        <div><strong>Niveau:</strong> <Badge className={getDifficultyColor(selectedModel.niveau)}>{selectedModel.niveau}</Badge></div>
                        <div><strong>Contexte:</strong> <Badge variant="outline">{selectedModel.contexte}</Badge></div>
                        <div><strong>Priorité:</strong> <span className={`inline-block w-3 h-3 rounded-full ${getPriorityColor(selectedModel.priorite)} mr-2`}></span>{selectedModel.priorite}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">🛠️ Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.technologies?.map((tech: string) => (
                        <Badge key={tech} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">📊 Cas d'usage sectoriels</h3>
                    {selectedModel.cas_usage_sectoriels?.map((cas: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4 mb-3 bg-gray-50">
                        <h4 className="font-medium text-gray-800 mb-2">{cas.titre}</h4>
                        <p className="text-sm text-gray-600 mb-2">{cas.description}</p>
                        <p className="text-xs text-gray-500">📚 Référence: {cas.reference}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">📈 Métriques de performance</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{(selectedModel.metrics?.views || 0).toLocaleString()}</div>
                        <div className="text-sm text-blue-700">Vues</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedModel.metrics?.usage || 0}</div>
                        <div className="text-sm text-green-700">Utilisations</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-600">{selectedModel.metrics?.rating || 0}</div>
                        <div className="text-sm text-yellow-700">Note moyenne</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">🔧 Technologies requises</h3>
                    <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
                      {selectedModel.implementation?.technologies?.map((tech: string, index: number) => (
                        <li key={index} className="text-gray-700">{tech}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">✅ Prérequis</h3>
                    <ul className="list-disc list-inside space-y-2 bg-yellow-50 p-4 rounded-lg">
                      {selectedModel.implementation?.prerequisites?.map((prereq: string, index: number) => (
                        <li key={index} className="text-gray-700">{prereq}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">🗺️ Étapes d'implémentation</h3>
                    <ol className="list-decimal list-inside space-y-2 bg-blue-50 p-4 rounded-lg">
                      {selectedModel.implementation?.steps?.map((step: string, index: number) => (
                        <li key={index} className="text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
                
                <TabsContent value="governance" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-green-800">🔍 Transparence</h3>
                      <p className="text-sm text-green-700">{selectedModel.gouvernance_ethique?.transparence}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-blue-800">⚖️ Équité</h3>
                      <p className="text-sm text-blue-700">{selectedModel.gouvernance_ethique?.equite}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-purple-800">👤 Responsabilité</h3>
                      <p className="text-sm text-purple-700">{selectedModel.gouvernance_ethique?.responsabilite}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-orange-800">🛡️ Protection données</h3>
                      <p className="text-sm text-orange-700">{selectedModel.gouvernance_ethique?.protection_donnees}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">📋 Conformité réglementaire</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedModel.gouvernance_ethique?.conformite?.map((conf: string) => (
                        <Badge key={conf} variant="secondary" className="bg-green-100 text-green-800">{conf}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-gray-800">🔍 Audit</h3>
                      <p className="text-sm text-gray-700">{selectedModel.gouvernance_ethique?.audit}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-gray-800">📞 Recours</h3>
                      <p className="text-sm text-gray-700">{selectedModel.gouvernance_ethique?.recours}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-red-800">🔒 Données sensibles</h3>
                    <p className="text-sm text-red-700">
                      <strong>{selectedModel.cybersecurite?.donnees_sensibles ? '⚠️ Oui - Données sensibles présentes' : '✅ Non - Aucune donnée sensible'}</strong>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">🛡️ Mesures de sécurité</h3>
                    <ul className="list-disc list-inside space-y-2 bg-blue-50 p-4 rounded-lg">
                      {selectedModel.cybersecurite?.mesures?.map((mesure: string, index: number) => (
                        <li key={index} className="text-sm text-blue-700">{mesure}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">📜 Conformité cybersécurité</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.cybersecurite?.conformite?.map((conf: string) => (
                        <Badge key={conf} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">{conf}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-yellow-800">⚡ Indicateurs de conformité</h3>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div className="text-center">
                        <div className={`w-6 h-6 mx-auto mb-1 ${selectedModel.indicateurs?.conformite_loi_25 ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedModel.indicateurs?.conformite_loi_25 ? '✅' : '❌'}
                        </div>
                        <div className="text-xs text-gray-600">Loi 25</div>
                      </div>
                      <div className="text-center">
                        <div className={`w-6 h-6 mx-auto mb-1 ${selectedModel.indicateurs?.audit_biais_valide ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedModel.indicateurs?.audit_biais_valide ? '✅' : '❌'}
                        </div>
                        <div className="text-xs text-gray-600">Audit Biais</div>
                      </div>
                      <div className="text-center">
                        <div className={`w-6 h-6 mx-auto mb-1 ${selectedModel.indicateurs?.explicabilite_activee ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedModel.indicateurs?.explicabilite_activee ? '✅' : '❌'}
                        </div>
                        <div className="text-xs text-gray-600">Explicabilité</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedModel(null)}>
                  Fermer
                </Button>
                {selectedModel.marketstore_ref && (
                  <Button 
                    onClick={() => window.open(selectedModel.marketstore_ref.url, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Voir sur Marketplace
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestModelsPage;