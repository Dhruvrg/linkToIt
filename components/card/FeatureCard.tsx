import React from "react";
import { Card, CardContent } from "../ui/card";

interface Props {
  feature: {
    title: string;
    description: string;
    icon: any;
  };
}

const FeatureCard: React.FC<Props> = ({ feature }) => {
  const { title, description, icon: Icon } = feature;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-[#9b7bf7] p-2 rounded-full mr-4">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
