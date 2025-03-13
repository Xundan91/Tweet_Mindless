export interface Tweet {
    id: number;
    text: string;
}
  
export interface EngagementMetrics {
    viralProbability: number;
    likeabilityScore: number;
    retweetPotential: number;
}
  
export   interface PredictedRange {
    min: number;
    max: number;
}
  
export   interface PredictedPerformance {
    expectedLikes: PredictedRange;
    expectedRetweets: PredictedRange;
    expectedComments: PredictedRange;
}
  
export   interface OptimizationSuggestion{
    title: string;
    description: string;
    action: string;
}
  
export interface TweetAnalysis {
    engagementMetrics: EngagementMetrics;
    predictedPerformance: PredictedPerformance;
    optimizationSuggestions: OptimizationSuggestion[];
}



export interface TweetResponse{
    tweets? : Tweet[];
    [key:string]:any;
}
export interface AnalysisResponse{
    engagementMetrics:{
        viralProbability:number;
        likeabilityScore : number;
        retweetPotential :number;

    }
    predictictedPerformance:{
        expectedLikes :{min:number , max :number}; 
        expectedRetweet :{min:number , max :number}; 
        expectedComments :{min:number , max :number}; 
    }
    optimizationSuggestions: Array<{
        title :string;
        description :string ;
        action?:string;
    }>;
    [key:string]:any;
}