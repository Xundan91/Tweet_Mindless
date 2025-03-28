'use client';
import {Badge} from '@/components/ui/badge'
import { Bot, Clock, Crown,BarChart, X, ImageIcon, FileInput, Smile, Sparkles, Edit2 } from 'lucide-react';
import { DashboardNav } from '@/components/dashboard-nav';
import { Toaster } from '@/components/ui/toaster';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {Button} from '@/components/ui/button'
import Link from 'next/link';
import { Tabs } from '@/components/ui/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@radix-ui/react-avatar';
import { Textarea } from '@/components/ui/textarea';
import { Tweet,TweetAnalysis } from '@/types/interface';
import EmojiPicker from 'emoji-picker-react';
import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import { SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { useImageUpload } from '@/hooks/useImageUpload';

export default function Pro() {
    const router = useRouter();
    const { data: session, status } = useSession();
    
    const [prompt , SetPrompt] = useState<String>("")
    const [tone , SetTone] = useState<String>("casual")
    const [model , setmodel] = useState<string>("gemini")
    const [tweets , setTweets]  = useState<Tweet[]>([]);

    const [editableContent,setEditableContent] = useState<string[]>([]);
    const [IsGenerating, setIsGenerating] = useState<boolean>(false);
    const [isAnalyzing , setIsAnalyzing] = useState<boolean>(false);
    const [tweetAnalysis , setTweetAnalysis] = useState<TweetAnalysis | null>(null);
    const analyseFileInputRef = useRef<HTMLInputElement>(null);
    const [isSharing , setIsSharing] = useState<boolean>(false);
    const [showEmojiPicker ,setShowEmojiPicker] = useState(false);
    const [IsGlobeActive, setIsGlobeActive] = useState<boolean>(false);
    //custom hook baby
    const {selectedImage , previewUrl , fileInputRef , handleImageChange, handleImageClick , clearImage} = useImageUpload()
    const analyseImageUpload = useImageUpload();
    const pickerRef = useRef<HTMLDivElement>(null);

    /////////////////////////////////////////////

    
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
            setShowEmojiPicker(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []); 
      /////
    //auth baby most Important 
    useEffect(() => {
      if (status === 'authenticated') {
        const userType = session?.user?.userType;
        console.log(userType)
        if (userType !== 'free' && userType !== 'premium') {

          router.push(`/dashboard/${userType}`);
        }
        if(userType ==='premium'){
          router.push(`/dashboard/${userType}`)
        }
        if(userType === 'free' ){
          router.push(`/dashboard/${userType}`)
        }
      } 
      else if (status === 'unauthenticated') {
        router.push('/login');
      }
    }, [status, session, router]);

  if (status === 'loading' || (status === 'authenticated' && session?.user?.userType !== 'pro' && session?.user?.userType !== 'premium')) {
    return <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>;
  }
  //////////////////////////////////////////////
  //handle Emoji selection

  const handleEmojiSelect = (emojiData :{emoji:string})=>{
    SetPrompt((prev)=>prev +emojiData.emoji);
    setShowEmojiPicker(false);

  }

  return (
    <div className='min-h-screen bg-background'><DashboardNav />
    <main className='container mx-auto px-4 py-8'>
      <Toaster/>
      <div className='max-w-4xl mx-auto'>
        <div className=' flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold mb-2'>
              Tweet Generator
            </h1>
            <div className='flex items-center'>
              <p className='text-muted-foreground'>
                Create Engaging tweet with AI assistance
              </p>
              <Badge variant = 'outline' className = 'ml-2 bg-primary/10 text-primary'>
              <Crown className="mr-1 h-3 w-3" /> Pro plan
              </Badge>
            </div>
          </div>
          <div className='flex items-center gap-2 sm:gap-4'>
            <Button variant ="outline" size = "sm" onClick={()=>router.push("/dashboard/pro/history")}>
              <Clock className = 'mr-2 h-4 w-4' />
              <span > History
              </span>
              </Button>
          </div>
        </div>

        <Tabs defaultValue = "generate" className = "mb-8">
          <TabsList className = "w-full flex gap-2 bg-transparent mb-8 p-1 border rounded-lg">
            <TabsTrigger value = "generate" className='flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all'>
              <Bot className = "sm:mr-2 h-5 w-5"/>
              <span className='hidden sm:inline' >Generate</span>
            </TabsTrigger>
            <TabsTrigger value = "analyse" className='flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all'>
              <BarChart className = "sm:mr-2 h-5 w-5"/>
              <span className='hidden sm:inline'>Analyze</span>
            </TabsTrigger>
          </TabsList>
          {/* <TabsContent value = 'generate'>
            <div>
              <div className='space-y-6'>
                <Card className = "border-2 border-primary/10">
                 <CardContent className='p-4 sm:p-6'>
                    <div className='flex flex-col sm:flex-row items-start gap-4 mb-4' >
                      <Avatar className='h-10 w-10 hidden sm:flex'>
                        <img src='https://github.com/shadcn.png' alt ="profile"/>

                      </Avatar>
                      <div className='flex-1 w-full'>
                        <Textarea placeholder = "What would you like to tweet about ?" className = 'min-h-[120px] text-lg resize-none border-none focus-visible:ring-0 p-0 bg-transparent'
                        value= {prompt}
                        onChange={(e)=>SetPrompt(e.target.value)}/>
                        {previewUrl && (
                          <div className='mt-4 relative rounded-lg overflow-hidden border'>
                            <img src = {previewUrl} alt="selected"
                            className='max-h-64 w-auto object-contain mx-auto'/>
                            <Button variant="ghost" size = 'sm' className='absolute top-2 right-2 p1 h-18 w-8 bg-black/50 hover:bg-black text-white rounded-full'
                            onClick={clearImage}>
                            <X className = "h-4 w-4"/>

                            </Button>
                            </div>
                        )}
                        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 border-t pt-4'>
                          <div className='flex items-center gap-2'>
                            <Button  variant= 'ghost' size= 'sm' onClick={handleImageClick}>
                              <ImageIcon className='h-5 w-5 text-primary'/>

                            </Button>
                              <input type="file" ref= {fileInputRef}
                              onChange={handleImageChange}
                              accept='image/*'
                              className='hidden'/>
                              <Button variant='ghost'
                              size='sm'
                              onClick={()=>setShowEmojiPicker(!showEmojiPicker)}>
                                <Smile className= 'h-5 w-5 text-primary'/>
                              </Button>
                              {
                                showEmojiPicker && (
                                  <div className='absolute z-50 mt-2'>
                                    <EmojiPicker onEmojiClick={handleEmojiSelect}/>
                                  </div>

                                )
                              }
                              <Button variant='ghost' size='sm' onClick={()=>setIsGlobeActive(!isGlobeActive)}>
                                <Globe2 className = {`h-5 w-5 transition-colors duration-300 ${
                                isGlobeActive ? "text-blue-500 ":"text-primary"}`}/> 
                              </Button>
                          </div>

                        </div>

                        <div className='flex-flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:ml-auto sm:justify-end'>
                          <div className='flex items-center gap-2 w-full sm:w-auto'>
                            <span className='text-sm front-medium'>
                              Tone :
                            </span>
                            <div className='w-full sm:w-32'>
                              <Select value ={tone} onChange = {setTone}>
                                <SelectTrigger className = "h-8">
                                  <SelectValue placeholder = "select tone"/>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value ="casual">Casual</SelectItem>
                                    <SelectItem value ="Trending">Trending</SelectItem>
                                    <SelectItem value ="Hing-lish">Hing-lish</SelectItem>
                                    <SelectItem value ="Funny">Funny</SelectItem>
                                    <SelectItem value ="Formal ">Formal</SelectItem>
                                  </SelectContent>
                              </Select>
                            </div>

                          </div>
                        </div>
                        <Button size="sm" onClick={generateTweet} 
                        disabled = {isGenerating || !prompt}
                        className='w-full sm:w-auto'>
                          {isGenerating ?(
                            <>
                            <Bot className='mr-2 h-4 w-4 animate-spin'/>
                            Generating
                            </>
                            ):(
                              <>
                              <Sparkles className='mr-2 h-4 w-4'/>
                              Generate
                              </>
                            )}

                        </Button>
                    </div>
                  </div>
                 </CardContent>
                </Card>
                <div className='space-y-4'>
                  {
                    tweets.length > 0 && 
                    (
                      <h2 className='text-xl font-semibold'>
                        Generate Tweets
                      </h2>
                    )
                  }
                  {tweet.map((tweet, index)=>(
                    <Card key={tweet.id}
                    className='group hover:border-primary/30 transition-all duration-300'>
                      <CardContent className='flex flex-col sm:flex-row items-start gap-4'>
                        <Avatar className='h-10 w-10 hidden sm:flex'>
                          <img src='https://github.com/shadcn.png'
                          alt='Profile'/>
                    </Avatar>
                    <div className='flex-1 w-full'>
                      <div className='flex items-start justify-between gap-2 mb-1'>
                        <div>
                          <span className='font-semibold'>
                            X user
                          </span>
                          <span className='text-muted-foreground ml-2'>
                            @X_user01
                          </span>
                        </div>
                        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                          <Edit2 className = 'h-4 w-4'/>
                        </Button>
                      </div>
                      <div className='relative'>
                        <TextArea value={editableContent[index]|| tweet.text}
                        onChange ={(e)=>{
                          const newContent = [...editableContent];
                          newContent[index ] = e.target.value;
                          setEditableContent(newContent);
                        }}
                        className = "text-lg leading-relaxed bg-transparent border-none focus-visible:ring-0 px-0 w-full resize-none overflow-hidden"
                        style={{minHeight :"80px",height : "auto"}}
                        rows ={3}
                        />
                 
                      </div>
                      {previewUrl && ( 
                        <div className='mt-2 mb-4 rounded-lg overflow-hidden'
                      )}
                    </div>

                      </CardContent>






                    </Card>

                  ))}
                </div>



              </div>
            </div>


          </TabsContent>
          <TabsContent value='analyze'> */}

          {/* </TabsContent> */}

        </Tabs>
      </div>
    </main>
    </div>

  );
}


