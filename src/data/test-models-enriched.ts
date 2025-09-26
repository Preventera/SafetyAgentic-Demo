// src/data/test-models-enriched.ts
// 10 PROJETS IGNITIA ENRICHIS - CONFORMITÉ QUÉBEC COMPLÈTE
// Nom de code: IGNITIA-Complete-Quebec-Compliance-Enhanced
// Date: 14 août 2025

import { IGNITIAProjectEnriched } from '../types/project';

export const testModelsEnrichedJSON: IGNITIAProjectEnriched[] = [
  
  // ==========================================
  // PROJET 1 : DÉTECTION EPI CONSTRUCTION
  // ==========================================
  {
    project_id: "GenAISafety-EPI-001",
    nom: "Détection automatique des EPI sur chantiers",
    niveau: "Débutant",
    contexte: "Opérations",
    priorite: "Élevée",
    description: "Vision IA pour assurer le port conforme des équipements de protection individuelle sur les sites de construction avec conformité réglementaire Québec.",
    mots_cles: ["Sécurité", "Vision", "Conformité", "Construction", "CNESST", "Loi 25"],
    secteur: ["Construction"],
    technologies: ["Vision par ordinateur", "Reconnaissance d'objets", "Apprentissage supervisé"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Art. 51", justification: "Surveillance automatisée = prévention", niveau_conformite: "Conforme" },
          "RSS": { article: "Art. 2.4.1", justification: "Vérification port EPI obligatoire", niveau_conformite: "Conforme" },
          "CSTC": { article: "Art. 2.10.12", justification: "Surveillance continue chantiers", niveau_conformite: "Conforme" },
          "Loi_25": { article: "Art. 3", justification: "Données biométriques", niveau_conformite: "EFVP requise" }
        }
      },
      score_global: 85
    },
    
    classification_IA: {
      categories_principales: ["Perception", "Prediction", "Action", "Interaction"],
      complexite_algorithmique: "Intermédiaire",
      niveau_autonomie: "Supervisé humain"
    },
    
    categorie_IRSST: {
      categorie_principale: "II - Optimisation",
      sous_categorie: "2. Surveillance et monitorage temps réel",
      justification: "Surveillance EPI pour réduction accidents",
      reduction_accidents_estimee: "35-45%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "23", libelle: "Construction" },
      donnees_CNESST: { lesions_2023: "128,940", tendance: "-2.1%", roi_potentiel: "4.2M$/an" }
    },
    
    explicabilite_IA: {
      niveau: "Élevé",
      type_justification: "Visuelle + Score + Texte",
      exemple: "✅ Casque détecté (94%), Harnais visible (87%)"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Sensible",
      chiffrement: "AES-256 + TLS 1.3",
      conformite_ministerielle: "Conforme Stratégie 2024-2028"
    }
  },

  // ==========================================
  // PROJET 2 : MAINTENANCE PRÉDICTIVE
  // ==========================================
  {
    project_id: "GenAISafety-MAINT-002",
    nom: "Maintenance prédictive des équipements critiques",
    niveau: "Intermédiaire",
    contexte: "Maintenance",
    priorite: "Élevée",
    description: "IA prédictive pour anticiper les pannes d'équipements critiques et planifier la maintenance préventive en conformité CNESST.",
    mots_cles: ["Maintenance", "Prédictif", "IoT", "Fabrication", "Fiabilité"],
    secteur: ["Fabrication", "Énergie"],
    technologies: ["Machine Learning", "IoT", "Analyse prédictive", "Capteurs intelligents"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Art. 51", justification: "Prévention pannes = sécurité", niveau_conformite: "Conforme" },
          "RSS": { article: "Art. 2.20.1", justification: "Maintenance équipements sécuritaires", niveau_conformite: "Conforme" },
          "Loi_25": { article: "Art. 8", justification: "Données opérationnelles anonymisées", niveau_conformite: "Conforme" }
        }
      },
      score_global: 90
    },
    
    classification_IA: {
      categories_principales: ["Prediction", "Raisonnement", "Planification", "Action"],
      complexite_algorithmique: "Avancée",
      niveau_autonomie: "Semi-autonome avec validation"
    },
    
    categorie_IRSST: {
      categorie_principale: "III - Acceptabilité",
      sous_categorie: "6. Maintenance prédictive équipements",
      justification: "Prévention pannes pour acceptabilité technologique",
      reduction_accidents_estimee: "25-35%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "31-33", libelle: "Fabrication" },
      secteurs_secondaires: [{ code: "22", libelle: "Services publics" }],
      donnees_CNESST: { lesions_2023: "142,850", tendance: "+5.2%", roi_potentiel: "8.7M$/an" }
    },
    
    explicabilite_IA: {
      niveau: "Intermédiaire",
      type_justification: "Graphique + Probabilité",
      exemple: "🔧 Panne probable roulement dans 72h (probabilité: 78%)"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Confidentiel",
      chiffrement: "AES-256 + Segmentation IoT",
      conformite_ministerielle: "Conforme + Audit IoT trimestriel"
    }
  },

  // ==========================================
  // PROJET 3 : DÉTECTION FATIGUE CONDUCTEURS
  // ==========================================
  {
    project_id: "GenAISafety-FATIGUE-003",
    nom: "Détection de fatigue des conducteurs professionnels",
    niveau: "Intermédiaire",
    contexte: "Transport",
    priorite: "Très élevée",
    description: "Système IA analysant les signaux physiologiques et comportementaux pour détecter la fatigue chez les conducteurs de véhicules lourds.",
    mots_cles: ["Fatigue", "Transport", "Sécurité routière", "Biométrie", "Prévention"],
    secteur: ["Transport", "Logistique"],
    technologies: ["Vision par ordinateur", "Capteurs biométriques", "Analyse comportementale"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Art. 49", justification: "Protection santé conducteurs", niveau_conformite: "Conforme" },
          "Code_securite_routiere": { article: "Art. 326", justification: "Conduite sécuritaire obligatoire", niveau_conformite: "Conforme" },
          "Loi_25": { article: "Art. 3", justification: "Données biométriques sensibles", niveau_conformite: "EFVP + consentement explicite" }
        }
      },
      score_global: 75
    },
    
    classification_IA: {
      categories_principales: ["Perception", "Prediction", "Action"],
      complexite_algorithmique: "Avancée",
      niveau_autonomie: "Alerte automatique + intervention humaine"
    },
    
    categorie_IRSST: {
      categorie_principale: "II - Optimisation",
      sous_categorie: "2. Surveillance et monitorage temps réel",
      justification: "Surveillance fatigue pour optimisation sécurité transport",
      reduction_accidents_estimee: "40-55%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "48-49", libelle: "Transport et entreposage" },
      donnees_CNESST: { lesions_2023: "54,820", tendance: "-0.8%", roi_potentiel: "12.3M$/an" }
    },
    
    explicabilite_IA: {
      niveau: "Élevé",
      type_justification: "Indicateurs visuels + Score fatigue",
      exemple: "⚠️ Fatigue détectée: Clignements lents (score: 8.2/10)"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Très sensible",
      chiffrement: "AES-256 + Tokenisation biométrique",
      conformite_ministerielle: "Conforme + Notification 24h si incident"
    }
  },

  // ==========================================
  // PROJET 4 : ERGONOMIE POSTES TRAVAIL
  // ==========================================
  {
    project_id: "GenAISafety-ERGO-004",
    nom: "Analyse ergonomique automatisée des postes de travail",
    niveau: "Intermédiaire",
    contexte: "Ergonomie",
    priorite: "Élevée",
    description: "IA d'analyse posturale pour identifier les risques de TMS et recommander des améliorations ergonomiques conformes aux normes IRSST.",
    mots_cles: ["Ergonomie", "TMS", "Posture", "Prévention", "IRSST"],
    secteur: ["Fabrication", "Bureaux", "Santé"],
    technologies: ["Vision 3D", "Analyse biomécanique", "Machine Learning"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Art. 51", justification: "Prévention TMS = obligation employeur", niveau_conformite: "Conforme" },
          "RSS": { article: "Art. 2.1", justification: "Aménagement postes sécuritaires", niveau_conformite: "Conforme" },
          "ISO_11228": { section: "Manutention manuelle", justification: "Évaluation risques TMS", niveau_conformite: "Conforme" }
        }
      },
      score_global: 92
    },
    
    classification_IA: {
      categories_principales: ["Perception", "Raisonnement", "Interaction"],
      complexite_algorithmique: "Avancée",
      niveau_autonomie: "Analyse automatique + recommandations"
    },
    
    categorie_IRSST: {
      categorie_principale: "I - Acquisition",
      sous_categorie: "3. Détection et prévention des risques",
      justification: "Acquisition données posturales pour prévention TMS",
      reduction_accidents_estimee: "30-40%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "31-33", libelle: "Fabrication" },
      secteurs_secondaires: [{ code: "62", libelle: "Soins de santé" }],
      donnees_CNESST: { lesions_TMS_2023: "45% du total", tendance: "+3.4%", roi_potentiel: "15.8M$/an" }
    },
    
    explicabilite_IA: {
      niveau: "Élevé",
      type_justification: "Visualisation 3D + Score REBA",
      exemple: "🔴 Risque élevé: Flexion dos 45° + rotation (score REBA: 9)"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Sensible",
      chiffrement: "AES-256 + Anonymisation",
      conformite_ministerielle: "Conforme"
    }
  },

  // ==========================================
  // PROJET 5 : FORMATION VR SÉCURITÉ
  // ==========================================
  {
    project_id: "GenAISafety-VR-005",
    nom: "Formation immersive VR en sécurité industrielle",
    niveau: "Avancé",
    contexte: "Formation",
    priorite: "Moyenne",
    description: "Plateforme de formation en réalité virtuelle avec IA adaptative pour l'apprentissage des procédures de sécurité industrielle.",
    mots_cles: ["Formation", "VR", "Sécurité", "Immersif", "Adaptatif"],
    secteur: ["Tous secteurs"],
    technologies: ["Réalité virtuelle", "IA adaptative", "Analyse comportementale"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Art. 51", justification: "Formation = obligation prévention", niveau_conformite: "Conforme" },
          "RSS": { article: "Art. 2.5", justification: "Formation sécuritaire obligatoire", niveau_conformite: "Conforme" },
          "Loi_25": { article: "Art. 12", justification: "Données apprentissage anonymisées", niveau_conformite: "Conforme" }
        }
      },
      score_global: 88
    },
    
    classification_IA: {
      categories_principales: ["Interaction", "Raisonnement", "Planification"],
      complexite_algorithmique: "Avancée",
      niveau_autonomie: "Adaptation automatique parcours"
    },
    
    categorie_IRSST: {
      categorie_principale: "I - Acquisition",
      sous_categorie: "4. Soutien à la prise de décision",
      justification: "Acquisition compétences sécurité par formation adaptée",
      amelioration_competences: "60-75%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "Tous", libelle: "Application universelle" },
      focus_prioritaire: [{ code: "23", libelle: "Construction" }, { code: "21", libelle: "Mines" }]
    },
    
    explicabilite_IA: {
      niveau: "Intermédiaire",
      type_justification: "Progression + Recommandations",
      exemple: "📈 Progression: 78% - Recommandation: Renforcer procédures urgence"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Public",
      chiffrement: "Standard TLS 1.3",
      conformite_ministerielle: "Conforme"
    }
  },

  // ==========================================
  // PROJET 6 : QUALITÉ AIR INTELLIGENT
  // ==========================================
  {
    project_id: "GenAISafety-AIR-006",
    nom: "Surveillance intelligente de la qualité de l'air",
    niveau: "Intermédiaire",
    contexte: "Environnement",
    priorite: "Élevée",
    description: "Réseau de capteurs IoT avec IA pour surveiller la qualité de l'air et déclencher des alertes automatiques selon les seuils CNESST.",
    mots_cles: ["Qualité air", "IoT", "Surveillance", "Alertes", "Environnement"],
    secteur: ["Fabrication", "Mines", "Chimie"],
    technologies: ["Capteurs IoT", "Analyse temps réel", "Alertes automatiques"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Art. 51", justification: "Protection santé respiratoire", niveau_conformite: "Conforme" },
          "RSS": { article: "Art. 2.10", justification: "Surveillance contaminants", niveau_conformite: "Conforme" },
          "LMRSST": { article: "Art. 3.2", justification: "Surveillance mines spécifique", niveau_conformite: "Conforme" }
        }
      },
      score_global: 94
    },
    
    classification_IA: {
      categories_principales: ["Perception", "Prediction", "Action"],
      complexite_algorithmique: "Intermédiaire",
      niveau_autonomie: "Surveillance automatique + alertes"
    },
    
    categorie_IRSST: {
      categorie_principale: "II - Optimisation",
      sous_categorie: "2. Surveillance et monitorage temps réel",
      justification: "Optimisation surveillance contaminants atmosphériques",
      reduction_exposition: "50-70%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "31-33", libelle: "Fabrication" },
      secteurs_secondaires: [{ code: "21", libelle: "Mines" }, { code: "32", libelle: "Chimie" }],
      donnees_CNESST: { maladies_professionnelles_2023: "8,450", tendance: "+2.1%" }
    },
    
    explicabilite_IA: {
      niveau: "Élevé",
      type_justification: "Graphiques temps réel + Seuils",
      exemple: "🔴 PM2.5: 45 μg/m³ (Seuil CNESST: 25 μg/m³) - Évacuation recommandée"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Sensible",
      chiffrement: "AES-256 + Réseau IoT sécurisé",
      conformite_ministerielle: "Conforme + Audit IoT"
    }
  },

  // ==========================================
  // PROJET 7 : GESTION URGENCES IA
  // ==========================================
  {
    project_id: "GenAISafety-URGENCE-007",
    nom: "Gestion intelligente des urgences et évacuations",
    niveau: "Avancé",
    contexte: "Urgence",
    priorite: "Très élevée",
    description: "Système IA de coordination automatique des procédures d'urgence avec optimisation des parcours d'évacuation en temps réel.",
    mots_cles: ["Urgence", "Évacuation", "Coordination", "Temps réel", "Sécurité"],
    secteur: ["Tous secteurs"],
    technologies: ["IA décisionnelle", "Optimisation trajets", "Communication automatisée"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Art. 51", justification: "Procédures urgence = obligation", niveau_conformite: "Conforme" },
          "Code_batiment": { article: "Sortie secours", justification: "Optimisation évacuation", niveau_conformite: "Conforme" },
          "Loi_25": { article: "Art. 16", justification: "Données localisation temps réel", niveau_conformite: "Consentement implicite urgence" }
        }
      },
      score_global: 87
    },
    
    classification_IA: {
      categories_principales: ["Raisonnement", "Planification", "Action", "Interaction"],
      complexite_algorithmique: "Très avancée",
      niveau_autonomie: "Coordination automatique avec supervision"
    },
    
    categorie_IRSST: {
      categorie_principale: "II - Optimisation",
      sous_categorie: "4. Soutien à la prise de décision",
      justification: "Optimisation gestion urgences pour réduction temps évacuation",
      reduction_temps_evacuation: "35-50%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "Tous", libelle: "Application universelle" },
      focus_critique: [{ code: "21", libelle: "Mines" }, { code: "32", libelle: "Chimie" }]
    },
    
    explicabilite_IA: {
      niveau: "Intermédiaire",
      type_justification: "Instructions claires + Cartes",
      exemple: "🚨 ÉVACUATION: Zone B → Sortie Est (2 min) - Éviter ascenseurs"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Critique",
      chiffrement: "AES-256 + Redondance",
      conformite_ministerielle: "Conforme + Certification sécurité publique"
    }
  },

  // ==========================================
  // PROJET 8 : CONFORMITÉ AUTOMATISÉE
  // ==========================================
  {
    project_id: "GenAISafety-CONFORM-008",
    nom: "Vérification automatisée de conformité réglementaire",
    niveau: "Avancé",
    contexte: "Conformité",
    priorite: "Élevée",
    description: "IA d'audit automatique pour vérifier la conformité aux normes CNESST, LSST et réglementations sectorielles en temps réel.",
    mots_cles: ["Conformité", "Audit", "Réglementation", "CNESST", "Automatisation"],
    secteur: ["Tous secteurs"],
    technologies: ["NLP réglementaire", "Audit automatique", "Veille normative"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Ensemble", justification: "Vérification conformité complète", niveau_conformite: "Meta-conforme" },
          "RSS": { article: "Ensemble", justification: "Audit réglementaire automatisé", niveau_conformite: "Meta-conforme" },
          "Loi_25": { article: "Art. 25", justification: "Audit protection données", niveau_conformite: "Conforme" }
        }
      },
      score_global: 96
    },
    
    classification_IA: {
      categories_principales: ["Raisonnement", "Interaction", "Planification"],
      complexite_algorithmique: "Très avancée",
      niveau_autonomie: "Audit automatique + recommandations"
    },
    
    categorie_IRSST: {
      categorie_principale: "I - Acquisition",
      sous_categorie: "4. Soutien à la prise de décision",
      justification: "Acquisition données conformité pour soutien décisions réglementaires",
      amelioration_conformite: "80-95%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "Tous", libelle: "Application universelle" },
      specialisation: [{ code: "23", libelle: "Construction" }, { code: "21", libelle: "Mines" }]
    },
    
    explicabilite_IA: {
      niveau: "Très élevé",
      type_justification: "Références légales + Actions",
      exemple: "❌ Non-conforme Art. 2.4.1 RSS: EPI manquants → Corriger sous 24h"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Confidentiel",
      chiffrement: "AES-256 + Intégrité juridique",
      conformite_ministerielle: "Conforme + Validation légale"
    }
  },

  // ==========================================
  // PROJET 9 : BIEN-ÊTRE MENTAL IA
  // ==========================================
  {
    project_id: "GenAISafety-MENTAL-009",
    nom: "Surveillance du bien-être mental au travail",
    niveau: "Avancé",
    contexte: "Santé mentale",
    priorite: "Élevée",
    description: "IA d'analyse des signaux de stress et burn-out avec recommandations d'interventions préventives conformes aux standards psychosociaux IRSST.",
    mots_cles: ["Santé mentale", "Stress", "Burn-out", "Prévention", "Psychosocial"],
    secteur: ["Tous secteurs"],
    technologies: ["Analyse sentiment", "Biomarqueurs", "IA prédictive"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Art. 2", justification: "Santé mentale = santé au travail", niveau_conformite: "Conforme" },
          "Loi_25": { article: "Art. 3", justification: "Données santé très sensibles", niveau_conformite: "EFVP + consentement éclairé" },
          "Charte_droits": { article: "Art. 1", justification: "Dignité et intégrité", niveau_conformite: "Protection renforcée" }
        }
      },
      score_global: 70
    },
    
    classification_IA: {
      categories_principales: ["Perception", "Prediction", "Interaction"],
      complexite_algorithmique: "Très avancée",
      niveau_autonomie: "Détection avec intervention humaine obligatoire"
    },
    
    categorie_IRSST: {
      categorie_principale: "II - Optimisation",
      sous_categorie: "5. Soutien réadaptation et santé mentale",
      justification: "Optimisation détection précoce risques psychosociaux",
      reduction_arrets_maladie: "25-40%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "62", libelle: "Soins de santé" },
      secteurs_secondaires: [{ code: "Tous", libelle: "Risques psychosociaux universels" }],
      donnees_CNESST: { lesions_psychiques_2023: "12,380", tendance: "+8.7%" }
    },
    
    explicabilite_IA: {
      niveau: "Limité volontaire",
      type_justification: "Indicateurs généraux + Ressources",
      exemple: "💙 Indicateurs bien-être: Attention recommandée → Ressources disponibles"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Très sensible",
      chiffrement: "AES-256 + Anonymisation renforcée",
      conformite_ministerielle: "Conforme + Protection santé mentale"
    }
  },

  // ==========================================
  // PROJET 10 : ANALYTICS PRÉDICTIF GLOBAL
  // ==========================================
  {
    project_id: "GenAISafety-ANALYTICS-010",
    nom: "Analytics prédictif des tendances SST globales",
    niveau: "Expert",
    contexte: "Stratégique",
    priorite: "Élevée",
    description: "Plateforme d'analytics avancé pour prédire les tendances SST, optimiser les budgets prévention et benchmarker les performances sectorielles.",
    mots_cles: ["Analytics", "Prédictif", "Tendances", "Benchmarking", "ROI"],
    secteur: ["Direction", "Consultants"],
    technologies: ["Big Data", "ML avancé", "Visualisation données"],
    
    conformite_reglementaire: {
      lois_applicables: {
        quebec: {
          "LSST": { article: "Art. 51", justification: "Optimisation prévention = obligation", niveau_conformite: "Conforme" },
          "Loi_25": { article: "Art. 22", justification: "Agrégation données anonymisées", niveau_conformite: "Conforme" },
          "ISO_31000": { section: "Gestion risques", justification: "Analytics = gestion risques", niveau_conformite: "Conforme" }
        }
      },
      score_global: 93
    },
    
    classification_IA: {
      categories_principales: ["Prediction", "Raisonnement", "Interaction", "Planification"],
      complexite_algorithmique: "Expert",
      niveau_autonomie: "Prédictions automatiques + validation experte"
    },
    
    categorie_IRSST: {
      categorie_principale: "III - Acceptabilité",
      sous_categorie: "4. Soutien à la prise de décision",
      justification: "Acceptabilité technologique pour décisions stratégiques SST",
      amelioration_roi_prevention: "150-300%"
    },
    
    secteurs_prioritaires_SCIAN: {
      secteur_principal: { code: "Tous", libelle: "Vue transversale" },
      donnees_CNESST: { total_lesions_2023: "697,602", budget_prevention_optimal: "2.8G$/an" }
    },
    
    explicabilite_IA: {
      niveau: "Très élevé",
      type_justification: "Dashboards + Modèles + Justifications",
      exemple: "📊 Prédiction +15% accidents Q4 → Recommandation: +30% budget formation"
    },
    
    cybersecurite_avancee: {
      classification_donnees: "Stratégique",
      chiffrement: "AES-256 + Confidentialité affaires",
      conformite_ministerielle: "Conforme + Protection IP"
    }
  }

];