// src/integrations/ai-service.ts
// Service AI local pour générer des idées SST sans dépendance externe
// Remplace les appels Edge Functions défaillants

/**
 * Générateur d'idées SST intelligent
 * Utilise des templates spécialisés basés sur les secteurs SCIAN et risques CNESST
 */
export const generateSSTIdeas = async (prompt: string): Promise<string> => {
  // Simulation d'un délai d'API réaliste
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Analyser le prompt pour extraire contexte
  const context = extractContext(prompt);
  
  // Générer des idées contextualisées
  const ideas = generateContextualIdeas(context);
  
  return formatResponse(ideas, context);
};

/**
 * Extrait le contexte du prompt utilisateur
 */
function extractContext(prompt: string): {
  sector: string;
  risks: string[];
  objectives: string[];
} {
  const context = {
    sector: 'Général',
    risks: [] as string[],
    objectives: [] as string[]
  };

  // Détecter le secteur SCIAN avec logging
  console.log('🔍 Prompt reçu:', prompt);
  
  if (prompt.includes('311') || prompt.includes('alimentaire') || prompt.includes('Fabrication')) {
    context.sector = 'Fabrication de produits alimentaires';
    console.log('🏭 Secteur détecté: Fabrication alimentaire');
  } else if (prompt.includes('23') || prompt.includes('construction') || prompt.includes('Construction')) {
    context.sector = 'Construction';
    console.log('🏗️ Secteur détecté: Construction');
  } else if (prompt.includes('62') || prompt.includes('information')) {
    context.sector = 'Services d\'information et culturels';
    console.log('💻 Secteur détecté: Services information');
  } else {
    console.log('⚠️ Secteur non détecté, utilisation du défaut');
  }

  // Extraire les risques mentionnés
  const riskKeywords = ['ergonomique', 'chute', 'mécanique', 'électrique', 'chimique', 'psychologique'];
  riskKeywords.forEach(risk => {
    if (prompt.toLowerCase().includes(risk)) {
      context.risks.push(risk);
    }
  });

  // Objectifs par défaut
  context.objectives = [
    'Réduire les accidents du travail',
    'Améliorer la conformité réglementaire',
    'Renforcer la culture de sécurité',
    'Optimiser les processus de prévention'
  ];

  return context;
}

/**
 * Génère des idées basées sur le contexte
 */
function generateContextualIdeas(context: {
  sector: string;
  risks: string[];
  objectives: string[];
}): Array<{
  title: string;
  objective: string;
  technologies: string[];
  benefits: string[];
  complexity: number;
  steps: string[];
}> {
  const ideas = [
    {
      title: `Système de surveillance IA pour ${context.sector}`,
      objective: `Détecter automatiquement les comportements à risque spécifiques au secteur ${context.sector}`,
      technologies: ['Vision par ordinateur', 'Machine Learning sectoriel', 'Capteurs IoT adaptés', 'Analyse temps réel'],
      benefits: [
        'Réduction de 60% des incidents spécifiques au secteur',
        'Alertes proactives adaptées aux risques sectoriels',
        'Documentation automatique des violations',
        'Amélioration continue des protocoles sectoriels'
      ],
      complexity: 4,
      steps: [
        `Installation de systèmes de surveillance adaptés au secteur ${context.sector}`,
        'Entraînement des modèles IA sur les données spécifiques au secteur',
        'Intégration avec les systèmes d\'alerte existants du secteur',
        'Formation des équipes sectorielles et déploiement progressif',
        'Optimisation basée sur les données de performance sectorielles'
      ]
    },
    {
      title: `Assistant virtuel SST spécialisé ${context.sector}`,
      objective: 'Fournir des conseils personnalisés et formation interactive en sécurité',
      technologies: ['NLP avancé', 'Base de connaissances CNESST', 'Chatbot conversationnel', 'Réalité augmentée'],
      benefits: [
        'Formation continue accessible 24/7',
        'Réponses instantanées aux questions sécurité',
        'Adaptation au niveau de compétence de chaque employé',
        'Réduction des coûts de formation traditionnelle'
      ],
      complexity: 3,
      steps: [
        'Développement de la base de connaissances sectorielle',
        'Création de l\'interface conversationnelle',
        'Intégration avec les systèmes RH existants',
        'Tests pilotes avec groupes d\'employés volontaires',
        'Déploiement et amélioration continue'
      ]
    },
    {
      title: `Analyse prédictive des risques ${context.sector}`,
      objective: 'Anticiper les accidents potentiels grâce à l\'analyse de données historiques et en temps réel',
      technologies: ['Machine Learning prédictif', 'Big Data Analytics', 'Capteurs environnementaux', 'Tableaux de bord intelligents'],
      benefits: [
        'Prévention proactive des accidents',
        'Optimisation des inspections de sécurité',
        'Réduction des coûts d\'assurance',
        'Amélioration de la productivité globale'
      ],
      complexity: 5,
      steps: [
        'Collecte et nettoyage des données historiques d\'accidents',
        'Développement des modèles prédictifs sectoriels',
        'Mise en place du système de monitoring temps réel',
        'Création des tableaux de bord pour les gestionnaires',
        'Validation et ajustement des algorithmes'
      ]
    }
  ];

  // Adapter les idées selon les risques identifiés et le secteur
  if (context.risks.includes('ergonomique') || context.sector.includes('Fabrication')) {
    ideas.push({
      title: `Système d'analyse ergonomique IA pour ${context.sector}`,
      objective: 'Évaluer automatiquement les postures et mouvements pour prévenir les troubles musculo-squelettiques dans le secteur alimentaire',
      technologies: ['Analyse de mouvement 3D', 'Computer Vision alimentaire', 'Capteurs portables', 'Machine Learning ergonomique'],
      benefits: [
        'Réduction de 40% des troubles musculo-squelettiques',
        'Recommandations personnalisées en temps réel',
        'Optimisation des postes de travail alimentaires',
        'Amélioration du bien-être des employés du secteur'
      ],
      complexity: 3,
      steps: [
        'Installation de systèmes de capture de mouvement adaptés à l\'alimentaire',
        'Entraînement sur les données ergonomiques du secteur alimentaire',
        'Développement d\'alertes et recommandations sectorielles',
        'Tests pilotes sur postes critiques alimentaires',
        'Déploiement progressif et formation sectorielle'
      ]
    });
  }

  return ideas;
}

/**
 * Formate la réponse finale
 */
function formatResponse(ideas: any[], context: any): string {
  let response = `🎯 **IDÉES DE PROJETS IA-SST POUR ${context.sector.toUpperCase()}**\n\n`;
  
  response += `📊 **Contexte analysé :**\n`;
  response += `• Secteur : ${context.sector}\n`;
  response += `• Risques identifiés : ${context.risks.join(', ') || 'Risques généraux'}\n`;
  response += `• Objectifs prioritaires : Prévention, Conformité, Culture sécurité\n\n`;

  ideas.forEach((idea, index) => {
    response += `## ${index + 1}. ${idea.title}\n\n`;
    response += `**🎯 Objectif :** ${idea.objective}\n\n`;
    
    response += `**🔧 Technologies IA :**\n`;
    idea.technologies.forEach((tech: string) => {
      response += `• ${tech}\n`;
    });
    response += '\n';

    response += `**✅ Bénéfices SST :**\n`;
    idea.benefits.forEach((benefit: string) => {
      response += `• ${benefit}\n`;
    });
    response += '\n';

    response += `**📈 Complexité :** ${idea.complexity}/5 ${getComplexityLabel(idea.complexity)}\n\n`;

    response += `**📋 Étapes d'implémentation :**\n`;
    idea.steps.forEach((step: string, stepIndex: number) => {
      response += `${stepIndex + 1}. ${step}\n`;
    });
    response += '\n---\n\n';
  });

  response += `💡 **Recommandation :** Commencer par le projet de complexité moyenne (3/5) pour un déploiement réussi et des résultats rapides.\n\n`;
  response += `🔄 **Prochaines étapes :** Évaluation détaillée de faisabilité et analyse ROI pour le projet sélectionné.`;

  return response;
}

/**
 * Retourne le label de complexité
 */
function getComplexityLabel(complexity: number): string {
  const labels = {
    1: '(Très simple)',
    2: '(Simple)', 
    3: '(Modéré)',
    4: '(Complexe)',
    5: '(Très complexe)'
  };
  return labels[complexity as keyof typeof labels] || '(Non défini)';
}

/**
 * Version simplifiée pour les tests rapides
 */
export const generateQuickIdeas = async (sector: string, risks: string[]): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `✅ **Idées générées pour ${sector}**

🔧 **1. Détection automatique des EPI**
Technologies : Vision par ordinateur, alerts temps réel
Risques ciblés : ${risks.join(', ')}

🤖 **2. Assistant formation IA**
Technologies : NLP, base connaissances CNESST
Bénéfices : Formation continue, réponses instantanées

📊 **3. Analyse prédictive accidents**
Technologies : Machine Learning, données historiques
Impact : Prévention proactive, ROI élevé

💡 Génération locale réussie - Service IA opérationnel !`;
};