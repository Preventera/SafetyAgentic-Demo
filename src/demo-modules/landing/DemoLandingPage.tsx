import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DemoLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header Navigation */}
      <header className="fixed top-0 w-full bg-white/10 backdrop-blur-lg z-50 border-b border-white/20">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            IGNITIA<span className="text-purple-300"> Demo</span>
          </div>
          <div className="hidden md:flex space-x-6 text-white/90">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#modules" className="hover:text-white transition-colors">Modules</a>
          </div>
          <Link 
            to="/idea-generator" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors"
          >
            Essayer Maintenant
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 text-center text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Révolutionnez votre
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {' '}SST avec l'IA{' '}
              </span>
              Agentique
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              697,602 lésions CNESST analysées • Architecture multi-agents • Conformité québécoise intégrée
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link 
                to="/idea-generator"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
              >
                Générateur d'Idées IA-SST
              </Link>
              <Link 
                to="/analytics"
                className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-white/20"
              >
                Analytics 697K+ Lésions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 backdrop-blur">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 bg-white/10 rounded-2xl backdrop-blur"
            >
              <div className="text-4xl font-bold text-purple-300 mb-2">697,602</div>
              <div className="text-white/80">Lésions CNESST Analysées</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 bg-white/10 rounded-2xl backdrop-blur"
            >
              <div className="text-4xl font-bold text-blue-300 mb-2">5</div>
              <div className="text-white/80">Agents IA Spécialisés</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 bg-white/10 rounded-2xl backdrop-blur"
            >
              <div className="text-4xl font-bold text-green-300 mb-2">15</div>
              <div className="text-white/80">Secteurs SCIAN Couverts</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="p-6 bg-white/10 rounded-2xl backdrop-blur"
            >
              <div className="text-4xl font-bold text-yellow-300 mb-2">89%</div>
              <div className="text-white/80">Efficacité Validée STORM</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modules Showcase */}
      <section id="modules" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Explorez l'Écosystème IGNITIA
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Module 1: Générateur d'Idées */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-8 hover:bg-white/20 transition-all group cursor-pointer"
            >
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">Générateur d'Idées SST</h3>
              <p className="text-white/80 mb-6">
                IA générative connectée aux données CNESST pour inspiration intelligente de projets SST.
              </p>
              <Link 
                to="/idea-generator"
                className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors group-hover:translate-x-2 transform duration-300"
              >
                Explorer →
              </Link>
            </motion.div>

            {/* Module 2: Analytics Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-8 hover:bg-white/20 transition-all group cursor-pointer"
            >
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-4">Analytics Avancés HSE</h3>
              <p className="text-white/80 mb-6">
                Dashboards enrichis avec 697K+ lésions CNESST et données temps réel.
              </p>
              <Link 
                to="/analytics"
                className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors group-hover:translate-x-2 transform duration-300"
              >
                Analyser →
              </Link>
            </motion.div>

            {/* Module 3: IGNITIA Bridge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-8 hover:bg-white/20 transition-all group cursor-pointer"
            >
              <div className="text-6xl mb-4">🌉</div>
              <h3 className="text-2xl font-bold text-white mb-4">IGNITIA Bridge</h3>
              <p className="text-white/80 mb-6">
                Intégration complète SafeGraph avec orchestration d'agents IA spécialisés.
              </p>
              <Link 
                to="/ignitia-bridge"
                className="inline-flex items-center text-green-300 hover:text-green-200 transition-colors group-hover:translate-x-2 transform duration-300"
              >
                Connecter →
              </Link>
            </motion.div>

            {/* Module 4: Safety Agentic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-8 hover:bg-white/20 transition-all group cursor-pointer"
            >
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-4">Safety Agentic</h3>
              <p className="text-white/80 mb-6">
                Agents autonomes pour surveillance, prédiction et recommandations SST temps réel.
              </p>
              <Link 
                to="/cnesst-real"
                className="inline-flex items-center text-yellow-300 hover:text-yellow-200 transition-colors group-hover:translate-x-2 transform duration-300"
              >
                Découvrir →
              </Link>
            </motion.div>

            {/* Module 5: Profile SCIAN */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-8 hover:bg-white/20 transition-all group cursor-pointer"
            >
              <div className="text-6xl mb-4">🏭</div>
              <h3 className="text-2xl font-bold text-white mb-4">Profil SCIAN</h3>
              <p className="text-white/80 mb-6">
                Analyse sectorielle enrichie avec classification SCIAN et données CNESST contextualisées.
              </p>
              <Link 
                to="/profile-scian"
                className="inline-flex items-center text-pink-300 hover:text-pink-200 transition-colors group-hover:translate-x-2 transform duration-300"
              >
                Analyser →
              </Link>
            </motion.div>

            {/* Module 6: Models Library */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-8 hover:bg-white/20 transition-all group cursor-pointer"
            >
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-white mb-4">Bibliothèque Modèles</h3>
              <p className="text-white/80 mb-6">
                1000+ modèles IA-SST validés avec métriques de performance et cas d'usage sectoriels.
              </p>
              <Link 
                to="/models"
                className="inline-flex items-center text-indigo-300 hover:text-indigo-200 transition-colors group-hover:translate-x-2 transform duration-300"
              >
                Explorer →
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Prêt à Transformer votre Approche SST ?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Rejoignez l'écosystème IGNITIA et découvrez comment l'IA agentique peut révolutionner votre gestion de la santé et sécurité au travail.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              to="/idea-generator"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Commencer Maintenant
            </Link>
            <a 
              href="mailto:demo@preventera.com"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full text-lg font-semibold transition-all"
            >
              Planifier une Démo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/20 backdrop-blur">
        <div className="container mx-auto px-6 text-center text-white/60">
          <p>&copy; 2024 Preventera - IGNITIA Demo. Propulsé par l'IA Agentique.</p>
          <p className="mt-2">697,602 lésions CNESST • Recherches STORM validées • Architecture SafeGraph</p>
        </div>
      </footer>
    </div>
  );
};

export default DemoLandingPage;