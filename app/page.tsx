"use client"
import React from 'react';
import { ArrowRight, Droplet, Hospital, Truck, Users } from 'lucide-react';
import ThemeSwitch from '@/components/ThemeSwitch';
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <header className="bg-red-600 text-white">
        <div className="max-w-screen-xl flex mx-auto p-4">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold">Blood Donation Supply Chain</h1>
            <p className="mt-2 text-xl">Streamlining blood donation management with blockchain technology</p>
          </div>
          <div className="px-4 py-6"> <ThemeSwitch /> </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users size={48} />, title: "Donors", description: "Donors give blood at registered suppliers" },
              { icon: <Truck size={48} />, title: "Suppliers", description: "Suppliers collect and ship blood to hospitals" },
              { icon: <Hospital size={48} />, title: "Hospitals", description: "Hospitals receive and use blood for patients" },
              { icon: <Droplet size={48} />, title: "Tracking", description: "Every step is tracked on the blockchain" },
            ].map((step, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md">
                <div className="text-red-600 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "For the Adminstration", description: "Register hospitals and suppliers", button: "Admin", link: "admin" },
              { title: "For Suppliers", description: "Register and manage blood donations", button: "Supplier Portal", link: "suppliers" },
              { title: "For Hospitals", description: "Request and track blood supplies", button: "Hospital Portal", link: "hospitals" },
            ].map((card, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="mb-4">{card.description}</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center" onClick={() => { router.push(`/${card.link}`) }} >
                  {card.button}
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-200 dark:bg-slate-900 text-white mt-12">
        <div className="container text-slate-900 dark:text-slate-100 mx-auto px-4 py-6 flex justify-center">
          <p>&copy; 2024 Blood Donation Supply Chain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
