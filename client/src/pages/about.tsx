export default function About() {
  return (
    <div className="pt-16 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">About Family First Smile Care</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Founded on the principles of compassionate care and family-centered dentistry</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Family First Smile Care was founded by Dr. Tim J. Chuang with a simple mission: to provide exceptional dental care in a warm, welcoming environment that puts families first. As a locally owned practice in Los Gatos, we understand the unique needs of our community and are committed to building lasting relationships with our patients.
            </p>
            <p className="text-gray-600 mb-6">
              Our practice is built on the foundation of trust, compassion, and excellence. We believe that dental care should be a positive experience for every member of your family, from toddlers taking their first steps into oral health to seniors maintaining their beautiful smiles.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-gray-600">Families Served</div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern dental office interior" 
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white feature-icon mx-auto mb-4">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Compassion</h3>
              <p className="text-gray-600">We treat every patient with empathy, understanding, and respect, ensuring a comfortable experience for all.</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white feature-icon mx-auto mb-4">
                <i className="fas fa-user-circle text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalization</h3>
              <p className="text-gray-600">Every treatment plan is tailored to your unique needs, goals, and comfort level.</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white feature-icon mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Prevention</h3>
              <p className="text-gray-600">We focus on preventive care and education to help you maintain optimal oral health for life.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Office Tour</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1581056771392-8a90ddb76831?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Comfortable dental office waiting area" 
                className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">Welcoming Reception Area</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Modern dental treatment room" 
                className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">State-of-the-Art Treatment Rooms</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Dental office consultation area" 
                className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">Private Consultation Rooms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
