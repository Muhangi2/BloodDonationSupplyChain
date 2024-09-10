"use client"

import React, { useState, useEffect } from 'react';
import { BloodSupplyContract, Hospital, Patient, BloodDetails } from '@/utils/types.dt'; 
import { handleAddPatient } from '../lib/actions';
import { getDataOfPatients, getDataOfBlood } from '@/services/blockchain';

interface DashboardProps {
  contract: BloodSupplyContract;
  account: string;
}

export default function HospitalDashboard({ contract, account }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'addPatient'>('dashboard');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [bloodData, setBloodData] = useState<BloodDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newPatient, setNewPatient] = useState<Patient>({
    bloodId: '',
    patientName: '',
    age: '',
    address: '',
    bloodGroup: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [patientsData, bloodData] = await Promise.all([
          getDataOfPatients(),
          getDataOfBlood()
        ]);
        setPatients(patientsData);
        setBloodData(bloodData);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderDashboard = () => (
    <div className="mt-8 bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Hospital Dashboard</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Total Patients: {patients.length}</h3>
        </div>
        <div>
          <h3 className="text-lg font-medium">Available Blood Units: {bloodData.length}</h3>
        </div>
        {/* Add more dashboard statistics here */}
      </div>
    </div>
  );

  const renderAddPatient = () => (
    <div className="mt-8 bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add Patient</h2>
      <form action={handleAddPatient} className="space-y-4">
        <input
          type="text"
          placeholder="Blood ID"
          name='bloodId'
          value={newPatient.bloodId}
          onChange={(e) => setNewPatient({...newPatient, bloodId: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Patient Name"
          name='patientName'
          value={newPatient.patientName}
          onChange={(e) => setNewPatient({...newPatient, patientName: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          name='age'
          value={newPatient.age}
          onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          name='address'
          value={newPatient.address}
          onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <select
          name='bloodGroup'
          value={newPatient.bloodGroup}
          onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Patient</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['dashboard', 'addPatient'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'dashboard' | 'addPatient')}
                  className={`${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab === 'dashboard' ? 'Dashboard' : 'Add Patient'}
                </button>
              ))}
            </nav>
          </div>
          {activeTab === 'dashboard' ? renderDashboard() : renderAddPatient()}
          {loading && <p className="mt-4 text-center">Loading...</p>}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
}