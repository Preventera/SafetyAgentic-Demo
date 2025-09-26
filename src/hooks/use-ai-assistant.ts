import { useState, useCallback } from "react";
import { generateSSTIdeas } from "@/integrations/ai-service";

type Status = "idle" | "loading" | "error" | "success";

export function useAIAssistant() {
  const [status, setStatus] = useState<Status>("idle");
  const [output, setOutput] = useState<string>("");

  const askIdeas = useCallback(async (sectorSCIAN: string, sectorRisks: string[]) => {
    setStatus("loading");
    setOutput("");

    // ✅ prompt multi-ligne sans anti-slash parasite
    const prompt = `En tant qu'expert en IA et SST, génère 3 idées de projets d'IA pour le secteur SCIAN: ${sectorSCIAN}.
Objectifs:
1) Réduire les risques spécifiques: ${sectorRisks.join(", ")}
2) Améliorer la conformité réglementaire
3) Renforcer la culture de sécurité
4) Optimiser les processus de prévention
Pour chaque idée, fournis: Objectif, Technologies IA, Bénéfices SST, Complexité (1-5), Étapes d’implémentation (3-5).`;

    try {
      const text = await generateSSTIdeas(prompt);
      setOutput(text);
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
      setOutput(`Erreur IA: ${e?.message ?? e}`);
    }
  }, []);

  return { status, output, askIdeas };
}
