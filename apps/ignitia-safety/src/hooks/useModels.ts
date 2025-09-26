// src/hooks/useModels.ts
// Hook React optimisé pour la gestion de 1000+ modèles IA-SST

import { useState, useEffect, useCallback, useMemo } from 'react';
import { modelsService, ModelTemplate, SearchFilters, PaginationOptions, SearchResult, ModelStats } from '../services/ModelsService';

export interface UseModelsOptions {
  autoLoad?: boolean;
  initialPageSize?: number;
  enableStats?: boolean;
}

export interface UseModelsReturn {
  // État des données
  models: ModelTemplate[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalModels: number;
  hasMore: boolean;
  pageSize: number;
  
  // Recherche et filtres
  searchFilters: SearchFilters;
  searchQuery: string;
  
  // Statistiques
  stats: ModelStats | null;
  
  // Actions
  searchModels: (filters?: SearchFilters, pagination?: PaginationOptions) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  setPageSize: (size: number) => void;
  refreshModels: () => Promise<void>;
  generateSampleModels: (count?: number) => Promise<void>;
  getModelById: (id: string) => ModelTemplate | null;
  
  // Utilitaires
  getFilteredModelsCount: () => number;
  isModelFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export const useModels = (options: UseModelsOptions = {}): UseModelsReturn => {
  const {
    autoLoad = true,
    initialPageSize = DEFAULT_PAGE_SIZE,
    enableStats = true
  } = options;

  // État principal
  const [models, setModels] = useState<ModelTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalModels, setTotalModels] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [pageSize, setPageSizeState] = useState(Math.min(initialPageSize, MAX_PAGE_SIZE));
  
  // Recherche et filtres
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [searchQuery, setSearchQueryState] = useState('');
  
  // Statistiques
  const [stats, setStats] = useState<ModelStats | null>(null);
  
  // Favoris (stockage local en mémoire)
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // ✅ RECHERCHE PRINCIPALE OPTIMISÉE
  const searchModels = useCallback(async (
    filters: SearchFilters = {},
    pagination: PaginationOptions = { page: currentPage, limit: pageSize }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔍 Recherche avec filtres:', { filters, pagination });
      
      const result: SearchResult = await modelsService.searchModels(filters, pagination);
      
      setModels(result.models);
      setCurrentPage(result.page);
      setTotalPages(result.totalPages);
      setTotalModels(result.total);
      setHasMore(result.hasMore);
      setSearchFilters(filters);
      
      console.log(`✅ ${result.models.length} modèles chargés (page ${result.page}/${result.totalPages})`);
      
      if (!isInitialized) {
        setIsInitialized(true);
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de recherche';
      setError(errorMessage);
      console.error('❌ Erreur de recherche:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, isInitialized]);

  // ✅ GESTION DE LA REQUÊTE DE RECHERCHE
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    const newFilters = { ...searchFilters, query: query || undefined };
    searchModels(newFilters, { page: 1, limit: pageSize });
  }, [searchFilters, pageSize, searchModels]);

  // ✅ GESTION DES FILTRES
  const setFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...searchFilters, ...newFilters };
    setSearchFilters(updatedFilters);
    searchModels(updatedFilters, { page: 1, limit: pageSize });
  }, [searchFilters, pageSize, searchModels]);

  const clearFilters = useCallback(() => {
    setSearchFilters({});
    setSearchQueryState('');
    searchModels({}, { page: 1, limit: pageSize });
  }, [pageSize, searchModels]);

  // ✅ NAVIGATION PAGINÉE
  const nextPage = useCallback(async () => {
    if (hasMore && currentPage < totalPages) {
      await searchModels(searchFilters, { page: currentPage + 1, limit: pageSize });
    }
  }, [hasMore, currentPage, totalPages, searchFilters, pageSize, searchModels]);

  const previousPage = useCallback(async () => {
    if (currentPage > 1) {
      await searchModels(searchFilters, { page: currentPage - 1, limit: pageSize });
    }
  }, [currentPage, searchFilters, pageSize, searchModels]);

  const goToPage = useCallback(async (page: number) => {
    if (page >= 1 && page <= totalPages) {
      await searchModels(searchFilters, { page, limit: pageSize });
    }
  }, [totalPages, searchFilters, pageSize, searchModels]);

  const setPageSize = useCallback((size: number) => {
    const validSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
    setPageSizeState(validSize);
    searchModels(searchFilters, { page: 1, limit: validSize });
  }, [searchFilters, searchModels]);

  // ✅ ACTIONS AVANCÉES
  const refreshModels = useCallback(async () => {
    await searchModels(searchFilters, { page: currentPage, limit: pageSize });
  }, [searchFilters, currentPage, pageSize, searchModels]);

  const generateSampleModels = useCallback(async (count: number = 1000) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(`🎲 Génération de ${count} modèles échantillons...`);
      
      await modelsService.generateMassiveModels(count);
      
      // Recharger les données après génération
      await searchModels({}, { page: 1, limit: pageSize });
      
      console.log(`✅ ${count} modèles générés avec succès`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de génération';
      setError(errorMessage);
      console.error('❌ Erreur de génération:', err);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize, searchModels]);

  const getModelById = useCallback((id: string): ModelTemplate | null => {
    return models.find(model => model.id === id) || null;
  }, [models]);

  // ✅ GESTION DES FAVORIS
  const isModelFavorite = useCallback((id: string): boolean => {
    return favorites.has(id);
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);

  // ✅ CHARGEMENT DES STATISTIQUES
  const loadStats = useCallback(async () => {
    if (!enableStats) return;

    try {
      const statistics = await modelsService.getStatistics();
      setStats(statistics);
    } catch (err) {
      console.warn('⚠️ Erreur de chargement des statistiques:', err);
    }
  }, [enableStats]);

  // ✅ UTILITAIRES
  const getFilteredModelsCount = useCallback((): number => {
    return totalModels;
  }, [totalModels]);

  // ✅ INITIALISATION AUTOMATIQUE
  useEffect(() => {
    if (autoLoad && !isInitialized && !isLoading) {
      console.log('🚀 Initialisation automatique du hook useModels...');
      searchModels({}, { page: 1, limit: pageSize });
    }
  }, [autoLoad, isInitialized, isLoading, pageSize, searchModels]);

  // ✅ CHARGEMENT DES STATISTIQUES
  useEffect(() => {
    if (isInitialized && enableStats) {
      loadStats();
    }
  }, [isInitialized, enableStats, loadStats]);

  // ✅ MÉTRIQUES OPTIMISÉES
  const optimizedStats = useMemo(() => {
    if (!stats) return null;
    
    return {
      ...stats,
      // Calculs dérivés optimisés
      conversionRate: stats.totalViews > 0 ? (stats.totalUsage / stats.totalViews) * 100 : 0,
      avgViewsPerModel: stats.total > 0 ? stats.totalViews / stats.total : 0,
      avgUsagePerModel: stats.total > 0 ? stats.totalUsage / stats.total : 0,
      complianceRate: {
        loi25: (stats.badgeStats.loi25Count / stats.total) * 100,
        auditIA: (stats.badgeStats.auditIACount / stats.total) * 100,
        explicable: (stats.badgeStats.explicableCount / stats.total) * 100
      }
    };
  }, [stats]);

  // ✅ RETOUR OPTIMISÉ
  return {
    // État des données
    models,
    isLoading,
    isInitialized,
    error,
    
    // Pagination
    currentPage,
    totalPages,
    totalModels,
    hasMore,
    pageSize,
    
    // Recherche et filtres
    searchFilters,
    searchQuery,
    
    // Statistiques optimisées
    stats: optimizedStats,
    
    // Actions
    searchModels,
    setSearchQuery,
    setFilters,
    clearFilters,
    nextPage,
    previousPage,
    goToPage,
    setPageSize,
    refreshModels,
    generateSampleModels,
    getModelById,
    
    // Utilitaires
    getFilteredModelsCount,
    isModelFavorite,
    toggleFavorite
  };
};

export default useModels;