// Mapping des risques CNESST réels par secteur SCIAN
// Basé sur la recherche officielle CNESST et vos tests

const CNESST_RISKS_BY_SECTOR = {
  // Construction (secteur 23 - testé dans votre app)
  "23": [
    "Chutes de hauteur",
    "Risques mécaniques", 
    "Exposition substances"
  ],
  
  // Agriculture, foresterie, pêche et chasse (secteur 11 - testé)
  "11": [
    "Risques ergonomiques",
    "Risques mécaniques",
    "Exposition substances"
  ],
  
  // Services d'information culturels et de loisirs (secteur 62 - testé)
  "62": [
    "Risques ergonomiques",
    "Risques électriques",
    "Chutes et glissades"
  ],
  
  // Fabrication de produits alimentaires (secteur 311 - observé dans vos tests)
  "311": [
    "Risques mécaniques",
    "Exposition substances",
    "Risques ergonomiques"
  ],
  
  // Transport et entreposage (secteur 48-49)
  "48-49": [
    "Risques mécaniques",
    "Chutes et glissades", 
    "Risques ergonomiques"
  ],
  
  // Défaut pour secteurs non mappés
  "DEFAULT": [
    "Risques mécaniques",
    "Chutes et glissades",
    "Exposition substances"
  ]
};

// Fonction utilitaire pour récupérer les risques d'un secteur
export function getCNESSTRisksBySector(sectorCode: string): string[] {
  // Nettoyer le code secteur (enlever les espaces, etc.)
  const cleanSector = sectorCode?.toString().trim();
  
  // Retourner les risques du secteur ou les risques par défaut
  return CNESST_RISKS_BY_SECTOR[cleanSector as keyof typeof CNESST_RISKS_BY_SECTOR] 
    || CNESST_RISKS_BY_SECTOR.DEFAULT;
}

// Exemple d'utilisation dans ai-enhanced-name-input.tsx :
/*
import { getCNESSTRisksBySector } from './cnesst-risks-mapping';

const generateProjectIdeas = async () => {
  const sectorRisks = getCNESSTRisksBySector(scianSectorId || "23");
  await askIdeas(scianSectorId || "23", sectorRisks);
};
*/