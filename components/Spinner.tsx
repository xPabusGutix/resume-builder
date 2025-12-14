import React from 'react';

export const Spinner: React.FC = () => (
  <span
    className="inline-block h-5 w-5 -ml-1 mr-3 animate-spin rounded-full border-2 border-white/30 border-t-white"
    aria-hidden="true"
  ></span>
);