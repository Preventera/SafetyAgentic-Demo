import React, { useState } from 'react';
import { ExternalLink, Shield, Brain, Thermometer, Car, Eye, BarChart, Users, Zap, Award, Globe } from 'lucide-react';

const GenAISafetyHub = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const applications = [
    {
      id: 'safetyai-pro',
      title: 'SafetyAI Pro',
      description: 'Surveillance agentique HSE complète avec IA comportementale',
      icon: Shield,
      color: 'from-blue-600 to-blue-800',
      url: 'https://safetyai-pro-demo.netlify.app',
      status: 'Live Production',
      tags: ['IA Agentique', 'Surveillance', 'HSE'],
      metrics: '127 incidents prévenus'
    },
    {
      id: 'squadrai-climalert',
      title: 'SquadrAI ClimAlert', 
      description: 'Surveillance intelligente du stress thermique WBGT',
      icon: Thermometer,
      color: 'from-orange-600 to-red-600',
      url: 'https://squadrai-climalert-demo.netlify.app',
      status: 'Live Production',
      tags: ['Stress Thermique', 'WBGT', 'Climat'],
      metrics: 'WBGT 91.2°F détecté'
    },
    {
      id: 'hse-human-x',
      title: 'HSE Human X',
      description: 'Analyse des facteurs humains avec modèles HFACS',
      icon: Brain,
      color: 'from-purple-600 to-indigo-700',
      url: 'https://hse-human-x-demo.netlify.app',
      status: 'Live Production', 
      tags: ['Facteurs Humains', 'HFACS', 'Clustering'],
      metrics: 'Analyse comportementale'
    },
    {
      id: 'prudence-ai',
      title: 'PrudenceAI',
      description: 'Prévention routière intelligente basée sur IA générative',
      icon: Car,
      color: 'from-green-600 to-emerald-700',
      url: 'https://prudence-ai-demo.netlify.app',
      status: 'Live Production',
      tags: ['Sécurité Routière', 'MTQ', 'Prévention'],
      metrics: 'Standards MTQ intégrés'
    },
    {
      id: 'safetygraph',
      title: 'SafetyGraph',
      description: 'Visualisation et présentation de données HSE',
      icon: BarChart,
      color: 'from-cyan-600 to-blue-600',
      url: 'https://safetygraph-demo.netlify.app',
      status: 'Live Production',
      tags: ['Visualisation', 'Analytics', 'Rapports'],
      metrics: 'Dashboard graphiques'
    },
    {
      id: 'agentic-sst',
      title: 'Agentic SST Québec',
      description: 'Solutions SST conformes aux standards québécois',
      icon: Award,
      color: 'from-indigo-600 to-purple-700',
      url: 'https://agenticsst-quebec-demo.netlify.app',
      status: 'Live Production',
      tags: ['SST Québec', 'CNESST', 'Conformité'],
      metrics: 'Standards C-25'
    }
  ];

  const stats = [
    { label: 'Applications Déployées', value: '6+', icon: Globe },
    { label: 'Incidents Prévenus', value: '127+', icon: Shield },
    { label: 'Années d\'Expertise', value: '25+', icon: Award },
    { label: 'Secteurs Couverts', value: '8+', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="relative py-20 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-16 w-16 text-blue-400 mr-4" />
            <div>
              <h1 className="text-6xl font-bold text-white mb-2">
                GenAISafety
                <span className="text-blue-400"> × </span>
                Preventera
              </h1>
              <p className="text-xl text-blue-200">Intelligence Artificielle Comportementale pour la Sécurité</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Suite complète d'applications IA pour la prévention, l'analyse comportementale et la gestion des risques HSE. 
            25+ années d'expertise transformées en solutions technologiques avancées.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-full mb-2">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Applications Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Applications Live</h2>
          <p className="text-gray-300">Cliquez sur une application pour accéder à la démonstration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app) => {
            const IconComponent = app.icon;
            return (
              <div
                key={app.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(app.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => window.open(app.url, '_blank')}
              >
                <div className={`
                  relative p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm
                  bg-gradient-to-br ${app.color}/10 hover:${app.color}/20
                  transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                  ${hoveredCard === app.id ? 'ring-2 ring-blue-400/50' : ''}
                `}>
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      {app.status}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${app.color} mb-6`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">{app.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{app.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="text-sm text-blue-400 font-medium mb-6">{app.metrics}</div>

                  {/* Launch Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 font-mono">{app.url.replace('https://', '')}</span>
                    <div className="flex items-center text-blue-400 group-hover:text-blue-300">
                      <span className="text-sm font-medium mr-2">Lancer</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  {hoveredCard === app.id && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">Innovation Continue</h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              Développement agile avec déploiement automatisé. Nouvelles fonctionnalités et optimisations mises à jour régulièrement.
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">Standards C-25</div>
                <div className="text-sm text-gray-400">Conformité</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">IA Générative</div>
                <div className="text-sm text-gray-400">Technologie</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">Temps Réel</div>
                <div className="text-sm text-gray-400">Surveillance</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenAISafetyHub;