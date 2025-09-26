// src/components/profile-scian/types.ts
// Types partagés pour tous les composants ProfileScian

export interface CompanyInfo {
  name: string;
  scianCode: string;
  scianDescription: string;
  sector: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  foundingYear: string;
  numberOfEmployees: string;
  annualRevenue: string;
  numberOfSites: string;
  installationTypes: string[];
  unionPresence: boolean;
  unionOrganizations: string[];
  secondarySectors: string[];
  description: string;
}

export interface Actor {
  id: string;
  name: string;
  role: string;
  type: 'COSS' | 'CSS' | 'RSS' | 'Travailleur' | 'Direction';
  seniority: string;
  sstCertifications: string[];
  sstTrainingHours: string;
  specificResponsibilities: string;
  languages: string[];
  authorityLevel: string;
}

export interface HSEData {
  policies: {
    writtenPolicy: boolean;
    lastRevision: string;
    policyScope: string[];
    communicationMethod: string;
  };
  regulatoryCompliance: {
    lsst: {
      preventionProgram: boolean;
      sstCommittee: boolean;
      preventionRepresentative: boolean;
      workplaceInspections: boolean;
      inspectionFrequency: string;
    };
    rss: {
      epiProgram: boolean;
      safetyTraining: boolean;
      riskAssessment: boolean;
      emergencyProcedures: boolean;
    };
    cstc: {
      applicable: boolean;
      constructionSafetyCode: boolean;
      fallProtection: boolean;
      scaffoldingSafety: boolean;
    };
    lmrsst: {
      applicable: boolean;
      miningType: string;
      undergroundSafety: boolean;
      explosivesSafety: boolean;
    };
  };
  managementSystem: {
    type: string;
    certifications: string[];
    systemComponents: string[];
    auditFrequency: string;
    complianceStatus: string;
  };
  incidentHistory: {
    accidentsWithStoppage: string;
    accidentsWithoutStoppage: string;
    nearMisses: string;
    annualWorkHours: string;
    frequencyRate: number;
    severityRate: number;
    lastMajorIncident: string;
  };
  cnessInspections: {
    lastInspectionDate: string;
    inspectionResults: string;
    correctiveNotices: string[];
    fines: string[];
    correctiveActions: string[];
    nextInspection: string;
  };
  resources: {
    annualBudget: string;
    trainingBudget: string;
    dedicatedPersonnel: string;
    externalConsultants: boolean;
  };
}

export interface AIProject {
  id: string;
  name: string;
  description: string;
  category: string;
  irsstCategory: string;
  ocdeClassification: string;
  status: 'Planifié' | 'En cours' | 'En test' | 'Déployé';
  loi25Compliance: boolean;
  explainabilityLevel: string;
  scianSectors: string[];
  measuredImpact: string;
  governanceCommittee: boolean;
}

export interface MaturityScores {
  dataGovernance: number;
  aiReadiness: number;
  processIntegration: number;
  changeManagement: number;
  riskManagement: number;
  ethicsCompliance: number;
  humanOversight: number;
}

export interface RiskProfile {
  overallRiskLevel: string;
  primaryRisks: string[];
  riskControls: string[];
  assessmentMethod: string;
  lastAssessment: string;
  nextAssessment: string;
  organizationalContext: {
    workPatterns: {
      shiftTypes: string[];
      workSchedule: string;
      remoteWork: boolean;
      remoteWorkPercentage: string;
    };
    communicationMethods: string[];
    decisionMakingProcess: string;
    changeManagementApproach: string;
    safetyCulture: string;
    employeeEngagement: string;
  };
  sectorSpecificRisks: string[];
  riskMapping: {
    highRiskActivities: string[];
    criticalControlPoints: string[];
    emergencyScenarios: string[];
  };
}

export interface ProfileData {
  company: CompanyInfo;
  actors: Actor[];
  newActor: Omit<Actor, 'id'>;
  hseData: HSEData;
  aiProjects: AIProject[];
  newProject: Omit<AIProject, 'id'>;
  maturityScores: MaturityScores;
  riskProfile: RiskProfile;
}

// Constantes partagées
export const INSTALLATION_TYPES = [
  'Bureaux administratifs',
  'Usines de fabrication',
  'Entrepôts',
  'Chantiers de construction',
  'Laboratoires',
  'Centres de données',
  'Ateliers de maintenance',
  'Sites d\'extraction',
  'Centres de distribution'
];

export const SST_CERTIFICATIONS = [
  'COSS (Coordonnateur en santé et sécurité)',
  'CSS (Conseiller en sécurité)',
  'RSS (Représentant en santé et sécurité)',
  'Formation SIMDUT',
  'Secours général/premiers soins',
  'Espaces clos',
  'Travail en hauteur',
  'Cadenassage',
  'HACCP',
  'ISO 45001 Lead Auditor'
];

export const LANGUAGES = ['Français', 'Anglais', 'Espagnol', 'Autre'];

export const IRSST_CATEGORIES = [
  'Catégorie I - Automatisation des tâches dangereuses',
  'Catégorie II - Surveillance et monitorage temps réel',
  'Catégorie III - Détection et prévention des risques',
  'Catégorie IV - Soutien à la prise de décision',
  'Catégorie V - Réadaptation et santé mentale',
  'Catégorie VI - Maintenance prédictive'
];

export const OCDE_CLASSIFICATIONS = [
  'IA à usage général',
  'IA à usage spécifique',
  'IA à haut risque',
  'IA à risque limité',
  'IA à risque minimal'
];

export const EXPLAINABILITY_LEVELS = [
  'Totalement explicable',
  'Partiellement explicable',
  'Boîte noire avec métriques',
  'Boîte noire complète'
];

export const SHIFT_TYPES = [
  'Jour seulement',
  'Soir seulement',
  'Nuit seulement',
  'Rotation 2 équipes',
  'Rotation 3 équipes',
  'Horaire flexible',
  '24/7 continu'
];

export const COMMUNICATION_METHODS = [
  'Réunions SST régulières',
  'Affichage physique',
  'Plateforme numérique',
  'Formation en présentiel',
  'E-learning',
  'Boîte à suggestions',
  'Système de signalement numérique',
  'Communication par équipe'
];

export const RISK_ASSESSMENT_METHODS = [
  'Méthode Kinney',
  'Analyse HAZOP',
  'Analyse AMDEC',
  'Matrice de criticité',
  'Analyse préliminaire des risques',
  'Analyse par arbre de défaillances',
  'What-if analysis'
];

export const SECTOR_SPECIFIC_RISKS: Record<string, string[]> = {
  '11': ['Accidents avec machines agricoles', 'Exposition aux pesticides', 'Chutes', 'Coupures', 'Noyade'],
  '22': ['Chocs électriques', 'Chutes de hauteur', 'Exposition à l\'amiante', 'Risques chimiques'],
  '23': ['Chutes de hauteur', 'Écrasement par engins', 'Électrocution', 'Bruit', 'Poussières'],
  '31-33': ['Happement par machines', 'Brûlures', 'Exposition chimique', 'Troubles musculosquelettiques', 'Vibrations'],
  '41': ['Manutention manuelle', 'Écrasement', 'Accidents avec chariots élévateurs'],
  '44-45': ['Vol et violence', 'Troubles musculosquelettiques', 'Chutes', 'Coupures'],
  '48-49': ['Accidents de la route', 'Manutention lourde', 'Exposition à substances dangereuses'],
  '62': ['Exposition aux agents biologiques', 'Violence au travail', 'Troubles musculosquelettiques'],
  '72': ['Brûlures', 'Coupures', 'Troubles musculosquelettiques', 'Exposition à agents biologiques']
};