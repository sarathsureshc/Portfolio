import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { getProfile } from '../slices/profileSlice';
import { getExperiences } from '../slices/experienceSlice';
import { getEducations } from '../slices/educationSlice';
import { getSkills } from '../slices/skillSlice';
import { Download, Printer } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import Loader from '../components/Loader';

const ResumePage = () => {
  const dispatch = useDispatch();
  const resumeRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  
  const { profile, loading: profileLoading } = useSelector((state) => state.profile);
  const { experiences, loading: experiencesLoading } = useSelector((state) => state.experiences);
  const { educations, loading: educationsLoading } = useSelector((state) => state.education);
  const { skills, loading: skillsLoading } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getExperiences());
    dispatch(getEducations());
    dispatch(getSkills());
  }, [dispatch]);

  const isLoading = profileLoading || experiencesLoading || educationsLoading || skillsLoading;

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const downloadResume = () => {
    // Download directly from backend API
    window.location.href = '/api/resume/generate';
  };

  const generatePDF = async () => {
    if (!resumeRef.current) return;
    
    setDownloading(true);
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('resume-sarath-suresh.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    
    setDownloading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return <Loader />;
  }

  const frontendSkills = skills ? skills.filter(skill => skill.category === 'Frontend') : [];
  const backendSkills = skills ? skills.filter(skill => skill.category === 'Backend') : [];
  const databaseSkills = skills ? skills.filter(skill => skill.category === 'Database') : [];
  const devOpsSkills = skills ? skills.filter(skill => skill.category === 'DevOps') : [];
  const otherSkills = skills ? skills.filter(skill => skill.category === 'Other') : [];

  return (
    <>
      <Meta title="Resume | Sarath Suresh C - MERN Stack Developer" />
      <div className="print:hidden">
        <Header />
      </div>
      <main className="py-10 bg-gray-50 dark:bg-gray-900 print:bg-white print:py-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 print:px-0">
          <div className="flex justify-between items-center mb-8 print:hidden">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Resume</h1>
            <div className="flex space-x-4">
              <button 
                onClick={downloadResume} 
                className="btn-primary flex items-center print:hidden"
                disabled={downloading}
              >
                <Download size={16} className="mr-2" /> 
                {downloading ? 'Downloading...' : 'Download PDF'}
              </button>
              <button 
                onClick={handlePrint} 
                className="btn-outline flex items-center print:hidden"
              >
                <Printer size={16} className="mr-2" /> Print
              </button>
            </div>
          </div>
          
          <div 
            ref={resumeRef} 
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none"
          >
            {/* Resume Header */}
            <div className="p-8 bg-blue-50 dark:bg-blue-900 border-b border-blue-100 dark:border-blue-800 print:bg-white print:border-gray-200">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white print:text-black">
                    {profile ? profile.name : 'Sarath Suresh C'}
                  </h2>
                  <p className="text-xl text-blue-600 dark:text-blue-300 print:text-blue-800">
                    {profile ? profile.title : 'MERN Stack Developer'}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 space-y-1 text-right">
                  {profile && profile.email && (
                    <p className="text-gray-600 dark:text-gray-300 print:text-gray-700">{profile.email}</p>
                  )}
                  {profile && profile.phone && (
                    <p className="text-gray-600 dark:text-gray-300 print:text-gray-700">{profile.phone}</p>
                  )}
                  {profile && profile.location && (
                    <p className="text-gray-600 dark:text-gray-300 print:text-gray-700">{profile.location}</p>
                  )}
                  {profile && profile.website && (
                    <p className="text-gray-600 dark:text-gray-300 print:text-gray-700">
                      {profile.website.replace(/(^\w+:|^)\/\//, '')}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              {/* Summary Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 print:text-black">
                  Professional Summary
                </h3>
                <p className="text-gray-600 dark:text-gray-300 print:text-gray-800">
                  {profile && profile.bio 
                    ? profile.bio 
                    : 'Experienced MERN Stack Developer with a passion for creating efficient, scalable, and user-friendly web applications. Proficient in modern JavaScript frameworks and libraries, with a strong understanding of full-stack development principles.'}
                </p>
              </div>
              
              {/* Skills Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 print:text-black">
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Frontend Skills */}
                  {frontendSkills.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 print:text-gray-900">Frontend</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 print:text-gray-800">
                        {frontendSkills.map((skill) => (
                          <li key={skill._id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Backend Skills */}
                  {backendSkills.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 print:text-gray-900">Backend</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 print:text-gray-800">
                        {backendSkills.map((skill) => (
                          <li key={skill._id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Database Skills */}
                  {databaseSkills.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 print:text-gray-900">Database</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 print:text-gray-800">
                        {databaseSkills.map((skill) => (
                          <li key={skill._id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* DevOps Skills */}
                  {devOpsSkills.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 print:text-gray-900">DevOps</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 print:text-gray-800">
                        {devOpsSkills.map((skill) => (
                          <li key={skill._id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Other Skills */}
                  {otherSkills.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 print:text-gray-900">Other</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 print:text-gray-800">
                        {otherSkills.map((skill) => (
                          <li key={skill._id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Experience Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 print:text-black">
                  Work Experience
                </h3>
                
                <div className="space-y-6">
                  {experiences && experiences.length > 0 ? (
                    experiences.map((experience) => (
                      <div key={experience._id} className="mb-6">
                        <div className="flex flex-col md:flex-row md:justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 print:text-gray-900">
                            {experience.title} | {experience.company}
                          </h4>
                          <div className="text-gray-600 dark:text-gray-400 print:text-gray-700">
                            {formatDate(experience.from)} - {experience.current ? 'Present' : formatDate(experience.to)}
                          </div>
                        </div>
                        {experience.location && (
                          <p className="text-gray-600 dark:text-gray-400 mb-2 print:text-gray-700">
                            {experience.location}
                          </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-300 print:text-gray-800">
                          {experience.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 print:text-gray-800">
                      No experience data available.
                    </p>
                  )}
                </div>
              </div>
              
              {/* Education Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 print:text-black">
                  Education
                </h3>
                
                <div className="space-y-6">
                  {educations && educations.length > 0 ? (
                    educations.map((education) => (
                      <div key={education._id} className="mb-6">
                        <div className="flex flex-col md:flex-row md:justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 print:text-gray-900">
                            {education.degree} in {education.fieldOfStudy}
                          </h4>
                          <div className="text-gray-600 dark:text-gray-400 print:text-gray-700">
                            {formatDate(education.from)} - {education.current ? 'Present' : formatDate(education.to)}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2 print:text-gray-700">
                          {education.school}
                        </p>
                        {education.description && (
                          <p className="text-gray-600 dark:text-gray-300 print:text-gray-800">
                            {education.description}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 print:text-gray-800">
                      No education data available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
};

export default ResumePage;