import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div 
      className={`animate-pulse bg-slate-200 rounded ${className}`}
      aria-hidden="true"
    />
  );
};

export const ProductSkeleton = () => (
  <div className="flex flex-col space-y-4">
    <Skeleton className="aspect-square w-full rounded-2xl" />
    <div className="space-y-2 px-1">
      <Skeleton className="h-4 w-3/4 rounded" />
      <Skeleton className="h-3 w-1/2 rounded" />
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-16 rounded-lg" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
    <div className="space-y-3">
      <Skeleton className="h-5 w-full rounded-lg" />
      <Skeleton className="h-4 w-full rounded-lg" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  </div>
);

export default Skeleton;
