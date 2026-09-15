import { KnowledgeArticle } from '../types';
import { article1FreeAiTools } from './article1FreeAiTools';
import { article2AcademicResearch } from './article2AcademicResearch';
import { article3SummarizingPdfs } from './article3SummarizingPdfs';
import { article4NoteTakingTools } from './article4NoteTakingTools';
import { article5PresentationTools } from './article5PresentationTools';

export {
  article1FreeAiTools,
  article2AcademicResearch,
  article3SummarizingPdfs,
  article4NoteTakingTools,
  article5PresentationTools
};

export const STUDENT_CLUSTER_ARTICLES: KnowledgeArticle[] = [
  article1FreeAiTools,
  article2AcademicResearch,
  article3SummarizingPdfs,
  article4NoteTakingTools,
  article5PresentationTools
];
