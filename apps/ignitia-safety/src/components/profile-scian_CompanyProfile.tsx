import React from 'react';

// ================================================
// 🏢 COMPANY PROFILE COMPONENT - MODULAIRE
// ================================================
// Localisation: src/components/profile-scian/CompanyProfile.tsx
// Description: Extraction de la section "Entreprise" du ProfileScian monolithique

interface CompanyData {
  name: string;
  scianCode: string;
  sector: string;
  size: string;
  address: string;
  phone: string;
  email: string;
}

interface CompanyProfileProps {
  companyData: CompanyData;
  onUpdateCompany: (field: string, value: string) => void;
}

// ================================================
// 📊 DONNÉES SECTEURS SCIAN (Extraites du fichier original)
// ================================================
const scianSectors = [
  { code: '11', name: 'Agriculture, foresterie, pêche et chasse' },
  { code: '21', name: 'Extraction minière, exploitation en carrière, et extraction de pétrole et de gaz' },
  { code: '22', name: 'Services publics' },
  { code: '23', name: 'Construction' },
  { code: '31-33', name: 'Fabrication' },
  { code: '41', name: 'Commerce de gros' },
  { code: '44-45', name: 'Commerce de détail' },
  { code: '48-49', name: 'Transport et entreposage' },
  { code: '51', name: 'Industrie de l\'information et industrie culturelle' },
  { code: '52', name: 'Finance et assurances' },
  { code: '53', name: 'Services immobiliers et services de location et de location à bail' },
  { code: '54', name: 'Services professionnels, scientifiques et techniques' },
  { code: '55', name: 'Gestion de sociétés et d\'entreprises' },
  { code: '56', name: 'Services administratifs, services de soutien, services de gestion des déchets et services d\'assainissement' },
  { code: '61', name: 'Services d\'enseignement' },
  { code: '62', name: 'Soins de santé et assistance sociale' },
  { code: '71', name: 'Arts, spectacles et loisirs' },
  { code: '72', name: 'Services d\'hébergement et de restauration' },
  { code: '81', name: 'Autres services (sauf les administrations publiques)' },
  { code: '91', name: 'Administrations publiques' }
];

const companySizes = [
  'Micro-entreprise (1-4 employés)',
  'Petite entreprise (5-49 employés)',
  'Moyenne entreprise (50-249 employés)',
  'Grande entreprise (250+ employés)'
];

// ================================================
// 🏢 COMPOSANT PRINCIPAL
// ================================================
const CompanyProfile: React.FC<CompanyProfileProps> = ({ 
  companyData, 
  onUpdateCompany 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Informations de l'entreprise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom de l'entreprise */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de l'entreprise
          </label>
          <input
            type="text"
            value={companyData.name}
            onChange={(e) => onUpdateCompany('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nom complet de l'entreprise"
          />
        </div>

        {/* Code SCIAN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code SCIAN
          </label>
          <input
            type="text"
            value={companyData.scianCode}
            onChange={(e) => onUpdateCompany('scianCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 23621"
          />
        </div>

        {/* Secteur d'activité */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secteur d'activité
          </label>
          <select
            value={companyData.sector}
            onChange={(e) => onUpdateCompany('sector', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner un secteur</option>
            {scianSectors.map((sector) => (
              <option key={sector.code} value={sector.code}>
                {sector.code} - {sector.name}
              </option>
            ))}
          </select>
        </div>

        {/* Taille de l'entreprise */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taille de l'entreprise
          </label>
          <select
            value={companyData.size}
            onChange={(e) => onUpdateCompany('size', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner la taille</option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Adresse */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse
          </label>
          <input
            type="text"
            value={companyData.address}
            onChange={(e) => onUpdateCompany('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Adresse complète"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            value={companyData.phone}
            onChange={(e) => onUpdateCompany('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(XXX) XXX-XXXX"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={companyData.email}
            onChange={(e) => onUpdateCompany('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="contact@entreprise.com"
          />
        </div>
      </div>

      {/* Informations contextuelles */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          📊 Classification SCIAN
        </h3>
        <p className="text-sm text-blue-700">
          Le <strong>Système de classification des industries de l'Amérique du Nord (SCIAN)</strong> permet 
          d'identifier les risques spécifiques à votre secteur d'activité et d'adapter les recommandations 
          d'IA-SST en conséquence.
        </p>
        {companyData.sector && (
          <div className="mt-2 p-2 bg-blue-100 rounded">
            <p className="text-sm font-medium text-blue-800">
              Secteur sélectionné: {companyData.sector}
            </p>
            <p className="text-xs text-blue-600">
              Les risques et recommandations seront personnalisés pour ce secteur.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;