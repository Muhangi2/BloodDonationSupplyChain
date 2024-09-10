"use client"
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Droplet, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { BloodSupplyContract, Supplier, Hospital, Donor, Patient, BloodDetails } from '@/utils/types.dt'; 
import { handleAddHospital, handleAddsupplier } from '../lib/actions';

const mockData = [
  { name: 'Jan', donations: 400 },
  { name: 'Feb', donations: 300 },
  { name: 'Mar', donations: 500 },
  { name: 'Apr', donations: 280 },
  { name: 'May', donations: 390 },
  { name: 'Jun', donations: 430 },
];

interface DashboardProps {
  contract: BloodSupplyContract;
  account: string;
}

export default function SupplierDashboard({ contract, account }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bloodData, setBloodData] = useState<BloodDetails[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [newBlood, setNewBlood] = useState({
    donorName: '',
    age: 0,
    gender: '',
    address: '',
    bloodGroup: '',
    bloodVolume: 0
  });

  const [newSupplier, setNewSupplier] = useState({
    supplierAddress: '',
    supplierName: '',
    phoneNumber: ''
  });

  const [newHospital, setNewHospital] = useState({
    hospitalAddress: '',
    hospitalName: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const bloodData = await contract.getDataOfBlood();
      const suppliersData = await contract.getDataOfSuppliers();
      const hospitalsData = await contract.getDataOfHospitals();
      const donorsData = await contract.getDataOfDonors();
      const patientsData = await contract.getDataOfPatients();
      
      setBloodData(bloodData);
      setSuppliers(suppliersData);
      setHospitals(hospitalsData);
      setDonors(donorsData);
      setPatients(patientsData);
    };
    fetchData();
  }, [contract]);

  const handleAddBlood = async (e: React.FormEvent) => {
    e.preventDefault();
 
    try {
      await contract.addBlood(
        newBlood.donorName,
        ethers.BigNumber.from(newBlood.age),
        newBlood.gender,
        newBlood.address,
        newBlood.bloodGroup,
        ethers.BigNumber.from(newBlood.bloodVolume)
      );
      const updatedBloodData = await contract.getDataOfBlood();
      setBloodData(updatedBloodData);
      setNewBlood({
        donorName: '',
        age: 0,
        gender: '',
        address: '',
        bloodGroup: '',
        bloodVolume: 0
      });
    } catch (error) {
      console.error("Error adding blood:", error);
    }
  };

  // const handleAddSupplier = async (e: React.FormEvent) => {
  //   console.log(e,"event details")
  //   e.preventDefault();
  //   // console.log(e,"event details")
  //   try {
  //     await addSupplier(
  //       newSupplier.supplierAddress,
  //       newSupplier.supplierName,
  //       ethers.BigNumber.from(newSupplier.phoneNumber)
  //     );
  //     const updatedSuppliersData = await contract.getDataOfSuppliers();
  //     setSuppliers(updatedSuppliersData);
  //     setNewSupplier({
  //       supplierAddress: '',
  //       supplierName: '',
  //       phoneNumber: ''
  //     });
  //   } catch (error) {
  //     console.error("Error adding supplier:", error);
  //   }
  // };

 

  const handleShipBlood = async (bloodId: number, hospitalAddress: string) => {
    try {
      await contract.shipBloodToHospital(
        ethers.BigNumber.from(bloodId),
        hospitalAddress
      );
      const updatedBloodData = await contract.getDataOfBlood();
      setBloodData(updatedBloodData);
    } catch (error) {
      console.error("Error shipping blood:", error);
    }
  };

  const renderDashboard = () => (
    <>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-5">
        {[
          { title: 'Total Donations', value: bloodData.length.toString(), icon: <Droplet className="h-6 w-6 text-red-600" /> },
          { title: 'Active Donors', value: donors.length.toString(), icon: <Users className="h-6 w-6 text-blue-600" /> },
          { title: 'Hospitals', value: hospitals.length.toString(), icon: <TrendingUp className="h-6 w-6 text-green-600" /> },
          { title: 'Patients', value: patients.length.toString(), icon: <AlertCircle className="h-6 w-6 text-yellow-600" /> },
        ].map((item) => (
          <div key={item.title} className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-900">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.title}</dt>
                    <dd className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{item.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Blood Form */}

      {/* Blood Inventory */}
      <div className="mt-8 bg-white shadow rounded-lg p-6 dark:bg-slate-900">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Blood Inventory</h2>
        <div className="relative overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Donated Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-700 divide-y divide-gray-200">
              {bloodData.map((blood) => (
                <tr key={blood.bloodUniqueId.toString()}>
                  <td className="px-6 py-4 whitespace-nowrap">{blood.bloodUniqueId.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{blood.bloodGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(blood.donatedTime.toNumber() * 1000).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{blood.currentStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleShipBlood(blood.bloodUniqueId.toNumber(), hospitals[0]?.hospitalAddress || "")}
                      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                      disabled={blood.currentStatus !== "Active"}
                    >
                      Ship to Hospital
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Donations Chart */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6 dark:bg-slate-900">
          <h2 className="text-xl font-semibold mb-4 dark:bg-slate-900">Monthly Donations</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="donations" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );

  const renderAddSuppliers = () => (
    <div className="mt-8 bg-white dark:bg-slate-900 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add Supplier</h2>
      <form action={handleAddsupplier} className="space-y-4">
        <input
          type="text"
          placeholder="SuppliersupplierAddress Address"
          name='supplierAddress'
          value={newSupplier.supplierAddress}
          onChange={(e) => setNewSupplier({...newSupplier, supplierAddress: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Supplier Name"
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
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Supplier</button>
      </form>
    </div>
  );

  const renderAddHospitals = () => (
    <div className="mt-8 bg-white dark:bg-slate-900 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add Hospital</h2>
      <form action={handleAddHospital} className="space-y-4">
        <input
          type="text"
          placeholder="Hospital Address"
          name="hospitalAddress"
          value={newHospital.hospitalAddress}
          onChange={(e) => setNewHospital({...newHospital, hospitalAddress: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Hospital Name"
          name="hospitalName"
          value={newHospital.hospitalName}
          onChange={(e) => setNewHospital({...newHospital, hospitalName: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          name="phoneNumber"
          value={newHospital.phoneNumber}
          onChange={(e) => setNewHospital({...newHospital, phoneNumber: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Add Hospital</button>
      </form>
    </div>
  );

  const renderViewDonors = () => (
    <div className="mt-8 bg-white dark:bg-slate-900 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">View Donors</h2>
      <div className="relative overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-slate-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Blood Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Donation Date</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-700 divide-y divide-gray-200">
            {donors.map((donor, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{donor.donorName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{donor.age.toString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{donor.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{donor.Address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{donor.bloodGroup}</td>
                <td className="px-6 py-4 whitespace-nowrap">{donor.bloodVolume.toString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(donor.donatedTime.toNumber() * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewPatients = () => (
    <div className="mt-8 bg-white dark:bg-slate-900 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">View Patients</h2>
      <div className="relative overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-slate-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Used Blood ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">Used Time</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-700 divide-y divide-gray-200">
            {patients.map((patient, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.age.toString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.Address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.bloodGroup}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.usedBloodId.toString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(patient.usedTime.toNumber() * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'addSuppliers':
        return renderAddSuppliers();
      case 'addHospitals':
        return renderAddHospitals();
      case 'viewDonors':
        return renderViewDonors();
      case 'viewPatients':
        return renderViewPatients();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-auto" aria-label="Tabs">
              {['dashboard', 'addSuppliers', 'addHospitals', 'viewDonors', 'viewPatients'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}