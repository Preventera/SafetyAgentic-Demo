// src/components/EnrichedProjectCard.tsx
// Nom de code: IGNITIA-Enhanced-Project-Card-UI
// Localisation: Composant affichage données enrichies

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Shield, 
  Brain, 
  BarChart3, 
  Building2, 
  Eye, 
  Lock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface EnrichedProjectCardProps {
  project: {
    project_id: string;
    nom: string;
    niveau: string;
    contexte: string;
    priorite: string;
    description: string;
    mots_cles: string[];
    secteur: string[];
    technologies: string[];
    
    // Données enrichies
    conformite_reglementaire?: {
      lois_applicables?: {
        quebec?: {
          LSST?: { article: string; justification: string; niveau_conformite: string };
          RSS?: { article: string; justification: string; niveau_conformite: string };
          CSTC?: { article: string; justification: string; niveau_conformite: string };
          Loi_25?: { article: string; justification: string; niveau_conformite: string };
        };
      };
      score_global?: number;
    };
    
    classification_IA?: {
      categories_principales?: string[];
      complexite_algorithmique?: string;
      niveau_autonomie?: string;
    };
    
    categorie_IRSST?: {
      categorie_principale?: string;
      sous_categorie?: string;
      justification?: string;
      reduction_accidents_estimee?: string;
    };
    
    secteurs_prioritaires_SCIAN?: {
      secteur_principal?: { code: string; libelle: string };
      donnees_CNESST?: { lesions_2023?: string; tendance?: string; roi_potentiel?: string };
    };
    
    explicabilite_IA?: {
      niveau?: string;
      type_justification?: string;
      exemple?: string;
    };
    
    cybersecurite_avancee?: {
      classification_donnees?: string;
      chiffrement?: string;
      conformite_ministerielle?: string;
    };
  };
}

export const EnrichedProjectCard: React.FC<EnrichedProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priorite: string) => {
    switch (priorite?.toLowerCase()) {
      case 'très élevée': return 'bg-red-500';
      case 'élevée': return 'bg-orange-500';
      case 'moyenne': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getComplianceIcon = (niveau: string) => {
    if (niveau?.includes('Conforme')) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (niveau?.includes('requise')) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <Info className="w-4 h-4 text-blue-500" />;
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">{project.nom}</CardTitle>
            <div className="flex gap-2 mb-3">
              <Badge variant="outline">{project.niveau}</Badge>
              <Badge variant="outline">{project.contexte}</Badge>
              <Badge className={`text-white ${getPriorityColor(project.priorite)}`}>
                {project.priorite}
              </Badge>
            </div>
          </div>
          {project.conformite_reglementaire?.score_global && (
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {project.conformite_reglementaire.score_global}%
              </div>
              <div className="text-xs text-gray-500">Conformité</div>
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {project.mots_cles?.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Aperçu rapide des enrichissements */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {project.conformite_reglementaire && (
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-xs font-medium">Conformité QC</div>
                <div className="text-xs text-gray-600">
                  {project.conformite_reglementaire.score_global}% conforme
                </div>
              </div>
            </div>
          )}

          {project.classification_IA && (
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <Brain className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-xs font-medium">Classification IA</div>
                <div className="text-xs text-gray-600">
                  {project.classification_IA.complexite_algorithmique}
                </div>
              </div>
            </div>
          )}

          {project.categorie_IRSST && (
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-xs font-medium">IRSST</div>
                <div className="text-xs text-gray-600">
                  {project.categorie_IRSST.categorie_principale}
                </div>
              </div>
            </div>
          )}

          {project.secteurs_prioritaires_SCIAN && (
            <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
              <Building2 className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-xs font-medium">SCIAN</div>
                <div className="text-xs text-gray-600">
                  Code {project.secteurs_prioritaires_SCIAN.secteur_principal?.code}
                </div>
              </div>
            </div>
          )}

          {project.explicabilite_IA && (
            <div className="flex items-center gap-2 p-2 bg-cyan-50 rounded-lg">
              <Eye className="w-5 h-5 text-cyan-600" />
              <div>
                <div className="text-xs font-medium">Explicabilité</div>
                <div className="text-xs text-gray-600">
                  {project.explicabilite_IA.niveau}
                </div>
              </div>
            </div>
          )}

          {project.cybersecurite_avancee && (
            <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
              <Lock className="w-5 h-5 text-red-600" />
              <div>
                <div className="text-xs font-medium">Cybersécurité</div>
                <div className="text-xs text-gray-600">
                  {project.cybersecurite_avancee.classification_donnees}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section détails dépliable */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              <span>Voir détails enrichis</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4 space-y-4">
            {/* Conformité réglementaire détaillée */}
            {project.conformite_reglementaire?.lois_applicables?.quebec && (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Conformité Réglementaire Québec
                </h4>
                <div className="space-y-2">
                  {Object.entries(project.conformite_reglementaire.lois_applicables.quebec).map(([loi, details]) => (
                    <div key={loi} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                      {getComplianceIcon(details.niveau_conformite)}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{loi}</div>
                        <div className="text-xs text-gray-600">{details.justification}</div>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {details.niveau_conformite}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classification IA détaillée */}
            {project.classification_IA && (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  Classification IA (OCDE/ISO 22989)
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Catégories principales :</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.classification_IA.categories_principales?.map((cat, index) => (
                        <Badge key={index} variant="secondary">{cat}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Complexité : </span>
                    <span className="text-sm">{project.classification_IA.complexite_algorithmique}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Autonomie : </span>
                    <span className="text-sm">{project.classification_IA.niveau_autonomie}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Données SCIAN et CNESST */}
            {project.secteurs_prioritaires_SCIAN && (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-orange-600" />
                  Secteur SCIAN & Données CNESST
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Secteur principal : </span>
                    <Badge variant="outline">
                      {project.secteurs_prioritaires_SCIAN.secteur_principal?.code} - {project.secteurs_prioritaires_SCIAN.secteur_principal?.libelle}
                    </Badge>
                  </div>
                  {project.secteurs_prioritaires_SCIAN.donnees_CNESST && (
                    <div className="bg-orange-50 p-3 rounded">
                      <div className="text-sm font-medium mb-2">Données CNESST 2023 :</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="font-medium">Lésions : </span>
                          {project.secteurs_prioritaires_SCIAN.donnees_CNESST.lesions_2023}
                        </div>
                        <div>
                          <span className="font-medium">Tendance : </span>
                          {project.secteurs_prioritaires_SCIAN.donnees_CNESST.tendance}
                        </div>
                        <div>
                          <span className="font-medium">ROI potentiel : </span>
                          {project.secteurs_prioritaires_SCIAN.donnees_CNESST.roi_potentiel}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Explicabilité IA */}
            {project.explicabilite_IA && (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-600" />
                  Explicabilité IA
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Niveau : </span>
                    <Badge variant={project.explicabilite_IA.niveau === 'Élevé' ? 'default' : 'secondary'}>
                      {project.explicabilite_IA.niveau}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Type de justification : </span>
                    <span className="text-sm">{project.explicabilite_IA.type_justification}</span>
                  </div>
                  {project.explicabilite_IA.exemple && (
                    <div className="bg-cyan-50 p-3 rounded">
                      <div className="text-sm font-medium mb-1">Exemple :</div>
                      <div className="text-sm italic">{project.explicabilite_IA.exemple}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cybersécurité */}
            {project.cybersecurite_avancee && (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-600" />
                  Cybersécurité Avancée
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Classification données : </span>
                    <Badge variant="outline">{project.cybersecurite_avancee.classification_donnees}</Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Chiffrement : </span>
                    <span className="text-sm">{project.cybersecurite_avancee.chiffrement}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Conformité ministérielle : </span>
                    <span className="text-sm">{project.cybersecurite_avancee.conformite_ministerielle}</span>
                  </div>
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        <div className="mt-4">
          <Button className="w-full">
            + Ajouter à partir de ce modèle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};