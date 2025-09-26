// ================================================
// 🧠 IGNITIA CONTEXTUAL AI - EDGE FUNCTION
// ================================================
// Localisation: supabase/functions/ignitia-contextual-ai/index.ts
// Description: Génération IA avec contexte de maturité et obstacles

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ================================================
// 🔧 INTERFACES TYPESCRIPT
// ================================================

interface MaturityLevel {
  level: 1 | 2 | 3 | 4 | 5;
  name: 'Exploration' | 'Expérimentation' | 'Pilotage' | 'Déploiement' | 'Transformation';
  description: string;
}

interface ObstacleContext {
  obstacle: 'donnees' | 'culture' | 'gouvernance' | 'technologie' | 'competences' | 'ethique';
  severity: 'faible' | 'moyen' | 'eleve';
  sector: string;
  specificContext?: string;
}

interface EnhancedAIRequest {
  type: 'maturity_assessment' | 'obstacle_analysis' | 'contextual_recommendations' | 'workflow_guidance';
  prompt: string;
  enrichedContext: {
    maturity: string;
    obstacles: string;
    sector: string;
    originalContext: string;
  };
  maturityLevel?: MaturityLevel;
  obstacles?: ObstacleContext[];
  sector?: string;
  context?: string;
}

// ================================================
// 🎯 PROMPTS CONTEXTUELS PAR MATURITÉ
// ================================================

const MATURITY_PROMPTS = {
  1: { // Exploration
    prefix: "En tant qu'expert IA-SST pour une organisation en phase d'EXPLORATION (niveau 1/5), qui découvre l'IA :",
    context: "L'organisation n'a pas encore d'expérience IA. Focus sur la sensibilisation, concepts de base, exemples concrets simples.",
    tone: "Pédagogique, accessible, rassurant"
  },
  2: { // Expérimentation  
    prefix: "En tant qu'expert IA-SST pour une organisation en phase d'EXPÉRIMENTATION (niveau 2/5), qui teste l'IA :",
    context: "L'organisation fait ses premiers tests. Focus sur les projets pilotes, validation de faisabilité, apprentissage.",
    tone: "Encourageant, pratique, orienté résultats"
  },
  3: { // Pilotage
    prefix: "En tant qu'expert IA-SST pour une organisation en phase de PILOTAGE (niveau 3/5), qui déploie des solutions :",
    context: "L'organisation a des projets en cours. Focus sur l'optimisation, la montée en échelle, les bonnes pratiques.",
    tone: "Stratégique, détaillé, orienté performance"
  },
  4: { // Déploiement
    prefix: "En tant qu'expert IA-SST pour une organisation en phase de DÉPLOIEMENT (niveau 4/5), qui généralise l'IA :",
    context: "L'organisation déploie à grande échelle. Focus sur l'intégration systémique, la gouvernance, la standardisation.",
    tone: "Expert, systémique, orienté gouvernance"
  },
  5: { // Transformation
    prefix: "En tant qu'expert IA-SST pour une organisation en phase de TRANSFORMATION (niveau 5/5), leader en IA :",
    context: "L'organisation est leader IA. Focus sur l'innovation, la transformation métier, la différenciation concurrentielle.",
    tone: "Innovant, visionnaire, orienté transformation"
  }
};

// ================================================
// 🔧 PROMPTS SPÉCIALISÉS PAR OBSTACLE
// ================================================

const OBSTACLE_PROMPTS = {
  donnees: {
    analysis: "Analysez les défis liés aux DONNÉES : qualité, disponibilité, protection, gouvernance data.",
    solutions: "Proposez des solutions concrètes pour améliorer la gestion des données SST.",
    examples: "Donnez des exemples de bonnes pratiques en matière de données SST."
  },
  culture: {
    analysis: "Analysez les résistances CULTURELLES : adoption, formation, conduite du changement.",
    solutions: "Proposez des stratégies pour faciliter l'acceptation de l'IA par les équipes SST.",
    examples: "Partagez des exemples de transformation culturelle réussie en SST."
  },
  gouvernance: {
    analysis: "Analysez les enjeux de GOUVERNANCE : conformité, responsabilité, audit, éthique.",
    solutions: "Proposez un cadre de gouvernance IA adapté au contexte SST.",
    examples: "Illustrez avec des exemples de gouvernance IA effective en entreprise."
  },
  technologie: {
    analysis: "Analysez les défis TECHNOLOGIQUES : infrastructure, intégration, performance, sécurité.",
    solutions: "Recommandez les technologies et architectures adaptées aux besoins SST.",
    examples: "Présentez des cas d'usage technologiques concrets en SST."
  },
  competences: {
    analysis: "Analysez les besoins en COMPÉTENCES : formation, recrutement, montée en compétence.",
    solutions: "Proposez un plan de développement des compétences IA-SST.",
    examples: "Donnez des exemples de programmes de formation IA réussis."
  },
  ethique: {
    analysis: "Analysez les enjeux ÉTHIQUES : biais, transparence, explicabilité, responsabilité.",
    solutions: "Proposez un cadre éthique pour l'IA en santé-sécurité au travail.",
    examples: "Illustrez avec des exemples d'IA éthique et responsable en entreprise."
  }
};

// ================================================
// 🧠 MOTEUR DE GÉNÉRATION CONTEXTUELLE
// ================================================

function buildContextualPrompt(request: EnhancedAIRequest): string {
  const { type, prompt, enrichedContext, maturityLevel, obstacles } = request;
  
  // Base du prompt selon le niveau de maturité
  const maturityContext = maturityLevel ? MATURITY_PROMPTS[maturityLevel.level] : null;
  
  // Contexte des obstacles
  const obstacleContext = obstacles?.map(obs => 
    `${OBSTACLE_PROMPTS[obs.obstacle].analysis} (Gravité: ${obs.severity})`
  ).join('\n') || '';
  
  // Construction du prompt final
  let contextualPrompt = '';
  
  if (maturityContext) {
    contextualPrompt += `${maturityContext.prefix}\n\n`;
    contextualPrompt += `CONTEXTE ORGANISATION: ${maturityContext.context}\n`;
    contextualPrompt += `TONE REQUIS: ${maturityContext.tone}\n\n`;
  }
  
  if (obstacleContext) {
    contextualPrompt += `OBSTACLES IDENTIFIÉS:\n${obstacleContext}\n\n`;
  }
  
  if (enrichedContext.sector) {
    contextualPrompt += `SECTEUR D'ACTIVITÉ: ${enrichedContext.sector}\n\n`;
  }
  
  contextualPrompt += `DEMANDE SPÉCIFIQUE:\n${prompt}\n\n`;
  
  if (enrichedContext.originalContext) {
    contextualPrompt += `CONTEXTE SUPPLÉMENTAIRE:\n${enrichedContext.originalContext}\n\n`;
  }
  
  // Instructions finales selon le type
  switch (type) {
    case 'maturity_assessment':
      contextualPrompt += `INSTRUCTIONS: Fournissez une évaluation de maturité IA-SST adaptée au niveau ${maturityLevel?.level || 'non spécifié'}, avec des recommandations actionnables et des étapes concrètes.`;
      break;
    case 'obstacle_analysis':
      contextualPrompt += `INSTRUCTIONS: Analysez les obstacles en profondeur et proposez un plan d'action structuré avec des solutions pratiques et des indicateurs de succès.`;
      break;
    case 'contextual_recommendations':
      contextualPrompt += `INSTRUCTIONS: Générez des recommandations personnalisées basées sur le contexte organisationnel, avec des priorités et des livrables concrets.`;
      break;
    case 'workflow_guidance':
      contextualPrompt += `INSTRUCTIONS: Fournissez une guidance workflow détaillée avec des étapes séquentielles, des outils recommandés et des critères de validation.`;
      break;
  }
  
  return contextualPrompt;
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
    const request: EnhancedAIRequest = await req.json()
    console.log('🧠 IGNITIA Contextual AI Request:', request.type)

    // Build contextual prompt
    const contextualPrompt = buildContextualPrompt(request)
    console.log('📝 Contextual Prompt Built:', contextualPrompt.substring(0, 200) + '...')

    // Initialize OpenAI (via Supabase env)
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY not configured')
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en intelligence artificielle appliquée à la santé et sécurité au travail (SST), spécialisé dans l\'évaluation de maturité organisationnelle et l\'accompagnement de transformation digitale. Tu maîtrises les réglementations SST québécoises/canadiennes et les meilleures pratiques internationales.'
          },
          {
            role: 'user',
            content: contextualPrompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text()
      console.error('❌ OpenAI API Error:', error)
      throw new Error(`OpenAI API Error: ${error}`)
    }

    const openaiData = await openaiResponse.json()
    const result = openaiData.choices[0]?.message?.content

    console.log('✅ IGNITIA Contextual AI Success')

    return new Response(
      JSON.stringify({ 
        result,
        metadata: {
          type: request.type,
          maturityLevel: request.maturityLevel?.level,
          obstaclesCount: request.obstacles?.length || 0,
          sector: request.sector,
          timestamp: new Date().toISOString()
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('❌ IGNITIA Contextual AI Error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: 'ignitia_contextual_ai_error',
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})