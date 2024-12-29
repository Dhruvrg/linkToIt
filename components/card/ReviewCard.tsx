import { Star } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Avatar from "../Avatar";

interface Props {
  review: {
    name: string;
    position: string;
    message: string;
    image: string;
  };
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  const { name, position, message, image } = review;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-5 mb-4">
          <Avatar src={image} />
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{position}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="flex text-yellow-400">
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
