// ================================================
// 🎯 IGNITIA WORKFLOW GUIDE - EDGE FUNCTION
// ================================================
// Localisation: supabase/functions/ignitia-workflow-guide/index.ts
// Description: Guidance pour workflow Sand Box Studio (5 étapes)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// ================================================
// 🔧 INTERFACES TYPESCRIPT
// ================================================

interface MaturityLevel {
  level: 1 | 2 | 3 | 4 | 5;
  name: 'Exploration' | 'Expérimentation' | 'Pilotage' | 'Déploiement' | 'Transformation';
  description: string;
}

interface WorkflowStepRequest {
  step: 'diagnostic' | 'cas_usage' | 'priorisation' | 'prototypage' | 'validation';
  currentData: any;
  maturityLevel: MaturityLevel;
  targetOutcome: string;
  workflowMetadata: {
    timestamp: string;
    version: string;
  };
}

// ================================================
// 🎯 CONFIGURATION DES 5 ÉTAPES WORKFLOW
// ================================================

const WORKFLOW_STEPS = {
  diagnostic: {
    name: "🔍 Diagnostic Maturité IA-SST",
    description: "Évaluation complète de la maturité organisationnelle en IA appliquée à la SST",
    objectives: [
      "Évaluer le niveau de maturité IA actuel (1-5)",
      "Identifier les obstacles majeurs",
      "Cartographier les ressources disponibles",
      "Définir les ambitions et contraintes"
    ],
    deliverables: [
      "Rapport de maturité IA-SST",
      "Cartographie des obstacles",
      "Analyse des capacités existantes",
      "Roadmap de progression recommandée"
    ],
    tools: ["AI Adoption Analyst", "Évaluation 360°", "SWOT IA-SST"],
    duration: "2-3 semaines"
  },
  
  cas_usage: {
    name: "💡 Identification Cas d'Usage",
    description: "Génération et qualification des cas d'usage IA prioritaires pour la SST",
    objectives: [
      "Identifier 10-20 cas d'usage IA-SST potentiels",
      "Évaluer la faisabilité technique et métier",
      "Estimer l'impact et le ROI potentiel",
      "Aligner avec les priorités stratégiques"
    ],
    deliverables: [
      "Catalogue des cas d'usage IA-SST",
      "Fiches détaillées par cas d'usage",
      "Analyse impact vs effort",
      "Recommandations de priorisation"
    ],
    tools: ["Building Agent Personas", "Design Thinking", "Impact Mapping"],
    duration: "3-4 semaines"
  },

  priorisation: {
    name: "📊 Priorisation & Planification",
    description: "Sélection et planification des cas d'usage à développer en priorité",
    objectives: [
      "Prioriser les cas d'usage selon 7 critères IGNITIA",
      "Construire une roadmap de déploiement",
      "Allouer les ressources nécessaires",
      "Définir les KPIs de succès"
    ],
    deliverables: [
      "Matrice de priorisation multicritères",
      "Roadmap de déploiement 12-24 mois",
      "Plan d'allocation des ressources",
      "Tableau de bord KPIs"
    ],
    tools: ["Scoring Matrices", "Portfolio Management", "Resource Planning"],
    duration: "1-2 semaines"
  },

  prototypage: {
    name: "🛠️ Prototypage Sécurisé",
    description: "Développement de prototypes fonctionnels dans un environnement contrôlé",
    objectives: [
      "Développer des prototypes MVP",
      "Valider la faisabilité technique",
      "Tester avec les utilisateurs finaux",
      "Mesurer les performances initiales"
    ],
    deliverables: [
      "Prototypes fonctionnels",
      "Rapports de tests utilisateurs",
      "Métriques de performance",
      "Plan d'amélioration continue"
    ],
    tools: ["GenAISafety POC", "Sandbox Environment", "User Testing"],
    duration: "4-6 semaines"
  },

  validation: {
    name: "✅ Validation & Conformité",
    description: "Validation complète : technique, éthique, réglementaire et métier",
    objectives: [
      "Auditer la conformité réglementaire",
      "Valider l'éthique et la transparence",
      "Mesurer l'impact métier réel",
      "Préparer le déploiement production"
    ],
    deliverables: [
      "Certificat de conformité",
      "Rapport d'audit éthique",
      "Business case validé",
      "Plan de déploiement production"
    ],
    tools: ["AI Ethics Guard", "Compliance Checker", "Impact Assessment"],
    duration: "2-3 semaines"
  }
};

// ================================================
// 🧠 GUIDES SPÉCIALISÉS PAR NIVEAU DE MATURITÉ
// ================================================

const MATURITY_GUIDANCE = {
  1: { // Exploration
    focus: "Sensibilisation et découverte",
    approach: "Pédagogique et progressive",
    recommendations: [
      "Commencer par des cas d'usage simples et visibles",
      "Investir massivement dans la formation et la sensibilisation",
      "Choisir 1-2 cas d'usage pilotes à faible risque",
      "Créer une équipe dédiée avec des ambassadeurs IA"
    ]
  },
  2: { // Expérimentation
    focus: "Tests et apprentissage",
    approach: "Itérative et expérimentale",
    recommendations: [
      "Multiplier les POCs pour apprendre rapidement",
      "Mettre en place une gouvernance légère mais structurée",
      "Développer les compétences internes progressivement",
      "Capitaliser sur les succès pour créer l'adhésion"
    ]
  },
  3: { // Pilotage
    focus: "Optimisation et montée en échelle",
    approach: "Méthodique et performance-orientée",
    recommendations: [
      "Industrialiser les processus de développement IA",
      "Mettre en place une gouvernance robuste",
      "Optimiser les cas d'usage existants avant d'en créer de nouveaux",
      "Développer des centres d'excellence IA-SST"
    ]
  },
  4: { // Déploiement
    focus: "Intégration systémique",
    approach: "Stratégique et systémique",
    recommendations: [
      "Intégrer l'IA dans tous les processus SST critiques",
      "Développer une plateforme IA unifiée",
      "Former tous les collaborateurs aux outils IA",
      "Créer un écosystème d'innovation continue"
    ]
  },
  5: { // Transformation
    focus: "Innovation et leadership",
    approach: "Visionnaire et disruptive",
    recommendations: [
      "Développer des solutions IA propriétaires innovantes",
      "Partager l'expertise et devenir référent du secteur",
      "Investir dans la R&D IA-SST de pointe",
      "Transformer le modèle d'affaires grâce à l'IA"
    ]
  }
};

// ================================================
// 🎯 MOTEUR DE GUIDANCE WORKFLOW
// ================================================

function generateWorkflowGuidance(request: WorkflowStepRequest): string {
  const { step, currentData, maturityLevel, targetOutcome } = request;
  
  const stepConfig = WORKFLOW_STEPS[step];
  const maturityConfig = MATURITY_GUIDANCE[maturityLevel.level];
  
  let guidance = `# ${stepConfig.name}\n\n`;
  
  // Description et contexte
  guidance += `## 📋 Description\n${stepConfig.description}\n\n`;
  
  // Adaptation selon le niveau de maturité
  guidance += `## 🎯 Adaptation Niveau ${maturityLevel.level} (${maturityLevel.name})\n`;
  guidance += `**Focus:** ${maturityConfig.focus}\n`;
  guidance += `**Approche:** ${maturityConfig.approach}\n\n`;
  
  // Objectifs spécifiques
  guidance += `## 🎯 Objectifs Spécifiques\n`;
  stepConfig.objectives.forEach((obj, index) => {
    guidance += `${index + 1}. ${obj}\n`;
  });
  guidance += `\n`;
  
  // Recommandations par niveau de maturité
  guidance += `## 💡 Recommandations Niveau ${maturityLevel.level}\n`;
  maturityConfig.recommendations.forEach((rec, index) => {
    guidance += `${index + 1}. ${rec}\n`;
  });
  guidance += `\n`;
  
  // Livrables attendus
  guidance += `## 📦 Livrables Attendus\n`;
  stepConfig.deliverables.forEach((deliverable, index) => {
    guidance += `- ${deliverable}\n`;
  });
  guidance += `\n`;
  
  // Outils recommandés
  guidance += `## 🛠️ Outils Recommandés\n`;
  stepConfig.tools.forEach((tool, index) => {
    guidance += `- ${tool}\n`;
  });
  guidance += `\n`;
  
  // Durée estimée
  guidance += `## ⏱️ Durée Estimée\n${stepConfig.duration}\n\n`;
  
  // Objectif cible
  if (targetOutcome) {
    guidance += `## 🎯 Objectif Cible\n${targetOutcome}\n\n`;
  }
  
  // Données actuelles (si disponibles)
  if (currentData && Object.keys(currentData).length > 0) {
    guidance += `## 📊 Données Actuelles\n`;
    guidance += `Données disponibles: ${Object.keys(currentData).join(', ')}\n\n`;
  }
  
  // Étapes suivantes
  const nextSteps = getNextSteps(step);
  if (nextSteps.length > 0) {
    guidance += `## ➡️ Étapes Suivantes\n`;
    nextSteps.forEach((nextStep, index) => {
      guidance += `${index + 1}. ${nextStep}\n`;
    });
  }
  
  return guidance;
}

function getNextSteps(currentStep: string): string[] {
  const stepOrder = ['diagnostic', 'cas_usage', 'priorisation', 'prototypage', 'validation'];
  const currentIndex = stepOrder.indexOf(currentStep);
  
  if (currentIndex === -1 || currentIndex === stepOrder.length - 1) {
    return ["🎉 Workflow terminé ! Prêt pour le déploiement production."];
  }
  
  const nextStep = stepOrder[currentIndex + 1];
  const nextStepConfig = WORKFLOW_STEPS[nextStep];
  
  return [
    `Passer à l'étape suivante: ${nextStepConfig.name}`,
    `Préparer les livrables de l'étape actuelle`,
    `Planifier les ressources pour l'étape suivante`,
    `Valider les prérequis avant de continuer`
  ];
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
    const request: WorkflowStepRequest = await req.json()
    console.log('🎯 IGNITIA Workflow Guide Request:', request.step, 'Level:', request.maturityLevel.level)

    // Generate workflow guidance
    const guidance = generateWorkflowGuidance(request)
    console.log('📝 Workflow Guidance Generated for step:', request.step)

    console.log('✅ IGNITIA Workflow Guide Success')

    return new Response(
      JSON.stringify({ 
        result: guidance,
        metadata: {
          step: request.step,
          maturityLevel: request.maturityLevel.level,
          targetOutcome: request.targetOutcome,
          timestamp: new Date().toISOString(),
          workflowVersion: request.workflowMetadata.version
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('❌ IGNITIA Workflow Guide Error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: 'ignitia_workflow_guide_error',
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})