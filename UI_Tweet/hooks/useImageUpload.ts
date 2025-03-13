import { useState , useRef } from "react";

interface useImageUploadReturn {
    selectedImage : File | null;
    previewUrl : string |null;
    fileInputRef : React.RefObject<HTMLInputElement>;
    handleImageClick : ()=>void;
    handleImageChange :(e:React.ChangeEvent<HTMLInputElement>)=>void;
    clearImage:()=>void;
}

export function useImageUpload(): useImageUploadReturn{
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl ,setPreviewUrl] = useState<string | null > (null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = ()=>{
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }
    const handleImageChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files[0]){
            const file = e.target.files[0];
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);

            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () =>{
        setSelectedImage(null);
        setPreviewUrl(null);
        if(fileInputRef.current){
            fileInputRef.current.value = ""
        }

    };
    return{
        selectedImage,
        previewUrl,
        fileInputRef,
        handleImageClick,
        handleImageChange,
        clearImage
    }
}