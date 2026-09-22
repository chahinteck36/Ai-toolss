import React from 'react';
import { CategoryId } from '../../types';

interface CategoryVisualIconProps {
  categoryId: CategoryId | string;
  className?: string;
  isDarkMode?: boolean;
}

/**
 * Unified Micro-Visual Language for Adawatai categories.
 * Crafted with crisp, balanced SVG geometry representing each domain:
 * - Documents / PDF -> Folded document with page structure & conversion indicator
 * - Images / Processing -> Canvas frame with multi-layer overlays
 * - Academic / Research -> Academic cap paired with cited paper nodes
 * - AI Alternatives -> Bi-directional exchange nodes with neural spark
 * - Writing / Text -> Structured text block with editing nib
 * - Video -> Filmstrip keyframes with playhead
 * - Audio -> Symmetric acoustic soundwave bars
 * - Coding / Dev -> Terminal prompt with code brackets
 * - Productivity -> Modular task checklist & Kanban panels
 * - AI Search -> Knowledge graph node network with optical lens
 * - Chatbots -> Intelligent neural conversation nodes
 * - Translation -> Cross-language exchange bridges
 * - UI / Design -> Vector bezier handles and coordinate grid
 * - Education -> Structured knowledge hierarchy & learning compass
 */
export const CategoryVisualIcon: React.FC<CategoryVisualIconProps> = ({
  categoryId,
  className = 'w-6 h-6',
  isDarkMode = false
}) => {
  switch (categoryId) {
    case 'pdf_documents':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Back document */}
          <path d="M7 4h12l6 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" className="text-rose-500/20 fill-rose-500/10" />
          {/* Folded corner */}
          <polyline points="19 4 19 10 25 10" className="text-rose-600 dark:text-rose-400" />
          {/* Document Content lines */}
          <line x1="9" y1="14" x2="19" y2="14" className="text-rose-600 dark:text-rose-400" strokeWidth="2" />
          <line x1="9" y1="18" x2="16" y2="18" className="text-rose-600 dark:text-rose-400" strokeWidth="2" />
          {/* Badge indicator */}
          <circle cx="21" cy="21" r="4" className="text-rose-500 fill-rose-500/20" strokeWidth="1.5" />
          <path d="m19.5 21 1 1 2-2" className="text-rose-600 dark:text-rose-300" strokeWidth="1.5" />
        </svg>
      );

    case 'image_tools':
    case 'image_generation':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer Canvas Frame */}
          <rect x="4" y="5" width="24" height="22" rx="3" className="text-indigo-500/20 fill-indigo-500/10" />
          {/* Layer overlay */}
          <rect x="8" y="9" width="16" height="14" rx="2" className="text-indigo-600 dark:text-indigo-400" strokeWidth="1.8" />
          {/* Sun / focal node */}
          <circle cx="12" cy="13" r="2" className="text-amber-500 fill-amber-500" strokeWidth="1" />
          {/* Mountain / vector waves */}
          <path d="M9 21l4-4 3 3 5-5 3 3" className="text-indigo-600 dark:text-indigo-300" strokeWidth="1.8" />
        </svg>
      );

    case 'academic_scholar':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Academic Mortarboard Cap */}
          <polygon points="16 6 28 12 16 18 4 12" className="text-emerald-600 dark:text-emerald-400 fill-emerald-500/15" strokeWidth="2" />
          {/* Cap Base & Tassel */}
          <path d="M8 15v6c0 3 4 5 8 5s8-2 8-5v-6" className="text-emerald-600 dark:text-emerald-400" strokeWidth="1.8" />
          <path d="M28 12v7" className="text-amber-500 dark:text-amber-400" strokeWidth="2" />
          <circle cx="28" cy="20" r="1.5" className="text-amber-500 fill-amber-500" strokeWidth="1" />
        </svg>
      );

    case 'ai_alternatives':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Bidirectional Loop Arrows */}
          <path d="M6 12h14a4 4 0 0 1 4 4v1" className="text-purple-600 dark:text-purple-400" strokeWidth="2" />
          <polyline points="10 8 6 12 10 16" className="text-purple-600 dark:text-purple-400" strokeWidth="2" />
          <path d="M26 20H12a4 4 0 0 1-4-4v-1" className="text-indigo-600 dark:text-indigo-400" strokeWidth="2" />
          <polyline points="22 24 26 20 22 16" className="text-indigo-600 dark:text-indigo-400" strokeWidth="2" />
          {/* Sparkle node in center */}
          <circle cx="16" cy="16" r="2.5" className="text-amber-500 fill-amber-500" strokeWidth="1" />
        </svg>
      );

    case 'text_writing':
    case 'text_tools':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Document container */}
          <rect x="5" y="4" width="22" height="24" rx="3" className="text-blue-500/20 fill-blue-500/10" strokeWidth="1.8" />
          {/* Text blocks */}
          <line x1="9" y1="10" x2="23" y2="10" className="text-blue-600 dark:text-blue-400" strokeWidth="2" />
          <line x1="9" y1="15" x2="20" y2="15" className="text-blue-600 dark:text-blue-400" strokeWidth="2" />
          <line x1="9" y1="20" x2="16" y2="20" className="text-blue-600 dark:text-blue-400" strokeWidth="2" />
          {/* Pen / Quill Nib on bottom right */}
          <path d="M20 24l4-4 2 2-4 4z" className="text-indigo-600 fill-indigo-500/30" strokeWidth="1.5" />
        </svg>
      );

    case 'coding_dev':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Terminal Box */}
          <rect x="4" y="6" width="24" height="20" rx="3" className="text-cyan-500/20 fill-cyan-500/10" strokeWidth="1.8" />
          {/* Code Brackets */}
          <polyline points="10 13 7 16 10 19" className="text-cyan-600 dark:text-cyan-400" strokeWidth="2" />
          <polyline points="22 13 25 16 22 19" className="text-cyan-600 dark:text-cyan-400" strokeWidth="2" />
          <line x1="18" y1="12" x2="14" y2="20" className="text-indigo-600 dark:text-indigo-400" strokeWidth="2" />
        </svg>
      );

    case 'video_generation':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Filmstrip Frame */}
          <rect x="4" y="7" width="24" height="18" rx="3" className="text-rose-500/20 fill-rose-500/10" strokeWidth="1.8" />
          {/* Film perforations top/bottom */}
          <line x1="8" y1="7" x2="8" y2="11" className="text-rose-600 dark:text-rose-400" strokeWidth="1.5" />
          <line x1="16" y1="7" x2="16" y2="11" className="text-rose-600 dark:text-rose-400" strokeWidth="1.5" />
          <line x1="24" y1="7" x2="24" y2="11" className="text-rose-600 dark:text-rose-400" strokeWidth="1.5" />
          <line x1="8" y1="21" x2="8" y2="25" className="text-rose-600 dark:text-rose-400" strokeWidth="1.5" />
          <line x1="16" y1="21" x2="16" y2="25" className="text-rose-600 dark:text-rose-400" strokeWidth="1.5" />
          <line x1="24" y1="21" x2="24" y2="25" className="text-rose-600 dark:text-rose-400" strokeWidth="1.5" />
          {/* Play triangle */}
          <polygon points="14 13 19 16 14 19" className="text-rose-600 dark:text-rose-400 fill-rose-600 dark:fill-rose-400" strokeWidth="1.5" />
        </svg>
      );

    case 'audio_music':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Acoustic Waveform Bars */}
          <line x1="6" y1="13" x2="6" y2="19" className="text-amber-500" strokeWidth="2.5" />
          <line x1="11" y1="9" x2="11" y2="23" className="text-amber-600 dark:text-amber-400" strokeWidth="2.5" />
          <line x1="16" y1="6" x2="16" y2="26" className="text-indigo-600 dark:text-indigo-400" strokeWidth="2.5" />
          <line x1="21" y1="10" x2="21" y2="22" className="text-amber-600 dark:text-amber-400" strokeWidth="2.5" />
          <line x1="26" y1="14" x2="26" y2="18" className="text-amber-500" strokeWidth="2.5" />
        </svg>
      );

    case 'productivity':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Kanban / Checklist Board */}
          <rect x="5" y="5" width="22" height="22" rx="3" className="text-violet-500/20 fill-violet-500/10" strokeWidth="1.8" />
          <line x1="10" y1="11" x2="12" y2="11" className="text-emerald-500" strokeWidth="2.5" />
          <line x1="15" y1="11" x2="22" y2="11" className="text-slate-600 dark:text-slate-300" strokeWidth="2" />
          <line x1="10" y1="16" x2="12" y2="16" className="text-emerald-500" strokeWidth="2.5" />
          <line x1="15" y1="16" x2="20" y2="16" className="text-slate-600 dark:text-slate-300" strokeWidth="2" />
          <line x1="10" y1="21" x2="12" y2="21" className="text-violet-500" strokeWidth="2.5" />
          <line x1="15" y1="21" x2="18" y2="21" className="text-slate-600 dark:text-slate-300" strokeWidth="2" />
        </svg>
      );

    case 'search_research':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Lens & Knowledge Graph Nodes */}
          <circle cx="14" cy="14" r="8" className="text-sky-600 dark:text-sky-400 fill-sky-500/10" strokeWidth="2" />
          <line x1="20" y1="20" x2="27" y2="27" className="text-sky-600 dark:text-sky-400" strokeWidth="2.5" />
          <circle cx="13" cy="11" r="1.5" className="text-indigo-500 fill-indigo-500" strokeWidth="1" />
          <circle cx="16" cy="15" r="1.5" className="text-indigo-500 fill-indigo-500" strokeWidth="1" />
          <circle cx="10" cy="15" r="1.5" className="text-indigo-500 fill-indigo-500" strokeWidth="1" />
          <line x1="13" y1="11" x2="16" y2="15" className="text-slate-400" strokeWidth="1" />
          <line x1="13" y1="11" x2="10" y2="15" className="text-slate-400" strokeWidth="1" />
        </svg>
      );

    case 'chatbots':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Primary Speech Bubble */}
          <path d="M25 15a8 8 0 0 0-14.7-4.5A7 7 0 0 0 5 18c0 2.5 1.3 4.7 3.2 5.9L7 27l4-1.5c1.2.5 2.5.8 4 .8a8 8 0 0 0 10-11.3z" className="text-emerald-500/20 fill-emerald-500/10" strokeWidth="1.8" />
          {/* Neural dots */}
          <circle cx="12" cy="16" r="1.5" className="text-emerald-600 dark:text-emerald-400 fill-emerald-500" strokeWidth="1" />
          <circle cx="16" cy="16" r="1.5" className="text-emerald-600 dark:text-emerald-400 fill-emerald-500" strokeWidth="1" />
          <circle cx="20" cy="16" r="1.5" className="text-emerald-600 dark:text-emerald-400 fill-emerald-500" strokeWidth="1" />
        </svg>
      );

    case 'translation':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Language nodes */}
          <rect x="4" y="6" width="14" height="12" rx="2" className="text-lime-600 dark:text-lime-400 fill-lime-500/10" strokeWidth="1.8" />
          <text x="7.5" y="15" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="sans-serif">EN</text>
          <rect x="14" y="14" width="14" height="12" rx="2" className="text-emerald-600 dark:text-emerald-400 fill-emerald-500/10" strokeWidth="1.8" />
          <text x="17.5" y="23" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="sans-serif">ع</text>
          <path d="m15 9 3 3-3 3" className="text-indigo-600 dark:text-indigo-400" strokeWidth="1.5" />
        </svg>
      );

    case 'design_ui':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Palette & Bezier anchor points */}
          <rect x="5" y="5" width="22" height="22" rx="4" className="text-fuchsia-500/20 fill-fuchsia-500/10" strokeWidth="1.8" />
          <circle cx="10" cy="10" r="2" className="text-fuchsia-600 fill-fuchsia-600" strokeWidth="1" />
          <circle cx="22" cy="10" r="2" className="text-indigo-600 fill-indigo-600" strokeWidth="1" />
          <circle cx="10" cy="22" r="2" className="text-amber-500 fill-amber-500" strokeWidth="1" />
          <path d="M10 10C16 10 16 22 22 22" className="text-fuchsia-600 dark:text-fuchsia-400" strokeWidth="1.8" />
        </svg>
      );

    case 'education':
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Compass / Book Base */}
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" className="text-yellow-600 dark:text-yellow-400" strokeWidth="2" />
          <path d="M6.5 6H20v16H6.5A2.5 2.5 0 0 0 4 24.5V8a2 2 0 0 1 2-2z" className="text-yellow-500/20 fill-yellow-500/10" strokeWidth="1.8" />
          <line x1="11" y1="10" x2="16" y2="10" className="text-yellow-600 dark:text-yellow-400" strokeWidth="2" />
          <line x1="11" y1="14" x2="15" y2="14" className="text-yellow-600 dark:text-yellow-400" strokeWidth="2" />
          <circle cx="24" cy="10" r="3" className="text-amber-500 fill-amber-500/30" strokeWidth="1.5" />
        </svg>
      );

    case 'all':
    default:
      return (
        <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="5" width="8" height="8" rx="2" className="text-indigo-600 dark:text-indigo-400 fill-indigo-500/15" />
          <rect x="19" y="5" width="8" height="8" rx="2" className="text-indigo-600 dark:text-indigo-400 fill-indigo-500/15" />
          <rect x="5" y="19" width="8" height="8" rx="2" className="text-indigo-600 dark:text-indigo-400 fill-indigo-500/15" />
          <rect x="19" y="19" width="8" height="8" rx="2" className="text-indigo-600 dark:text-indigo-400 fill-indigo-500/15" />
        </svg>
      );
  }
};
