import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Car, Navigation, ExternalLink, Star, Users, X } from 'lucide-react';
import { getWashingPlaces } from '../api';
import { useNavigate } from 'react-router-dom';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectedBranchForMap, setSelectedBranchForMap] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getWashingPlaces().then(res => {
      setBranches(res.data);
    });
  }, []);

  // Function to extract coordinates from Google Maps URL
  const extractCoordinatesFromUrl = (url) => {
    try {
      // Pattern to match coordinates in Google Maps URL
      const coordPattern = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
      const match = url.match(coordPattern);
      
      if (match) {
        return {
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2])
        };
      }
      
      // Alternative pattern for different URL formats
      const altPattern = /3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/;
      const altMatch = url.match(altPattern);
      
      if (altMatch) {
        return {
          lat: parseFloat(altMatch[1]),
          lng: parseFloat(altMatch[2])
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error extracting coordinates:', error);
      return null;
    }
  };

  // Function to convert Google Maps URL to embed URL
  const getEmbedUrl = (locationUrl) => {
    const coords = extractCoordinatesFromUrl(locationUrl);
    if (coords) {
      return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${coords.lng}!3d${coords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1625000000000!5m2!1sen!2s`;
    }
    return null;
  };

  const handleBranchClick = (branch) => {
    if (selectedBranchForMap && selectedBranchForMap.id === branch.id) {
      setSelectedBranchForMap(null); // Close if same branch is clicked
    } else {
      setSelectedBranchForMap(branch);
    }
  };

  // Interactive Map Component
  const InteractiveMap = () => (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-black-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">خريطة الفروع</h3>
        <button 
          onClick={() => setShowMap(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-green-100 to-primary-100 rounded-xl p-8 text-center">
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {branches.map((branch, index) => (
              <a
                key={index}
                href={branch.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer block"
              >
                <div className="w-3 h-3 bg-primary-500 rounded-full mx-auto mb-2"></div>
                <div className="text-sm font-medium text-gray-900">{branch.name}</div>
                <div className="text-xs text-gray-600">{branch.rating} ⭐</div>
              </a>
            ))}
          </div>
          
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-primary-200 opacity-50"></div>
            <div className="relative z-10 text-center">
              <MapPin className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">خريطة تفاعلية</h4>
              <p className="text-gray-600 mb-4">انقر على أي فرع لرؤية التفاصيل والاتجاهات</p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-black rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg"
              >
                فتح Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Individual Branch Map Component
  const BranchMapPlaceholder = ({ branch }) => {
    const embedUrl = getEmbedUrl(branch.location);
    
    return (
      <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="h-5 w-5 text-primary-600 mr-2" />
            موقع الفرع
          </h4>
          <button
            onClick={() => setSelectedBranchForMap(null)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {embedUrl ? (
          <div className="relative">
            <iframe
              title={`خريطة ${branch.name}`}
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '0.5rem' }}
              loading="lazy"
              allowFullScreen
              src={embedUrl}
              className="shadow-md"
            ></iframe>
            <div className="absolute top-2 right-2">
              <a
                href={branch.location}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-lg shadow-md transition-all duration-200 flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                فتح في Google Maps
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">لا يمكن عرض الخريطة حالياً</p>
            <a
              href={branch.location}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              عرض في Google Maps
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="branches" className="py-20 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            فروعنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            أكثر من 50 فرع في جميع أنحاء المملكة لخدمتك في أي وقت وأي مكان
          </p>
        </div>

        {/* Map Toggle */}
        <div className="text-center mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-black rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {showMap ? 'إخفاء الخريطة' : 'عرض الخريطة التفاعلية'}
          </button>
        </div>

        {/* Interactive Map */}
        {showMap && (
          <div className="mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <InteractiveMap />
          </div>
        )}

        {/* Branches List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {branches.map((branch) => (
            <div key={branch._id || branch.id} className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
              {/* Branch Card */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                      <h3 className="font-bold text-lg text-gray-900 leading-tight">{branch.name}</h3>
                    </div>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-700">{branch.rating}</span>
                      <span className="text-xs text-gray-500 mr-2">({branch.customers} عميل)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="text-gray-600 text-sm flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="text-gray-600 text-sm flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="text-gray-600 text-sm flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <span>{branch.hours}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleBranchClick(branch)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                      selectedBranchForMap && selectedBranchForMap.id === branch.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'bg-primary-500 hover:bg-primary-600 text-black'
                    }`}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    {selectedBranchForMap && selectedBranchForMap.id === branch.id
                      ? 'إخفاء الموقع'
                      : 'عرض الموقع على الخريطة'
                    }
                  </button>
                 
                </div>
              </div>

              {/* Map Placeholder */}
              {selectedBranchForMap && selectedBranchForMap.id === branch.id && (
                <BranchMapPlaceholder branch={branch} />
              )}
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 text-center animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-xl border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              إحصائيات الفروع
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-gray-600">فرع</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">15</div>
                <div className="text-gray-600">مدينة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-gray-600">خدمة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">4.8</div>
                <div className="text-gray-600">تقييم متوسط</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Branches;