// src/pages/ModelsPage.tsx
// Interface de production optimisée pour 1000+ modèles IA-SST

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  BarChart3,
  Eye, 
  Users, 
  Star, 
  Shield, 
  CheckCircle,
  Activity,
  Database,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  TrendingUp,
  Award,
  Target,
  Zap,
  Settings,
  Download,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModels } from '../hooks/useModels';
import { ModelTemplate, SearchFilters } from '../services/ModelsService';

type ViewMode = 'grid' | 'list' | 'stats';

const ModelsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Hook optimisé pour 1000+ modèles
  const {
    models,
    isLoading,
    isInitialized,
    error,
    currentPage,
    totalPages,
    totalModels,
    hasMore,
    pageSize,
    searchQuery,
    searchFilters,
    stats,
    setSearchQuery,
    setFilters,
    clearFilters,
    nextPage,
    previousPage,
    goToPage,
    setPageSize,
    refreshModels,
    generateSampleModels,
    toggleFavorite,
    isModelFavorite
  } = useModels({
    autoLoad: true,
    initialPageSize: 24,
    enableStats: true
  });

  // État local de l'interface
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedModel, setSelectedModel] = useState<ModelTemplate | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filtres avancés
  const [localFilters, setLocalFilters] = useState<Partial<SearchFilters>>({});

  // ✅ GESTIONNAIRES D'ÉVÉNEMENTS
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    clearFilters();
  };

  const handleGenerateModels = async (count: number) => {
    await generateSampleModels(count);
  };

  // ✅ DONNÉES POUR LES FILTRES
  const filterOptions = useMemo(() => {
    if (!stats) return { categories: [], difficulties: [], sectors: [] };
    
    return {
      categories: Object.keys(stats.byCategory),
      difficulties: Object.keys(stats.byDifficulty),
      sectors: Object.keys(stats.bySector).slice(0, 10) // Top 10 secteurs
    };
  }, [stats]);

  // ✅ COMPOSANT CARTE DE MODÈLE
  const ModelCard: React.FC<{ model: ModelTemplate }> = ({ model }) => (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white border-l-4 border-l-blue-500 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
              {model.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant={model.difficulty === 'Débutant' ? 'secondary' : model.difficulty === 'Intermédiaire' ? 'default' : 'destructive'}>
                {model.difficulty}
              </Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700">
                {model.category}
              </Badge>
              <div className={`w-3 h-3 rounded-full ${
                model.roi === 'Élevé' ? 'bg-green-500' : 
                model.roi === 'Moyen' ? 'bg-yellow-500' : 'bg-gray-500'
              }`} title={`ROI: ${model.roi}`} />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(model.id)}
            className={`${isModelFavorite(model.id) ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
          >
            <Star className={`h-4 w-4 ${isModelFavorite(model.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {model.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {model.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
              {tag}
            </Badge>
          ))}
          {model.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
              +{model.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Badges de conformité */}
        <div className="flex flex-wrap gap-2 mb-4">
          {model.badges.loi25 && (
            <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
              <CheckCircle className="h-3 w-3" />
              Loi 25
            </div>
          )}
          {model.badges.auditIA && (
            <div className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
              <Shield className="h-3 w-3" />
              Audit IA
            </div>
          )}
          {model.badges.explicable && (
            <div className="flex items-center gap-1 text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded">
              <Activity className="h-3 w-3" />
              Explicable
            </div>
          )}
        </div>

        {/* Métriques */}
        <div className="flex justify-between text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {model.metrics.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {model.metrics.usage}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            {model.metrics.rating}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedModel(model)}
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
          >
            📋 Détails
          </Button>
          {model.marketplaceRef && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(model.marketplaceRef!.url, '_blank')}
              className="hover:bg-gray-100"
            >
              🔗
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // ✅ COMPOSANT PAGINATION
  const Pagination: React.FC = () => {
    const getVisiblePages = () => {
      const pages = [];
      const maxVisible = 7;
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    return (
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            Affichage {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, totalModels)} de {totalModels.toLocaleString()} modèles
          </span>
          <select 
            value={pageSize} 
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="ml-4 px-2 py-1 border rounded text-sm"
          >
            <option value={12}>12 par page</option>
            <option value={24}>24 par page</option>
            <option value={48}>48 par page</option>
            <option value={96}>96 par page</option>
          </select>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={previousPage}
            disabled={currentPage === 1}
            className="px-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {getVisiblePages().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-2 py-1 text-gray-400">
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page as number)}
                  className="px-3"
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={!hasMore}
            className="px-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // ✅ RENDU PRINCIPAL
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              🚀 Modèles IA-SST Production
            </h1>
            <p className="text-gray-600">
              Interface optimisée pour {totalModels.toLocaleString()}+ modèles avec recherche avancée et analytics
            </p>
          </div>
          
          {/* Actions rapides */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshModels}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleGenerateModels(500)}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              +500 Modèles
            </Button>
          </div>
        </div>

        {/* Bannière ÉTAPE 5 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800">
                🎉 ÉTAPE 5 - EXTENSION À 1000+ MODÈLES RÉUSSIE !
              </h3>
              <p className="text-blue-700">
                Service optimisé, hook avancé, pagination intelligente et interface de production opérationnels.
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques globales */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Database className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-800">Total Modèles</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.total.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Eye className="h-8 w-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">Vues Totales</p>
                    <p className="text-2xl font-bold text-green-900">{stats.totalViews.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-purple-800">Usage Total</p>
                    <p className="text-2xl font-bold text-purple-900">{stats.totalUsage.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-800">Note Moyenne</p>
                    <p className="text-2xl font-bold text-yellow-900">{stats.avgRating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche principale */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="🔍 Rechercher parmi 1000+ modèles (nom, description, tags, secteur)..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 bg-white"
              />
            </div>
            
            {/* Filtres rapides */}
            <div className="flex items-center gap-2">
              <select
                value={localFilters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Toutes catégories</option>
                {filterOptions.categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={localFilters.difficulty || ''}
                onChange={(e) => handleFilterChange('difficulty', e.target.value || undefined)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Toutes difficultés</option>
                {filterOptions.difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtres
              </Button>

              {(Object.keys(localFilters).length > 0 || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-gray-500"
                >
                  Effacer
                </Button>
              )}
            </div>
            
            {/* Sélecteur de vue */}
            <div className="flex border rounded-md bg-gray-50">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'stats' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('stats')}
                className="rounded-l-none"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filtres avancés */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ROI</label>
                <select
                  value={localFilters.roi || ''}
                  onChange={(e) => handleFilterChange('roi', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Tous les ROI</option>
                  <option value="Élevé">Élevé</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Faible">Faible</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note minimum</label>
                <select
                  value={localFilters.rating || ''}
                  onChange={(e) => handleFilterChange('rating', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Toutes les notes</option>
                  <option value="4.5">4.5+ étoiles</option>
                  <option value="4.0">4.0+ étoiles</option>
                  <option value="3.5">3.5+ étoiles</option>
                  <option value="3.0">3.0+ étoiles</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badges</label>
                <div className="flex flex-wrap gap-2">
                  {['loi25', 'auditIA', 'explicable'].map(badge => (
                    <label key={badge} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localFilters.badges?.includes(badge) || false}
                        onChange={(e) => {
                          const current = localFilters.badges || [];
                          const updated = e.target.checked 
                            ? [...current, badge]
                            : current.filter(b => b !== badge);
                          handleFilterChange('badges', updated.length > 0 ? updated : undefined);
                        }}
                        className="mr-1"
                      />
                      <span className="text-xs">{badge}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">Chargement des modèles...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <span className="font-medium">Erreur:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Vue grille */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {models.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            )}

            {/* Vue liste */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {models.map((model) => (
                  <Card key={model.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{model.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{model.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {model.metrics.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {model.metrics.usage}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {model.metrics.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{model.category}</Badge>
                          <Badge variant="secondary">{model.difficulty}</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedModel(model)}
                          >
                            Détails
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Vue statistiques */}
            {viewMode === 'stats' && stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Par Catégorie
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(stats.byCategory).map(([category, count]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm">{category}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Par Difficulté
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(stats.byDifficulty).map(([difficulty, count]) => (
                        <div key={difficulty} className="flex justify-between items-center">
                          <span className="text-sm">{difficulty}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Badges de Conformité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Loi 25</span>
                        <Badge variant="outline">{stats.badgeStats.loi25Count}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Audit IA</span>
                        <Badge variant="outline">{stats.badgeStats.auditIACount}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Explicable</span>
                        <Badge variant="outline">{stats.badgeStats.explicableCount}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Pagination */}
            {models.length > 0 && <Pagination />}

            {/* Aucun résultat */}
            {models.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun modèle trouvé
                </h3>
                <p className="text-gray-600 mb-4">
                  Essayez de modifier vos critères de recherche ou de filtrage.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={handleClearFilters}>
                    Effacer les filtres
                  </Button>
                  <Button onClick={() => handleGenerateModels(100)}>
                    Générer 100 modèles de test
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de détails enrichi */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedModel.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>ID: {selectedModel.id}</span>
                    <span>•</span>
                    <span>Catégorie: {selectedModel.category}</span>
                    <span>•</span>
                    <span>Difficulté: {selectedModel.difficulty}</span>
                  </div>
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
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="overview">📋 Vue d'ensemble</TabsTrigger>
                  <TabsTrigger value="implementation">🔧 Implémentation</TabsTrigger>
                  <TabsTrigger value="governance">⚖️ Gouvernance</TabsTrigger>
                  <TabsTrigger value="security">🔒 Sécurité</TabsTrigger>
                  <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-800">📝 Description</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{selectedModel.description}</p>
                      
                      <h3 className="font-semibold mb-3 text-gray-800">🏷️ Tags</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedModel.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="font-semibold mb-3 text-gray-800">🏢 Secteurs</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedModel.sector.map((sector) => (
                          <Badge key={sector} variant="secondary" className="bg-green-100 text-green-800">
                            {sector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-800">📊 Métriques clés</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-600">{selectedModel.metrics.views.toLocaleString()}</div>
                          <div className="text-sm text-blue-700">Vues</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-green-600">{selectedModel.metrics.usage}</div>
                          <div className="text-sm text-green-700">Utilisations</div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-yellow-600">{selectedModel.metrics.rating}</div>
                          <div className="text-sm text-yellow-700">Note</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-purple-600">{selectedModel.roi}</div>
                          <div className="text-sm text-purple-700">ROI</div>
                        </div>
                      </div>

                      <h3 className="font-semibold mb-3 text-gray-800">⏱️ Estimation</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-lg font-medium text-gray-800">{selectedModel.estimatedTime}</div>
                        <div className="text-sm text-gray-600">Temps d'implémentation estimé</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">🏆 Badges de conformité</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg text-center ${selectedModel.badges.loi25 ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
                        <div className={`text-2xl mb-2 ${selectedModel.badges.loi25 ? 'text-green-600' : 'text-gray-400'}`}>
                          {selectedModel.badges.loi25 ? '✅' : '❌'}
                        </div>
                        <div className="font-medium">Loi 25</div>
                        <div className="text-xs text-gray-500">Protection des données</div>
                      </div>
                      <div className={`p-4 rounded-lg text-center ${selectedModel.badges.auditIA ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
                        <div className={`text-2xl mb-2 ${selectedModel.badges.auditIA ? 'text-blue-600' : 'text-gray-400'}`}>
                          {selectedModel.badges.auditIA ? '🛡️' : '❌'}
                        </div>
                        <div className="font-medium">Audit IA</div>
                        <div className="text-xs text-gray-500">Vérification algorithmes</div>
                      </div>
                      <div className={`p-4 rounded-lg text-center ${selectedModel.badges.explicable ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
                        <div className={`text-2xl mb-2 ${selectedModel.badges.explicable ? 'text-purple-600' : 'text-gray-400'}`}>
                          {selectedModel.badges.explicable ? '🔍' : '❌'}
                        </div>
                        <div className="font-medium">Explicable</div>
                        <div className="text-xs text-gray-500">IA transparente</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-800">🛠️ Technologies requises</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedModel.implementation.technologies.map((tech, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-700">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-800">✅ Prérequis</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        {selectedModel.implementation.prerequisites.map((prereq, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-700">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                            {prereq}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-800">🗺️ Étapes d'implémentation</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="space-y-3">
                        {selectedModel.implementation.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="text-gray-700">{step}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="governance" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-green-800">🔍 Transparence</h3>
                      <p className="text-sm text-green-700">{selectedModel.governance.transparency}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-blue-800">⚖️ Éthique</h3>
                      <p className="text-sm text-blue-700">{selectedModel.governance.ethics}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">📜 Conformité réglementaire</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.governance.compliance.map((standard) => (
                        <Badge key={standard} variant="outline" className="bg-green-50 border-green-300 text-green-800">
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6">
                  <div className={`p-4 rounded-lg border-2 ${selectedModel.cybersecurity.sensitiveData ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <h3 className="font-semibold mb-2 text-gray-800">🔒 Données sensibles</h3>
                    <p className={`text-sm font-medium ${selectedModel.cybersecurity.sensitiveData ? 'text-red-700' : 'text-green-700'}`}>
                      {selectedModel.cybersecurity.sensitiveData ? '⚠️ Oui - Données sensibles présentes' : '✅ Non - Aucune donnée sensible'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">🛡️ Mesures de sécurité</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedModel.cybersecurity.measures.map((measure, index) => (
                          <div key={index} className="flex items-center gap-2 text-blue-700">
                            <Shield className="w-4 h-4" />
                            {measure}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">📋 Standards de sécurité</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.cybersecurity.standards.map((standard) => (
                        <Badge key={standard} variant="outline" className="bg-blue-50 border-blue-300 text-blue-700">
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">Popularité</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {((selectedModel.metrics.views / (stats?.totalViews || 1)) * 100).toFixed(1)}%
                        </div>
                        <p className="text-xs text-gray-500">du total des vues</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">Taux de conversion</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {((selectedModel.metrics.usage / selectedModel.metrics.views) * 100).toFixed(1)}%
                        </div>
                        <p className="text-xs text-gray-500">vues → utilisations</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">Performance relative</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {stats ? ((selectedModel.metrics.rating / stats.avgRating) * 100).toFixed(0) : '100'}%
                        </div>
                        <p className="text-xs text-gray-500">vs moyenne globale</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">📈 Tendances d'utilisation</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-center text-gray-600">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>Graphiques d'utilisation disponibles dans la version complète</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toggleFavorite(selectedModel.id)}
                    className={`${isModelFavorite(selectedModel.id) ? 'text-yellow-600 border-yellow-300' : ''}`}
                  >
                    <Star className={`h-4 w-4 mr-2 ${isModelFavorite(selectedModel.id) ? 'fill-current' : ''}`} />
                    {isModelFavorite(selectedModel.id) ? 'Retiré des favoris' : 'Ajouter aux favoris'}
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setSelectedModel(null)}>
                    Fermer
                  </Button>
                  {selectedModel.marketplaceRef && (
                    <Button 
                      onClick={() => window.open(selectedModel.marketplaceRef!.url, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      🔗 Voir sur Marketplace
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelsPage;