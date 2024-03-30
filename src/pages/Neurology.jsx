import React from 'react'
import GeneralFooter from '../components/GeneralFooter'
import GeneralHeader from '../components/GeneralHeader'

function Neurology() {
    return (
        <>
            <GeneralHeader />

            <main className="w-full flex flex-col flex-1">
                <div className="bg-gray-100 py-20">
                    <h1 className="text-center font-bold text-5xl mb-6 text-[#06A9B2]">Neurology, Clinical Neurosurgery</h1>
                    <h1 className="text-center font-bold text-5xl mb-6 text-[#06A9B2]">and Spine Surgery</h1>
                    <h2 className="text-center font-bold text-5xl mb-4 text-[#F19E22]">at INECCU</h2>
                    <p className="text-center w-3/4 mx-auto text-lg font-semibold italic">Our team of highly skilled specialists is dedicated to providing comprehensive care for a wide range 
                    of neurological conditions and spinal disorders. We are committed to helping you achieve a better quality of life through personalized treatment plans 
                    and cutting-edge techniques.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-10 my-20">
                    <div className="w-96 bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="/Neurology.jpg" alt="Neurology" className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Neurology</h3>
                            <p className="text-gray-700 text-base mb-4">Our neurologists are experts in diagnosing and treating a wide range of neurological disorders, 
                            including stroke, epilepsy, multiple sclerosis, Parkinson's disease, and more.</p>    
                        </div>
                    </div>

                    <div className="w-96 bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="/NeurocriticalCare.jpg" alt="Neurocritical Care" className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Neurocritical Care</h3>
                            <p className="text-gray-700 text-base mb-4">Our neurocritical care unit provides specialized care for patients with life-threatening neurological 
                            conditions, such as traumatic brain injury, stroke, and status epilepticus.</p>
                        </div>
                    </div>

                    <div className="w-96 bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="/Neurosurgery.jpg" alt="Neurosurgery" className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Clinical Neurosurgery</h3>
                            <p className="text-gray-700 text-base mb-4">Our neurosurgeons are highly trained and experienced in performing complex surgical procedures 
                            to treat brain and spinal cord disorders, including tumors, aneurysms, and traumatic injuries.</p>
                        </div>
                    </div>

                    <div className="w-96 bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="/SpineSurgery.jpg" alt="Spine Surgery" className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-[#06A9B2]">Spine Surgery</h3>
                            <p className="text-gray-700 text-base mb-4">Our spine surgeons are experts in treating various spinal conditions, including herniated discs, 
                            spinal stenosis, scoliosis, and spinal cord injuries, through minimally invasive and advanced surgical techniques.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 py-20">
                    <h2 className="text-center font-bold text-5xl mb-6 text-[#06A9B2]">Our Specialists</h2>
                    <div className="flex flex-wrap justify-center gap-10">
                        <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
                            <img src="/JohnDoe.png" alt="Image Dr. John Doe" className="h-40 mt-4"/>
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-[#F19E22]">Dr. John Doe</h3>
                                <p className="text-gray-700 text-base">Neurosurgeon, Spine Surgery</p>
                            </div>
                        </div>

                        <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
                            <img src="/EmilyWilson.png" alt="Doctor 1" className="h-40 mt-4"/>
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-[#F19E22]">Dr. Emily Wilson</h3>
                                <p className="text-gray-700 text-base">Neurologist, Multiple Sclerosis Specialist</p>
                            </div>
                        </div>

                        <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
                            <img src="/SarahAnderson.png" alt="Doctor 1" className="h-40 mt-4"/>
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-[#F19E22]">Dra. Sarah Anderson</h3>
                                <p className="text-gray-700 text-base">Neurosurgeon, Cerebrovascular Specialist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <GeneralFooter />
        </>
    )
}

export default Neurology