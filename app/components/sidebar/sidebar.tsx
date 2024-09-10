import React from 'react'
import styles from './sidebar.module.css'
import { Droplet, LogOut, UserPlus, Users, Building, Activity } from 'lucide-react'
// import { logout } from '@/app/lib/action'
// import { auth } from '@/app/auth'
import MenuLink from './menuLink/menuLink'
import Image from 'next/image'

const Sidebar = async () => {
//   const session = await auth();
//   console.log("session", session);

  const menuItems = [
    {
      title: "Blood Supply Chain",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <Activity />,
        },
        {
          title: "Add Donor",
          path: "/dashboard/donors/add",
          icon: <UserPlus />,
        },
        {
          title: "Donors",
          path: "/dashboard/donors",
          icon: <Users />,
        },
        {
          title: "Blood Banks",
          path: "/dashboard/bloodbanks",
          icon: <Building />,
        },
        {
          title: "Blood Inventory",
          path: "/dashboard/inventory",
          icon: <Droplet />,
        },
      ]
    },
  ]

  return (
    <div className={styles.container}>
      {/* logo */}
      <div className={styles.user}>
        <Image src="/blood-logo.png" height="110" width="130" className={styles.Userimage} alt='Blood Supply Chain Logo'/>
      </div>
      {/* list */}
      <ul className={styles.listtypes}>
        {menuItems.map((cat) => (
          <li key={cat.title}> 
            <span key={styles.cat} className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title}/>
            ))}
          </li>
        ))}
      </ul>
      {/* <form action={logout}>
        <button type='submit' className={styles.logout}> 
          <LogOut />
          Logout
        </button>
      </form> */}
    </div>
  )
}

export default Sidebar