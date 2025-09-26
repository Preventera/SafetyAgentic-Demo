import { useState } from 'react';

export const useAIAssistantFallback = () => {
  const [status, setStatus] = useState('ready');
  const [output, setOutput] = useState('');

  const askIdeas = async () => {
    setStatus('generating');
    setOutput('🚀 Génération d\'idées en cours...');
    
    // Simulation pour test immédiat
    setTimeout(() => {
      setOutput(`✅ Idées générées avec succès !
      
1. Système de surveillance automatique des EPI
2. IA de détection des comportements à risque  
3. Assistant virtuel pour formations sécurité
4. Analyse prédictive des accidents du travail
5. Chatbot intelligent pour questions SST`);
      setStatus('ready');
    }, 2000);
  };

  return { status, output, askIdeas };
};