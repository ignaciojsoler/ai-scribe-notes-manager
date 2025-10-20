import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: { path: string; label: string };
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, backTo, actions }: PageHeaderProps) => (
  <div className="mb-6">
    {backTo && (
      <Link 
        to={backTo.path}
        className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {backTo.label}
      </Link>
    )}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </div>
  </div>
);
