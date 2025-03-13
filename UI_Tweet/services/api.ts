import { Tweet,TweetAnalysis,TweetResponse ,AnalysisResponse } from "@/types/interface";

const API_BASE_URL = "http://localhost:5000"
// const API_BASE_URL = "https://tweet-mindless.onrender.com"
// const API_BASE_URL = ""



export const tweetService ={
    async generateTweets(prompt:string , tone : string , image?:File):Promise<Tweet[]>{
        try {
            const formData = new FormData();
            formData.append("prompt",prompt);
            formData.append("tone",tone);
            if(image){
                formData.append("image",image);
            }
            const response = await fetch(`${API_BASE_URL}/generate-tweets`,{
                method :"POST",
                body : formData
            });
            if(!response.ok) throw new Error("Failed to generate Tweets");
            
            const data:TweetResponse = await response.json();
            return data.tweets || [];
        } catch (error) {
            console.error("Error in generating tweets :", error);
            throw error;
            
        }
    },

    async postTweet(text:string , image ?:File):Promise<any>{
        try {
            const formData = new FormData();
            formData.append("text",text);
            if(image){
                formData.append("image",image);
            }

            const response = await fetch(`${API_BASE_URL}/post-tweet`,{
                method :"POST",
                body:formData
            });
            if(!response.ok)throw new Error("Failed to post tweet");

            return await response.json();
        } catch (error) {
            console.error("Error posting tweet",error)
            throw error;
            
        }
    },

    async analyseTweet (text:string, image? : File):Promise<TweetAnalysis>{
        try {
            const formData = new FormData();
            formData.append("text",text);
            if(image){
                formData.append("image",image);
            }
            const response = await fetch(`${API_BASE_URL}/analyze-tweet`,{
                method :"POST",
                body:formData,
            })
            if(!response.ok){
                throw new Error("Failed to analyze tweet");
            }
            return await response.json();

        } catch (error) {
            console.error("error Analyzing tweet :",error);
            throw error;
        }
    }
}