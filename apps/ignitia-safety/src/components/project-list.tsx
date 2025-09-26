import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "../types/project";
import { getScoreColor } from "./criteria-slider";
import { SCIAN_SECTORS } from "../data/scian-sectors";
import PriorityBadge from "./priority-badge";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectList = ({ projects, onEdit, onDelete }: ProjectListProps) => {
  // Validation et nettoyage des données
  const validProjects = React.useMemo(() => {
    if (!Array.isArray(projects)) {
      console.warn('ProjectList: projects is not an array:', projects);
      return [];
    }

    return projects.filter((project, index) => {
      if (!project) {
        console.warn(`ProjectList: Project at index ${index} is null/undefined`);
        return false;
      }
      
      if (!project.id) {
        console.warn(`ProjectList: Project at index ${index} has no id:`, project);
        return false;
      }

      if (!project.name) {
        console.warn(`ProjectList: Project at index ${index} has no name:`, project);
        return false;
      }

      // Vérifier que criteria existe et est un objet
      if (!project.criteria || typeof project.criteria !== 'object') {
        console.warn(`ProjectList: Project ${project.name} has invalid criteria:`, project.criteria);
        return false;
      }

      return true;
    });
  }, [projects]);

  if (validProjects.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <p className="text-gray-500">Aucun projet ajouté pour le moment.</p>
        <p className="text-gray-500 text-sm mt-2">
          Utilisez le formulaire ci-dessus pour ajouter votre premier projet.
        </p>
      </div>
    );
  }

  const sortedProjects = React.useMemo(() => {
    return [...validProjects].sort((a, b) => {
      // D'abord par priorité sectorielle (si disponible)
      const aPriority = a.priority?.score || 0;
      const bPriority = b.priority?.score || 0;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      // Ensuite par score de critères
      const aScore = typeof a.score === 'number' ? a.score : 0;
      const bScore = typeof b.score === 'number' ? b.score : 0;
      
      return bScore - aScore;
    });
  }, [validProjects]);

  const getSectorName = (id?: string) => {
    if (!id) return "";
    const sector = SCIAN_SECTORS?.find(s => s.id === id);
    return sector ? sector.name : id;
  };

  const getCriteriaValue = (project: Project, criteriaKey: string): string => {
    try {
      if (!project || !project.criteria) return '-';
      
      const value = project.criteria[criteriaKey as keyof typeof project.criteria];
      
      if (typeof value === 'number') return value.toString();
      if (typeof value === 'string') return value;
      
      return '-';
    } catch (error) {
      console.error(`Error getting criteria ${criteriaKey} for project:`, project, error);
      return '-';
    }
  };

  const getProjectScore = (project: Project): number => {
    try {
      if (typeof project.score === 'number' && !isNaN(project.score)) {
        return project.score;
      }
      return 0;
    } catch (error) {
      console.error('Error getting project score:', project, error);
      return 0;
    }
  };

  return (
    <TooltipProvider>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rang</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead className="hidden md:table-cell">Impact</TableHead>
              <TableHead className="hidden md:table-cell">Excel.</TableHead>
              <TableHead className="hidden md:table-cell">Faisab.</TableHead>
              <TableHead className="hidden lg:table-cell">Gouv.</TableHead>
              <TableHead className="hidden lg:table-cell">Sécurité</TableHead>
              <TableHead className="hidden lg:table-cell">Accept.</TableHead>
              <TableHead className="hidden lg:table-cell">Péren.</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Secteur</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project, index) => {
              try {
                const projectScore = getProjectScore(project);
                
                return (
                  <TableRow key={project.id || index} className={index === 0 ? "bg-blue-50" : ""}>
                    <TableCell className="font-bold text-center">
                      {index + 1}
                      {index === 0 && (
                        <span className="block text-xs font-normal text-blue-600">Top</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate" title={project.name || 'Projet sans nom'}>
                        {project.name || 'Projet sans nom'}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getCriteriaValue(project, 'impact')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getCriteriaValue(project, 'excellence')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getCriteriaValue(project, 'faisabilite')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {getCriteriaValue(project, 'gouvernance')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {getCriteriaValue(project, 'securite')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {getCriteriaValue(project, 'acceptabilite')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {getCriteriaValue(project, 'perennite')}
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-base px-2 ${getScoreColor(projectScore).replace('bg-', 'bg-opacity-50 bg-')}`}>
                        {projectScore.toFixed(2)}
                      </Badge>
                      <div className="md:hidden mt-2 grid grid-cols-3 gap-1">
                        <span className="text-xs">I: {getCriteriaValue(project, 'impact')}</span>
                        <span className="text-xs">E: {getCriteriaValue(project, 'excellence')}</span>
                        <span className="text-xs">F: {getCriteriaValue(project, 'faisabilite')}</span>
                        <span className="text-xs">G: {getCriteriaValue(project, 'gouvernance')}</span>
                        <span className="text-xs">S: {getCriteriaValue(project, 'securite')}</span>
                        <span className="text-xs">A: {getCriteriaValue(project, 'acceptabilite')}</span>
                        <span className="text-xs">P: {getCriteriaValue(project, 'perennite')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {project.scianSectorId ? (
                        <span className="text-xs">{getSectorName(project.scianSectorId)}</span>
                      ) : (
                        <span className="text-xs text-gray-400">Non spécifié</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {project.priority && project.priority.score && project.priority.level ? (
                        <PriorityBadge 
                          score={project.priority.score}
                          level={project.priority.level}
                          size="sm"
                        />
                      ) : (
                        <span className="text-xs text-gray-500">Non définie</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit(project)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Modifier ce projet</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete(project.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Supprimer ce projet</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              } catch (error) {
                console.error('Error rendering project row:', project, error);
                return (
                  <TableRow key={project.id || index}>
                    <TableCell colSpan={13} className="text-center text-red-500">
                      Erreur d'affichage du projet: {project.name || 'Projet inconnu'}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default ProjectList;