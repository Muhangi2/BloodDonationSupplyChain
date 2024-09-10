"use client";

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ArrowRight, Droplet, Hospital as HospitalIcon, Truck, Users } from 'lucide-react';
import Link from 'next/link'; // Import Link from next/link

export default function LandingPage() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  // Function to request MetaMask connection
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        setError("Failed to connect to MetaMask. Please try again.");
      }
    } else {
      setError("MetaMask not found. Please install MetaMask.");
    }
  };

  // Automatically request MetaMask connection on page load
  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-red-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-extrabold text-white tracking-wide">Blood Donation Supply Chain</h1>
            </div>
            <div className="flex space-x-8 text-white">
              <Link href="/suppliers" className="hover:text-gray-300 transition duration-200">Suppliers</Link>
              <Link href="/hospitals" className="hover:text-gray-300 transition duration-200">Hospitals</Link>
              <Link href="/admin" className="hover:text-gray-300 transition duration-200">Admin</Link>
            </div>
            {/* MetaMask Connection Status */}
            <div>
              {account ? (
                <p className="text-green-300 font-semibold">Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</p>
              ) : (
                <button onClick={connectWallet} className="bg-white text-red-600 py-2 px-4 rounded-full hover:bg-gray-100 font-semibold transition duration-200">
                  Connect MetaMask
                </button>
              )}
              {error && <p className="text-red-300 mt-1">{error}</p>}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Streamlining Blood Donation Management with Blockchain Technology
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Secure, transparent, and efficient tracking of blood donations from donors to hospitals.
          </p>
        </div>
      </header>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users className="h-10 w-10 text-indigo-600" />, title: "Donors", description: "Donors give blood at registered suppliers." },
              { icon: <Droplet className="h-10 w-10 text-red-600" />, title: "Suppliers", description: "Suppliers collect and ship blood to hospitals." },
              { icon: <HospitalIcon className="h-10 w-10 text-green-600" />, title: "Hospitals", description: "Hospitals receive and use blood for patients." },
              { icon: <Truck className="h-10 w-10 text-yellow-600" />, title: "Tracking", description: "Every step is tracked on the blockchain." },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="mb-4">{step.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800">{step.title}</h4>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Get Started</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: "For the Administration", description: "Register hospitals and suppliers", button: "Admin Portal", link: "/admin" },
              { title: "For Suppliers", description: "Register and manage blood donations", button: "Supplier Portal", link: "/suppliers" },
              { title: "For Hospitals", description: "Request and track blood supplies", button: "Hospital Portal", link: "/hospitals" },
            ].map((card, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h4>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <Link href={card.link} className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700">
                  
                    {card.button}
                 
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Blood Donation Supply Chain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
