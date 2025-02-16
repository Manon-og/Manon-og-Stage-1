import React from "react";

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const HeaderTitle = ({ title, subtitle, children }: HeaderTitleProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between pb-6 gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold tracking-tight">{title}</p>
        <p className="text-sm text-zinc-400">{subtitle}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HeaderTitle;
