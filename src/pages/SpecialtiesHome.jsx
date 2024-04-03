import React from 'react'
import Specialties from '../components/Specialties'
import GeneralHeader from '../components/GeneralHeader'
import GeneralFooter from '../components/GeneralFooter'

function SpecialtiesHome() {
    return (
        <div className='flex flex-col justify-center items-center w-full'>
            
            <GeneralHeader/>

            <Specialties/>

            <section className='flex flex-wrap justify-center items-center gap-4 px-4 mb-6 w-5/6'>
                <div className="w-80 h-[520px] bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/Cardiologist.jpg" alt="Cardiologist" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Cardiologist</h3>
                        <p className="text-gray-700 text-base mb-4  text-justify">In the clinic we have professionals of excellence in the cardiological area, in addition to 
                        having the necessary equipment to perform studies such as: Color Doppler Echocardiogram, Diabetes Mellitus Studies, Carotid Echo Doppler, 
                        Electrocardiogram, Ergometry and more.</p>    
                    </div>
                </div>

                <div className="w-80 h-[520px] bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/Pediatrician.png" alt="Pediatrician" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Pediatrician</h3>
                        <p className="text-gray-700 text-base mb-4  text-justify">In our clinic, we boast skilled pediatricians dedicated to exceptional child health care. 
                        Our team employs advanced equipment for pediatric studies, including growth assessments, vaccinations, and nutritional counseling. We ensure your child's 
                        well-being.</p>    
                    </div>
                </div>

                <div className="w-80 h-[520px] bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/Neurologist.jpg" alt="Neurologist" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Neurologist</h3>
                        <p className="text-gray-700 text-base mb-4  text-justify">The neurology service at Serenity Clinic specializes in diagnosing and treating various 
                        neurological disorders, including headaches, neurovascular diseases, epilepsy, vertigo, and Parkinson's. Our team offers consultations both in-house and 
                        externally, providing comprehensive diagnoses for optimal patient care.</p>    
                    </div>
                </div>

                <div className="w-80 h-[520px] bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/Gynecologist.jpg" alt="Gynecologist" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Gynecologist</h3>
                        <p className="text-gray-700 text-base mb-4  text-justify">Serenety offers comprehensive gynecological care, including emergency and routine outpatient 
                        consultations. Our medical team provides expert interconsultations during hospitalizations and manages specific pathologies with professionalism. Our 
                        highly trained professionals maintain academic excellence through continuous updates.</p>    
                    </div>
                </div>

                <div className="w-80 h-[520px] bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/Pulmonologist.jpg" alt="Pulmonologist" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Pulmonologist</h3>
                        <p className="text-gray-700 text-base mb-4  text-justify">The Serenity Clinic's Pulmonology Department treats various lung conditions like infections, 
                        asthma, COPD, pulmonary fibrosis, and sleep disorders such as apnea. Our skilled pulmonologists offer consultations at the clinic and outpatient facilities, 
                        ensuring prompt and comprehensive diagnoses, along with effective treatment for respiratory health.</p>    
                    </div>
                </div>

                <div className="w-80 h-[520px] bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/Traumatologist.jpg" alt="Traumatologist" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Traumatologist</h3>
                        <p className="text-gray-700 text-base mb-4  text-justify">The trauma department at Serenity Clinic specializes in musculoskeletal injuries and conditions. 
                        Our expert team manages fractures, sports injuries, ligament tears, joint dislocations, and orthopedic trauma. We offer personalized care for accurate 
                        diagnoses and effective treatment plans, aiming to restore mobility and quality of life.</p>    
                    </div>
                </div>

                <div className="w-80 h-[520px] bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="/Gastroenterologist.jpg" alt="Gastroenterologist" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Gastroenterologist</h3>
                        <p className="text-gray-700 text-base mb-4  text-justify">The Serenity Clinic's gastroenterology department excels in diagnosing and treating 
                        gastrointestinal issues, including GERD, IBS, IBD, liver diseases, and GI cancers. Our expert gastroenterologists offer consultations in-clinic and 
                        outpatient settings, aiming for thorough evaluations, accurate diagnoses, and effective care for patients' GI health.</p>    
                    </div>
                </div>
            </section>

            <GeneralFooter/>

        </div>
    )
}

export default SpecialtiesHome