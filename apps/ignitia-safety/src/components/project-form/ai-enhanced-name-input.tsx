import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import AITextEnhancer from '@/components/ai-assistant/ai-text-enhancer';
import LLMSelector, { LLMProvider } from '@/components/ai-assistant/llm-selector';
import { useAIAssistant } from '@/hooks/use-ai-assistant';
import { getCNESSTRisksBySector } from '@/utils/cnesst-risks-mapping';
import { Criteria } from '@/types/project';

interface AIEnhancedNameInputProps {
  name: string;
  setName: (name: string) => void;
  criteria: Criteria;
  scianSectorId?: string;
}

const AIEnhancedNameInput = ({ name, setName, criteria, scianSectorId }: AIEnhancedNameInputProps) => {
  const [selectedLLM, setSelectedLLM] = useState<LLMProvider>('claude');
  const { status, output, askIdeas } = useAIAssistant(); // ✅ Utilise votre hook existant

  console.log('AIEnhancedNameInput rendered'); // Debug log

  const generateProjectIdeas = async () => {
    console.log('Génération d\'idées de projet démarrée'); // Debug log
    
    // ✅ Récupérer les risques CNESST réels pour le secteur
    const sectorRisks = getCNESSTRisksBySector(scianSectorId || "311");
    
    console.log(`🎯 Secteur interface: ${scianSectorId}, Risques: ${sectorRisks.join(", ")}`);
    
    try {
      // ✅ Utiliser votre hook askIdeas existant avec l'interface correcte
      await askIdeas(scianSectorId || "311", sectorRisks);
      
      // Une fois la génération terminée avec succès, utiliser le résultat
      if (status === 'success' && output) {
        // Extraire une description courte du résultat pour le champ nom
        const shortDescription = extractShortDescription(output);
        setName(shortDescription);
        console.log('✅ Description extraite:', shortDescription);
        console.log('📄 Contenu output:', output.substring(0, 200) + '...');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la génération:', error);
    }
  };

  // ✅ Fonction utilitaire pour extraire une description courte
  const extractShortDescription = (fullOutput: string): string => {
    console.log('🔍 Début extraction, longueur output:', fullOutput.length);
    
    // Chercher spécifiquement les titres de projets (## 1. ou ## 2.)
    const projectTitleRegex = /##\s*\d+\.\s*(.+)/;
    const match = fullOutput.match(projectTitleRegex);
    
    console.log('🎯 Regex match:', match);
    
    if (match && match[1]) {
      // Nettoyer le titre trouvé
      let title = match[1]
        .replace(/\*\*/g, '') // Enlever markdown bold
        .replace(/pour\s+\w+$/i, '') // Enlever "pour Construction" etc.
        .trim();
      
      console.log('✨ Titre nettoyé:', title);
      
      if (title.length > 10 && title.length < 80) {
        return title;
      }
    }
    
    // Fallback : chercher d'autres patterns plus flexibles
    const lines = fullOutput.split('\n');
    console.log('📝 Lignes à analyser:', lines.length);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      console.log(`📄 Ligne ${i}:`, line.substring(0, 50));
      
      // Chercher ligne avec "Système", "Assistant", "Analyse"
      if (line.includes('Système') || line.includes('Assistant') || line.includes('Analyse')) {
        const cleaned = line
          .replace(/^[#\d\.\-•\s]+/, '') // Enlever préfixes
          .replace(/\*\*/g, '') // Enlever markdown
          .replace(/pour\s+\w+$/i, '') // Enlever secteur
          .trim();
        
        console.log('🧹 Ligne nettoyée:', cleaned);
        
        if (cleaned.length > 10 && cleaned.length < 80) {
          return cleaned;
        }
      }
    }
    
    // Fallback final : description générique intelligente
    console.log('⚠️ Utilisation du fallback final');
    return "Système de surveillance IA pour la sécurité au travail";
  };

  return (
    <div className="mb-6 space-y-4">
      <div>
        <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom / Description du projet
        </label>
        <Input
          id="project-name"
          placeholder="Ex: Caméra intelligente pour détecter le non-port des EPI"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>

      {/* ✅ Sélecteur LLM adapté pour votre hook */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">🤖 Assistant IA pour générer des idées</h4>
        <LLMSelector
          selectedLLM={selectedLLM}
          onLLMChange={setSelectedLLM}
          onGenerate={generateProjectIdeas}
          isLoading={status === 'loading'} // ✅ Utilise le status de votre hook
        />
      </div>

      {/* ✅ Afficher la sortie complète de votre hook si disponible */}
      {output && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Idées générées</h4>
          <div className="bg-blue-50 p-3 rounded-md text-sm">
            <pre className="whitespace-pre-wrap text-gray-700">{output}</pre>
          </div>
        </div>
      )}
      
      {/* Afficher l'amélioration de texte seulement si il y a du texte */}
      {name.trim() && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">✨ Améliorer le texte</h4>
          <AITextEnhancer
            originalText={name}
            onApply={setName}
            context={`Secteur: ${scianSectorId || 'Non spécifié'}`}
            placeholder="Description du projet IA-SST"
          />
        </div>
      )}
    </div>
  );
};

export default AIEnhancedNameInput;