import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone } from 'lucide-react';

const MediaPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const scrollerRef = useRef(null);
  const navigate = useNavigate(); 
  const [downloadError, setDownloadError] = useState(null);

  // Sample contact data
  const contactData = {
    firstName: 'Neetu',
    lastName: 'Mishra',
    phoneNo: '+917045697296',
    phoneNo: '+919876543210',
    email: 'neetu.mishra@simplelogic.in',
    companyName: 'Simple Logic IT Pvt. Ltd.',
    title: 'Assistant Vice President',
    url: 'https://simplelogic-it.com/',
  };

  const saveContact = () => {
    const { firstName, lastName, phoneNo, email, companyName, title, url } = contactData;

    // Create vCard string
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName};;;
ORG:${companyName}
TITLE:${title}
TEL:${phoneNo}
EMAIL:${email}
URL:${url}
END:VCARD`;

    // Encode the vCard string
    const encodedVCard = encodeURIComponent(vCard);
    
    // Create a data URI
    const dataUri = `data:text/vcard;charset=utf-8,${encodedVCard}`;

    // Open the data URI in a new window/tab
    window.open(dataUri);
  };

  const downloadBrochure = () => {
    const brochureUrl = '/images/final_brochure.pdf';
  
    fetch(brochureUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        if (blob.size === 0) {
          throw new Error('Downloaded file is empty');
        }
  
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Simple_Logic_Brochure.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Error downloading the file:', error);
        setDownloadError(`Error downloading: ${error.message}`);
        alert('Unable to download the brochure. Please try again later.');
      });
  };

  // Array of images with corresponding phone numbers
  const images = [
    { src: "/images/Neetu.png", phone: "+91 7045697296" },
    { src: "/images/Neetu1.png", phone: "+91 9820460291" },
  ];

  const handleCallClick = () => {
    setIsCallActive(true);
    const phoneNumber = images[currentImageIndex].phone;
    window.open(`tel:${phoneNumber}`, '_self');

    setTimeout(() => {
      setIsCallActive(false);
    }, 3000);
  };

  const handleSocialMediaClick = (platform, url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleContactUsClick = () => {
    navigate('/products&services'); 
  };

  const handleScroll = () => {
    if (scrollerRef.current) {
      const scrollLeft = scrollerRef.current.scrollLeft;
      const width = scrollerRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentImageIndex(index);
    }
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scroller) {
        scroller.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-5 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-cover bg-fixed bg-center opacity-20 z-0" style={{ backgroundImage: `url(/path-to-your-background-image.png)` }}>
      </div>

      {/* New Responsive Top Image */}
      <div className="w-full max-w-2xl mb-4 z-10" style={{ overflow: 'hidden' }}>
        <img
          src="./images/gitex1.png"
          alt="Top Banner"
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-120 rounded-lg shadow-lg object-contain"
          style={{ objectPosition: 'center' }} // Ensure the image is centered if there's any space
        />
      </div>

      {/* Responsive Image Scroller (Manual Scroll Only) */}
      <div className="relative w-full max-w-2xl">
        <div
          ref={scrollerRef}
          className="w-full max-w-2xl flex overflow-x-scroll space-x-4 hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', zIndex: 1 }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              style={{ scrollSnapAlign: 'center', minWidth: '100%' }}
            />
          ))}
        </div>

        {/* Pagination Markers */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-400'}`}
              style={{ transition: 'background-color 0.3s' }}
            />
          ))}
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex space-x-4 z-10">
        <button onClick={() => handleSocialMediaClick('Facebook', 'https://www.facebook.com/simplelogicitpvtltd')} className="text-blue-600 hover:text-blue-800">
          <Facebook />
        </button>
        <button onClick={() => handleSocialMediaClick('Instagram', 'https://www.instagram.com/simplelogic_it')} className="text-pink-600 hover:text-pink-800">
          <Instagram />
        </button>
        <button onClick={() => handleSocialMediaClick('Twitter', 'https://x.com/simplelogicit')} className="text-blue-400 hover:text-blue-600">
          <Twitter />
        </button>
        <button onClick={() => handleSocialMediaClick('LinkedIn', 'https://www.youtube.com/@SimpleLogicIT')} className="text-blue-700 hover:text-blue-900">
          <Linkedin />
        </button>
        <button onClick={() => handleSocialMediaClick('YouTube', 'https://www.linkedin.com/company/simple-logic-it-private-limited')} className="text-red-600 hover:text-red-800">
          <Youtube />
        </button>
        {/* Call Icon */}
        <button onClick={handleCallClick} className="focus:outline-none">
          <Phone color={isCallActive ? 'blue' : 'currentColor'} />
        </button>
      </div>

      {/* Responsive Video */}
      <div className="w-full max-w-2xl z-10">
        <iframe
          src="https://www.youtube.com/embed/UPIn7wPdIFc"
          title="Responsive YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-auto rounded-lg shadow-lg"
          style={{ aspectRatio: '16/9' }}
        ></iframe>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-xl z-10 space-y-4">
        <div className="flex space-x-4">
          <button onClick={saveContact} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600">
            Save Contact
          </button>
          <button onClick={handleContactUsClick} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600">
            Interested IN
          </button>
        </div>
        <div className="w-full">
          <button onClick={downloadBrochure} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 w-full">
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
}

export default MediaPage;
