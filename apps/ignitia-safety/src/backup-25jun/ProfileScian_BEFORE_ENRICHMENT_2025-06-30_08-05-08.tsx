import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Building2, Users, Shield, Brain, AlertTriangle } from 'lucide-react';

// Interface pour les acteurs
interface Actor {
  id: string;
  name: string;
  role: string;
  type: 'COSS' | 'CSS' | 'RSS' | 'Travailleur' | 'Direction';
}

// Interface pour les projets IA
interface AIProject {
  id: string;
  name: string;
  description: string;
  status: 'Planifié' | 'En cours' | 'En test' | 'Déployé';
  category: string;
}

// Interface pour les politiques HSE
interface HSEPolicy {
  id: string;
  name: string;
  description: string;
  lastUpdate: string;
  status: 'Active' | 'En révision' | 'Brouillon';
}

const ProfileScian = () => {
  // État pour les informations de l'entreprise
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    scianCode: '',
    scianDescription: '',
    address: '',
    city: '',
    province: 'Québec',
    postalCode: '',
    phone: '',
    email: '',
    website: '',
    description: ''
  });

  // État pour les acteurs
  const [actors, setActors] = useState<Actor[]>([]);
  const [newActor, setNewActor] = useState({ name: '', role: '', type: 'COSS' as const });

  // État pour HSE
  const [hseData, setHseData] = useState({
    policies: [] as HSEPolicy[],
    certifications: [] as string[],
    managementSystem: '',
    riskAssessmentMethod: '',
    incidentReporting: false,
    emergencyPlan: false,
    trainingProgram: false,
    auditFrequency: '',
    complianceStatus: 'Conforme'
  });

  // État pour les projets IA
  const [aiProjects, setAiProjects] = useState<AIProject[]>([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'Planifié' as const,
    category: ''
  });

  // État pour l'évaluation de maturité
  const [maturityScores, setMaturityScores] = useState({
    dataGovernance: 3,
    aiReadiness: 3,
    processIntegration: 3,
    changeManagement: 3,
    riskManagement: 3
  });

  // État pour le profil de risques
  const [riskProfile, setRiskProfile] = useState({
    overallRiskLevel: 'Moyen',
    primaryRisks: [] as string[],
    riskControls: [] as string[],
    lastAssessment: '',
    nextAssessment: ''
  });

  const [activeTab, setActiveTab] = useState('entreprise');
  // Fonctions de gestion des acteurs
  const addActor = () => {
    if (newActor.name && newActor.role) {
      const actor: Actor = {
        id: Date.now().toString(),
        ...newActor
      };
      setActors([...actors, actor]);
      setNewActor({ name: '', role: '', type: 'COSS' });
    }
  };

  const removeActor = (id: string) => {
    setActors(actors.filter(actor => actor.id !== id));
  };

  // Fonctions de gestion des projets IA
  const addProject = () => {
    if (newProject.name && newProject.description) {
      const project: AIProject = {
        id: Date.now().toString(),
        ...newProject
      };
      setAiProjects([...aiProjects, project]);
      setNewProject({ name: '', description: '', status: 'Planifié', category: '' });
    }
  };

  const removeProject = (id: string) => {
    setAiProjects(aiProjects.filter(project => project.id !== id));
  };

  // Fonctions de gestion des politiques HSE
  const addPolicy = (policy: Omit<HSEPolicy, 'id'>) => {
    const newPolicy: HSEPolicy = {
      id: Date.now().toString(),
      ...policy
    };
    setHseData(prev => ({
      ...prev,
      policies: [...prev.policies, newPolicy]
    }));
  };

  const removePolicy = (id: string) => {
    setHseData(prev => ({
      ...prev,
      policies: prev.policies.filter(policy => policy.id !== id)
    }));
  };

  // Fonction de sauvegarde
  const handleSave = () => {
    const profileData = {
      companyInfo,
      actors,
      hseData,
      aiProjects,
      maturityScores,
      riskProfile,
      lastUpdated: new Date().toISOString()
    };
    
    // Ici vous pourriez sauvegarder dans Supabase ou localStorage
    localStorage.setItem('profileScian', JSON.stringify(profileData));
    alert('Profil sauvegardé avec succès !');
  };
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profil SCIAN</h1>
          <p className="text-gray-600 mt-2">Configuration complète de votre profil entreprise</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Sauvegarder le profil
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="entreprise" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Entreprise
          </TabsTrigger>
          <TabsTrigger value="acteurs" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Acteurs
          </TabsTrigger>
          <TabsTrigger value="hse" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            HSE
          </TabsTrigger>
          <TabsTrigger value="ia-maturite" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            IA & Maturité
          </TabsTrigger>
          <TabsTrigger value="risques" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Profil de risques
          </TabsTrigger>
        </TabsList>

        {/* ONGLET ENTREPRISE */}
        <TabsContent value="entreprise">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription>
                Renseignements généraux sur votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom complet de l'entreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code SCIAN
                  </label>
                  <input
                    type="text"
                    value={companyInfo.scianCode}
                    onChange={(e) => setCompanyInfo({...companyInfo, scianCode: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ex: 541330"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description SCIAN
                  </label>
                  <input
                    type="text"
                    value={companyInfo.scianDescription}
                    onChange={(e) => setCompanyInfo({...companyInfo, scianDescription: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ex: Services de génie-conseil"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={companyInfo.address}
                    onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Adresse complète"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={companyInfo.city}
                    onChange={(e) => setCompanyInfo({...companyInfo, city: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ville"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal
                  </label>
                  <input
                    type="text"
                    value={companyInfo.postalCode}
                    onChange={(e) => setCompanyInfo({...companyInfo, postalCode: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="G1A 1A1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(418) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Courriel
                  </label>
                  <input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="contact@entreprise.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description de l'entreprise
                  </label>
                  <textarea
                    value={companyInfo.description}
                    onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Description des activités principales..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ONGLET ACTEURS */}
        <TabsContent value="acteurs">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des acteurs SST</CardTitle>
              <CardDescription>
                Personnes responsables de la santé et sécurité au travail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Formulaire d'ajout d'acteur */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-3">Ajouter un acteur</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={newActor.name}
                      onChange={(e) => setNewActor({...newActor, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom complet"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rôle/Fonction
                    </label>
                    <input
                      type="text"
                      value={newActor.role}
                      onChange={(e) => setNewActor({...newActor, role: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Titre du poste"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type d'acteur
                    </label>
                    <select
                      value={newActor.type}
                      onChange={(e) => setNewActor({...newActor, type: e.target.value as Actor['type']})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="COSS">COSS</option>
                      <option value="CSS">CSS</option>
                      <option value="RSS">RSS</option>
                      <option value="Travailleur">Travailleur</option>
                      <option value="Direction">Direction</option>
                    </select>
                  </div>
                </div>
                <Button onClick={addActor} className="mt-3 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter l'acteur
                </Button>
              </div>

              {/* Liste des acteurs */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Acteurs enregistrés ({actors.length})</h3>
                {actors.map((actor) => (
                  <div key={actor.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {actor.type}
                      </Badge>
                      <div>
                        <div className="font-medium text-gray-900">{actor.name}</div>
                        <div className="text-sm text-gray-600">{actor.role}</div>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeActor(actor.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {actors.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun acteur enregistré. Ajoutez votre premier acteur ci-dessus.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ONGLET HSE */}
        <TabsContent value="hse">
          <Card>
            <CardHeader>
              <CardTitle>Système de gestion HSE</CardTitle>
              <CardDescription>
                Configuration de votre système de santé et sécurité au travail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Politiques et procédures */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Politiques SST</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Système de gestion
                    </label>
                    <select
                      value={hseData.managementSystem}
                      onChange={(e) => setHseData({...hseData, managementSystem: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionner un système</option>
                      <option value="ISO 45001">ISO 45001</option>
                      <option value="Programme de prévention CNESST">Programme de prévention CNESST</option>
                      <option value="Système interne">Système interne</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Statut de conformité
                    </label>
                    <select
                      value={hseData.complianceStatus}
                      onChange={(e) => setHseData({...hseData, complianceStatus: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Conforme">Conforme</option>
                      <option value="En cours de mise en conformité">En cours de mise en conformité</option>
                      <option value="Non conforme">Non conforme</option>
                    </select>
                  </div>
                </div>

                {/* Cases à cocher pour les éléments HSE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hseData.incidentReporting}
                        onChange={(e) => setHseData({...hseData, incidentReporting: e.target.checked})}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Système de signalement des incidents</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hseData.emergencyPlan}
                        onChange={(e) => setHseData({...hseData, emergencyPlan: e.target.checked})}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Plan d'urgence établi</span>
                    </label>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hseData.trainingProgram}
                        onChange={(e) => setHseData({...hseData, trainingProgram: e.target.checked})}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Programme de formation SST</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
       {/* ONGLET IA & MATURITÉ */}
        <TabsContent value="ia-maturite">
          <div className="space-y-6">
            {/* Projets IA */}
            <Card>
              <CardHeader>
                <CardTitle>Projets d'IA en SST</CardTitle>
                <CardDescription>
                  Gestion de vos initiatives d'intelligence artificielle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Formulaire d'ajout de projet */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-3">Ajouter un projet IA</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom du projet
                      </label>
                      <input
                        type="text"
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nom du projet IA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Catégorie
                      </label>
                      <input
                        type="text"
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ex: Prédictif, Vision, NLP"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Description du projet et de ses objectifs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Statut
                      </label>
                      <select
                        value={newProject.status}
                        onChange={(e) => setNewProject({...newProject, status: e.target.value as AIProject['status']})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Planifié">Planifié</option>
                        <option value="En cours">En cours</option>
                        <option value="En test">En test</option>
                        <option value="Déployé">Déployé</option>
                      </select>
                    </div>
                  </div>
                  <Button onClick={addProject} className="mt-3 bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter le projet
                  </Button>
                </div>

                {/* Liste des projets */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Projets enregistrés ({aiProjects.length})</h3>
                  {aiProjects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-gray-900">{project.name}</h4>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {project.status}
                            </Badge>
                            {project.category && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                {project.category}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{project.description}</p>
                        </div>
                        <Button
                          onClick={() => removeProject(project.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:border-red-300 ml-4"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {aiProjects.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucun projet IA enregistré. Ajoutez votre premier projet ci-dessus.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Évaluation de maturité */}
            <Card>
              <CardHeader>
                <CardTitle>Évaluation de maturité IA</CardTitle>
                <CardDescription>
                  Évaluez votre niveau de maturité sur les aspects clés de l'IA (1-5)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(maturityScores).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-700">
                        {key === 'dataGovernance' && 'Gouvernance des données'}
                        {key === 'aiReadiness' && 'Préparation à l\'IA'}
                        {key === 'processIntegration' && 'Intégration des processus'}
                        {key === 'changeManagement' && 'Gestion du changement'}
                        {key === 'riskManagement' && 'Gestion des risques IA'}
                      </label>
                      <span className="text-sm font-medium text-gray-900">{value}/5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={value}
                      onChange={(e) => setMaturityScores({
                        ...maturityScores,
                        [key]: parseInt(e.target.value)
                      })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ONGLET PROFIL DE RISQUES */}
        <TabsContent value="risques">
          <Card>
            <CardHeader>
              <CardTitle>Profil de risques SST</CardTitle>
              <CardDescription>
                Évaluation et gestion des risques en santé et sécurité au travail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Niveau de risque global */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Niveau de risque global
                  </label>
                  <select
                    value={riskProfile.overallRiskLevel}
                    onChange={(e) => setRiskProfile({...riskProfile, overallRiskLevel: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Faible">Faible</option>
                    <option value="Moyen">Moyen</option>
                    <option value="Élevé">Élevé</option>
                    <option value="Critique">Critique</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dernière évaluation
                  </label>
                  <input
                    type="date"
                    value={riskProfile.lastAssessment}
                    onChange={(e) => setRiskProfile({...riskProfile, lastAssessment: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Risques primaires */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risques primaires identifiés
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Chutes de hauteur',
                    'Machines et équipements',
                    'Substances chimiques',
                    'Bruit et vibrations',
                    'Troubles musculo-squelettiques',
                    'Stress et fatigue',
                    'Incendie et explosion',
                    'Véhicules et transport',
                    'Espaces confinés',
                    'Électricité',
                    'Radiations',
                    'Agents biologiques'
                  ].map((risk) => (
                    <label key={risk} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={riskProfile.primaryRisks.includes(risk)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRiskProfile({
                              ...riskProfile,
                              primaryRisks: [...riskProfile.primaryRisks, risk]
                            });
                          } else {
                            setRiskProfile({
                              ...riskProfile,
                              primaryRisks: riskProfile.primaryRisks.filter(r => r !== risk)
                            });
                          }
                        }}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      {risk}
                    </label>
                  ))}
                </div>
              </div>

              {/* Mesures de contrôle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesures de contrôle en place
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Équipements de protection individuelle (EPI)',
                    'Formation et sensibilisation',
                    'Procédures de travail sécuritaires',
                    'Inspections régulières',
                    'Maintenance préventive',
                    'Surveillance médicale',
                    'Signalisation de sécurité',
                    'Systèmes d\'alarme et détection'
                  ].map((control) => (
                    <label key={control} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={riskProfile.riskControls.includes(control)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRiskProfile({
                              ...riskProfile,
                              riskControls: [...riskProfile.riskControls, control]
                            });
                          } else {
                            setRiskProfile({
                              ...riskProfile,
                              riskControls: riskProfile.riskControls.filter(c => c !== control)
                            });
                          }
                        }}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      {control}
                    </label>
                  ))}
                </div>
              </div>

              {/* Prochaine évaluation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prochaine évaluation planifiée
                </label>
                <input
                  type="date"
                  value={riskProfile.nextAssessment}
                  onChange={(e) => setRiskProfile({...riskProfile, nextAssessment: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileScian; 