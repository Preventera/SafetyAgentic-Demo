import React, { useState, useEffect } from 'react';

const SquadrAIClimAlert = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [wbgtData, setWbgtData] = useState({
    current: 90.5,
    heatIndex: 100.7,
    timeRemaining: 0,
    workersAtRisk: 3,
    totalWorkers: 18
  });

  const [zones, setZones] = useState([
    { 
      id: 1, 
      name: 'Toiture Est', 
      status: 'ROUGE', 
      wbgt: 94.5, 
      heatIndex: 100.7, 
      workers: '2/4',
      exposure: '45min',
      manager: 'M. Brown'
    },
    { 
      id: 2, 
      name: 'Atelier A', 
      status: 'JAUNE', 
      wbgt: 82.6, 
      heatIndex: 88.7, 
      workers: '5/8',
      exposure: '30min',
      manager: 'S. Wilson'
    },
    { 
      id: 3, 
      name: 'Bureau Administratif', 
      status: 'VERT', 
      wbgt: 75.6, 
      heatIndex: 78.4, 
      workers: '8/12',
      exposure: '0min',
      manager: 'A. Taylor'
    },
    { 
      id: 4, 
      name: 'Zone Extérieure Sud', 
      status: 'ORANGE', 
      wbgt: 89.2, 
      heatIndex: 98.8, 
      workers: '3/6',
      exposure: '40min',
      manager: 'R. Lee'
    }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'ROUGE', message: 'Risque coup de chaleur - Zone Toiture', time: '14:32', worker: 'John Smith (EMP_001)' },
    { id: 2, type: 'ORANGE', message: 'WBGT dépassé - Rotation requise', time: '14:28', worker: 'Atelier A' },
    { id: 3, type: 'JAUNE', message: 'Hydratation insuffisante détectée', time: '14:15', worker: 'Robert Davis (EMP_007)' }
  ]);

  const [environmentData, setEnvironmentData] = useState({
    airTemp: 95.4,
    globeTemp: 100.4,
    wetBulb: 84.3,
    humidity: 75,
    windSpeed: 5.1,
    solarRadiation: 850
  });

  const [forecasts, setForecasts] = useState([
    { time: '14:00', temp: 97, wbgt: 95.4, level: 'EXTRÊME' },
    { time: '15:00', temp: 99, wbgt: 97.0, level: 'EXTRÊME' },
    { time: '16:00', temp: 95, wbgt: 94.6, level: 'ÉLEVÉ' },
    { time: '17:00', temp: 91, wbgt: 90.5, level: 'ÉLEVÉ' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWbgtData(prev => ({
        ...prev,
        current: Math.max(85, Math.min(100, prev.current + (Math.random() - 0.5) * 2)),
        heatIndex: Math.max(90, Math.min(110, prev.heatIndex + (Math.random() - 0.5) * 3)),
        workersAtRisk: Math.max(0, Math.min(20, prev.workersAtRisk + (Math.random() > 0.7 ? 1 : 0)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ROUGE': return 'bg-red-600 text-white';
      case 'ORANGE': return 'bg-orange-500 text-white';
      case 'JAUNE': return 'bg-yellow-500 text-black';
      case 'VERT': return 'bg-green-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getZoneCardColor = (status) => {
    switch (status) {
      case 'ROUGE': return 'border-l-red-500 bg-red-50';
      case 'ORANGE': return 'border-l-orange-500 bg-orange-50';
      case 'JAUNE': return 'border-l-yellow-500 bg-yellow-50';
      case 'VERT': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const TabContent = ({ tab }) => {
    switch (tab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Alert Banner */}
            <div className="bg-red-600 text-white p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">⚠</div>
                <div>
                  <div className="font-bold">VIGILANCE ÉLEVÉE</div>
                  <div className="text-sm">WBGT: {wbgtData.current.toFixed(1)}°F • Repos requis: 35% • Zone: Toiture Est</div>
                </div>
              </div>
              <button className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded text-sm">
                Voir directives OSHA
              </button>
            </div>

            {/* Main Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-red-600">{wbgtData.current.toFixed(1)}°F</div>
                    <div className="text-gray-600">WBGT</div>
                    <div className="text-xs text-gray-500">TLV: 77.0°F • Écart: +{(wbgtData.current - 77).toFixed(1)}°F</div>
                  </div>
                  <div className="text-4xl text-red-500">🌡</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">{wbgtData.heatIndex.toFixed(1)}°F</div>
                    <div className="text-gray-600">Indice de chaleur</div>
                    <div className="text-xs text-gray-500">Zone ORANGE • Ajusté</div>
                  </div>
                  <div className="text-4xl text-orange-500">📈</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{wbgtData.timeRemaining}min</div>
                    <div className="text-gray-600">Temps restant</div>
                    <div className="text-xs text-gray-500">Travail/Repos: 65%/35%</div>
                  </div>
                  <div className="text-4xl text-blue-500">⏰</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{wbgtData.workersAtRisk}/{wbgtData.totalWorkers}</div>
                    <div className="text-gray-600">Travailleurs</div>
                    <div className="text-xs text-gray-500">À risque • Surveillance active</div>
                  </div>
                  <div className="text-4xl text-purple-500">👥</div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Environmental Conditions */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-blue-500 mr-2">🌡</span>
                  Conditions environnementales
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Température de l'air</span>
                    <span className="font-semibold">{environmentData.airTemp}°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Température du globe</span>
                    <span className="font-semibold">{environmentData.globeTemp}°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bulbe humide</span>
                    <span className="font-semibold">{environmentData.wetBulb}°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Humidité</span>
                    <span className="font-semibold">{environmentData.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vitesse du vent</span>
                    <span className="font-semibold">{environmentData.windSpeed} mph</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Radiation solaire</span>
                    <span className="font-semibold">{environmentData.solarRadiation} W/m²</span>
                  </div>
                </div>
              </div>

              {/* Evolution Chart Placeholder */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-green-500 mr-2">📈</span>
                  Évolution en temps réel
                </h3>
                <div className="h-32 bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-sm text-gray-600">Graphique WBGT, Indice chaleur, Humidité</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500 flex justify-center space-x-4">
                  <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>WBGT</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded-full mr-1"></span>Indice chaleur</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>Humidité</span>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-red-500 mr-2">🚨</span>
                  Dernières alertes
                </h3>
                <div className="space-y-3">
                  {alerts.map(alert => (
                    <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'ROUGE' ? 'border-red-500 bg-red-50' :
                      alert.type === 'ORANGE' ? 'border-orange-500 bg-orange-50' :
                      'border-yellow-500 bg-yellow-50'
                    }`}>
                      <div className="font-semibold text-sm">{alert.message}</div>
                      <div className="text-xs text-gray-600">{alert.time} • {alert.worker}</div>
                    </div>
                  ))}
                  <button className="text-blue-600 text-sm hover:underline">
                    Voir toutes les alertes →
                  </button>
                </div>
              </div>
            </div>

            {/* Zones Status Table */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="text-green-500 mr-2">📍</span>
                Status des zones de travail
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">ZONE</th>
                      <th className="text-left py-2">STATUS</th>
                      <th className="text-left py-2">WBGT</th>
                      <th className="text-left py-2">INDICE</th>
                      <th className="text-left py-2">TRAVAILLEURS</th>
                      <th className="text-left py-2">EXPOSITION</th>
                      <th className="text-left py-2">RESPONSABLE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zones.map(zone => (
                      <tr key={zone.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 font-medium">{zone.name}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(zone.status)}`}>
                            {zone.status}
                          </span>
                        </td>
                        <td className="py-3">{zone.wbgt}°F</td>
                        <td className="py-3">{zone.heatIndex}°F</td>
                        <td className="py-3">{zone.workers}</td>
                        <td className="py-3">{zone.exposure}</td>
                        <td className="py-3">{zone.manager}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                🔄 Mise à jour en temps réel • Dernière actualisation: 14:32
              </div>
            </div>
          </div>
        );

      case 'forecasts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">⛅ Module Prédictif Météorologique</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weather Forecasts */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Prévisions météorologiques</h3>
                <div className="grid grid-cols-4 gap-4">
                  {forecasts.map((forecast, index) => (
                    <div key={index} className={`p-4 rounded-lg text-center ${
                      forecast.level === 'EXTRÊME' ? 'bg-red-200 text-red-800' :
                      forecast.level === 'ÉLEVÉ' ? 'bg-orange-200 text-orange-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      <div className="font-bold">{forecast.time}</div>
                      <div className="text-2xl font-bold">{forecast.temp}°F</div>
                      <div className="text-xs">WBGT: {forecast.wbgt}°F</div>
                      <div className="text-xs font-semibold">{forecast.level}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-orange-100 rounded-lg">
                  <div className="font-semibold text-orange-800 mb-2">🌡 Alertes météo actives:</div>
                  <div className="text-sm space-y-1">
                    <div>🌡 Vague de chaleur (4h)</div>
                    <div>☀ UV extrême (6h)</div>
                  </div>
                </div>
              </div>

              {/* Work Planning */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">📅 Planification automatique du travail</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-100 rounded-lg border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">6:00 - 10:00</div>
                        <div className="text-sm">Conditions idéales pour le travail</div>
                        <div className="text-xs text-green-600">WBGT prévu: 79-82°F</div>
                      </div>
                      <div className="text-green-600 font-bold">OPTIMAL ✅ RECOMMANDÉ</div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-100 rounded-lg border-l-4 border-orange-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">10:00 - 16:00</div>
                        <div className="text-sm">Rotation des équipes obligatoire</div>
                        <div className="text-xs text-orange-600">WBGT prévu: 90-97°F</div>
                      </div>
                      <div className="text-orange-600 font-bold">SURVEILLANCE ⚠️ VIGILANCE</div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-100 rounded-lg border-l-4 border-red-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">16:00 - 18:00</div>
                        <div className="text-sm">Arrêt recommandé des activités extérieures</div>
                        <div className="text-xs text-red-600">WBGT prévu: 97-100°F</div>
                      </div>
                      <div className="text-red-600 font-bold">CRITIQUE 🚫 RESTRICTION</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">🤖 Recommandations automatisées IA</h3>
              <div className="mb-4">
                <div className="font-semibold text-blue-800 mb-2">💡 Plan de travail recommandé:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    Commencer les travaux de toiture à 6h00 (au lieu de 8h00)
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    Rotation des équipes toutes les 30min entre 14h-16h
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    Suspension des activités extérieures à partir de 16h00
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    Activer les abris refroidis zone Est à 13h00
                  </div>
                </div>
                
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                  Appliquer les recommandations
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs text-blue-700">
                <div className="flex items-center">
                  <span className="mr-2">💾</span>
                  Optimisation basée sur 3 années de données historiques
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🔄</span>
                  Réajustements toutes les 15 minutes
                </div>
              </div>
            </div>
          </div>
        );

      case 'zones':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">📍 Surveillance des Zones de Travail</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {zones.map(zone => (
                <div key={zone.id} className={`bg-white rounded-lg p-6 shadow-lg border-l-4 ${
                  zone.status === 'ROUGE' ? 'border-red-500' :
                  zone.status === 'ORANGE' ? 'border-orange-500' :
                  zone.status === 'JAUNE' ? 'border-yellow-500' :
                  'border-green-500'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{zone.name}</h3>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(zone.status)}`}>
                      {zone.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">WBGT</div>
                      <div className="font-bold text-lg">{zone.wbgt}°F</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Indice chaleur</div>
                      <div className="font-bold text-lg">{zone.heatIndex}°F</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Travailleurs</div>
                      <div className="font-bold">{zone.workers}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Exposition</div>
                      <div className="font-bold">{zone.exposure}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm">
                      <span className="text-gray-600">Responsable:</span>
                      <span className="font-medium ml-2">{zone.manager}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Zone Map Placeholder */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">🗺 Cartographie thermique avancée</h3>
              <div className="h-64 bg-gradient-to-br from-green-200 via-yellow-200 via-orange-200 to-red-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-2">🌡</div>
                  <div className="text-gray-700 font-semibold">Carte thermique des zones</div>
                  <div className="text-sm text-gray-600">Visualisation en temps réel des températures WBGT</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">⚖ Conformité Réglementaire</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-700 font-medium">OSHA Standards</div>
                <div className="text-sm text-gray-600">Gestion de la chaleur</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-700 font-medium">ISO 7243</div>
                <div className="text-sm text-gray-600">Ambiances chaudes</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-blue-600">90%</div>
                <div className="text-gray-700 font-medium">Réglementations</div>
                <div className="text-sm text-gray-600">Standards régionaux</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">📋 Rapports de Conformité</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">Rapport OSHA Mensuel</div>
                        <div className="text-sm text-gray-600">Septembre 2024</div>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                        Télécharger
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">Audit ISO 7243</div>
                        <div className="text-sm text-gray-600">Certification en cours</div>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">
                        Voir Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">📊 Métriques de Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Incidents thermiques évités</span>
                    <span className="font-bold text-green-600">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conformité réglementaire</span>
                    <span className="font-bold text-blue-600">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temps de réponse moyen</span>
                    <span className="font-bold text-purple-600">15s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI annuel</span>
                    <span className="font-bold text-green-600">326%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Contenu en développement...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <header className="bg-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center">
                <span className="mr-3">🌡</span>SquadrAI ClimAlert
              </h1>
              <p className="text-xl text-orange-100">Système intelligent de surveillance du stress thermique</p>
              <p className="text-sm text-orange-200">Protection avancée des travailleurs • Conformité OSHA en temps réel</p>
            </div>
            <div className="text-6xl">🌡</div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-0">
            {[
              { id: 'dashboard', label: '📊 Dashboard', name: 'Dashboard' },
              { id: 'forecasts', label: '⛅ Prévisions', name: 'Prévisions' },
              { id: 'zones', label: '📍 Zones', name: 'Zones' },
              { id: 'compliance', label: '⚖ Conformité', name: 'Conformité' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  currentTab === tab.id
                    ? 'border-orange-600 text-orange-600 bg-orange-50'
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

      {/* Footer */}
      <footer className="bg-orange-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-sm">
            🌡 Surveillance avancée WBGT • Alertes en temps réel • Développé selon les standards internationaux C-25
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SquadrAIClimAlert;