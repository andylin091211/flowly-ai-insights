
// This is a mock service that simulates the AI-powered natural language query processing
// In a real application, this would be replaced with actual API calls to DeepSeek or another LLM

import { ChartType } from "@/components/dashboard/VisualizationCard";

interface VisualizationResult {
  id: string;
  title: string;
  description: string;
  chartType: ChartType;
  data: any[];
  explanation: string;
}

// Sample data for different types of queries
const sampleData = {
  sales: [
    { name: "一月", value: 4000 },
    { name: "二月", value: 3000 },
    { name: "三月", value: 2000 },
    { name: "四月", value: 2780 },
    { name: "五月", value: 1890 },
    { name: "六月", value: 2390 },
  ],
  weekSales: [
    { name: "周一", value: 2400 },
    { name: "周二", value: 1800 },
    { name: "周三", value: 3200 },
    { name: "周四", value: 2900 },
    { name: "周五", value: 3800 },
    { name: "周六", value: 1200 },
    { name: "周日", value: 800 },
  ],
  traffic: [
    { name: "周一", value: 1200 },
    { name: "周二", value: 1400 },
    { name: "周三", value: 1600 },
    { name: "周四", value: 1200 },
    { name: "周五", value: 1500 },
    { name: "周六", value: 800 },
    { name: "周日", value: 600 },
  ],
  distribution: [
    { name: "产品A", value: 400 },
    { name: "产品B", value: 300 },
    { name: "产品C", value: 300 },
    { name: "产品D", value: 200 },
    { name: "产品E", value: 100 },
  ],
  conversion: [
    { name: "访问", value: 5000 },
    { name: "浏览", value: 3500 },
    { name: "加购", value: 2200 },
    { name: "付款", value: 1200 },
  ],
};

/**
 * Mock function to process natural language queries
 * @param query The user's natural language query
 * @returns A promise that resolves to a visualization result or null
 */
export const processNaturalLanguageQuery = async (query: string): Promise<VisualizationResult | null> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Convert query to lowercase for easier matching
  const lowercaseQuery = query.toLowerCase();
  
  // Simple pattern matching to simulate NLQ understanding
  if (lowercaseQuery.includes("销售") && lowercaseQuery.includes("趋势")) {
    if (lowercaseQuery.includes("周") || lowercaseQuery.includes("一周")) {
      return {
        id: Date.now().toString(),
        title: "周度销售趋势",
        description: "过去一周的销售趋势数据",
        chartType: "line",
        data: sampleData.weekSales,
        explanation: "分析显示周中期(周三至周五)的销售表现最好，周五达到峰值，而周末销售显著下降。建议关注周末销售策略，并分析周五销售成功的因素。",
      };
    } else {
      return {
        id: Date.now().toString(),
        title: "月度销售趋势",
        description: "过去半年的月度销售数据",
        chartType: "line",
        data: sampleData.sales,
        explanation: "数据显示销售额呈现下降后回升的趋势。一月销售表现最佳，随后三个月逐渐下滑，从五月开始有所回升。建议分析一月的成功策略，并研究二至四月销售下滑的原因。",
      };
    }
  } else if (lowercaseQuery.includes("产品") && (lowercaseQuery.includes("分布") || lowercaseQuery.includes("占比"))) {
    return {
      id: Date.now().toString(),
      title: "产品销售分布",
      description: "各产品销售占比分析",
      chartType: "pie",
      data: sampleData.distribution,
      explanation: "产品销售分布显示，产品A的销售占比最高，接近30%，产品B和产品C各占约20%，而产品E的销售比例最低，约为8%。建议重点关注产品A的成功因素，同时考虑优化产品E的销售策略。",
    };
  } else if (lowercaseQuery.includes("流量") || lowercaseQuery.includes("访问")) {
    return {
      id: Date.now().toString(),
      title: "网站流量分析",
      description: "过去一周的网站访问量统计",
      chartType: "bar",
      data: sampleData.traffic,
      explanation: "网站流量数据显示，周三的访问量最高，达到1600访问量，周末流量明显降低，周日仅有600访问量。建议在工作日，特别是周三，安排重要的内容发布或营销活动，以充分利用高流量时段。",
    };
  } else if (lowercaseQuery.includes("转化") || lowercaseQuery.includes("漏斗")) {
    return {
      id: Date.now().toString(),
      title: "用户转化漏斗",
      description: "用户从访问到购买的转化流程分析",
      chartType: "area",
      data: sampleData.conversion,
      explanation: "转化漏斗显示，从初始访问到最终付款，转化率约为24%。最大的转化损失发生在浏览到加购环节，建议优化产品展示和加购体验，以提高这一环节的转化率。",
    };
  }
  
  // No matching pattern found
  return null;
};
