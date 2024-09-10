
"use client"
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BloodSupplyContract, Patient } from '@/utils/types.dt'; 

interface DashboardProps {
  contract: BloodSupplyContract;
  account: string;
}

export default function SupplierDashboard({ contract, account }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('addPatient');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatient, setNewPatient] = useState({
    bloodId: '',
    name: '',
    address: '',
    bloodGroup: '',
    age: 0,
    donationTime: new Date().toISOString()
  });

  useEffect(() => {
    const fetchData = async () => {
      const patientsData = await contract.getDataOfPatients();
      setPatients(patientsData);
    };
    fetchData();
  }, [contract]);

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contract.addPatient(
        newPatient.bloodId,
        newPatient.name,
        newPatient.address,
        newPatient.bloodGroup,
        ethers.BigNumber.from(newPatient.age),
        newPatient.donationTime
      );
      const updatedPatients = await contract.getDataOfPatients();
      setPatients(updatedPatients);
      setNewPatient({
        bloodId: '',
        name: '',
        address: '',
        bloodGroup: '',
        age: 0,
        donationTime: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const renderAddPatient = () => (
    <div className="mt-8 bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add Patient</h2>
      <form onSubmit={handleAddPatient} className="space-y-4">
        <input
          type="text"
          placeholder="Blood ID"
          name="bloodId"
          value={newPatient.bloodId}
          onChange={(e) => setNewPatient({...newPatient, bloodId: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newPatient.name}
          onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={newPatient.address}
          onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Blood Group"
          name="bloodGroup"
          value={newPatient.bloodGroup}
          onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={newPatient.age}
          onChange={(e) => setNewPatient({...newPatient, age: parseInt(e.target.value)})}
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          placeholder="Donation Time"
          name="donationTime"
          value={newPatient.donationTime}
          onChange={(e) => setNewPatient({...newPatient, donationTime: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Patient
        </button>
      </form>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'addPatient':
        return renderAddPatient();
      // Add other cases here if needed
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-4 flex space-x-4">
        <button onClick={() => setActiveTab('addPatient')} className={`p-2 ${activeTab === 'addPatient' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Add Patient
        </button>
        {/* Add other buttons for different tabs if needed */}
      </div>
      {renderTabContent()}
    </div>
  );
}
