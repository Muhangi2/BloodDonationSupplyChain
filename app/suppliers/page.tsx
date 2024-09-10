"use client"
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BloodSupplyContract, Supplier, Hospital, Donor, BloodDetails } from '@/utils/types.dt'; 
import { handleAddSupplier } from '../lib/actions';
import { getDataOfHospitals, getDataOfDonors } from '@/services/blockchain';

interface DashboardProps {
  contract: BloodSupplyContract;
  account: string;
}

export default function SupplierDashboard({ contract, account }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'addSupplier' | 'shipBlood'>('addSupplier');
  const [bloodData, setBloodData] = useState<BloodDetails[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newSupplier, setNewSupplier] = useState<Supplier>({
    supplierAddress: '',
    supplierName: '',
    phoneNumber: ''
  });

  const [shipBloodData, setShipBloodData] = useState({
    bloodId: '',
    hospitalAddress: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [hospitalsData, donorsData] = await Promise.all([
          getDataOfHospitals(),
          getDataOfDonors()
        ]);
        setHospitals(hospitalsData);
        setDonors(donorsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleShipBlood = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await contract.shipBloodToHospital(
        ethers.BigNumber.from(shipBloodData.bloodId),
        shipBloodData.hospitalAddress
      );
      const updatedBloodData = await contract.getDataOfBlood();
      setBloodData(updatedBloodData);
    } catch (err) {
      setError('Error shipping blood. Please try again.');
      console.error("Error shipping blood:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderAddSupplier = () => (
    <div className="mt-8 bg-white dark:bg-slate-900 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add Donor</h2>
      <form action={handleAddSupplier} className="space-y-4">
        <input
          type="text"
          placeholder="Donor Address"
          name='supplierAddress'
          value={newSupplier.supplierAddress}
          onChange={(e) => setNewSupplier({...newSupplier, supplierAddress: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Donor Name"
          name='supplierName'
          value={newSupplier.supplierName}
          onChange={(e) => setNewSupplier({...newSupplier, supplierName: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          name='phoneNumber'
          value={newSupplier.phoneNumber}
          onChange={(e) => setNewSupplier({...newSupplier, phoneNumber: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Donor</button>
      </form>
    </div>
  );

  const renderShipBlood = () => (
    <div className="mt-8 bg-white dark:bg-slate-900 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Ship Blood</h2>
      <form onSubmit={handleShipBlood} className="space-y-4">
        <input
          type="text"
          placeholder="Blood ID"
          value={shipBloodData.bloodId}
          onChange={(e) => setShipBloodData({...shipBloodData, bloodId: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Hospital Address"
          value={shipBloodData.bloodId}
          onChange={(e) => setShipBloodData({...shipBloodData, bloodId: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Ship Blood</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-800">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['addSupplier', 'shipBlood'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'addSupplier' | 'shipBlood')}
                  className={`${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab === 'addSupplier' ? 'Add Donor' : 'Ship Blood'}
                </button>
              ))}
            </nav>
          </div>
          {activeTab === 'addSupplier' ? renderAddSupplier() : renderShipBlood()}
          {loading && <p className="mt-4 text-center">Loading...</p>}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
}