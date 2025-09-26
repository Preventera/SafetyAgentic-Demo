// src/services/ModelsService.ts
// Service centralisé stable pour gérer 1000+ modèles IA-SST

export interface ModelTemplate {
  id: string;
  title: string;
  category: 'Équipement' | 'Lieux' | 'Opérations' | 'Nature humaine';
  subcategory: string;
  description: string;
  sector: string[];
  tags: string[];
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  estimatedTime: string;
  roi: 'Faible' | 'Moyen' | 'Élevé';
  implementation: {
    technologies: string[];
    prerequisites: string[];
    steps: string[];
  };
  metrics: {
    views: number;
    usage: number;
    rating: number;
  };
  badges: {
    loi25: boolean;
    auditIA: boolean;
    explicable: boolean;
  };
  marketplaceRef?: {
    url: string;
    id: string;
    status: 'active' | 'beta' | 'coming_soon';
  };
  governance: {
    transparency: string;
    ethics: string;
    compliance: string[];
  };
  cybersecurity: {
    sensitiveData: boolean;
    measures: string[];
    standards: string[];
  };
}

export interface SearchFilters {
  query?: string;
  category?: string;
  difficulty?: string;
  sector?: string;
  roi?: string;
  badges?: string[];
  rating?: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: 'title' | 'rating' | 'views' | 'usage' | 'created';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  models: ModelTemplate[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ModelStats {
  total: number;
  byCategory: Record<string, number>;
  byDifficulty: Record<string, number>;
  bySector: Record<string, number>;
  avgRating: number;
  totalViews: number;
  totalUsage: number;
  badgeStats: {
    loi25Count: number;
    auditIACount: number;
    explicableCount: number;
  };
}

class ModelsService {
  private modelsCache: ModelTemplate[] = [];
  private searchIndex: Map<string, ModelTemplate[]> = new Map();
  private lastCacheUpdate = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.initializeService();
  }

  // ✅ INITIALISATION DU SERVICE
  private async initializeService() {
    console.log('🚀 Initialisation du ModelsService pour 1000+ modèles...');
    await this.loadModelsData();
    this.buildSearchIndex();
    console.log(`✅ Service initialisé avec ${this.modelsCache.length} modèles`);
  }

  // ✅ GÉNÉRATION MASSIVE DE MODÈLES (1000+)
  async generateMassiveModels(count: number = 1000): Promise<ModelTemplate[]> {
    console.log(`🎲 Génération de ${count} modèles enrichis...`);
    
    const categories: ModelTemplate['category'][] = ['Équipement', 'Lieux', 'Opérations', 'Nature humaine'];
    const difficulties: ModelTemplate['difficulty'][] = ['Débutant', 'Intermédiaire', 'Avancé'];
    const rois: ModelTemplate['roi'][] = ['Faible', 'Moyen', 'Élevé'];
    
    const sectors = [
      'Construction', 'Manufacturing', 'Transport', 'Énergie', 'Santé', 'Mines',
      'Aerospace', 'Pharmaceutique', 'Agroalimentaire', 'Chimie', 'Foresterie',
      'Services publics', 'Éducation', 'Finance', 'Retail', 'Télécommunications'
    ];
    
    const technologies = [
      'Vision par ordinateur', 'Machine Learning', 'IoT', 'NLP', 'Deep Learning',
      'Blockchain', 'Edge Computing', 'Réalité Augmentée', 'Capteurs intelligents',
      'Big Data Analytics', 'Cloud Computing', 'Robotique', 'IA conversationnelle'
    ];

    const complianceStandards = ['CNESST', 'ISO 45001', 'Loi 25', 'ISO 27001', 'RGPD', 'SOC 2'];

    const models: ModelTemplate[] = [];

    for (let i = 1; i <= count; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      const roi = rois[Math.floor(Math.random() * rois.length)];
      
      // Génération de métriques réalistes pour système interne
      const baseViews = Math.floor(Math.random() * 100) + 50; // 50-150 vues
      const views = baseViews + (difficulty === 'Avancé' ? 20 : difficulty === 'Intermédiaire' ? 10 : 0);
      const usage = Math.floor(views * (0.08 + Math.random() * 0.12)); // 8-20% de conversion
      const rating = 3.5 + Math.random() * 1.5; // 3.5 à 5.0

      const model: ModelTemplate = {
        id: `ignitia-${i.toString().padStart(4, '0')}`,
        title: this.generateModelTitle(category, i),
        category,
        subcategory: this.getSubcategoryForCategory(category),
        description: this.generateDescription(category, technologies),
        sector: this.selectRandomSectors(sectors, 1 + Math.floor(Math.random() * 3)),
        tags: this.generateTags(category, technologies),
        difficulty,
        estimatedTime: this.getEstimatedTime(difficulty),
        roi,
        implementation: {
          technologies: this.selectRandomTechnologies(technologies, 2 + Math.floor(Math.random() * 4)),
          prerequisites: this.generatePrerequisites(category),
          steps: this.generateImplementationSteps(category)
        },
        metrics: {
          views: Math.floor(views),
          usage: Math.floor(usage),
          rating: Math.round(rating * 10) / 10
        },
        badges: {
          loi25: Math.random() > 0.3, // 70% de conformité Loi 25
          auditIA: Math.random() > 0.4, // 60% d'audit IA
          explicable: Math.random() > 0.2 // 80% explicable
        },
        marketplaceRef: Math.random() > 0.7 ? {
          url: `https://marketplace.genaisafety.com/model/${i}`,
          id: `gensafety-${i}`,
          status: ['active', 'beta', 'coming_soon'][Math.floor(Math.random() * 3)] as any
        } : undefined,
        governance: {
          transparency: this.generateGovernanceText('transparency'),
          ethics: this.generateGovernanceText('ethics'),
          compliance: this.selectRandomCompliance(complianceStandards)
        },
        cybersecurity: {
          sensitiveData: Math.random() > 0.5,
          measures: this.generateSecurityMeasures(),
          standards: this.selectRandomStandards(['ISO 27001', 'SOC 2', 'NIST', 'FedRAMP'])
        }
      };

      models.push(model);
    }

    this.modelsCache = models;
    this.buildSearchIndex();
    console.log(`✅ ${count} modèles générés avec succès`);
    
    return models;
  }

  // ✅ RECHERCHE OPTIMISÉE AVEC PAGINATION
  async searchModels(
    filters: SearchFilters = {},
    pagination: PaginationOptions = { page: 1, limit: 20 }
  ): Promise<SearchResult> {
    await this.ensureDataLoaded();
    
    let filteredModels = [...this.modelsCache];

    // Filtrage par query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredModels = filteredModels.filter(model =>
        model.title.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query) ||
        model.tags.some(tag => tag.toLowerCase().includes(query)) ||
        model.sector.some(sector => sector.toLowerCase().includes(query))
      );
    }

    // Filtrage par catégorie
    if (filters.category && filters.category !== 'Tous') {
      filteredModels = filteredModels.filter(model => model.category === filters.category);
    }

    // Filtrage par difficulté
    if (filters.difficulty) {
      filteredModels = filteredModels.filter(model => model.difficulty === filters.difficulty);
    }

    // Filtrage par secteur
    if (filters.sector) {
      filteredModels = filteredModels.filter(model => 
        model.sector.some(s => s.toLowerCase().includes(filters.sector!.toLowerCase()))
      );
    }

    // Filtrage par ROI
    if (filters.roi) {
      filteredModels = filteredModels.filter(model => model.roi === filters.roi);
    }

    // Filtrage par badges
    if (filters.badges && filters.badges.length > 0) {
      filteredModels = filteredModels.filter(model => {
        return filters.badges!.some(badge => {
          switch (badge) {
            case 'loi25': return model.badges.loi25;
            case 'auditIA': return model.badges.auditIA;
            case 'explicable': return model.badges.explicable;
            default: return false;
          }
        });
      });
    }

    // Filtrage par rating
    if (filters.rating) {
      filteredModels = filteredModels.filter(model => model.metrics.rating >= filters.rating!);
    }

    // Tri
    if (pagination.sortBy) {
      filteredModels.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (pagination.sortBy) {
          case 'title':
            aValue = a.title;
            bValue = b.title;
            break;
          case 'rating':
            aValue = a.metrics.rating;
            bValue = b.metrics.rating;
            break;
          case 'views':
            aValue = a.metrics.views;
            bValue = b.metrics.views;
            break;
          case 'usage':
            aValue = a.metrics.usage;
            bValue = b.metrics.usage;
            break;
          default:
            aValue = a.title;
            bValue = b.title;
        }

        if (typeof aValue === 'string') {
          return pagination.sortOrder === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        } else {
          return pagination.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
        }
      });
    }

    // Pagination
    const total = filteredModels.length;
    const totalPages = Math.ceil(total / pagination.limit);
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedModels = filteredModels.slice(startIndex, endIndex);

    return {
      models: paginatedModels,
      total,
      page: pagination.page,
      totalPages,
      hasMore: pagination.page < totalPages
    };
  }

  // ✅ STATISTIQUES AVANCÉES
  async getStatistics(): Promise<ModelStats> {
    await this.ensureDataLoaded();
    
    const stats: ModelStats = {
      total: this.modelsCache.length,
      byCategory: {},
      byDifficulty: {},
      bySector: {},
      avgRating: 0,
      totalViews: 0,
      totalUsage: 0,
      badgeStats: {
        loi25Count: 0,
        auditIACount: 0,
        explicableCount: 0
      }
    };

    let totalRating = 0;

    this.modelsCache.forEach(model => {
      // Par catégorie
      stats.byCategory[model.category] = (stats.byCategory[model.category] || 0) + 1;
      
      // Par difficulté
      stats.byDifficulty[model.difficulty] = (stats.byDifficulty[model.difficulty] || 0) + 1;
      
      // Par secteur
      model.sector.forEach(sector => {
        stats.bySector[sector] = (stats.bySector[sector] || 0) + 1;
      });
      
      // Métriques
      stats.totalViews += model.metrics.views;
      stats.totalUsage += model.metrics.usage;
      totalRating += model.metrics.rating;
      
      // Badges
      if (model.badges.loi25) stats.badgeStats.loi25Count++;
      if (model.badges.auditIA) stats.badgeStats.auditIACount++;
      if (model.badges.explicable) stats.badgeStats.explicableCount++;
    });

    stats.avgRating = totalRating / this.modelsCache.length;
    
    return stats;
  }

  // ✅ MÉTHODES UTILITAIRES PRIVÉES
  private async ensureDataLoaded() {
    if (this.modelsCache.length === 0 || Date.now() - this.lastCacheUpdate > this.CACHE_DURATION) {
      await this.loadModelsData();
      this.buildSearchIndex();
      this.lastCacheUpdate = Date.now();
    }
  }

  private async loadModelsData() {
    // Charger les données existantes ou générer si nécessaire
    if (this.modelsCache.length === 0) {
      await this.generateMassiveModels(1000);
    }
  }

  private buildSearchIndex() {
    this.searchIndex.clear();
    
    this.modelsCache.forEach(model => {
      // Index par catégorie
      const category = model.category;
      if (!this.searchIndex.has(category)) {
        this.searchIndex.set(category, []);
      }
      this.searchIndex.get(category)!.push(model);
      
      // Index par tags
      model.tags.forEach(tag => {
        if (!this.searchIndex.has(tag)) {
          this.searchIndex.set(tag, []);
        }
        this.searchIndex.get(tag)!.push(model);
      });
    });
  }

  // Générateurs de contenu
  private generateModelTitle(category: string, index: number): string {
    const titles = {
      'Équipement': [
        'Maintenance prédictive des machines industrielles',
        'Détection automatique des défauts d\'équipement',
        'Surveillance intelligente des outils de sécurité',
        'Optimisation des cycles de maintenance',
        'Monitoring en temps réel des équipements critiques'
      ],
      'Lieux': [
        'Surveillance de la qualité de l\'air par IA',
        'Détection d\'anomalies environnementales',
        'Cartographie des risques par zone',
        'Monitoring acoustique intelligent',
        'Analyse prédictive des conditions de travail'
      ],
      'Opérations': [
        'Optimisation des processus de sécurité',
        'Analyse des flux de travail par IA',
        'Prédiction des incidents opérationnels',
        'Automatisation des procédures d\'urgence',
        'Évaluation continue des risques opérationnels'
      ],
      'Nature humaine': [
        'Détection de fatigue des opérateurs',
        'Analyse comportementale de sécurité',
        'Formation adaptative par IA',
        'Monitoring du stress au travail',
        'Évaluation des compétences en temps réel'
      ]
    };

    const categoryTitles = titles[category] || ['Projet IA-SST avancé'];
    const baseTitle = categoryTitles[index % categoryTitles.length];
    
    return `${baseTitle} #${index.toString().padStart(3, '0')}`;
  }

  private getSubcategoryForCategory(category: string): string {
    const subcategories: Record<string, string[]> = {
      'Équipement': ['Maintenance', 'Surveillance', 'Diagnostic', 'Optimisation'],
      'Lieux': ['Environnement', 'Sécurité périphérique', 'Conditions de travail'],
      'Opérations': ['Processus', 'Workflow', 'Procédures', 'Automation'],
      'Nature humaine': ['Comportement', 'Formation', 'Bien-être', 'Performance']
    };

    const subs = subcategories[category] || ['Général'];
    return subs[Math.floor(Math.random() * subs.length)];
  }

  private generateDescription(category: string, technologies: string[]): string {
    const tech = technologies[Math.floor(Math.random() * technologies.length)];
    return `Solution IA avancée utilisant ${tech} pour améliorer la sécurité et l'efficacité dans le domaine ${category.toLowerCase()}. Système intelligent adapté aux environnements industriels modernes.`;
  }

  private selectRandomSectors(sectors: string[], count: number): string[] {
    const shuffled = [...sectors].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private generateTags(category: string, technologies: string[]): string[] {
    const baseTags = ['IA', 'Sécurité', 'Innovation'];
    const categoryTags: Record<string, string[]> = {
      'Équipement': ['Maintenance', 'Surveillance', 'IoT'],
      'Lieux': ['Environnement', 'Monitoring', 'Capteurs'],
      'Opérations': ['Processus', 'Workflow', 'Automation'],
      'Nature humaine': ['Comportement', 'Formation', 'Bien-être']
    };

    const specificTags = categoryTags[category] || [];
    const tech = technologies.slice(0, 2);
    
    return [...baseTags, ...specificTags, ...tech].slice(0, 6);
  }

  private getEstimatedTime(difficulty: string): string {
    switch (difficulty) {
      case 'Débutant': return `${2 + Math.floor(Math.random() * 2)}-${4 + Math.floor(Math.random() * 2)} mois`;
      case 'Intermédiaire': return `${4 + Math.floor(Math.random() * 3)}-${8 + Math.floor(Math.random() * 3)} mois`;
      case 'Avancé': return `${8 + Math.floor(Math.random() * 4)}-${15 + Math.floor(Math.random() * 5)} mois`;
      default: return '6-12 mois';
    }
  }

  private selectRandomTechnologies(technologies: string[], count: number): string[] {
    const shuffled = [...technologies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private generatePrerequisites(category: string): string[] {
    const common = ['Infrastructure IT existante', 'Support technique qualifié'];
    const specific: Record<string, string[]> = {
      'Équipement': ['Système de maintenance existant', 'Capteurs compatibles'],
      'Lieux': ['Réseau de capteurs', 'Système de monitoring'],
      'Opérations': ['Documentation des processus', 'Formation des équipes'],
      'Nature humaine': ['Consentement des employés', 'Protocoles éthiques']
    };

    return [...common, ...(specific[category] || [])];
  }

  private generateImplementationSteps(category: string): string[] {
    return [
      'Analyse des besoins et évaluation de faisabilité',
      'Conception de l\'architecture système',
      'Développement et tests du prototype',
      'Déploiement pilote et validation',
      'Formation des utilisateurs et mise en production'
    ];
  }

  private generateGovernanceText(type: string): string {
    const texts: Record<string, string> = {
      transparency: 'Algorithmes transparents et auditables avec documentation complète.',
      ethics: 'Respect des principes éthiques et des droits humains fondamentaux.',
    };
    return texts[type] || 'Gouvernance conforme aux standards industriels.';
  }

  private selectRandomCompliance(standards: string[]): string[] {
    const count = 2 + Math.floor(Math.random() * 3);
    const shuffled = [...standards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private generateSecurityMeasures(): string[] {
    const measures = [
      'Chiffrement AES-256',
      'Authentification multi-facteurs',
      'Audit des accès en temps réel',
      'Sauvegarde sécurisée',
      'Contrôle d\'accès basé sur les rôles'
    ];
    return measures.slice(0, 2 + Math.floor(Math.random() * 3));
  }

  private selectRandomStandards(standards: string[]): string[] {
    const count = 1 + Math.floor(Math.random() * 2);
    const shuffled = [...standards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}

// Export singleton
export const modelsService = new ModelsService();
export default modelsService;