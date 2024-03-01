import React,{ useState } from 'react'
import axios from 'axios';
const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setSelectedImage(reader.result);
          //add a msg with time tht image uploaded successfully
        };
      }
    };
    const uploadImage = async () => {
      try {
        const formData = new FormData();
        formData.append('image', selectedImage);
        const response = await axios.post('/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Image uploaded successfully:', response.data);
        // Handle success, such as showing a success message or redirecting the user
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error, such as showing an error message to the user
      }
    };
  return (
  <>
 <div className='p-5 space-y-7 text-center'>
 <div className=''>
    <p className='text-[30px] '>Snap, Learn, Eat! </p>
  </div>
  <div>
    <p>Upload your picture here</p>
    <div className='flex flex-col space-y-7 items-center text-center justify-center p-5 '>
    <input type="file" name="image" id="image" onChange={handleImageChange}  accept=".png, .jpeg, .jpg"  />
  { selectedImage ?(  <img src={selectedImage} className='w-[300px] h-[300px]' alt="uploaded" />):(<div></div>)}
  <button onClick={uploadImage} className='p-3 bg-black rounded-md text-lg  hover:bg-transparent hover:border-[2px] hover:font-semibold'>Get the list</button>
    </div>
    <div>
        
    </div>
  </div>
 </div>
  </>
  )
}

export default Home