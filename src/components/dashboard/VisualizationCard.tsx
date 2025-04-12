
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  BarChart as ReBarChart,
  Bar,
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Edit, Star, Trash } from "lucide-react";

export type ChartType = "bar" | "line" | "area" | "pie";

interface VisualizationCardProps {
  id: string;
  title: string;
  description?: string;
  chartType: ChartType;
  data: any[];
  colors?: string[];
  isSaved?: boolean;
  onEdit?: (id: string) => void;
  onSave?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const defaultColors = ["#0F52BA", "#3B82F6", "#06B6D4", "#10B981", "#FBBF24", "#F87171"];

const VisualizationCard = ({
  id,
  title,
  description,
  chartType,
  data,
  colors = defaultColors,
  isSaved = false,
  onEdit,
  onSave,
  onDelete
}: VisualizationCardProps) => {
  const navigate = useNavigate();
  
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={240}>
            <ReBarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={colors[0]} />
            </ReBarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={240}>
            <ReLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </ReLineChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" fill={colors[0]} stroke={colors[0]} fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={240}>
            <RePieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={(entry) => entry.name}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-0 flex-grow">
        {renderChart()}
      </CardContent>
      <CardFooter className="pt-4 flex justify-between">
        <div className="flex space-x-2">
          {onEdit && (
            <Button variant="outline" size="icon" onClick={() => onEdit(id)}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onSave && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onSave(id)}
              className={isSaved ? "text-yellow-500" : ""}
            >
              <Star className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
            </Button>
          )}
        </div>
        {onDelete && (
          <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
            <Trash className="h-4 w-4 text-destructive" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default VisualizationCard;
