import React, { useState, useEffect } from 'react';

const SafetyAIPro = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [metrics, setMetrics] = useState({
    incidents: 127,
    riskScore: 8.2,
    agentsActive: 15
  });
  const [notifications, setNotifications] = useState([]);

  // Auto-update metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        incidents: Math.random() > 0.7 ? prev.incidents + 1 : prev.incidents,
        riskScore: Math.max(0, Math.min(10, parseFloat(prev.riskScore) + (Math.random() - 0.5) * 0.5)).toFixed(1),
        agentsActive: Math.max(10, Math.min(20, prev.agentsActive + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const simulateIncident = () => {
    const incidents = [
      "🚨 Alerte: Température critique détectée en Zone A!",
      "⚡ Attention: Vibrations anormales sur équipement B-402!",
      "🔥 Urgent: Début d'incendie détecté en Zone stockage!",
      "💨 Alerte: Fuite de gaz détectée - Évacuation recommandée!"
    ];
    const randomNotification = incidents[Math.floor(Math.random() * incidents.length)];
    showNotification(randomNotification, 'danger');
    setMetrics(prev => ({ ...prev, incidents: prev.incidents + 1 }));
  };

  const generateReport = () => {
    showNotification("📊 Rapport automatique généré avec succès!", 'success');
    setTimeout(() => {
      alert("Rapport HSE généré avec:\n• 15 incidents analysés\n• 8 actions correctives identifiées\n• 3 recommandations prioritaires\n• Conformité réglementaire: 98.5%");
    }, 1000);
  };

  const TabContent = ({ tab }) => {
    switch (tab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Dashboard Central - Vue d'Ensemble Temps Réel</h2>
            
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-blue-600">{metrics.incidents}</div>
                <div className="text-gray-600">Incidents Prévenus</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-blue-600">{metrics.riskScore}</div>
                <div className="text-gray-600">Score de Risque Global</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-blue-600">{metrics.agentsActive}</div>
                <div className="text-gray-600">Agents IA Actifs</div>
              </div>
            </div>

            {/* Main Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">🎯 Surveillance des Risques en Temps Réel</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-red-50 border-l-4 border-red-500 rounded-lg hover:translate-x-1 transition-transform">
                    <div className="text-2xl mr-4">⚠️</div>
                    <div className="flex-1">
                      <strong>Zone A - Atelier Métallurgie</strong><br />
                      <small>Température anormale détectée - Intervention recommandée</small>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">Urgent</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg hover:translate-x-1 transition-transform">
                    <div className="text-2xl mr-4">⚡</div>
                    <div className="flex-1">
                      <strong>Équipement B-402</strong><br />
                      <small>Vibrations au-dessus du seuil - Maintenance préventive planifiée</small>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">Attention</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-green-50 border-l-4 border-green-500 rounded-lg hover:translate-x-1 transition-transform">
                    <div className="text-2xl mr-4">✅</div>
                    <div className="flex-1">
                      <strong>Zone C - Stockage</strong><br />
                      <small>Tous les paramètres dans les normes</small>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">OK</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={simulateIncident}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors hover:shadow-lg"
                  >
                    🚨 Simuler Incident
                  </button>
                  <button
                    onClick={generateReport}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors hover:shadow-lg"
                  >
                    📊 Rapport Automatique
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">🔔 Alertes Actives</h3>
                
                <div className="space-y-4">
                  <div>
                    <strong>Agent de Prédiction:</strong><br />
                    <small>Risque d'accident dans 2h - Probabilité: 78%</small>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <strong>Agent de Maintenance:</strong><br />
                    <small>Remplacement pièce recommandé - Criticité: Moyenne</small>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-yellow-500 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mt-4">📈 Actions Automatisées Récentes</h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>✅ Arrêt automatique ligne 3</li>
                      <li>✅ Notification équipe sécurité</li>
                      <li>✅ Mise à jour protocole</li>
                      <li>⏳ Analyse post-incident en cours...</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'modules':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔧 Modules Fonctionnels Essentiels</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">🎯 Module de Surveillance des Risques</h3>
                <p className="font-medium mb-2">Fonctionnalités:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Monitoring IoT en temps réel (capteurs, caméras)</li>
                  <li>Analyse prédictive des tendances</li>
                  <li>Cartographie dynamique des risques</li>
                  <li>Corrélation multi-sources de données</li>
                </ul>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Démontrer
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">🔔 Système de Notifications Intelligentes</h3>
                <p className="font-medium mb-2">Fonctionnalités:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Alertes contextuelles personnalisées</li>
                  <li>Escalade automatique selon criticité</li>
                  <li>Canaux multi-supports (SMS, email, app)</li>
                  <li>Accusés de réception intelligents</li>
                </ul>
                <button
                  onClick={() => showNotification("🔔 Système de notification activé - Test réussi!", 'warning')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Tester Alerte
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">📚 Gestion Documentaire Intelligente</h3>
                <p className="font-medium mb-2">Fonctionnalités:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Recherche sémantique dans les procédures</li>
                  <li>Mise à jour automatique des documents</li>
                  <li>Versioning et traçabilité complète</li>
                  <li>Suggestions de révisions basées sur incidents</li>
                </ul>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Recherche IA
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">🔍 Analyse d'Incidents Avancée</h3>
                <p className="font-medium mb-2">Fonctionnalités:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Reconstruction automatique des événements</li>
                  <li>Analyse des causes racines par IA</li>
                  <li>Identification des patterns récurrents</li>
                  <li>Recommandations préventives personnalisées</li>
                </ul>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Analyser Incident
                </button>
              </div>
            </div>
          </div>
        );

      case 'ai-agents':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🤖 Capacités d'IA Agentique Avancées</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-4">🧠 Agent de Raisonnement Contextuel</h3>
                <p className="font-medium mb-2">Capacités:</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Analyse multi-dimensionnelle des situations</li>
                  <li>Raisonnement causal et inférence</li>
                  <li>Adaptation aux contextes spécifiques</li>
                  <li>Prise en compte des facteurs humains</li>
                </ul>
                <p className="font-medium">Performance: 94.7% de précision dans les prédictions</p>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-4">📚 Agent d'Apprentissage Continu</h3>
                <p className="font-medium mb-2">Capacités:</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Apprentissage par renforcement en temps réel</li>
                  <li>Adaptation aux nouveaux patterns</li>
                  <li>Amélioration continue des modèles</li>
                  <li>Intégration de feedback humain</li>
                </ul>
                <p className="font-medium">Performance: +12% d'amélioration mensuelle</p>
              </div>

              <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-4">🤝 Agent de Coordination Multi-Agent</h3>
                <p className="font-medium mb-2">Capacités:</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Orchestration de 15+ agents spécialisés</li>
                  <li>Résolution de conflits de décision</li>
                  <li>Optimisation des ressources partagées</li>
                  <li>Communication inter-agents en langage naturel</li>
                </ul>
                <p className="font-medium">Performance: Temps de réponse {'<'} 2 secondes</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-4">🔮 Agent de Prédiction Avancée</h3>
                <p className="font-medium mb-2">Capacités:</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Modèles prédictifs deep learning</li>
                  <li>Analyse de séries temporelles complexes</li>
                  <li>Détection d'anomalies subtiles</li>
                  <li>Prédictions probabilistes multi-horizons</li>
                </ul>
                <p className="font-medium">Performance: Horizon de prédiction jusqu'à 72h</p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Contenu en développement...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🤖 SafetyAI Pro</h1>
            <p className="text-xl text-gray-600">Application Agentique Avancée pour la Gestion HSE</p>
            <p className="text-sm text-gray-500 italic">Propulsée par l'IA Générative et les Agents Autonomes</p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-0">
            {[
              { id: 'dashboard', label: '📊 Dashboard', name: 'Dashboard' },
              { id: 'modules', label: '🔧 Modules', name: 'Modules' },
              { id: 'ai-agents', label: '🤖 Agents IA', name: 'Agents IA' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  currentTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <TabContent tab={currentTab} />
      </main>

      {/* Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg text-white font-medium animate-slide-in ${
              notification.type === 'success' ? 'bg-green-600' :
              notification.type === 'warning' ? 'bg-yellow-600' :
              notification.type === 'danger' ? 'bg-red-600' : 'bg-blue-600'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SafetyAIPro;