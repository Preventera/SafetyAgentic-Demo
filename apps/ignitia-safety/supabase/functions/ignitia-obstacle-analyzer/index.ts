// ================================================
// 🚧 IGNITIA OBSTACLE ANALYZER - EDGE FUNCTION
// ================================================
// Localisation: supabase/functions/ignitia-obstacle-analyzer/index.ts  
// Description: Analyse d'obstacles avec 100 prompts contextuels spécialisés

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// ================================================
// 🔧 INTERFACES TYPESCRIPT
// ================================================

interface ObstacleContext {
  obstacle: 'donnees' | 'culture' | 'gouvernance' | 'technologie' | 'competences' | 'ethique';
  severity: 'faible' | 'moyen' | 'eleve';
  sector: string;
  specificContext?: string;
}

interface ObstacleAnalysisRequest {
  obstacles: ObstacleContext[];
  sector: string;
  analysisType: 'obstacle_deep_analysis';
  includePrompts: boolean;
}

// ================================================
// 🧠 BASE DE PROMPTS - 100 PROMPTS CONTEXTUELS
// ================================================

const OBSTACLE_PROMPTS_DATABASE = {
  donnees: {
    diagnostic: [
      "Évaluez la qualité des données SST disponibles : complétude, exactitude, fraîcheur, cohérence",
      "Analysez l'architecture de données actuelle : stockage, formats, accessibilité, interopérabilité", 
      "Identifiez les sources de données SST : systèmes RH, capteurs, rapports, incidents, formations",
      "Cartographiez les flux de données SST : collecte, traitement, validation, diffusion",
      "Auditez la gouvernance des données : propriété, responsabilités, processus, contrôles"
    ],
    solutions: [
      "Concevez une stratégie de qualité des données avec indicateurs, processus de contrôle et correction automatisée",
      "Proposez une architecture data moderne : data lake, ETL/ELT, API, temps réel, cloud-native",
      "Développez un référentiel de données SST unifié avec taxonomie, métadonnées et catalogue centralisé",
      "Implémentez des processus d'intégration de données : APIs, connecteurs, synchronisation temps réel",
      "Créez des pipelines de validation automatisée : règles métier, détection d'anomalies, alertes qualité"
    ],
    implementation: [
      "Sélectionnez les technologies de gestion de données adaptées au contexte SST de votre secteur",
      "Planifiez la migration des données legacy vers la nouvelle architecture en minimisant les risques",
      "Formez les équipes aux nouveaux outils de données et établissez des processus de gouvernance",
      "Mettez en place des indicateurs de performance des données : SLA, KPIs qualité, tableaux de bord",
      "Développez une stratégie de sauvegarde et de récupération des données critiques SST"
    ]
  },

  culture: {
    diagnostic: [
      "Évaluez le niveau d'acceptation de l'IA par les équipes SST : enquêtes, interviews, observations",
      "Analysez les résistances au changement : peurs, méconnaissance, habitudes, enjeux politiques",
      "Cartographiez les influenceurs et ambassadeurs potentiels dans l'organisation",
      "Identifiez les barrières culturelles spécifiques au secteur et à la culture d'entreprise",
      "Mesurez la maturité digitale générale des collaborateurs SST"
    ],
    solutions: [
      "Concevez un programme de conduite du changement spécialisé IA-SST avec phases progressives",
      "Développez une stratégie de communication positive : success stories, bénéfices concrets, témoignages",
      "Créez un réseau d'ambassadeurs IA-SST avec formation, outils et reconnaissance",
      "Implémentez des formations ludiques et pratiques : ateliers, simulations, learning by doing",
      "Établissez des mécanismes de feedback et d'amélioration continue basés sur l'écoute des utilisateurs"
    ],
    implementation: [
      "Lancez des projets pilotes visibles avec des gains rapides pour créer l'adhésion",
      "Organisez des sessions de démystification de l'IA avec exemples concrets SST",
      "Mettez en place un accompagnement personnalisé pour les utilisateurs réticents",
      "Créez des communautés de pratique IA-SST pour favoriser l'apprentissage entre pairs",
      "Intégrez l'IA dans les processus RH : recrutement, évaluation, développement de carrière"
    ]
  },

  gouvernance: {
    diagnostic: [
      "Auditez le cadre de gouvernance existant : comités, processus, politiques, responsabilités",
      "Évaluez la conformité réglementaire actuelle : RGPD, lois sectorielles, normes ISO",
      "Analysez les processus de prise de décision et de validation des projets technologiques",
      "Identifiez les risques juridiques et éthiques liés au déploiement de l'IA en SST",
      "Cartographiez les parties prenantes internes et externes impactées par l'IA-SST"
    ],
    solutions: [
      "Concevez un cadre de gouvernance IA multi-niveaux : stratégique, opérationnel, technique",
      "Développez des politiques IA spécifiques : éthique, transparence, explicabilité, responsabilité",
      "Créez des processus d'approbation et de validation des algorithmes SST",
      "Implémentez des mécanismes de contrôle et d'audit continu des systèmes IA",
      "Établissez des protocoles de gestion des incidents et des biais algorithmiques"
    ],
    implementation: [
      "Formez un comité de gouvernance IA-SST avec représentants métier, IT, juridique, éthique",
      "Déployez des outils de monitoring et de logging pour assurer la traçabilité des décisions IA",
      "Mettez en place des revues périodiques des performances et de la conformité des systèmes IA",
      "Créez des procédures de documentation complète : algorithmes, données, décisions, impacts",
      "Développez des métriques de gouvernance : indicateurs de conformité, audit scores, KPIs éthiques"
    ]
  },

  technologie: {
    diagnostic: [
      "Auditez l'infrastructure IT existante : serveurs, réseau, stockage, sécurité, performance",
      "Évaluez les capacités de calcul pour l'IA : CPU, GPU, mémoire, bande passante",
      "Analysez l'architecture applicative : systèmes legacy, APIs, microservices, intégrations",
      "Identifiez les contraintes techniques : latence, disponibilité, scalabilité, maintenance",
      "Cartographiez l'écosystème technologique : fournisseurs, outils, plateformes, standards"
    ],
    solutions: [
      "Concevez une architecture IA-SST moderne : cloud-native, conteneurisée, API-first",
      "Sélectionnez des technologies adaptées : frameworks ML, plateformes MLOps, outils de développement",
      "Développez une stratégie cloud hybride optimisant coûts, performance et sécurité",
      "Implémentez des pratiques DevOps/MLOps pour l'industrialisation des modèles IA",
      "Créez des standards techniques : coding guidelines, architecture patterns, bonnes pratiques"
    ],
    implementation: [
      "Déployez une plateforme MLOps complète : développement, test, déploiement, monitoring",
      "Migrez progressivement vers une architecture microservices pour l'agilité et la scalabilité",
      "Implémentez des solutions de monitoring avancé : performance, usage, alertes, dashboards",
      "Formez les équipes techniques aux nouvelles technologies et méthodologies IA",
      "Établissez des partenariats technologiques stratégiques avec des fournisseurs spécialisés IA-SST"
    ]
  },

  competences: {
    diagnostic: [
      "Évaluez les compétences IA actuelles : data science, ML engineering, IA métier",
      "Analysez les besoins en compétences par rôle : utilisateurs finaux, développeurs, gestionnaires",
      "Identifiez les gaps de compétences critiques pour le succès des projets IA-SST",
      "Cartographiez les ressources de formation disponibles : interne, externe, certifications",
      "Mesurez la capacité d'apprentissage et d'adaptation de l'organisation"
    ],
    solutions: [
      "Concevez un plan de développement des compétences IA multi-niveaux et progressif",
      "Créez des parcours de formation personnalisés par profil : technique, métier, management",
      "Développez un programme de certification IA-SST interne avec niveaux et badges",
      "Implémentez des méthodes de formation innovantes : VR, gamification, peer learning",
      "Établissez des partenariats avec universités et organismes de formation spécialisés"
    ],
    implementation: [
      "Lancez une académie IA-SST interne avec cursus complets et ressources dédiées",
      "Organisez des hackathons et challenges IA pour stimuler l'innovation et l'apprentissage",
      "Mettez en place du mentoring et coaching par des experts IA internes ou externes",
      "Créez des communautés de pratique pour favoriser le partage de connaissances",
      "Intégrez le développement des compétences IA dans les plans de carrière individuels"
    ]
  },

  ethique: {
    diagnostic: [
      "Auditez les enjeux éthiques actuels : biais, transparence, équité, responsabilité",
      "Évaluez l'impact potentiel de l'IA sur les collaborateurs : emploi, autonomie, surveillance",
      "Analysez les risques de discrimination et d'inéquité dans les processus SST",
      "Identifiez les exigences de transparence et d'explicabilité par cas d'usage",
      "Cartographiez les attentes des parties prenantes en matière d'IA responsable"
    ],
    solutions: [
      "Développez une charte éthique IA-SST avec principes clairs et opérationnels",
      "Implémentez des mécanismes de détection et de correction des biais algorithmiques",
      "Créez des processus d'évaluation d'impact éthique pour chaque projet IA",
      "Établissez des standards de transparence et d'explicabilité adaptés aux usages SST",
      "Développez des formations à l'éthique IA pour tous les acteurs concernés"
    ],
    implementation: [
      "Créez un comité d'éthique IA-SST avec diversité de profils et d'expertises",
      "Déployez des outils d'audit algorithmique automatisé pour détecter les biais",
      "Implémentez des mécanismes de recours et de contestation des décisions IA",
      "Organisez des consultations régulières avec les parties prenantes sur l'éthique IA",
      "Publiez des rapports de transparence sur l'usage de l'IA et ses impacts"
    ]
  }
};

// ================================================
// 🎯 MOTEUR D'ANALYSE D'OBSTACLES
// ================================================

function analyzeObstacles(request: ObstacleAnalysisRequest): string {
  const { obstacles, sector, includePrompts } = request;
  
  let analysis = `# 🚧 Analyse Approfondie des Obstacles IA-SST\n\n`;
  analysis += `**Secteur:** ${sector}\n`;
  analysis += `**Nombre d'obstacles:** ${obstacles.length}\n`;
  analysis += `**Date d'analyse:** ${new Date().toLocaleDateString('fr-FR')}\n\n`;
  
  // Résumé exécutif
  analysis += `## 📊 Résumé Exécutif\n`;
  const severityCounts = obstacles.reduce((acc, obs) => {
    acc[obs.severity] = (acc[obs.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  analysis += `**Distribution par gravité:**\n`;
  Object.entries(severityCounts).forEach(([severity, count]) => {
    const icon = severity === 'eleve' ? '🔴' : severity === 'moyen' ? '🟡' : '🟢';
    analysis += `- ${icon} ${severity.charAt(0).toUpperCase() + severity.slice(1)}: ${count} obstacle(s)\n`;
  });
  analysis += `\n`;
  
  // Analyse détaillée par obstacle
  obstacles.forEach((obstacle, index) => {
    const obstaclePrompts = OBSTACLE_PROMPTS_DATABASE[obstacle.obstacle];
    const severityIcon = obstacle.severity === 'eleve' ? '🔴' : obstacle.severity === 'moyen' ? '🟡' : '🟢';
    
    analysis += `## ${index + 1}. ${severityIcon} Obstacle: ${obstacle.obstacle.toUpperCase()}\n`;
    analysis += `**Gravité:** ${obstacle.severity}\n`;
    if (obstacle.specificContext) {
      analysis += `**Contexte spécifique:** ${obstacle.specificContext}\n`;
    }
    analysis += `\n`;
    
    // Phase diagnostic
    analysis += `### 🔍 Phase Diagnostic\n`;
    obstaclePrompts.diagnostic.forEach((prompt, idx) => {
      analysis += `${idx + 1}. ${prompt}\n`;
    });
    analysis += `\n`;
    
    // Solutions recommandées
    analysis += `### 💡 Solutions Recommandées\n`;
    obstaclePrompts.solutions.forEach((solution, idx) => {
      analysis += `${idx + 1}. ${solution}\n`;
    });
    analysis += `\n`;
    
    // Plan d'implémentation
    analysis += `### 🚀 Plan d'Implémentation\n`;
    obstaclePrompts.implementation.forEach((impl, idx) => {
      analysis += `${idx + 1}. ${impl}\n`;
    });
    analysis += `\n`;
    
    // Métriques de succès
    analysis += `### 📈 Métriques de Succès\n`;
    const metrics = generateSuccessMetrics(obstacle.obstacle, obstacle.severity);
    metrics.forEach((metric, idx) => {
      analysis += `${idx + 1}. ${metric}\n`;
    });
    analysis += `\n---\n\n`;
  });
  
  // Plan d'action global
  analysis += `## 🎯 Plan d'Action Global\n`;
  analysis += generateGlobalActionPlan(obstacles, sector);
  
  // Prompts contextuels (si demandés)
  if (includePrompts) {
    analysis += `\n## 🧠 Prompts Contextuels Recommandés\n`;
    obstacles.forEach((obstacle, index) => {
      analysis += `### ${obstacle.obstacle.toUpperCase()} - Prompts Spécialisés\n`;
      const allPrompts = [
        ...OBSTACLE_PROMPTS_DATABASE[obstacle.obstacle].diagnostic,
        ...OBSTACLE_PROMPTS_DATABASE[obstacle.obstacle].solutions,
        ...OBSTACLE_PROMPTS_DATABASE[obstacle.obstacle].implementation
      ];
      
      // Sélectionner les 5 prompts les plus pertinents selon la gravité
      const selectedPrompts = selectRelevantPrompts(allPrompts, obstacle.severity);
      selectedPrompts.forEach((prompt, idx) => {
        analysis += `${idx + 1}. ${prompt}\n`;
      });
      analysis += `\n`;
    });
  }
  
  return analysis;
}

function generateSuccessMetrics(obstacle: string, severity: string): string[] {
  const baseMetrics = {
    donnees: [
      "Taux de qualité des données SST > 95%",
      "Temps de mise à disposition des données < 24h",
      "Nombre d'erreurs de données < 1%"
    ],
    culture: [
      "Taux d'adoption des outils IA > 80%",
      "Score de satisfaction utilisateurs > 4/5",
      "Nombre de résistances actives < 5%"
    ],
    gouvernance: [
      "Score de conformité réglementaire > 95%",
      "Délai de validation des projets IA < 2 semaines",
      "Nombre d'incidents de gouvernance = 0"
    ],
    technologie: [
      "Disponibilité des systèmes IA > 99.5%",
      "Performance des modèles conforme aux SLA",
      "Temps de déploiement < 1 semaine"
    ],
    competences: [
      "Score de compétences IA moyen > 7/10",
      "Taux de formation complétée > 90%",
      "Nombre de certifications obtenues"
    ],
    ethique: [
      "Score d'audit éthique > 8/10",
      "Nombre de biais détectés et corrigés",
      "Transparence des décisions IA = 100%"
    ]
  };
  
  return baseMetrics[obstacle] || ["Métriques spécifiques à définir"];
}

function selectRelevantPrompts(prompts: string[], severity: string): string[] {
  // Sélectionner 5 prompts selon la gravité
  const count = severity === 'eleve' ? 7 : severity === 'moyen' ? 5 : 3;
  return prompts.slice(0, count);
}

function generateGlobalActionPlan(obstacles: ObstacleContext[], sector: string): string {
  let plan = `### 🎯 Priorisation des Actions\n\n`;
  
  // Trier par gravité
  const sortedObstacles = obstacles.sort((a, b) => {
    const severityOrder = { 'eleve': 3, 'moyen': 2, 'faible': 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
  
  plan += `**Phase 1 (0-3 mois) - Obstacles critiques:**\n`;
  sortedObstacles.filter(obs => obs.severity === 'eleve').forEach((obs, idx) => {
    plan += `${idx + 1}. Traiter l'obstacle ${obs.obstacle} (gravité élevée)\n`;
  });
  
  plan += `\n**Phase 2 (3-6 mois) - Obstacles modérés:**\n`;
  sortedObstacles.filter(obs => obs.severity === 'moyen').forEach((obs, idx) => {
    plan += `${idx + 1}. Traiter l'obstacle ${obs.obstacle} (gravité moyenne)\n`;
  });
  
  plan += `\n**Phase 3 (6-12 mois) - Obstacles mineurs:**\n`;
  sortedObstacles.filter(obs => obs.severity === 'faible').forEach((obs, idx) => {
    plan += `${idx + 1}. Traiter l'obstacle ${obs.obstacle} (gravité faible)\n`;
  });
  
  plan += `\n### 💰 Budget Estimé\n`;
  plan += `- Obstacles élevés: 60% du budget total\n`;
  plan += `- Obstacles moyens: 30% du budget total\n`;
  plan += `- Obstacles faibles: 10% du budget total\n\n`;
  
  plan += `### 👥 Ressources Requises\n`;
  plan += `- Chef de projet IA-SST (1 ETP)\n`;
  plan += `- Experts techniques spécialisés (2-3 ETP)\n`;
  plan += `- Champions métier par obstacle (0.2 ETP chacun)\n`;
  plan += `- Support externe si nécessaire\n\n`;
  
  return plan;
}

// ================================================
// 🚀 FONCTION PRINCIPALE
// ================================================

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request
    const request: ObstacleAnalysisRequest = await req.json()
    console.log('🚧 IGNITIA Obstacle Analyzer Request:', request.obstacles.length, 'obstacles')

    // Generate obstacle analysis
    const analysis = analyzeObstacles(request)
    console.log('📝 Obstacle Analysis Generated for', request.obstacles.length, 'obstacles')

    console.log('✅ IGNITIA Obstacle Analyzer Success')

    return new Response(
      JSON.stringify({ 
        result: analysis,
        metadata: {
          obstaclesCount: request.obstacles.length,
          sector: request.sector,
          analysisType: request.analysisType,
          includePrompts: request.includePrompts,
          timestamp: new Date().toISOString(),
          promptsDatabase: Object.keys(OBSTACLE_PROMPTS_DATABASE).length
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('❌ IGNITIA Obstacle Analyzer Error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: 'ignitia_obstacle_analyzer_error',
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})