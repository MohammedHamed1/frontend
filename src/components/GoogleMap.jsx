import React, { useEffect } from 'react';

const GoogleMap = () => {
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const branches = [
    {
      id: 1,
      name: 'فرع الرياض',
      address: 'شارع الملك فهد، حي النزهة',
      phone: '011-123-4567',
      hours: '7:00 ص - 11:00 م',
      coordinates: '24.7136,46.6753'
    },
    {
      id: 2,
      name: 'فرع جدة',
      address: 'شارع التحلية، حي الشاطئ',
      phone: '012-123-4567',
      hours: '7:00 ص - 11:00 م',
      coordinates: '21.4858,39.1925'
    },
    {
      id: 3,
      name: 'فرع الدمام',
      address: 'شارع الملك خالد، حي الشاطئ',
      phone: '013-123-4567',
      hours: '7:00 ص - 11:00 م',
      coordinates: '26.4207,50.0888'
    }
  ];

  const getDirections = (branch) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="map" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">موقع فروعنا</h2>
          <p className="text-xl text-gray-600">اكتشف أقرب فرع لك واحصل على الاتجاهات</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {branches.map((branch) => (
            <div key={branch.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{branch.name}</h3>
              <p className="text-gray-600 mb-4">{branch.address}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 <span dir="ltr">{branch.phone}</span></p>
                <p>🕒 {branch.hours}</p>
              </div>
              <button 
                onClick={() => getDirections(branch)}
                className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                احصل على الاتجاهات
              </button>
            </div>
          ))}
        </div>

        {/* خريطة جوجل */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="PayPass Branches Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap; 