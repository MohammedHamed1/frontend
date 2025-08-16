import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Clock, Car, Navigation, ExternalLink, Star, Users, X } from 'lucide-react';
import { getWashingPlaces } from '../api';

const cities = [
  { name: 'الرياض', key: 'riyadh' },
  { name: 'جدة', key: 'jeddah' },
  { name: 'الدمام', key: 'dammam' },
  { name: 'مكة', key: 'makkah' },
  { name: 'المدينة', key: 'madinah' },
];

// بيانات فروع الرياض كمثال عملي
const riyadhBranches = [
  {
    id: 1,
    name: 'مغاسل أناقة الموتر الاوتوماتيكيه للسيارات',
    address: 'طريق الملك فهد الفرعي، العارض، الرياض 13334، المملكة العربية السعودية',
    phone: '+966568801020',
    hours: 'مفتوح على مدار الساعة',
    rating: 4.1,
    customers: 0,
    services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع'],
    directions: 'https://maps.google.com/?q=24.900000,46.600000',
    booking: '#',
  },
  {
    id: 2,
    name: 'مغاسل رجل الفقاعات للسيارات',
    address: 'Prince Faisal bin Bandar Road, النرجس، الرياض 12211، المملكة العربية السعودية',
    phone: '+966507762505',
    hours: 'مفتوح على مدار الساعة',
    rating: 4.5,
    customers: 0,
    services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع'],
    directions: 'https://maps.google.com/?q=24.850000,46.700000',
    booking: '#',
  },
  {
    id: 3,
    name: 'مغسلة القوه الذكيه للسيارات',
    address: 'القنا، النرجس، السهام &, الرياض المملكة العربية السعودية',
    phone: '+966547321924',
    hours: 'مفتوح على مدار الساعة',
    rating: 4.4,
    customers: 0,
    services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع'],
    directions: 'https://maps.google.com/?q=24.800000,46.650000',
    booking: '#',
  },
  {
    id: 4,
    name: 'مغسلة اللمسة الناعمة الاوتوماتيكية',
    address: 'طريق الملك فهد، الصحافة، الرياض, المملكة العربية السعودية',
    phone: '+966541222253',
    hours: 'مفتوح على مدار الساعة',
    rating: 4.6,
    customers: 0,
    services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع'],
    directions: 'https://maps.google.com/?q=24.774265,46.738586',
    booking: '#',
  },
];

// قسم إحصائيات الفروع
const branchStats = [
  { label: '+50', desc: 'فرع' },
  { label: '15', desc: 'مدينة' },
  { label: '24/7', desc: 'خدمة' },
  { label: '4.8', desc: 'تقييم متوسط' },
];

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [selectedCity, setSelectedCity] = useState('riyadh');
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <div
                key={index}
                className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer block"
                style={{ userSelect: 'none' }}
                onClick={() => navigate(`/washing-place/${branch._id || branch.id}`)}
              >
                <button
                  type="button"
                  className="mb-3 px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-xs hover:bg-green-700 transition-colors"
                  onClick={e => { e.stopPropagation(); navigate(`/washing-place/${branch._id || branch.id}`); }}
                >
                  تفاصيل الفرع
                </button>
                <div className="w-3 h-3 bg-primary-500 rounded-full mx-auto mb-2"></div>
                <div className="text-sm font-medium text-gray-900">{branch.name}</div>
                <div className="text-xs text-gray-600">{branch.rating} ⭐</div>
              </div>
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

  // تصفية الفروع حسب المدينة
  let filteredBranches = [];
  if (selectedCity === 'riyadh') {
    filteredBranches = riyadhBranches;
  } else {
    filteredBranches = branches.filter(branch => branch.cityKey === selectedCity);
  }

  return (
    <section id="branches" className="py-20 bg-[#f8fcfa] min-h-[400px] relative overflow-hidden">
      {/* دائرة زخرفية */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-100 rounded-full opacity-30 blur-2xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* قسم إحصائيات الفروع */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-10 py-6 flex flex-col items-center max-w-2xl w-full" style={{boxShadow:'0 8px 32px 0 #eaf7f0'}}>
            <div className="text-center text-gray-800 font-bold text-lg mb-4">إحصائيات الفروع</div>
            <div className="flex flex-row gap-0 items-center w-full">
            {branchStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center flex-1 border-l last:border-l-0 border-gray-100 px-6">
                <span className="text-emerald-600 text-2xl font-extrabold mb-1">{stat.label}</span>
                <span className="text-gray-700 text-base font-semibold">{stat.desc}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
        {/* عنوان موقع الفروع */}
        <div className="text-center mb-6 animate-fade-in-up">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2 text-center">موقع فروعنا</h2>
          <p className="text-base lg:text-lg text-gray-500 max-w-2xl mx-auto mb-8">اكتشف أقرب فرع لك واحصل على الاتجاهات</p>
        </div>
        {/* Tabs للمدن */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {cities.map(city => (
            <button
              key={city.key}
              onClick={() => setSelectedCity(city.key)}
              className={`px-6 py-2 rounded-xl font-semibold shadow-sm transition-all duration-200 text-base focus:outline-none ${selectedCity === city.key ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {city.name}
            </button>
          ))}
        </div>
        {/* قائمة الفروع أو رسالة قريبا */}
        <div className="flex flex-col items-center min-h-[120px]">
          {filteredBranches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {filteredBranches.map(branch => (
                <div key={branch.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col items-stretch text-right min-w-[320px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-700 font-bold text-base">{branch.name}</span>
                    <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline h-5 w-5 text-emerald-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg></span>
                  </div>
                  <div className="text-gray-600 text-sm mb-1 flex items-center"><svg xmlns='http://www.w3.org/2000/svg' className='inline h-4 w-4 text-emerald-400 ml-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>{branch.address}</div>
                  <div className="text-gray-600 text-sm mb-1 flex items-center"><svg xmlns='http://www.w3.org/2000/svg' className='inline h-4 w-4 text-emerald-400 ml-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' /></svg><span dir="ltr">{branch.phone}</span></div>
                  <div className="text-gray-600 text-sm mb-1 flex items-center"><svg xmlns='http://www.w3.org/2000/svg' className='inline h-4 w-4 text-emerald-400 ml-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 17v-1a4 4 0 018 0v1' /></svg>{branch.hours}</div>
                  <div className="flex items-center text-sm mb-1">
                    <span className="text-yellow-500 font-bold flex items-center mr-1">{branch.rating} <svg xmlns='http://www.w3.org/2000/svg' className='inline h-4 w-4 text-yellow-400 mx-1' fill='currentColor' viewBox='0 0 20 20'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z'/></svg></span>
                    <span className="text-gray-500">/ {branch.customers} عميل</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3 mt-1">
                    {branch.services.map((srv, i) => (
                      <span key={i} className="bg-gray-100 text-emerald-700 rounded-lg px-3 py-1 text-xs font-semibold">{srv}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a href={branch.directions} target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg px-4 py-2 text-sm flex items-center justify-center transition"><svg xmlns='http://www.w3.org/2000/svg' className='inline h-4 w-4 ml-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.947l7-2.1a2 2 0 011.894 0l7 2.1A2 2 0 0121 6.618v8.764a2 2 0 01-1.553 1.947L15 20' /></svg>الاتجاهات</a>
                    <button onClick={() => navigate('/packages')} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg px-4 py-2 text-sm flex items-center justify-center transition"><svg xmlns='http://www.w3.org/2000/svg' className='inline h-4 w-4 ml-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>احجز الآن</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-lg text-gray-500 font-semibold py-12">قريباً سوف نكون في {cities.find(c => c.key === selectedCity)?.name} انتظرونا قادمون</div>
          )}
        </div>
        {/* زر الخريطة */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition-all duration-300 text-base"
          >
            {showMap ? 'إخفاء الخريطة التفاعلية' : 'عرض الخريطة التفاعلية'}
          </button>
        </div>
        {/* الخريطة التفاعلية */}
        {showMap && (
          <div className="mt-10 animate-fade-in-up">
            <InteractiveMap />
          </div>
        )}
      </div>
    </section>
  );
};

export default Branches;