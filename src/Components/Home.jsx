import React,{ useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoMdHelpCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
     const [response,setResponse]=useState([]);
     const [prediction, setPrediction] = useState('');
     const [display,setDisplay]=useState('')
     const handleImageChange = (event) => {
      setPrediction('')
     setResponse('')
      const file = event.target.files[0];
      if (file) {
        setSelectedImage(file); // Directly use the file object
        console.log(file.name);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setDisplay(reader.result);
          
        };
        toast.success('Image uploaded  successfully');
      }
    };
    const uploadImage = async () => {
      if (!selectedImage) {
        toast.error("Please select the image")
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('file', selectedImage); // Ensure this matches the backend expectation
  
        const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Image uploaded successfully:', response.data);
        setPrediction(response.data.prediction); // Update prediction state with the backend response
      fetch(response.data.prediction)
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error("Error predicting the image")
      }
    };
     const fetch=async(pred)=>{
      const apiKey = 'jv2xl5d0jnMLo5tbICtpqw==0EtcVlURhmqvIszk';
const apiUrl = 'https://api.api-ninjas.com/v1/nutrition';


const url = `${apiUrl}?query=${pred}`;

axios.get(url, {
  headers: {
    'X-Api-Key': apiKey,
  },
})
.then(res => {
  console.log(res.data[0]);
  setResponse(res.data[0])
})
.catch(error => {
  console.error('Error fetching data:', error);
});
     }
    
  return (
  <>
 <div className='p-5 space-y-7 text-center'>
 <div className=''>
    <p className='text-[30px] '>Snap, Learn, Eat! </p>
    <Link to='/help'> <IoMdHelpCircleOutline size={30} className='fixed animate-bounce top-[5%] left-[87%]' /></Link>
  </div>
  <div>
    <p>Upload your picture here</p>
    <div className='flex flex-col space-y-7 items-center text-center justify-center p-5 '>
    <input type="file" name="image" id="image" onChange={handleImageChange}  accept=".png, .jpeg, .jpg"  />
  { display ?(  <img src={display} className='w-[300px] rounded-md h-[300px]' alt="uploaded" />):(<div></div>)}
  <button onClick={uploadImage} className='p-3 bg-black rounded-md text-lg  hover:bg-transparent hover:border-[2px] hover:font-semibold'>Get the list</button>
    </div>
    <div>
    {prediction && (
            <div className='text-lg font-semibold mt-5'>
              Prediction: {prediction}
            </div>
          )} 
    </div>
  </div>
  <div>
    {response?(<div>
      
      {Object.entries(response).map(([key, value]) => (
        <p key={key}>{key}: {value}</p>
      ))}
     

    </div>):(<div>

    </div>)
    }
  </div>
 </div>
  </>
  )
}

export default Home