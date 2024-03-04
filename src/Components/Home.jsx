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
     const [loading,setLoading]=useState(false);
     const [kg,setKg]=useState('')
     const [re,setRe]=useState('')
     const[adult,setadult]=useState('')
     const [child,setchild]=useState('')
     const [c,setc]=useState('')
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
        toast.error("Please select a image")
        return;
      }
  
      try {
        setLoading(true)
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
      setKg('')
    setRe('')
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
  setResponse(res.data[0]);
  setLoading(false)
})
.catch(error => {
  console.error('Error fetching data:', error);
});
     }
    const fetch2= async(value,pred)=>{
      const apiKey = 'jv2xl5d0jnMLo5tbICtpqw==0EtcVlURhmqvIszk';
const apiUrl = 'https://api.api-ninjas.com/v1/nutrition';

const query = `${value} ${pred}`;
const url = `${apiUrl}?query=${query}`;

axios.get(url, {
  headers: {
    'X-Api-Key': apiKey,
  },
})
.then(res => {
  const r=res.data[0].sugar_g;
  setRe(r);
  const className = `text-${r > 30 ? 'red' : 'white'}`;
console.log(className);
  if(r>30){
    setadult("Adults cannot consume!!")
    setchild("Children aged 7 to 10 cannot consume!!")
    setc("Children aged 4 to 6 cannot consume!!")

  }
  else if(r>24){
    setadult("Adults can consume")
    setchild("Children aged 7 to 10 cannot consume!!")
    setc("Children aged 4 to 6 cannot consume!!")
  }
  else if(r>19){
    setadult("Adults can consume")
    setchild("Children aged 7 to 10 can consume")
    setc("Children aged 4 to 6 cannot consume!!")
  }
  else{
    setadult("Adults can consume")
    setchild("Children aged 7 to 10 can consume")
    setc("Children aged 4 to 6 can consume")
  }
})
.catch(error => {
  console.error('Error fetching data:', error);
});
     }
     const handleInputChange = (value,pred) => {
    
      setKg(value);
      // Call any other function if needed
      fetch2(value,pred)
    }
  return (
  <>
 <div className='p-5 space-y-3 relative text-center'>
 <div className=''>
  {
    loading ?(
      <div className='backdrop-blur-sm  absolute w-screen space-y-10 overflow-hidden h-screen bg-transparent flex flex-col items-center justify-center text-center text-5xl   p-10'><p className='text-black'>Loading...</p></div>
    ):(<div></div>)
  }
  </div>
 <div className=''>
    <p className='text-[40px] '>Snap, Learn, Eat! </p>
    <Link to='/help'> <IoMdHelpCircleOutline size={30} className='fixed animate-bounce top-[5%] left-[87%]' /></Link>
  </div>
  <div>
    <p className='text-[20px]'>Upload your picture here</p>
    <div className='flex flex-col justify-center items-center space-y-7 text-center  p-5 '>
    <input className='' type="file" name="image" id="image" onChange={handleImageChange}  accept=".png, .jpeg, .jpg"  />
  { display ?(  <img src={display} className='w-[300px] rounded-md h-[300px]' alt="uploaded" />):(<div></div>)}
  <button onClick={uploadImage} className='p-3 bg-black rounded-md text-lg  hover:bg-transparent hover:border-[2px] hover:font-semibold'>Get the list</button>
    </div>
    <div>
    {/* {prediction && (
            <div className='text-lg font-semibold mt-5'>
               {prediction}
            </div>
          )}  */}
    </div>
  </div>
  
  {/* <div>
    {response?(<div className='space-y-3'>
   
    {Object.entries(response).map(([key, value]) => (
        <p key={key}>{key}: {value}</p>
      ))}
    
     

    </div>):(
      <div >

      </div>
    )
    }
  </div> */}
  <div>
    {
prediction?(
        <div>
          <div className='space-y-3'>
   
   {Object.entries(response).map(([key, value]) => (
       <p key={key}>{key}: {value}</p>
     ))}
   
    

   </div>
        <input className='p-2 focus:outline-none rounded-md  w-[370px] bg-slate-500/20 backdrop-blur-sm mt-4 mb-4'   onChange={(e) => handleInputChange(e.target.value,prediction)} on value={kg} type="text" placeholder="Enter the amount you want to consume " />
        <div>
          {re?(
          <div className='space-y-3'>
            <p>It contains {re}g sugar in {kg} {prediction}</p>
            
             <p style={{ color: re > 30 ? 'red' : 'white' }}>{adult}</p>

            <p style={{ color: re > 24 ? 'red' : 'white' }}>{child}</p>
            <p style={{ color: re > 19 ? 'red' : 'white' }}>{c}</p>
          </div>
          ):(<p></p>)}
        </div>
      </div> 
      ):(<div></div>)
    }
  </div>
 </div>
  </>
  )
}

export default Home