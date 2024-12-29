import React from "react";

interface Props {
  workflow: {
    title: string;
    description: string;
    step: number;
  };
}

const WorkflowCard: React.FC<Props> = ({ workflow }) => {
  const { title, description, step } = workflow;

  return (
    <div className="flex flex-col items-center text-center max-w-xs">
      <div className="bg-[#9b7bf7] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
        {step}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default WorkflowCard;
